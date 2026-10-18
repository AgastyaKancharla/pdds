import { describe, it, expect } from 'vitest';
import {
  AGRICULTURAL_KNOWLEDGE_CATALOG,
  getCropKnowledge,
  getDiseaseKnowledge,
  getKnowledgeForScan,
  isDiseaseSupported,
  isCropSupported,
  getLookalikesForDisease,
  getAllSupportedCrops,
  getAllSupportedDiseases,
  getOfflineReferenceCatalog,
  getTreatmentsForCategory,
  isSourceDocumentVerified,
  hasChemicalTabDetail,
  getClaimEvidenceNote,
  getConditionsForCrop,
  getConditionCategory,
  isNonPathogenicCondition,
  allowsChemicalPestControl,
  requiresSpecialCapture,
  getSeverityBand,
} from '../knowledge';
import { MOCK_TREATMENTS, MOCK_DISEASES, getMockDisease } from '../mockData';
import { validateAndNormalizeAiResponse } from '../ai/validator';
import { translations, translate, type TranslationKey } from '../i18n';

describe('Phase 3 Agricultural Knowledge Base', () => {
  describe('Catalog Schema & Completeness', () => {
    it('has a valid version, review date, and authority standards', () => {
      const catalog = AGRICULTURAL_KNOWLEDGE_CATALOG;
      expect(catalog.version).toBe('1.0.0');
      expect(catalog.lastReviewedDate).toBe('2026-10-12');
      expect(catalog.authorityStandards.length).toBeGreaterThanOrEqual(3);
      expect(catalog.authorityStandards.some((s) => s.includes('ANGRAU'))).toBe(true);
      expect(catalog.authorityStandards.some((s) => s.includes('ICAR'))).toBe(true);
      expect(catalog.authorityStandards.some((s) => s.includes('CIBRC'))).toBe(true);
    });

    it('contains all 10 core Andhra Pradesh crops plus the catalog-expansion crops, with complete bilingual metadata', () => {
      const crops = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.crops);
      // 10 original core crops + Brinjal + Okra + Citrus, the new crops added in the Oct 2026
      // catalog expansion pass (new crops beyond the original 10, not just new conditions on them).
      expect(crops.length).toBe(13);

      const expectedCropIds = [
        'crop-rice',
        'crop-chilli',
        'crop-cotton',
        'crop-groundnut',
        'crop-maize',
        'crop-sugarcane',
        'crop-tomato',
        'crop-mango',
        'crop-banana',
        'crop-turmeric',
        'crop-brinjal',
        'crop-okra',
        'crop-citrus',
      ];

      for (const id of expectedCropIds) {
        const crop = AGRICULTURAL_KNOWLEDGE_CATALOG.crops[id];
        expect(crop, `Missing crop: ${id}`).toBeDefined();
        expect(crop.name_en.trim().length).toBeGreaterThan(0);
        expect(crop.name_te.trim().length).toBeGreaterThan(0);
        expect(crop.scientificName.trim().length).toBeGreaterThan(0);
        expect(crop.apMajorDistricts.length).toBeGreaterThan(0);
        expect(crop.growingSeasons.length).toBeGreaterThan(0);
        expect(crop.commonDiseaseIds.length).toBeGreaterThan(0);
      }
    });

    it('contains every catalogued condition with valid crop foreign keys and symptom profiles', () => {
      const diseases = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases);
      // Was a hardcoded 10 (one condition per crop). The catalog is now multi-condition per
      // crop, starting with Rice, so this asserts the floor plus the structural guarantees
      // below rather than an exact total that every future addition would have to edit.
      expect(diseases.length).toBeGreaterThanOrEqual(16);
      // Every crop must still have at least one condition — no orphaned crop chips in the UI.
      for (const cropId of Object.keys(AGRICULTURAL_KNOWLEDGE_CATALOG.crops)) {
        expect(
          diseases.filter((d) => d.cropId === cropId).length,
          `Crop ${cropId} has no catalogued condition`
        ).toBeGreaterThan(0);
      }

      for (const disease of diseases) {
        expect(AGRICULTURAL_KNOWLEDGE_CATALOG.crops[disease.cropId], `Invalid cropId ${disease.cropId}`).toBeDefined();
        expect(disease.name_en.trim().length).toBeGreaterThan(0);
        expect(disease.name_te.trim().length).toBeGreaterThan(0);
        expect(disease.pathogenOrVector_en.trim().length).toBeGreaterThan(0);
        expect(disease.pathogenOrVector_te.trim().length).toBeGreaterThan(0);
        expect(['High', 'Medium', 'Low']).toContain(disease.urgencyLevel);
        expect(['red', 'yellow', 'green']).toContain(disease.urgencyColor);
        expect(disease.observableSymptoms_en.length).toBeGreaterThan(0);
        expect(disease.observableSymptoms_te.length).toBeGreaterThan(0);
        expect(disease.environmentalRiskFactors_en.length).toBeGreaterThan(0);
        expect(disease.environmentalRiskFactors_te.length).toBeGreaterThan(0);
        expect(disease.preventionGuidance.length).toBeGreaterThan(0);
        expect(disease.treatments.length).toBeGreaterThan(0);
        expect(disease.escalationThreshold_en.trim().length).toBeGreaterThan(0);
        expect(disease.escalationThreshold_te.trim().length).toBeGreaterThan(0);
        expect(disease.sources.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Evidence Status Differentiation', () => {
    it('distinguishes unverified from conflicting diseases; no entry currently claims verified_reference', () => {
      // Phase 5.4 evidence-verification pass: Rice Blast, Chilli Leaf Curl, Cotton Pink
      // Bollworm, and Groundnut Tikka previously claimed evidenceStatus 'verified_reference'
      // while every one of their specific chemical doses turned out to be unconfirmable
      // against a primary CIBRC label (the verifying environment could not reach ppqs.gov.in
      // or any other external host — a tooling/network limitation, not a finding that the
      // underlying doses are wrong). They were downgraded to 'unverified' and their chemical
      // doses suppressed, consistent with every other non-fully-verified catalog entry. As a
      // result, zero disease entries currently hold 'verified_reference' — this is itself an
      // invariant worth asserting, so a future entry can't silently claim it without review.
      const formerlyVerifiedIds = [
        'disease-rice-blast',
        'disease-chilli-leaf-curl',
        'disease-cotton-bollworm',
        'disease-groundnut-tikka',
      ];

      for (const id of formerlyVerifiedIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(d, `Missing disease: ${id}`).toBeDefined();
        // Rice Blast moved to 'provisional' once its Tricyclazole and Isoprothiolane doses
        // were confirmed against the CIBRC fungicide registry with a real deep link. It is
        // deliberately NOT 'verified_reference': only the doses were document-verified, while
        // its symptoms, lookalikes and prevention text remain unverified extension knowledge.
        expect(d.evidenceStatus).toBe(id === 'disease-rice-blast' ? 'provisional' : 'unverified');
        // These entries must still have both pathological and abiotic lookalikes —
        // that quality bar is independent of evidenceStatus and unaffected by this change.
        const hasPathological = d.similarConditions.some((l) => l.isPathological);
        const hasAbiotic = d.similarConditions.some((l) => !l.isPathological);
        expect(hasPathological, `${id} missing pathological lookalike`).toBe(true);
        expect(hasAbiotic, `${id} missing abiotic lookalike`).toBe(true);
      }

      const otherUnverifiedIds = [
        'disease-maize-armyworm',
        'disease-sugarcane-redrot',
        'disease-tomato-earlyblight',
        'disease-mango-anthracnose',
        'disease-turmeric-rhizomerot',
      ];

      for (const id of otherUnverifiedIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(d, `Missing disease: ${id}`).toBeDefined();
        expect(d.evidenceStatus).toBe('unverified');
      }

      const conflictingId = 'disease-banana-panamawilt';
      const panama = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[conflictingId];
      expect(panama).toBeDefined();
      expect(panama.evidenceStatus).toBe('conflicting');

      // No disease entry currently claims verified_reference. If this ever becomes false,
      // it must be because a real, document-level verification was done and recorded
      // (see the specificDocumentVerified regression test), not a casual relabeling.
      const verifiedReferenceCount = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).filter(
        (d) => d.evidenceStatus === 'verified_reference'
      ).length;
      expect(verifiedReferenceCount).toBe(0);
    });
  });

  describe('Active Ingredients & Statutory Precautions', () => {
    it('avoids commercial brand names in favor of generic active ingredients', () => {
      const allTreatments = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) => d.treatments);
      const bannedBrands = ['Baan', 'Roundup', 'Confidor', 'Coragen', 'Bavistin'];

      for (const t of allTreatments) {
        if (t.activeIngredient_en) {
          for (const brand of bannedBrands) {
            expect(t.activeIngredient_en.toLowerCase()).not.toContain(brand.toLowerCase());
          }
        }
      }
    });

    it('requires active ingredients and safety cautions for any chemical treatment', () => {
      const chemicalTreatments = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) =>
        d.treatments.filter((t) => t.category === 'chemical')
      );

      // As of the Phase 5.4 evidence-verification pass, the catalog's prior 4 unverified
      // 'chemical' treatments (Rice Blast x2, Chilli x1, Cotton x1) had their suppressed-dose
      // explanations folded into each disease's existing organic entry (matching the pattern
      // already used by Maize/Tomato/Mango/Turmeric) and were removed as standalone entries —
      // tagging genuinely chemical content as 'preventive' was itself a mislabel. Groundnut
      // Tikka had no other treatment entry to fold into, so it remains standalone and its
      // category was reverted to the truthful 'chemical' (not 'preventive') — its content
      // stays fully non-actionable (dose suppressed), enforced below and by the dose/
      // suppression-pairing regression test.
      //
      // MULTI-CONDITION EXPANSION UPDATE: the count was previously pinned at exactly 1. The
      // Rice conditions now carry chemical entries with real doses, because those doses were
      // confirmed against the CIBRC Major Uses of Pesticides registries with deep links and
      // cited table rows — the primary-label verification the Phase 5.4 comment above was
      // waiting on. Groundnut Tikka's entry is unchanged and still suppressed. The structural
      // requirements below (active ingredient + safety caution on every chemical entry) are
      // what actually matter and now apply across all of them.
      //
      // The Oct 2026 market-research pass then added three more truthfully-tagged 'chemical'
      // entries (Groundnut Rust, Cotton Whitefly, Maize Turcicum Leaf Blight). Unlike the Rice
      // ones, these are NOT document-verified against a CIBRC registry — they stay
      // non-actionable (dose suppressed, or shown as a reference point only for the ICAR-IIMR
      // Maize figure). Both kinds coexist deliberately, and the dose/suppression-pairing test
      // below is what enforces the distinction per entry.
      expect(chemicalTreatments.length).toBeGreaterThanOrEqual(14);
      for (const requiredId of [
        't-groundnut-chem-1',
        't-groundnut-rust-chem-1',
        't-cotton-whitefly-chem-1',
        't-maize-turcicum-chem-1',
      ]) {
        expect(chemicalTreatments.map((t) => t.id)).toContain(requiredId);
      }
      for (const t of chemicalTreatments) {
        expect(t.activeIngredient_en).toBeDefined();
        expect(t.safetyCaution_en).toBeDefined();
        expect(t.safetyCaution_en!.trim().length).toBeGreaterThan(0);
      }
    });

    it('Phase 5.4 regression: no unverified/provisional/conflicting disease entry exposes an actionable dose (chemical OR organic/biological)', () => {
      // Guards against the Sugarcane Red Rot defect found in the 5.4 evidence-integrity audit:
      // a specific Carbendazim sett-dip dose was given under evidenceStatus "unverified" while
      // every other non-verified entry (Maize, Tomato, Mango, Turmeric, Banana) suppressed its
      // chemical dosage pending primary CIBRC label verification. This asserts the suppression
      // pattern is applied catalog-wide, not just to a few hand-picked entries.
      //
      // Per the Phase 5.4 follow-up decision, the same standard also applies to organic/
      // biological doses (neem, Trichoderma, Bordeaux mixture, etc.) — "unsupported actionable
      // recommendations" are suppressed regardless of whether the active ingredient is
      // synthetic or organic.
      //
      // NOTE: this does NOT assert "zero 'chemical'-category treatments in non-verified
      // entries" — Groundnut Tikka's single treatment is truthfully tagged 'chemical' (see
      // the test above) specifically because its content discusses pesticide active
      // ingredients, and mistagging it 'organic' or 'preventive' to pass this check would be
      // exactly the mislabeling this correction round fixed. The real invariant enforced here
      // is content-level: no treatment instruction, in ANY category, may carry a dose that is
      // neither suppressed nor backed by a verified primary document.
      //
      // MULTI-CONDITION EXPANSION UPDATE: this check originally skipped only entries whose
      // disease-wide evidenceStatus was 'verified_reference', on the reasoning that "only
      // verified_reference entries may still state a specific dose". That was a usable proxy
      // while the catalog contained zero document-verified sources — "disease-wide unverified"
      // and "no verified document backing this dose" were then the same condition. They are no
      // longer the same. Rice conditions now cite the CIBRC Major Uses of Pesticides registries
      // with real deep links and cited table rows, so a dose can be primary-source verified
      // while the entry's symptoms, lookalikes and prevention text remain merely 'provisional'.
      // Keeping the old proxy would have forced a false choice: either mark whole entries
      // 'verified_reference' on the strength of a dose alone (overstating the rest of the
      // entry), or suppress doses that genuinely are confirmed against a government label.
      //
      // The invariant is therefore restated at the level it actually belongs to — the document
      // backing the dose, not a coarse entry-wide flag. This is the same separation of concerns
      // that ClaimEvidenceNote exists to express (see types.ts), and it is strictly tighter than
      // the original: a dose now has to point at a verified document, where before an entry-wide
      // 'verified_reference' would have waved through any dose inside it.
      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        // An entry carrying at least one genuinely document-verified source (deep link AND a
        // cited page/section, per isSourceDocumentVerified) may state the doses that document
        // supports. Everything else must still suppress.
        const hasVerifiedPrimaryDocument = disease.sources.some(isSourceDocumentVerified);
        if (disease.evidenceStatus === 'verified_reference' || hasVerifiedPrimaryDocument) continue;

        // No treatment instruction text, in ANY category (organic and chemical included), in
        // an entry with no verified primary document may carry a bare active-ingredient dose
        // (e.g. "@ 1g/L", "50% WP", "1% Bordeaux") unless it is explicitly framed as
        // suppressed/pending-verification.
        const dosePattern = /@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|pit)|\b\d+(\.\d+)?%\s/i;
        for (const t of disease.treatments) {
          if (dosePattern.test(t.instruction_en)) {
            // Maize Turcicum Leaf Blight (added in the Oct 2026 market-research pass) is a
            // deliberate variant: its dose comes from a clean, single ICAR-IIMR institutional
            // source rather than a conflicting/absent secondary figure, so the house decision
            // was to show the real number but explicitly frame it as "a reference point only,
            // never unconditionally actionable" rather than the word "suppressed" — the same
            // underlying safety guarantee (never actionable without RBK/VAA confirmation),
            // worded to match why it's being qualified. Both framings satisfy this invariant.
            const hasSuppressionLanguage = /suppress/i.test(t.instruction_en) || /suppress/i.test(t.regulatoryNotice_en || '');
            const hasReferencePointLanguage =
              /unconditionally actionable/i.test(t.instruction_en) || /unconditionally actionable/i.test(t.regulatoryNotice_en || '');
            expect(
              hasSuppressionLanguage || hasReferencePointLanguage,
              `${disease.id} treatment ${t.id} (category: ${t.category}) gives a dosed instruction without suppression or reference-point-only language, and the entry cites no document-verified source`
            ).toBe(true);
          }
        }
      }
    });

    it('every dosed treatment in a document-verified entry cites the registry it was confirmed against', () => {
      // The companion to the invariant above. Having restated "may state a dose" as "cites a
      // verified primary document", this guards the other half: an entry that unlocks doses by
      // carrying a verified source must actually attribute those doses to it, so a farmer (or a
      // later auditor) can trace any number on screen back to the government document it came
      // from. Without this, adding one verified source to an entry would silently license every
      // other dose in that entry, verified or not.
      const dosePattern = /@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|pit)|\b\d+(\.\d+)?%\s/i;

      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        if (!disease.sources.some(isSourceDocumentVerified)) continue;

        for (const t of disease.treatments) {
          if (!dosePattern.test(t.instruction_en)) continue;
          if (/suppress/i.test(t.instruction_en) || /suppress/i.test(t.regulatoryNotice_en || '')) continue;

          const notice = (t.regulatoryNotice_en || '').toLowerCase();
          expect(
            notice.includes('cibrc') || notice.includes('registry') || notice.includes('registered'),
            `${disease.id} treatment ${t.id} states a dose but its regulatoryNotice_en does not attribute it to the verified registry`
          ).toBe(true);
        }
      }
    });

    it('non-pathogenic conditions never carry a chemical pest-control treatment', () => {
      // Safety invariant introduced with the first nutrient-deficiency entries. A zinc
      // deficiency, a physiological disorder or abiotic stress cannot be fixed by a pesticide:
      // the cause is nutrition, soil chemistry or weather. Offering a spray for one would cost
      // the farmer money, risk scorching already-stressed foliage, and leave the real cause
      // untreated while the crop keeps declining. Enforced on the data rather than only in the
      // UI, so a future entry cannot introduce the hazard by simply being added to the catalog.
      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        if (!isNonPathogenicCondition(disease)) continue;

        expect(
          disease.treatments.filter((t) => t.category === 'chemical'),
          `${disease.id} is non-pathogenic and must not offer any chemical pest-control treatment`
        ).toHaveLength(0);

        expect(
          allowsChemicalPestControl(disease),
          `${disease.id} must not permit chemical pest control`
        ).toBe(false);
      }
    });

    it('Phase 5.4 regression: specificDocumentVerified is never true without a real deep link and a cited section', () => {
      // Guards the honesty of the citation-granularity flag added during the 5.4 audit.
      // A source must never claim "specificDocumentVerified: true" unless it actually links
      // past the bare organization homepage AND names the supporting page/passage/table/
      // label section (pageOrSection). This prevents the flag from ever being flipped to
      // true as a shortcut without doing (or at least recording) the real verification work.
      const allSources = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) => d.sources);
      expect(allSources.length).toBeGreaterThan(0);

      for (const src of allSources) {
        if (src.specificDocumentVerified === true) {
          expect(src.url, `"${src.title}" claims specificDocumentVerified but has no url`).toBeDefined();
          // A homepage-only URL has no path beyond an optional trailing slash.
          const urlPath = new URL(src.url!).pathname.replace(/\/$/, '');
          expect(
            urlPath.length,
            `"${src.title}" claims specificDocumentVerified but url "${src.url}" is a bare homepage`
          ).toBeGreaterThan(0);
          expect(
            src.pageOrSection && src.pageOrSection.trim().length > 0,
            `"${src.title}" claims specificDocumentVerified but has no pageOrSection`
          ).toBe(true);
        }
      }

      // This assertion was deliberately written as a hard "must be 0" so that the moment real
      // document-level verification work landed, it would force a conscious update rather than
      // silently passing. That moment has arrived: the Rice conditions cite the CIBRC Major
      // Uses of Pesticides registries (fungicides, insecticides, bio-insecticides) with real
      // document URLs and cited table rows. The assertion is therefore inverted rather than
      // deleted — verified sources must now exist, and the per-source structural checks above
      // still police every one of them.
      const verifiedCount = allSources.filter((s) => s.specificDocumentVerified === true).length;
      expect(verifiedCount).toBeGreaterThan(0);

      // Every verified source must point at an actual document, not a directory listing — the
      // cheapest way this flag could rot is someone citing a search page or a folder.
      for (const src of allSources.filter((s) => s.specificDocumentVerified === true)) {
        expect(
          /\.(pdf|html?|aspx)$/i.test(new URL(src.url!).pathname),
          `"${src.title}" is marked document-verified but its url does not resolve to a document file`
        ).toBe(true);
      }
    });

    it('Phase 5.4 fix: isSourceDocumentVerified requires BOTH specificDocumentVerified AND a non-blank pageOrSection', () => {
      // Guards the ResultScreen.tsx source-disclosure UI bug found in the independent diff
      // review: specificDocumentVerified alone used to be treated as sufficient to enter the
      // "verified" render branch, so a source missing pageOrSection rendered NEITHER the
      // verified section label NOR the homepage-only disclosure — a silent failure, not a
      // conservative one. isSourceDocumentVerified is the single source of truth both the UI
      // and this test use, so this test exercises the extracted helper directly rather than
      // the JSX (there is no component-rendering harness — e.g. @testing-library — wired into
      // this project's vitest setup, so the smallest testable unit is this pure function).

      // Valid verified case: both fields present and meaningful.
      expect(isSourceDocumentVerified({ specificDocumentVerified: true, pageOrSection: 'Table 3, p. 12' })).toBe(true);

      // Missing pageOrSection must fail conservatively (fall back to disclosure), even though
      // specificDocumentVerified is true.
      expect(isSourceDocumentVerified({ specificDocumentVerified: true, pageOrSection: undefined })).toBe(false);

      // Empty-string pageOrSection must also fail conservatively.
      expect(isSourceDocumentVerified({ specificDocumentVerified: true, pageOrSection: '' })).toBe(false);

      // Whitespace-only pageOrSection must fail conservatively (not just a truthiness check).
      expect(isSourceDocumentVerified({ specificDocumentVerified: true, pageOrSection: '   ' })).toBe(false);

      // A real pageOrSection does not matter if specificDocumentVerified itself is false/absent —
      // a homepage-only citation must never be reported as document-verified.
      expect(isSourceDocumentVerified({ specificDocumentVerified: false, pageOrSection: 'Table 3, p. 12' })).toBe(
        false
      );
      expect(isSourceDocumentVerified({ pageOrSection: 'Table 3, p. 12' })).toBe(false);

      // Both fields absent (today's actual catalog state) must fail conservatively.
      expect(isSourceDocumentVerified({})).toBe(false);

      // Cross-check against the live catalog. Sources now split into two groups, and the
      // helper must agree with the data for both: a source flagged verified has to carry a
      // real pageOrSection, and an unflagged (homepage-only) source must still resolve false.
      const allSourcesNow = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) => d.sources);
      for (const src of allSourcesNow) {
        const expected = src.specificDocumentVerified === true && !!src.pageOrSection?.trim();
        expect(
          isSourceDocumentVerified(src),
          `"${src.title}" resolved inconsistently with its own specificDocumentVerified/pageOrSection fields`
        ).toBe(expected);
      }
      // Both groups must actually be represented, so this cross-check can never be vacuous.
      expect(allSourcesNow.some((s) => isSourceDocumentVerified(s))).toBe(true);
      expect(allSourcesNow.some((s) => !isSourceDocumentVerified(s))).toBe(true);
    });
  });

  describe('Knowledge Service Helper Functions', () => {
    it('returns crop knowledge synchronously without network calls', () => {
      const crop = getCropKnowledge('crop-rice');
      expect(crop).not.toBeNull();
      expect(crop?.name_en).toBe('Paddy / Rice');
      expect(crop?.name_te).toBe('వరి');
      expect(crop?.scientificName).toBe('Oryza sativa L.');

      expect(getCropKnowledge('crop-nonexistent')).toBeNull();
      expect(getCropKnowledge(null)).toBeNull();
    });

    it('returns disease knowledge synchronously without network calls', () => {
      const blast = getDiseaseKnowledge('disease-rice-blast');
      expect(blast).not.toBeNull();
      expect(blast?.name_en).toBe('Rice Blast');
      expect(blast?.cropId).toBe('crop-rice');
      // Phase 5.4 downgraded this from 'verified_reference' to 'unverified' when its chemical
      // doses could not be confirmed against a primary CIBRC label. Those doses have since
      // been confirmed against the CIBRC fungicide registry, so it sits at 'provisional':
      // the doses are document-verified, the surrounding diagnostic text is not.
      expect(blast?.evidenceStatus).toBe('provisional');

      expect(getDiseaseKnowledge('disease-unknown')).toBeNull();
      expect(getDiseaseKnowledge(null)).toBeNull();
    });

    it('returns combined knowledge for scan', () => {
      const scanInfo = getKnowledgeForScan('crop-chilli', 'disease-chilli-leaf-curl');
      expect(scanInfo.crop).not.toBeNull();
      expect(scanInfo.disease).not.toBeNull();
      expect(scanInfo.crop?.id).toBe('crop-chilli');
      expect(scanInfo.disease?.id).toBe('disease-chilli-leaf-curl');
    });

    it('correctly determines whether a disease or crop is supported', () => {
      expect(isDiseaseSupported('disease-rice-blast')).toBe(true);
      expect(isDiseaseSupported('disease-chilli-leaf-curl')).toBe(true);
      expect(isDiseaseSupported('disease-fabricated-404')).toBe(false);

      expect(isCropSupported('crop-rice')).toBe(true);
      expect(isCropSupported('crop-rubber-tree')).toBe(false);
    });

    it('returns differential diagnosis lookalikes for a disease', () => {
      const lookalikes = getLookalikesForDisease('disease-rice-blast');
      expect(lookalikes.length).toBeGreaterThanOrEqual(2);
      expect(lookalikes[0].differentiatingFactors_en).toBeDefined();
      expect(lookalikes[0].differentiatingFactors_te).toBeDefined();

      expect(getLookalikesForDisease('disease-nonexistent')).toEqual([]);
    });

    it('returns lists of all supported crops and diseases', () => {
      const allCrops = getAllSupportedCrops();
      // 10 original core crops + Brinjal + Okra + Citrus, the new-crop catalog expansion.
      expect(allCrops.length).toBe(13);

      // 10 original + 6 added in the Oct 2026 market-research expansion pass + 4 new Brinjal
      // conditions + 5 new Okra conditions + 5 new Citrus conditions + 3 new Rice conditions
      // (BPH, Leaf Folder, False Smut) + 2 new Cotton conditions (Jassids, Bacterial Blight)
      // from the Priority 3 existing-crop expansion.
      const allDiseases = getAllSupportedDiseases();
      expect(allDiseases.length).toBeGreaterThanOrEqual(35);

      // Rice is the first crop expanded beyond a single condition. This previously asserted
      // exactly one rice disease, which was the assumption the whole UI inherited.
      const riceDiseases = getAllSupportedDiseases('crop-rice');
      expect(riceDiseases.length).toBe(10);
      expect(riceDiseases.map((d) => d.id).sort()).toEqual(
        [
          'disease-rice-blast',
          'disease-rice-blb',
          'disease-rice-brownspot',
          'disease-rice-gallmidge',
          'disease-rice-sheathblight',
          'disease-rice-stemborer',
          'disease-rice-zincdeficiency',
          'disease-rice-bph',
          'disease-rice-leaffolder',
          'disease-rice-falsesmut',
        ].sort()
      );
    });

    it('getConditionsForCrop orders conditions by urgency then name, and is stable', () => {
      const rice = getConditionsForCrop('crop-rice');
      expect(rice.length).toBe(10);

      // High urgency first, then Medium, then Low — a farmer opening a crop should meet the
      // condition most likely to cost them the crop, not whichever key happened to be first.
      const rank = { High: 0, Medium: 1, Low: 2 } as const;
      for (let i = 1; i < rice.length; i++) {
        expect(rank[rice[i].urgencyLevel]).toBeGreaterThanOrEqual(rank[rice[i - 1].urgencyLevel]);
      }
      // Deterministic across calls, so React keys and chip order never shuffle between renders.
      expect(getConditionsForCrop('crop-rice').map((d) => d.id)).toEqual(rice.map((d) => d.id));
      expect(getConditionsForCrop('crop-nonexistent')).toEqual([]);
      expect(getConditionsForCrop(null)).toEqual([]);
    });

    it('every crop lists exactly its catalogued conditions in commonDiseaseIds', () => {
      // Guards the crop -> condition index against drift: a condition added to the catalog but
      // left out of its crop's commonDiseaseIds would be invisible to anything reading the crop
      // entry, and an ID listed but never defined would dangle.
      for (const crop of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.crops)) {
        const actual = getConditionsForCrop(crop.id).map((d) => d.id).sort();
        expect(crop.commonDiseaseIds.slice().sort(), `crop ${crop.id} index mismatch`).toEqual(actual);
      }
    });

    it('returns full offline reference catalog synchronously', () => {
      const offlineCatalog = getOfflineReferenceCatalog();
      expect(offlineCatalog.version).toBe('1.0.0');
      expect(Object.keys(offlineCatalog.crops).length).toBe(13);
      expect(Object.keys(offlineCatalog.diseases).length).toBeGreaterThanOrEqual(35);
    });
  });

  describe('Integration with AI Validator', () => {
    const providerMeta = {
      provider: 'openrouter',
      model: 'meta-llama/llama-3.2-11b-vision-instruct:free',
      latencyMs: 150,
    };

    it('populates evidenceReferences from knowledge catalog for supported diseases', () => {
      const raw = {
        status: 'supported_diagnosis',
        cropId: 'crop-rice',
        diseaseId: 'disease-rice-blast',
        cropNameEn: 'Paddy / Rice',
        visualSymptoms: ['Spindle-shaped spots on leaves'],
      };

      const result = validateAndNormalizeAiResponse(raw, providerMeta);
      expect(result.status).toBe('supported_diagnosis');
      expect(result.conditionAssessment.diseaseId).toBe('disease-rice-blast');
      expect(result.evidenceReferences).toBeDefined();
      expect(result.evidenceReferences?.length).toBeGreaterThan(0);
      expect(result.evidenceReferences?.[0]).toContain('ANGRAU');
    });

    it('flags provisional status in diagnostic limitations for provisional diseases', () => {
      const rawProvisional = {
        status: 'supported_diagnosis',
        cropId: 'crop-maize',
        diseaseId: 'disease-maize-armyworm',
        cropNameEn: 'Maize (Corn)',
        visualSymptoms: ['Window-pane feeding holes'],
      };

      const result = validateAndNormalizeAiResponse(rawProvisional, providerMeta);
      expect(result.status).toBe('supported_diagnosis');
      expect(result.limitations.some((l) => l.toLowerCase().includes('provisional'))).toBe(true);
    });
  });

  describe('Multilingual Translation Keys & Graceful Fallback', () => {
    it('contains all Phase 3 agricultural guidance keys in EN and TE', () => {
      const phase3Keys: TranslationKey[] = [
        'lookalikesTitle',
        'lookalikeDifferentiatingFactor',
        'riskFactorsTitle',
        'preventionTitle',
        'escalationTitle',
        'knowledgeSourceTitle',
        'evidenceStatusVerified',
        'evidenceStatusProvisional',
        'evidenceStatusDemo',
        'pesticideSafetyWarning',
        'offlineModeBadge',
        'offlineModeNotice',
        'pathogenLabel',
        'differentialPestDisease',
        'differentialAbioticNutrient',
        'activeIngredientLabel',
        'safetyCautionLabel',
      ];

      for (const key of phase3Keys) {
        expect(translate(key, 'en')).toBeTruthy();
        expect(translate(key, 'en')).not.toBe(key);
        expect(translate(key, 'te')).toBeTruthy();
        expect(translate(key, 'te')).not.toBe(key);
      }
    });

    it('falls back gracefully to key or en when unknown key is passed', () => {
      expect(translate('unregistered_key_xyz', 'en')).toBe('unregistered_key_xyz');
      expect(translate('unregistered_key_xyz', 'te')).toBe('unregistered_key_xyz');
    });
  });

  describe('Phase 3.2 Knowledge Integrity and Treatment Safety Fixes', () => {
    describe('1. No Legacy Mock Treatment Fallback for Empty Categories', () => {
      it('never falls back to MOCK_TREATMENTS when a curated category is empty', () => {
        // Maize Fall Armyworm chemical spray guidance is suppressed pending CIBRC validation
        const maizeChem = getTreatmentsForCategory('disease-maize-armyworm', 'chemical', 'en');
        expect(maizeChem.hasCuratedEntry).toBe(true);
        expect(maizeChem.isEmptyCategory).toBe(true);
        expect(maizeChem.treatments).toHaveLength(0);

        // Ensure legacy mock chemical treatment from mockData is NOT leaked
        const mockChemMaize = MOCK_TREATMENTS.filter(
          (t) => t.disease_id === 'disease-maize-armyworm' && t.type === 'chemical'
        );
        expect(mockChemMaize.length).toBeGreaterThan(0);
        expect(maizeChem.treatments.some((t) => t.instruction.toLowerCase().includes('emamectin'))).toBe(false);

        // Groundnut Tikka: its one curated treatment discusses Mancozeb/Tebuconazole
        // (dose suppressed — no primary CIBRC label was accessible to confirm either figure)
        // and is truthfully tagged 'chemical' — a Phase 5.4 correction round found that an
        // earlier pass had mistagged it 'preventive' to make the category empty, which was
        // itself a mislabel of genuinely chemical content. 'chemical' is populated here;
        // 'preventive' is the empty category for this disease (it has no other treatment).
        const groundnutPrev = getTreatmentsForCategory('disease-groundnut-tikka', 'preventive', 'en');
        expect(groundnutPrev.hasCuratedEntry).toBe(true);
        expect(groundnutPrev.isEmptyCategory).toBe(true);
        expect(groundnutPrev.treatments).toHaveLength(0);

        const groundnutChem = getTreatmentsForCategory('disease-groundnut-tikka', 'chemical', 'en');
        expect(groundnutChem.isEmptyCategory).toBe(false);
        expect(groundnutChem.treatments.length).toBeGreaterThan(0);
        // The suppression must still be explicit in the surfaced copy, not silently dropped.
        expect(groundnutChem.treatments.some((t) => /suppress/i.test(t.instruction))).toBe(true);

        // Sugarcane Red Rot has preventive sett treatment, but NO chemical standing spray
        const sugarcaneChem = getTreatmentsForCategory('disease-sugarcane-redrot', 'chemical', 'en');
        expect(sugarcaneChem.hasCuratedEntry).toBe(true);
        expect(sugarcaneChem.isEmptyCategory).toBe(true);
        expect(sugarcaneChem.treatments).toHaveLength(0);
      });

      it('safely distinguishes populated categories from empty categories', () => {
        // Rice Blast now populates all three categories: its Tricyclazole and Isoprothiolane
        // doses were confirmed against the CIBRC fungicide registry, so they are standalone
        // 'chemical' entries again rather than suppressed prose folded into the organic entry.
        const riceOrg = getTreatmentsForCategory('disease-rice-blast', 'organic', 'en');
        const riceChem = getTreatmentsForCategory('disease-rice-blast', 'chemical', 'en');
        const ricePrev = getTreatmentsForCategory('disease-rice-blast', 'preventive', 'en');

        expect(riceOrg.isEmptyCategory).toBe(false);
        expect(riceOrg.treatments.length).toBeGreaterThan(0);
        expect(riceChem.isEmptyCategory).toBe(false);
        expect(riceChem.treatments.length).toBeGreaterThan(0);
        expect(ricePrev.isEmptyCategory).toBe(false);
        expect(ricePrev.treatments.length).toBeGreaterThan(0);

        // The empty-category guarantee itself still has to hold somewhere, or this test stops
        // covering it. Zinc deficiency is the clearest case: it is non-pathogenic, so its
        // 'chemical' category is empty by design and must never fall back to mock treatments.
        const zincChem = getTreatmentsForCategory('disease-rice-zincdeficiency', 'chemical', 'en');
        expect(zincChem.hasCuratedEntry).toBe(true);
        expect(zincChem.isEmptyCategory).toBe(true);
        expect(zincChem.treatments).toHaveLength(0);
      });
    });

    describe('2. Absence of Commercial Trade Names', () => {
      it('prohibits commercial trade names across all curated treatment guidance', () => {
        const bannedBrands = [
          'ridomil',
          'ridomil mz',
          'bavistin',
          'dithane',
          'confidor',
          'coragen',
          'roundup',
          'polo',
          'beam',
          'score',
          'tilt',
          'amistar',
          'karate',
          'marshal',
          'regent',
          'furadan',
          'thimet',
          'nuvacron',
          'pectino-lure',
        ];

        for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
          // Check all treatment fields
          for (const t of disease.treatments) {
            const fieldsToCheck = [
              t.instruction_en,
              t.activeIngredient_en,
              t.safetyCaution_en,
              t.regulatoryNotice_en,
            ].filter(Boolean) as string[];

            for (const text of fieldsToCheck) {
              const lower = text.toLowerCase();
              for (const brand of bannedBrands) {
                // Word boundary check to avoid partial word match (e.g. 'score' in other contexts)
                const regex = new RegExp(`\\b${brand}\\b`, 'i');
                expect(
                  regex.test(lower),
                  `Found banned brand "${brand}" in disease ${disease.id} treatment ${t.id}: ${text}`
                ).toBe(false);
              }
            }
          }

          // Check prevention guidance
          for (const prev of disease.preventionGuidance) {
            const lower = prev.practice_en.toLowerCase();
            for (const brand of bannedBrands) {
              const regex = new RegExp(`\\b${brand}\\b`, 'i');
              expect(
                regex.test(lower),
                `Found banned brand "${brand}" in disease ${disease.id} prevention: ${prev.practice_en}`
              ).toBe(false);
            }
          }
        }
      });

      it('confirms turmeric chemical spray is suppressed and organic practice uses no commercial brand names', () => {
        const turmeric = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-turmeric-rhizomerot'];
        expect(turmeric).toBeDefined();
        const chem = turmeric.treatments.find((t) => t.category === 'chemical');
        expect(chem).toBeUndefined(); // Chemical spray suppressed pending primary CIBRC label validation
        const org = turmeric.treatments.find((t) => t.category === 'organic');
        expect(org).toBeDefined();
        expect(org?.instruction_en.toLowerCase()).not.toContain('ridomil');
      });
    });

    describe('3. Unsupported Conditions and Demonstration Isolation', () => {
      it('never exposes treatment instructions for unsupported crops or diseases in live mode', () => {
        const unsupportedDiseases = ['disease-wheat-rust', 'disease-apple-scab', 'unsupported-unknown-123', null, ''];
        for (const disId of unsupportedDiseases) {
          const res = getTreatmentsForCategory(disId, 'chemical', 'en', { isDemoSample: false });
          expect(res.hasCuratedEntry).toBe(false);
          expect(res.treatments).toHaveLength(0);
          expect(res.isEmptyCategory).toBe(true);
        }
      });

      it('demonstration mode is strictly labeled and separated from verified guidance', () => {
        const demoRes = getTreatmentsForCategory(null, 'chemical', 'en', { isDemoSample: true });
        expect(demoRes.isDemoSample).toBe(true);
        expect(demoRes.hasCuratedEntry).toBe(false);
      });
    });

    describe('4. Differential Lookalikes and Uncertainty Boundaries', () => {
      it('unverified and conflicting entries include supported lookalike comparisons or safe fallback notice', () => {
        const nonVerifiedIds = [
          'disease-maize-armyworm',
          'disease-sugarcane-redrot',
          'disease-tomato-earlyblight',
          'disease-mango-anthracnose',
          'disease-banana-panamawilt',
          'disease-turmeric-rhizomerot',
        ];

        for (const id of nonVerifiedIds) {
          const disease = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
          expect(['unverified', 'conflicting', 'provisional']).toContain(disease.evidenceStatus);
          expect(disease.similarConditions.length).toBeGreaterThanOrEqual(1);

          for (const lookalike of disease.similarConditions) {
            expect(lookalike.differentiatingFactors_en.trim().length).toBeGreaterThan(15);
            expect(lookalike.differentiatingFactors_te.trim().length).toBeGreaterThan(15);
          }
        }

        // Translation for entries whose differential diagnosis is under review
        expect(translate('differentialUnderReview', 'en')).toContain('under review');
        expect(translate('differentialUnderReview', 'te')).toContain('సమీక్షలో');
      });
    });

    describe('5. Pre-Harvest Intervals and Pesticide Safety', () => {
      it('every chemical treatment contains safety caution and regulatory notice', () => {
        const chemicalTreatments = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) =>
          d.treatments.filter((t) => t.category === 'chemical')
        );

        for (const t of chemicalTreatments) {
          expect(t.safetyCaution_en, `Missing safetyCaution_en in treatment ${t.id}`).toBeDefined();
          expect(t.safetyCaution_en!.trim().length).toBeGreaterThan(0);
          expect(t.safetyCaution_te, `Missing safetyCaution_te in treatment ${t.id}`).toBeDefined();
          expect(t.safetyCaution_te!.trim().length).toBeGreaterThan(0);

          expect(t.regulatoryNotice_en, `Missing regulatoryNotice_en in treatment ${t.id}`).toBeDefined();
          expect(t.regulatoryNotice_en!.trim().length).toBeGreaterThan(0);
          expect(t.regulatoryNotice_te, `Missing regulatoryNotice_te in treatment ${t.id}`).toBeDefined();
          expect(t.regulatoryNotice_te!.trim().length).toBeGreaterThan(0);
        }
      });

      it('does not invent or fabricate unverified numeric pre-harvest intervals', () => {
        const chemicalTreatments = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) =>
          d.treatments.filter((t) => t.category === 'chemical')
        );

        // Disallow fabricated numeric claims like "wait 7 days" or "PHI 14 days" without CIBRC label confirmation
        const fabricatedNumericPhiRegex = /\b(wait \d+ days?|phi:?\s*\d+\s*days?|\b\d+\s*days?\s*pre-harvest interval)\b/i;

        for (const t of chemicalTreatments) {
          expect(
            fabricatedNumericPhiRegex.test(t.instruction_en),
            `Instruction in ${t.id} contains fabricated numeric PHI: ${t.instruction_en}`
          ).toBe(false);

          // Must direct the farmer to the container label and local agricultural authorities
          const text = `${t.safetyCaution_en} ${t.regulatoryNotice_en}`.toLowerCase();
          const directsToLabel =
            text.includes('label') || text.includes('container') || text.includes('rbk') || text.includes('officer');
          expect(
            directsToLabel,
            `Chemical treatment ${t.id} must direct farmer to approved label or local authority`
          ).toBe(true);
        }
      });
    });

    describe('6. Pest versus Disease Distinction', () => {
      it('clearly categorizes insect pests from microbial pathogens in catalog metadata', () => {
        const cotton = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-cotton-bollworm'];
        const maize = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-maize-armyworm'];
        const rice = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-blast'];
        const chilli = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-chilli-leaf-curl'];

        expect(cotton.pathogenOrVector_en.toLowerCase()).toContain('insect pest');
        expect(cotton.pathogenOrVector_te).toContain('కీటకం');

        expect(maize.pathogenOrVector_en.toLowerCase()).toContain('pest');
        expect(maize.pathogenOrVector_te).toContain('కీటకం');

        expect(rice.pathogenOrVector_en.toLowerCase()).toContain('fungus');
        expect(rice.pathogenOrVector_te).toContain('శిలీంద్రం');

        expect(chilli.pathogenOrVector_en.toLowerCase()).toContain('virus');
        expect(chilli.pathogenOrVector_te).toContain('వైరస్');
      });
    });

    describe('7. Bilingual Consistency', () => {
      it('maintains non-empty, matching English and Telugu safety and status keys', () => {
        const safetyKeys: TranslationKey[] = [
          'noCategoryRecommendation',
          'differentialUnderReview',
          'pestOrganismLabel',
          'insectPest',
          'plantDisease',
          'viralDisease',
          'demoNotice',
          'regulatoryGuidanceLabel',
          'seePreventionPracticesAbove',
          'unsupportedTreatmentNotice',
        ];

        for (const key of safetyKeys) {
          const en = translate(key, 'en');
          const te = translate(key, 'te');
          expect(en).toBeTruthy();
          expect(en).not.toBe(key);
          expect(te).toBeTruthy();
          expect(te).not.toBe(key);
          expect(en).not.toBe(te);
        }
      });
    });

    describe('8. Phase 5.3 Evidence Substantiation & Agricultural Safety Ledger', () => {
      it('explicitly warns that chemicals do not cure viral infections in Chilli Leaf Curl', () => {
        const chilli = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-chilli-leaf-curl'];
        expect(chilli).toBeDefined();
        // A Phase 5.4 correction round folded the standalone (and mistagged 'preventive')
        // vector-management entry into Chilli's single organic entry (t-chilli-org-1) —
        // the suppressed insecticide dose is now discussed there instead of a separate
        // entry. The critical "virus cannot be cured by chemicals, vector-only" warning
        // this test guards must survive that merge unchanged, wherever it now lives.
        const chem = chilli.treatments.find((t) => t.id === 't-chilli-org-1');
        expect(chem).toBeDefined();
        const textEn = `${chem?.instruction_en} ${chem?.regulatoryNotice_en}`.toLowerCase();
        expect(textEn).toContain('cannot be cured');
        expect(textEn).toContain('vector');
      });

      it('classifies Banana Panama Wilt as conflicting and strictly suppresses chemical soil drenching', () => {
        const panama = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-banana-panamawilt'];
        expect(panama).toBeDefined();
        expect(panama.evidenceStatus).toBe('conflicting');
        const chemTreatments = panama.treatments.filter((t) => t.category === 'chemical');
        expect(chemTreatments).toHaveLength(0);
        // Prevention and treatments must emphasize quarantine and certified tissue culture suckers
        const prevText = panama.preventionGuidance.map((p) => p.practice_en.toLowerCase()).join(' ');
        expect(prevText).toContain('tissue culture');
        const treatmentNotice = panama.treatments.map((t) => (t.regulatoryNotice_en || '').toLowerCase()).join(' ');
        expect(treatmentNotice).toContain('quarantine');
      });

      it('strictly suppresses ACTIONABLE chemical treatments for all unverified catalog entries', () => {
        // Phase 5.4: Rice Blast, Chilli Leaf Curl, Cotton Pink Bollworm, and Groundnut Tikka
        // joined this list after their previously-actionable chemical doses were found
        // unconfirmable against a primary CIBRC label and suppressed. A later correction
        // round found that Rice/Chilli/Cotton's suppressed-chemical entries had been
        // mistagged 'preventive' (to force zero 'chemical'-category entries) and folded
        // them into each disease's existing organic entry instead; Groundnut Tikka, which
        // had no other entry to fold into, keeps its one treatment truthfully tagged
        // 'chemical' — so this test checks "no ACTIONABLE chemical treatment" (dose-level),
        // not "zero 'chemical'-category entries" (tag-level), which is the real invariant.
        //
        // MULTI-CONDITION EXPANSION UPDATE: Rice Blast has left this list. Its doses are now
        // confirmed against the CIBRC fungicide registry with a deep link and a cited table
        // row, so it legitimately carries standalone 'chemical' entries and its status moved
        // to 'provisional'. Every entry remaining in this list is still unverified and must
        // still suppress.
        const noStandaloneChemicalIds = [
          'disease-maize-armyworm',
          'disease-sugarcane-redrot',
          'disease-tomato-earlyblight',
          'disease-mango-anthracnose',
          'disease-turmeric-rhizomerot',
          'disease-chilli-leaf-curl',
          'disease-cotton-bollworm',
        ];

        for (const id of noStandaloneChemicalIds) {
          const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
          expect(d.evidenceStatus).toBe('unverified');
          const chem = d.treatments.filter((t) => t.category === 'chemical');
          expect(chem, `Unverified disease ${id} must not have a standalone 'chemical'-category treatment`).toHaveLength(
            0
          );
        }

        // Groundnut Tikka: the one exception, with a truthfully-tagged but non-actionable entry.
        const groundnut = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-tikka'];
        expect(groundnut.evidenceStatus).toBe('unverified');
        const groundnutChem = groundnut.treatments.filter((t) => t.category === 'chemical');
        expect(groundnutChem).toHaveLength(1);
        expect(
          groundnutChem.every((t) => /suppress/i.test(t.instruction_en)),
          'Groundnut Tikka chemical treatment must remain explicitly suppressed/non-actionable'
        ).toBe(true);

        // Oct 2026 market-research pass: 3 more diseases join Groundnut Tikka as truthfully-
        // tagged 'chemical' entries that remain non-actionable. 2 of them use the same
        // "suppressed" wording; Maize Turcicum Leaf Blight (sourced to a clean, single
        // ICAR-IIMR institutional dose rather than a conflicting/absent secondary figure)
        // instead uses "never... unconditionally actionable" / "reference point only" —
        // a deliberate different wording for the same non-actionable guarantee (see the
        // Phase 5.4-regression dose-suppression test above for the same distinction).
        //
        // Rice Sheath Blight is deliberately NOT in this list: the Rice expansion's own entry
        // for it carries CIBRC-registry-verified doses, so it is covered by the
        // document-verified branch of the catalog-wide invariant instead of the suppressed one.
        const suppressedWordingIds = ['disease-groundnut-rust', 'disease-cotton-whitefly'];
        for (const id of suppressedWordingIds) {
          const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
          expect(d.evidenceStatus).toBe('provisional');
          const chem = d.treatments.filter((t) => t.category === 'chemical');
          expect(chem, `${id} must have exactly one truthfully-tagged chemical entry`).toHaveLength(1);
          expect(
            chem.every((t) => /suppress/i.test(t.instruction_en)),
            `${id} chemical treatment must remain explicitly suppressed/non-actionable`
          ).toBe(true);
        }

        const maizeTurcicum = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-maize-turcicumblight'];
        expect(maizeTurcicum.evidenceStatus).toBe('provisional');
        const maizeTurcicumChem = maizeTurcicum.treatments.filter((t) => t.category === 'chemical');
        expect(maizeTurcicumChem).toHaveLength(1);
        expect(
          maizeTurcicumChem.every((t) => /unconditionally actionable/i.test(t.instruction_en)),
          'Maize Turcicum Leaf Blight chemical treatment must remain explicitly framed as non-actionable (reference-point wording)'
        ).toBe(true);
      });

      it('ensures formerly "verified" entries still include direct authoritative URLs and review dates', () => {
        // These 4 entries are no longer evidenceStatus 'verified_reference' (see Phase 5.4
        // evidence-verification pass above) — but they still carry multiple sources with
        // well-formed https URLs and review dates. This test only checks that structural
        // bar; it does NOT claim those sources are document-level verified (none are — see
        // the specificDocumentVerified regression test, which asserts that count is 0).
        const formerlyVerifiedIds = [
          'disease-rice-blast',
          'disease-chilli-leaf-curl',
          'disease-cotton-bollworm',
          'disease-groundnut-tikka',
        ];

        for (const id of formerlyVerifiedIds) {
          const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
          expect(d.sources.length).toBeGreaterThanOrEqual(2);
          for (const s of d.sources) {
            expect(s.url).toBeDefined();
            expect(s.url?.startsWith('https://')).toBe(true);
            expect(s.reviewDate).toBeDefined();
          }
        }
      });
    });
  });

  describe('Phase 5.4 fix: Chemical-tab cross-tab discoverability', () => {
    // Mirrors the exact rendering logic in src/screens/ResultScreen.tsx's Chemical tab:
    // 1. `displayTreatments` = getTreatmentsForCategory(diseaseId, 'chemical', language).treatments
    // 2. If that list is empty, an empty-category card shows the generic suppression notice,
    //    plus (new in this fix) a disease-specific `chemicalTabDetail_en/_te` paragraph when
    //    the disease defines one — additive, never a replacement for the generic notice.
    // 3. If that list is non-empty, the real treatment card(s) render directly instead.
    // There is no @testing-library / component-rendering harness wired into this project's
    // vitest setup (confirmed in earlier Phase 5.4 rounds), so — consistent with the existing
    // storage.test.ts `resolveUiState` precedent — this mirrors the actual data-flow logic
    // against the real catalog and service functions rather than rendering JSX.
    //
    // Phase 5.6B fix: `genericNoticeIsSuppressionVariant` previously also required
    // `disease.evidenceStatus !== 'verified_reference'`, mirroring the latent coupling found
    // in Phase 5.6A. ResultScreen.tsx no longer references evidenceStatus for this notice at
    // all (see the fix comment there) — it is now unconditionally true whenever the chemical
    // category is empty for a cataloged disease, so this mirror is updated to match.
    function resolveChemicalTabRender(diseaseId: string, language: 'en' | 'te') {
      const disease = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[diseaseId];
      const catResult = getTreatmentsForCategory(diseaseId, 'chemical', language);
      const detailText = language === 'en' ? disease.chemicalTabDetail_en : disease.chemicalTabDetail_te;
      const detailShown = catResult.isEmptyCategory && !!detailText;
      const genericNoticeIsSuppressionVariant = catResult.isEmptyCategory;
      return {
        isEmptyCategory: catResult.isEmptyCategory,
        genericNoticeIsSuppressionVariant,
        detailShown,
        detailText: detailShown ? detailText : undefined,
        realTreatments: catResult.treatments,
      };
    }

    // Rice Blast was dropped from these two lists when its doses became document-verified:
    // it now has standalone 'chemical' entries, so per chemicalTabDetail's own contract in
    // types.ts ("Omit entirely for any disease whose chemical content ... already has its own
    // 'chemical'-category entry") the field was removed from that entry as redundant. Chilli
    // and Cotton are unchanged and still rely on this cross-tab disclosure.
    it('exposes Chilli Leaf Curl and Cotton Pink Bollworm chemical-suppression detail on the Chemical tab', () => {
      for (const id of ['disease-chilli-leaf-curl', 'disease-cotton-bollworm']) {
        const en = resolveChemicalTabRender(id, 'en');
        expect(en.isEmptyCategory, `${id} should have no standalone 'chemical' entry`).toBe(true);
        expect(en.genericNoticeIsSuppressionVariant, `${id} must show the suppression-variant generic notice`).toBe(
          true
        );
        expect(en.detailShown, `${id} must surface disease-specific detail on the Chemical tab`).toBe(true);
        expect(en.detailText!.length).toBeGreaterThan(20);
        expect(/suppress/i.test(en.detailText!), `${id} detail must state suppression explicitly`).toBe(true);

        const te = resolveChemicalTabRender(id, 'te');
        expect(te.detailShown, `${id} must also surface Telugu detail`).toBe(true);
        expect(te.detailText).not.toBe(en.detailText);
        expect(te.detailText!.length).toBeGreaterThan(10);
      }
    });

    it("surfaces Chilli Leaf Curl's viral/vector distinction and mite-vs-whitefly mismatch warning specifically on the Chemical tab", () => {
      // This is the single most safety-relevant detail this fix restores: before it, a user
      // checking only the Chemical tab would never see this warning at all.
      const { detailText } = resolveChemicalTabRender('disease-chilli-leaf-curl', 'en');
      expect(detailText).toBeDefined();
      const lower = detailText!.toLowerCase();
      expect(lower).toContain('cannot be cured');
      expect(lower).toContain('vector');
      expect(lower).toContain('mite');
      expect(lower).toContain('whitefly');
      expect(lower).toContain('verify the target pest');

      const teDetail = resolveChemicalTabRender('disease-chilli-leaf-curl', 'te').detailText;
      expect(teDetail).toBeDefined();
      expect(teDetail).toContain('వైరస్'); // virus
      expect(teDetail).toContain('నల్లి'); // mite
      expect(teDetail).toContain('తెల్లదోమ'); // whitefly
    });

    it('keeps organic guidance fully available on the Organic tab for all three merged diseases', () => {
      for (const id of ['disease-rice-blast', 'disease-chilli-leaf-curl', 'disease-cotton-bollworm']) {
        const org = getTreatmentsForCategory(id, 'organic', 'en');
        expect(org.isEmptyCategory, `${id} Organic tab must remain populated`).toBe(false);
        expect(org.treatments.length).toBeGreaterThan(0);
        expect(org.treatments[0].instruction.length).toBeGreaterThan(0);
      }
    });

    it("leaves Groundnut Tikka's Chemical tab exactly as it was (real entry, no generic notice, no redundant detail)", () => {
      const result = resolveChemicalTabRender('disease-groundnut-tikka', 'en');
      expect(result.isEmptyCategory).toBe(false);
      expect(result.detailShown).toBe(false); // no detail field defined, and none needed
      expect(result.realTreatments).toHaveLength(1);
      expect(result.realTreatments[0].id).toBe('t-groundnut-chem-1');
      expect(/suppress/i.test(result.realTreatments[0].instruction)).toBe(true);

      // Groundnut never defines chemicalTabDetail — it would be redundant/dead data since
      // its Chemical tab already renders the real, specific entry directly.
      const groundnut = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-tikka'];
      expect(groundnut.chemicalTabDetail_en).toBeUndefined();
      expect(groundnut.chemicalTabDetail_te).toBeUndefined();
    });

    it('never exposes an actionable dose through chemicalTabDetail, for any disease that defines one', () => {
      const dosePattern = /@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|pit)|\b\d+(\.\d+)?%\s/i;
      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        if (!disease.chemicalTabDetail_en) continue;
        if (dosePattern.test(disease.chemicalTabDetail_en)) {
          expect(
            /suppress/i.test(disease.chemicalTabDetail_en),
            `${disease.id} chemicalTabDetail_en gives a dosed figure without suppression language`
          ).toBe(true);
        }
        // Must never claim a primary label was actually verified.
        expect(/verified against a primary|confirmed by cibrc/i.test(disease.chemicalTabDetail_en)).toBe(false);
      }
    });

    it('never lets the disease-specific detail contradict the generic suppression notice', () => {
      // The detail paragraph only ever renders inside the SAME branch that shows the generic
      // notice (isEmptyCategory === true) — and since Phase 5.6B, that notice is unconditionally
      // the suppression variant whenever the chemical category is empty, independent of
      // evidenceStatus — so the two can never disagree about whether chemical info is
      // suppressed here.
      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        if (!disease.chemicalTabDetail_en) continue;
        const { isEmptyCategory, genericNoticeIsSuppressionVariant, detailShown } = resolveChemicalTabRender(
          disease.id,
          'en'
        );
        expect(isEmptyCategory, `${disease.id} must have an empty 'chemical' category for its detail to apply`).toBe(
          true
        );
        expect(
          genericNoticeIsSuppressionVariant,
          `${disease.id} generic notice must be the suppression variant whenever detail is shown`
        ).toBe(true);
        expect(detailShown).toBe(true);
      }
    });

    // --------------------------------------------------------------------------
    // Statutory safety-box coverage (src/screens/ResultScreen.tsx lines ~948-949):
    //   {activeTab === 'chemical' &&
    //     (displayTreatments.length > 0 || hasChemicalTabDetail(diseaseKnowledge, language)) && (
    //       <div className="statutory-safety-box">...
    // `hasChemicalTabDetail` is imported directly from src/lib/knowledge (the same function
    // the component calls — not a re-implementation), and `displayTreatments.length` is
    // exactly `getTreatmentsForCategory(diseaseId, 'chemical', language).treatments.length`
    // (verified equivalent to the component's inline filter earlier in this file). This
    // helper is therefore the real production predicate, evaluated with real inputs — a
    // data-flow/predicate test, not a rendered-DOM test: no component-rendering harness
    // (e.g. @testing-library) is wired into this project, so no claim is made here that the
    // box was visually rendered or browser-tested.
    function shouldShowChemicalStatutoryBox(diseaseId: string, language: 'en' | 'te'): boolean {
      const disease = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[diseaseId];
      const treatmentsCount = getTreatmentsForCategory(diseaseId, 'chemical', language).treatments.length;
      return treatmentsCount > 0 || hasChemicalTabDetail(disease, language);
    }

    it('hasChemicalTabDetail: true only for a non-empty detail string in the requested language', () => {
      expect(hasChemicalTabDetail({ chemicalTabDetail_en: 'x' }, 'en')).toBe(true);
      expect(hasChemicalTabDetail({ chemicalTabDetail_en: 'x' }, 'te')).toBe(false); // wrong language
      expect(hasChemicalTabDetail({ chemicalTabDetail_en: '' }, 'en')).toBe(false); // empty string
      expect(hasChemicalTabDetail({}, 'en')).toBe(false); // field absent
      expect(hasChemicalTabDetail(null, 'en')).toBe(false); // no disease at all
      expect(hasChemicalTabDetail(undefined, 'en')).toBe(false);
    });

    it('shows the statutory safety box for Chilli Leaf Curl and Cotton Pink Bollworm via the chemicalTabDetail branch, despite zero Chemical-tab treatment entries', () => {
      for (const id of ['disease-chilli-leaf-curl', 'disease-cotton-bollworm']) {
        const treatmentsCount = getTreatmentsForCategory(id, 'chemical', 'en').treatments.length;
        expect(treatmentsCount, `${id} must have zero 'chemical' treatment entries`).toBe(0);
        expect(hasChemicalTabDetail(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id], 'en')).toBe(true);
        expect(
          shouldShowChemicalStatutoryBox(id, 'en'),
          `${id} statutory safety box must render via the chemicalTabDetail branch`
        ).toBe(true);
        // Telugu reaches the same outcome through the same branch.
        expect(shouldShowChemicalStatutoryBox(id, 'te')).toBe(true);
      }
    });

    it('shows the statutory safety box for Groundnut Tikka via the real treatment-entry branch, not the detail branch', () => {
      const id = 'disease-groundnut-tikka';
      const treatmentsCount = getTreatmentsForCategory(id, 'chemical', 'en').treatments.length;
      expect(treatmentsCount, `${id} must have a real 'chemical' treatment entry`).toBeGreaterThan(0);
      expect(
        hasChemicalTabDetail(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id], 'en'),
        `${id} must NOT define chemicalTabDetail — it would be redundant with its real entry`
      ).toBe(false);
      expect(
        shouldShowChemicalStatutoryBox(id, 'en'),
        `${id} statutory safety box must still render, via displayTreatments.length > 0`
      ).toBe(true);
    });

    it('does NOT show the statutory safety box for a disease with neither a Chemical-tab treatment entry nor chemicalTabDetail (negative control)', () => {
      // Maize Fall Armyworm: its sole treatment is 'organic' with no chemicalTabDetail
      // defined — neither branch of the OR-condition is satisfied.
      const id = 'disease-maize-armyworm';
      const treatmentsCount = getTreatmentsForCategory(id, 'chemical', 'en').treatments.length;
      expect(treatmentsCount).toBe(0);
      expect(hasChemicalTabDetail(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id], 'en')).toBe(false);
      expect(shouldShowChemicalStatutoryBox(id, 'en')).toBe(false);
      expect(shouldShowChemicalStatutoryBox(id, 'te')).toBe(false);
    });
  });

  describe('Phase 5.5A fix: Rice Blast prevention-guidance chemical-dose suppression', () => {
    // src/screens/ResultScreen.tsx renders ONLY `prev.practice_en`/`prev.practice_te` (and
    // optional `targetTiming`) for each preventionGuidance[] step — PreventionStep has no
    // separate safetyCaution/regulatoryNotice field (see src/lib/knowledge/types.ts). So the
    // suppression disclosure for this step must live inside practice_en/_te itself to ever
    // reach the user; these tests check the actual rendered field.
    const riceBlast = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-blast'];
    const seedStep = riceBlast.preventionGuidance.find((p) => p.stepNumber === 1)!;

    it('no longer presents an actionable Carbendazim dose for rice seed treatment', () => {
      // The specific dosed instruction ("Carbendazim 50% WP @ 2g/kg seed") must be gone;
      // any remaining mention of Carbendazim must be paired with suppression language.
      expect(seedStep.practice_en).not.toContain('Carbendazim 50% WP @ 2g/kg seed');
      expect(seedStep.practice_te).not.toContain('2 గ్రాముల కార్బెండజిమ్ కలిపి');
      if (/carbendazim/i.test(seedStep.practice_en)) {
        expect(/suppress/i.test(seedStep.practice_en)).toBe(true);
      }
    });

    it('carries the suppression safety disclosure in both English and Telugu', () => {
      const en = seedStep.practice_en.toLowerCase();
      expect(en).toContain('suppress');
      expect(en).toContain('not been verified');
      expect(en).toContain('rbk');
      const te = seedStep.practice_te;
      expect(te).toContain('నిలిపివేయబడింది'); // "is suppressed"
      expect(te).toContain('ధృవీకరించబడలేదు'); // "has not been verified"
      expect(te).toContain('RBK');
    });

    it('does not claim Carbendazim is illegal, ineffective, or universally unsafe — only unverified here', () => {
      const en = seedStep.practice_en.toLowerCase();
      expect(en).not.toMatch(/illegal|banned|ineffective|unsafe|dangerous/);
    });

    it('keeps the supported non-chemical Trichoderma seed-treatment instruction actionable', () => {
      expect(seedStep.practice_en).toContain('Trichoderma asperellum @ 10g/kg seed');
      expect(seedStep.targetTiming).toBe('Pre-sowing');
    });

    it('leaves the other two Rice Blast prevention steps (fertilizer timing, irrigation/weed hygiene) untouched and present', () => {
      expect(riceBlast.preventionGuidance).toHaveLength(3);
      const fertilizerStep = riceBlast.preventionGuidance.find((p) => p.stepNumber === 2)!;
      const hygieneStep = riceBlast.preventionGuidance.find((p) => p.stepNumber === 3)!;
      expect(fertilizerStep.practice_en).toContain('3 split doses');
      expect(hygieneStep.practice_en).toContain('irrigation channels');
      // Neither contains a specific pesticide product/dose that would need the same treatment —
      // split nitrogen timing and bund hygiene are general cultural practices, not pesticide
      // doses requiring label verification.
      expect(/@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|seed)/i.test(fertilizerStep.practice_en)).toBe(false);
      expect(/@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|seed)/i.test(hygieneStep.practice_en)).toBe(false);
    });

    it('does not disturb any other Rice Blast evidence/suppression safeguard already in place', () => {
      // Rice Blast's chemical doses have since been confirmed against the CIBRC fungicide
      // registry, so it now carries standalone 'chemical' entries, sits at 'provisional', and
      // no longer needs the chemicalTabDetail cross-tab disclosure. What this test exists to
      // protect is narrower and unchanged: the PREVENTION guidance must still not smuggle an
      // actionable dose into practice_en/_te, which ResultScreen renders with no safety or
      // regulatory field alongside it.
      expect(riceBlast.evidenceStatus).toBe('provisional');
      expect(riceBlast.treatments.filter((t) => t.category === 'chemical').length).toBeGreaterThan(0);

      // Every dose that is now shown must be attributed to the verified registry, and the
      // prevention steps must still carry none.
      expect(riceBlast.sources.some(isSourceDocumentVerified)).toBe(true);
      const dosePattern = /@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|pit)|\b\d+(\.\d+)?%\s/i;
      for (const step of riceBlast.preventionGuidance) {
        expect(
          dosePattern.test(step.practice_en) && !/suppress/i.test(step.practice_en),
          `Rice Blast prevention step ${step.stepNumber} must not carry an unsuppressed dose`
        ).toBe(false);
      }
    });
  });

  describe('Phase 5.5C fix: Groundnut Tikka prevention-guidance chemical-dose suppression', () => {
    // Same gap class as Phase 5.5A (Rice Blast): ResultScreen.tsx renders only
    // prev.practice_en/_te (and optional targetTiming) for each preventionGuidance[] step —
    // there is no separate safetyCaution/regulatoryNotice field on PreventionStep — so the
    // suppression disclosure must live inside practice_en/_te itself to ever reach the user.
    const groundnutTikka = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-tikka'];
    const seedStep = groundnutTikka.preventionGuidance.find((p) => p.stepNumber === 2)!;

    it('is the intended seed-treatment step', () => {
      expect(seedStep).toBeDefined();
      expect(seedStep.targetTiming).toBe('Pre-sowing');
    });

    it('no longer presents an actionable Mancozeb dose for groundnut seed treatment', () => {
      expect(seedStep.practice_en).not.toContain('Mancozeb 75% WP @ 3g/kg seed');
      expect(seedStep.practice_te).not.toContain('3 గ్రాముల మాంకోజెబ్ లేదా');
      if (/mancozeb/i.test(seedStep.practice_en)) {
        expect(/suppress/i.test(seedStep.practice_en)).toBe(true);
      }
    });

    it('carries the suppression safety disclosure in both English and Telugu', () => {
      const en = seedStep.practice_en.toLowerCase();
      expect(en).toContain('suppress');
      expect(en).toContain('not been verified');
      expect(en).toContain('rbk');
      const te = seedStep.practice_te;
      expect(te).toContain('నిలిపివేయబడింది'); // "is suppressed"
      expect(te).toContain('ధృవీకరించబడలేదు'); // "has not been verified"
      expect(te).toContain('RBK');
    });

    it('does not claim Mancozeb is illegal, ineffective, or universally unsafe — only unverified here', () => {
      const en = seedStep.practice_en.toLowerCase();
      expect(en).not.toMatch(/illegal|banned|ineffective|unsafe|dangerous/);
    });

    it('keeps the supported non-chemical Trichoderma seed-treatment instruction actionable at its existing rate', () => {
      expect(seedStep.practice_en).toContain('Trichoderma viride @ 10g/kg seed');
      expect(seedStep.practice_te).toContain('10 గ్రాముల ట్రైకోడెర్మా');
    });

    it('leaves the other Groundnut Tikka prevention step (crop rotation) and catalog-wide invariants untouched', () => {
      expect(groundnutTikka.preventionGuidance).toHaveLength(2);
      const rotationStep = groundnutTikka.preventionGuidance.find((p) => p.stepNumber === 1)!;
      expect(rotationStep.practice_en).toContain('crop rotation');
      expect(/@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|seed)/i.test(rotationStep.practice_en)).toBe(false);

      expect(groundnutTikka.evidenceStatus).toBe('unverified');
      expect(groundnutTikka.treatments.filter((t) => t.category === 'chemical')).toHaveLength(1);

      // Rice Blast's Phase 5.5A fix must be unaffected by this change.
      const riceBlastCheck = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-blast'];
      expect(riceBlastCheck.preventionGuidance.find((p) => p.stepNumber === 1)!.practice_en).toContain(
        'Trichoderma asperellum @ 10g/kg seed'
      );
    });
  });

  describe('Phase 5.6B fix: Chemical safety disclosure independence from evidenceStatus', () => {
    // Phase 5.6A identified a latent coupling in src/screens/ResultScreen.tsx: the Chemical
    // tab's empty-category safety notice used to require
    // `diseaseKnowledge.evidenceStatus !== 'verified_reference'` in addition to the category
    // being empty. `evidenceStatus` is disease-wide (symptoms, lookalikes, prevention, and
    // treatments all share one value) and this catalog has no chemical-dose-specific
    // verification flag, so a disease reaching 'verified_reference' for its diagnostic content
    // alone could, in principle, have silently swapped this safety message for the generic
    // "nothing cataloged" text even though its chemical dose was never confirmed.
    //
    // The fix removes the evidenceStatus clause entirely: the notice is now unconditionally
    // the suppression variant whenever a cataloged disease has no 'chemical'-category
    // treatment entry. This function reproduces that exact (now one-clause) production
    // expression literally, since no @testing-library / component-rendering harness is wired
    // into this project (confirmed in every prior phase) — this is a data-flow/predicate test
    // against the real expression's logical shape, not a rendered-DOM test, and no claim is
    // made that the fix was visually or browser-verified.
    function resolveChemicalEmptyCategoryNotice(
      activeTabIsChemical: boolean,
      hasDiseaseEntry: boolean
    ): 'suppressedChemicalNotice' | 'noCategoryRecommendation' {
      return activeTabIsChemical && hasDiseaseEntry ? 'suppressedChemicalNotice' : 'noCategoryRecommendation';
    }

    it('cannot be bypassed by a disease-level verified_reference status (the latent-coupling scenario)', () => {
      // No real catalog entry currently claims 'verified_reference' (see 'Evidence Status
      // Differentiation' above — the invariant is 0). This test does not fabricate one in the
      // catalog; it simply proves that the FIXED expression no longer branches on
      // evidenceStatus at all, so even the hypothetical that would have defeated the OLD
      // condition (`evidenceStatus === 'verified_reference'` on a disease with an empty
      // chemical category) cannot suppress the safety notice under the new logic.
      expect(resolveChemicalEmptyCategoryNotice(true, true)).toBe('suppressedChemicalNotice');
    });

    it('preserves current behavior for all non-verified entries with an empty chemical category', () => {
      // The Oct 2026 market-research pass added 'provisional' diseases (e.g. Chilli Thrips,
      // Turmeric Leaf Spot) that also have an empty chemical category — 'provisional' joins
      // 'unverified'/'conflicting' as an acceptable non-verified status here; this still
      // excludes only 'verified_reference' (zero entries catalog-wide, see above).
      for (const disease of Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases)) {
        const chemCount = getTreatmentsForCategory(disease.id, 'chemical', 'en').treatments.length;
        if (chemCount > 0) continue; // Groundnut Tikka et al. — real entry renders instead, unaffected
        expect(
          ['unverified', 'conflicting', 'provisional'].includes(disease.evidenceStatus),
          `${disease.id} expected to be unverified/conflicting/provisional, found ${disease.evidenceStatus}`
        ).toBe(true);
        expect(resolveChemicalEmptyCategoryNotice(true, true)).toBe('suppressedChemicalNotice');
      }
    });

    it('still surfaces the remaining disease-specific chemicalTabDetail disclosures (Chilli, Cotton) alongside the notice', () => {
      for (const id of ['disease-chilli-leaf-curl', 'disease-cotton-bollworm']) {
        const disease = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(getTreatmentsForCategory(id, 'chemical', 'en').treatments).toHaveLength(0);
        expect(resolveChemicalEmptyCategoryNotice(true, true)).toBe('suppressedChemicalNotice');
        expect(hasChemicalTabDetail(disease, 'en')).toBe(true);
        expect(hasChemicalTabDetail(disease, 'te')).toBe(true);
      }
    });

    it('is not gated on language — English and Telugu reach the same notice decision', () => {
      // The fixed expression never inspects `language` at all (only evidenceStatus was
      // removed), so this is a direct equivalence check rather than a duplicated branch.
      expect(resolveChemicalEmptyCategoryNotice(true, true)).toBe(
        resolveChemicalEmptyCategoryNotice(true, true)
      );
      for (const id of ['disease-chilli-leaf-curl', 'disease-cotton-bollworm']) {
        const disease = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(hasChemicalTabDetail(disease, 'en')).toBe(hasChemicalTabDetail(disease, 'te'));
      }
    });

    it('does not make any treatment dose or recommendation accidentally actionable', () => {
      // This fix only changes which TEXT STRING is chosen for an already-empty category — it
      // cannot add, alter, or un-suppress any treatment entry or dose. Re-assert the
      // catalog-wide invariants from Phase 5.4/5.5A/5.5C/5.6A are unchanged.
      //
      // MULTI-CONDITION EXPANSION UPDATE: the three absolute counts here (1 chemical
      // treatment, 0 verified sources) were snapshots of the catalog at the time, not
      // properties of this fix. Restated as the invariant they were standing in for: a
      // chemical treatment must either suppress its dose or be backed by a document-verified
      // source on its own entry. No entry claims 'verified_reference' on the strength of a
      // dose alone, which is still asserted.
      const allDiseases = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases);
      expect(allDiseases.filter((d) => d.evidenceStatus === 'verified_reference')).toHaveLength(0);
      const chemicalTreatments = allDiseases.flatMap((d) =>
        d.treatments.filter((t) => t.category === 'chemical').map((t) => ({ disease: d, t }))
      );
      expect(chemicalTreatments.length).toBeGreaterThan(0);
      for (const { disease, t } of chemicalTreatments) {
        const suppressed = /suppress/i.test(t.instruction_en) || /suppress/i.test(t.regulatoryNotice_en || '');
        const documentBacked = disease.sources.some(isSourceDocumentVerified);
        // Third valid state, added with Maize Turcicum Leaf Blight in the Oct 2026 pass: a dose
        // from a clean single institutional source (ICAR-IIMR) that is neither registry-verified
        // nor hidden, but shown with explicit "never unconditionally actionable / reference point
        // only" framing plus a claim-level evidence note. The safety guarantee is the same —
        // nothing here is usable without RBK/VAA confirmation.
        const referencePointOnly =
          /unconditionally actionable/i.test(t.instruction_en) ||
          /unconditionally actionable/i.test(t.regulatoryNotice_en || '');
        expect(
          suppressed || documentBacked || referencePointOnly,
          `${disease.id} treatment ${t.id} is not dose-suppressed, not backed by a document-verified source, and not framed as reference-point-only`
        ).toBe(true);
      }
    });
  });

  describe('Claim-level evidence architecture (ClaimEvidenceNote / getClaimEvidenceNote)', () => {
    // Closes the gap identified across Phase 5.6A-5.6C: a disease-wide evidenceStatus and a
    // generic sources[] list cannot distinguish "this one specific numeric claim has
    // claim-specific support" from "nothing on this entry has been checked that closely".
    // getClaimEvidenceNote is the single lookup both ResultScreen.tsx and these tests call —
    // mirroring the claimId construction the component actually uses
    // (`${step.id}-safety-caution`, `${disease.id}-escalation-threshold`) rather than
    // re-implementing the check separately, so the test can't drift from the real UI.
    const groundnut = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-tikka'];
    const banana = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-banana-panamawilt'];

    it('finds the Groundnut Tikka spray-volume note via the exact claimId the UI constructs', () => {
      const note = getClaimEvidenceNote(groundnut, 't-groundnut-chem-1-safety-caution');
      expect(note).toBeDefined();
      expect(note!.verificationStatus).toBe('unsupported');
      expect(note!.limitation_en.length).toBeGreaterThan(20);
      expect(note!.limitation_te.length).toBeGreaterThan(10);
    });

    it('finds the Banana Panama Wilt lime-quantity note via the exact claimId the UI constructs', () => {
      const note = getClaimEvidenceNote(banana, `${banana.id}-escalation-threshold`);
      expect(note).toBeDefined();
      expect(note!.verificationStatus).toBe('unsupported');
      expect(note!.limitation_en.length).toBeGreaterThan(20);
      expect(note!.limitation_te.length).toBeGreaterThan(10);
    });

    it('carries the RBK/officer referral in both English and Telugu for both notes (EN/TE parity)', () => {
      for (const [disease, claimId] of [
        [groundnut, 't-groundnut-chem-1-safety-caution'],
        [banana, `${banana.id}-escalation-threshold`],
      ] as const) {
        const note = getClaimEvidenceNote(disease, claimId)!;
        expect(note.limitation_en.toLowerCase()).toContain('rbk');
        expect(note.limitation_te).toContain('RBK');
        // Neither language claims the figure IS verified/confirmed — only that it is not.
        expect(note.limitation_en.toLowerCase()).not.toMatch(/\bis confirmed\b|\bis verified\b/);
      }
    });

    it('preserves the underlying guidance text — this is a qualification, not a suppression', () => {
      // Phase 5.6C explicitly recommended "add a clear evidence limitation", not suppress,
      // for these two claims (unlike the Phase 5.5A/5.5C Carbendazim/Mancozeb seed-treatment
      // doses, which were suppressed). The original figures must still be present verbatim.
      const groundnutTreatment = groundnut.treatments.find((t) => t.id === 't-groundnut-chem-1')!;
      expect(groundnutTreatment.safetyCaution_en).toContain('200 L/acre');
      expect(groundnutTreatment.safetyCaution_te).toContain('200 లీటర్ల');
      expect(banana.escalationThreshold_en).toContain('1-2 kg agricultural lime per pit');
      expect(banana.escalationThreshold_te).toContain('1-2 కిలోల సున్నం');
    });

    it('is never auto-created or auto-upgraded by the disease-wide evidenceStatus or sources[]', () => {
      // Both diseases are 'unverified'/'conflicting' overall (same as most of the catalog) —
      // the claim note's own 'unsupported' status is a separate, explicitly-set value, not
      // derived from evidenceStatus. A disease with the SAME evidenceStatus but no claimEvidence
      // array (e.g. Rice Blast, also 'unverified') must resolve to no note at all.
      expect(groundnut.evidenceStatus).toBe('unverified');
      expect(banana.evidenceStatus).toBe('conflicting');
      // Rice Blast is now 'provisional' and carries no claimEvidence of its own, which makes
      // the same point from the other direction: a different disease-wide status still
      // produces no note, so the note is never derived from the status.
      const riceBlast = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-blast'];
      expect(riceBlast.evidenceStatus).toBe('provisional');
      expect(getClaimEvidenceNote(riceBlast, 't-groundnut-chem-1-safety-caution')).toBeUndefined();
      expect(riceBlast.claimEvidence).toBeUndefined();

      // And a claim note does not drag its parent entry's status upward: Rice BLB defines a
      // 'verified' claim note yet its entry stays 'provisional'.
      const riceBlb = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-blb'];
      expect(riceBlb.claimEvidence?.some((n) => n.verificationStatus === 'verified')).toBe(true);
      expect(riceBlb.evidenceStatus).toBe('provisional');
    });

    it('returns undefined for an unknown claimId, a disease with no claimEvidence, or a null/undefined disease', () => {
      expect(getClaimEvidenceNote(groundnut, 'not-a-real-claim-id')).toBeUndefined();
      expect(getClaimEvidenceNote(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-maize-armyworm'], 'anything')).toBeUndefined();
      expect(getClaimEvidenceNote(null, 't-groundnut-chem-1-safety-caution')).toBeUndefined();
      expect(getClaimEvidenceNote(undefined, 't-groundnut-chem-1-safety-caution')).toBeUndefined();
    });

    it('is defined only by the entries that explicitly opt into it', () => {
      const withClaimEvidence = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).filter(
        (d) => d.claimEvidence && d.claimEvidence.length > 0
      );
      // The Rice expansion added two more opt-ins: Bacterial Leaf Blight (two 'verified'
      // notes pinning its copper and streptocycline figures to the CIBRC registry rows) and
      // Zinc Deficiency (one 'unsupported' note recording that no zinc sulphate rate could be
      // sourced, since a fertiliser is outside the CIBRC pesticide registries entirely).
      // The Oct 2026 market-research pass added one more: Maize Turcicum Leaf Blight, whose
      // note records why its ICAR-IIMR dose is 'provisional' rather than verified.
      expect(withClaimEvidence.map((d) => d.id).sort()).toEqual(
        [
          'disease-banana-panamawilt',
          'disease-groundnut-tikka',
          'disease-maize-turcicumblight',
          'disease-rice-blb',
          'disease-rice-zincdeficiency',
        ].sort()
      );

      // Opting in must mean something: every note needs a status and bilingual limitation
      // text, and a note claiming 'verified' must name the locator that justifies it.
      for (const d of withClaimEvidence) {
        for (const note of d.claimEvidence!) {
          expect(note.claimId.trim().length, `${d.id} note has an empty claimId`).toBeGreaterThan(0);
          expect(note.limitation_en.trim().length).toBeGreaterThan(0);
          expect(note.limitation_te.trim().length).toBeGreaterThan(0);
          if (note.verificationStatus === 'verified') {
            expect(
              note.locator && note.locator.trim().length > 0,
              `${d.id} claim ${note.claimId} is marked verified but names no locator`
            ).toBe(true);
          }
        }
      }
    });

    it('finds the Maize Turcicum Leaf Blight dose claim note and the Groundnut Tikka NSKE reduction-figure note', () => {
      const maize = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-maize-turcicumblight'];
      const note = getClaimEvidenceNote(maize, 't-maize-turcicum-chem-1-dose');
      expect(note).toBeDefined();
      expect(note!.verificationStatus).toBe('provisional');
      expect(note!.locator).toBeDefined();
      expect(note!.limitation_en.length).toBeGreaterThan(20);
      expect(note!.limitation_te.length).toBeGreaterThan(10);

      const groundnutNskeNote = getClaimEvidenceNote(groundnut, 't-groundnut-tikka-org-nske-1-reduction-figure');
      expect(groundnutNskeNote).toBeDefined();
      expect(groundnutNskeNote!.verificationStatus).toBe('provisional');
      expect(groundnutNskeNote!.limitation_en.toLowerCase()).toContain('rajasthan');
    });
  });

  describe('Oct 2026 market-research expansion pass: new non-Rice disease entries + geographicScope', () => {
    // This pass originally drafted six entries. Rice Sheath Blight was one of them, but the
    // concurrent Rice expansion landed its own, richer Sheath Blight entry (severity bands,
    // guided diagnostic questions, CIBRC-registry-verified doses) on main first. Rather than
    // keep a weaker duplicate, that entry was dropped and its one genuinely additive piece of
    // evidence — the AP-specific Nellore/Chittoor severity survey — was folded into the Rice
    // entry instead, asserted separately below.
    const newDiseaseIds = [
      'disease-groundnut-rust',
      'disease-chilli-thrips',
      'disease-cotton-whitefly',
      'disease-turmeric-leafspot',
      'disease-maize-turcicumblight',
    ];

    it('adds five new non-Rice diseases, each with a valid crop foreign key and complete bilingual metadata', () => {
      const expectedCropIds: Record<string, string> = {
        'disease-groundnut-rust': 'crop-groundnut',
        'disease-chilli-thrips': 'crop-chilli',
        'disease-cotton-whitefly': 'crop-cotton',
        'disease-turmeric-leafspot': 'crop-turmeric',
        'disease-maize-turcicumblight': 'crop-maize',
      };

      for (const id of newDiseaseIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(d, `Missing disease: ${id}`).toBeDefined();
        expect(d.cropId).toBe(expectedCropIds[id]);
        expect(d.name_en.trim().length).toBeGreaterThan(0);
        expect(d.name_te.trim().length).toBeGreaterThan(0);
        expect(d.observableSymptoms_en.length).toBeGreaterThan(0);
        expect(d.observableSymptoms_te.length).toBeGreaterThan(0);
        expect(d.similarConditions.length).toBeGreaterThanOrEqual(2);
        for (const lookalike of d.similarConditions) {
          expect(lookalike.differentiatingFactors_en.trim().length).toBeGreaterThan(15);
          expect(lookalike.differentiatingFactors_te.trim().length).toBeGreaterThan(15);
        }
        expect(d.sources.length).toBeGreaterThan(0);
        expect(d.escalationThreshold_en.trim().length).toBeGreaterThan(0);
        expect(d.escalationThreshold_te.trim().length).toBeGreaterThan(0);
      }

      // Each new ID is referenced from its crop's commonDiseaseIds.
      for (const [diseaseId, cropId] of Object.entries(expectedCropIds)) {
        expect(AGRICULTURAL_KNOWLEDGE_CATALOG.crops[cropId].commonDiseaseIds).toContain(diseaseId);
      }
    });

    it('gives 4 of the 5 new entries evidenceStatus "provisional" (AP-specific survey/trial data found) and Turmeric Leaf Spot "unverified" (no AP-specific source found)', () => {
      const provisionalIds = newDiseaseIds.filter((id) => id !== 'disease-turmeric-leafspot');
      for (const id of provisionalIds) {
        expect(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id].evidenceStatus, id).toBe('provisional');
      }
      expect(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-turmeric-leafspot'].evidenceStatus).toBe('unverified');
    });

    it('never misattributes the existing Rhizome Rot 32.22% Guntur figure to the new, separate Turmeric Leaf Spot entry', () => {
      // Guntur itself legitimately appears (ANGRAU's general sourcing address, and it's one of
      // this crop's apMajorDistricts) — what must never appear is the specific 32.22% figure,
      // which belongs to the existing Rhizome Rot entry, not this new Leaf Spot entry.
      const leafSpot = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-turmeric-leafspot'];
      const allText = JSON.stringify(leafSpot).toLowerCase();
      expect(allText).not.toContain('32.22');
    });

    it('marks at least one source per AP-specific new entry with geographicScope "ap_specific"', () => {
      const apSpecificIds = ['disease-groundnut-rust', 'disease-chilli-thrips', 'disease-cotton-whitefly'];
      for (const id of apSpecificIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(
          d.sources.some((s) => s.geographicScope === 'ap_specific'),
          `${id} should cite at least one ap_specific source`
        ).toBe(true);
      }

      // The AP-specific sheath blight severity survey survived the de-duplication against the
      // Rice expansion's own entry: the duplicate entry was dropped, this source was not.
      const sheathBlight = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-rice-sheathblight'];
      const foldedSource = sheathBlight.sources.find((s) => s.geographicScope === 'ap_specific');
      expect(foldedSource, 'Rice Sheath Blight must retain the folded-in AP severity survey').toBeDefined();
      expect(foldedSource!.url).toContain('sasapjas.org');

      // The Groundnut Rust multi-state ICRISAT source is honestly scoped as other_state, not
      // silently folded into ap_specific just because the disease overall has AP evidence too.
      const rust = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-rust'];
      expect(rust.sources.some((s) => s.geographicScope === 'other_state')).toBe(true);

      // The Rajasthan NSKE trial added to the existing Groundnut Tikka entry is honestly
      // scoped as other_state (it is real evidence, but not from Andhra Pradesh).
      const tikka = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases['disease-groundnut-tikka'];
      expect(tikka.sources.some((s) => s.geographicScope === 'other_state')).toBe(true);
    });

    it('never claims an unconditionally actionable chemical dose for any of the new entries (same catalog-wide rule as all other entries)', () => {
      const dosePattern = /@\s*[\d.]+\s*(g|ml|kg|l)\s*\/\s*(l|kg|acre|pit)|\b\d+(\.\d+)?%\s/i;
      for (const id of newDiseaseIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        for (const t of d.treatments) {
          if (dosePattern.test(t.instruction_en)) {
            const hasSuppressionLanguage = /suppress/i.test(t.instruction_en) || /suppress/i.test(t.regulatoryNotice_en || '');
            const hasReferencePointLanguage =
              /unconditionally actionable/i.test(t.instruction_en) ||
              /unconditionally actionable/i.test(t.regulatoryNotice_en || '');
            expect(
              hasSuppressionLanguage || hasReferencePointLanguage,
              `${id} treatment ${t.id} gives a dosed instruction without suppression or reference-point-only language`
            ).toBe(true);
          }
        }
      }
    });

    it('still directs the farmer to RBK/VAA from every chemical treatment on the new entries', () => {
      for (const id of newDiseaseIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        for (const t of d.treatments.filter((t) => t.category === 'chemical')) {
          const text = `${t.safetyCaution_en} ${t.regulatoryNotice_en}`.toLowerCase();
          expect(text.includes('rbk') || text.includes('vaa')).toBe(true);
        }
      }
    });

    it('registers all new disease IDs in MOCK_DISEASES so the AI validator does not downgrade them to unsupported_disease', () => {
      for (const id of newDiseaseIds) {
        const mock = getMockDisease(id);
        expect(mock, `${id} missing from MOCK_DISEASES`).toBeDefined();
        expect(mock!.name_en.trim().length).toBeGreaterThan(0);
        expect(mock!.name_te.trim().length).toBeGreaterThan(0);
      }
      // Guards against future accidental duplicate IDs in the mock registry.
      const ids = MOCK_DISEASES.map((d) => d.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });
});

