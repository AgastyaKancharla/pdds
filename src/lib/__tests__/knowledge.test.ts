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
} from '../knowledge';
import { MOCK_TREATMENTS } from '../mockData';
import { validateAndNormalizeAiResponse } from '../ai/validator';
import { translations, translate, type TranslationKey } from '../i18n';

describe('Phase 3 Agricultural Knowledge Base', () => {
  describe('Catalog Schema & Completeness', () => {
    it('has a valid version, review date, and authority standards', () => {
      const catalog = AGRICULTURAL_KNOWLEDGE_CATALOG;
      expect(catalog.version).toBe('1.0.0');
      expect(catalog.lastReviewedDate).toBe('2026-10-09');
      expect(catalog.authorityStandards.length).toBeGreaterThanOrEqual(3);
      expect(catalog.authorityStandards.some((s) => s.includes('ANGRAU'))).toBe(true);
      expect(catalog.authorityStandards.some((s) => s.includes('ICAR'))).toBe(true);
      expect(catalog.authorityStandards.some((s) => s.includes('CIBRC'))).toBe(true);
    });

    it('contains all 10 core Andhra Pradesh crops with complete bilingual metadata', () => {
      const crops = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.crops);
      expect(crops.length).toBe(10);

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

    it('contains all 10 core diseases with valid crop foreign keys and symptom profiles', () => {
      const diseases = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases);
      expect(diseases.length).toBe(10);

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
    it('distinguishes verified_reference diseases from unverified and conflicting diseases', () => {
      const verifiedIds = [
        'disease-rice-blast',
        'disease-chilli-leaf-curl',
        'disease-cotton-bollworm',
        'disease-groundnut-tikka',
      ];

      for (const id of verifiedIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(d, `Missing disease: ${id}`).toBeDefined();
        expect(d.evidenceStatus).toBe('verified_reference');
        // Verified entries must have both pathological and abiotic lookalikes
        const hasPathological = d.similarConditions.some((l) => l.isPathological);
        const hasAbiotic = d.similarConditions.some((l) => !l.isPathological);
        expect(hasPathological, `${id} missing pathological lookalike`).toBe(true);
        expect(hasAbiotic, `${id} missing abiotic lookalike`).toBe(true);
      }

      const unverifiedIds = [
        'disease-maize-armyworm',
        'disease-sugarcane-redrot',
        'disease-tomato-earlyblight',
        'disease-mango-anthracnose',
        'disease-turmeric-rhizomerot',
      ];

      for (const id of unverifiedIds) {
        const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
        expect(d, `Missing disease: ${id}`).toBeDefined();
        expect(d.evidenceStatus).toBe('unverified');
      }

      const conflictingId = 'disease-banana-panamawilt';
      const panama = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[conflictingId];
      expect(panama).toBeDefined();
      expect(panama.evidenceStatus).toBe('conflicting');
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

    it('requires active ingredients and safety cautions for verified chemical treatments', () => {
      const chemicalTreatments = Object.values(AGRICULTURAL_KNOWLEDGE_CATALOG.diseases).flatMap((d) =>
        d.treatments.filter((t) => t.category === 'chemical')
      );

      // Only verified entries contain chemical treatments (Rice Blast x2, Chilli x1, Cotton x1, Groundnut x1 = 5)
      expect(chemicalTreatments.length).toBe(5);
      for (const t of chemicalTreatments) {
        expect(t.activeIngredient_en).toBeDefined();
        expect(t.safetyCaution_en).toBeDefined();
        expect(t.safetyCaution_en!.trim().length).toBeGreaterThan(0);
      }
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
      expect(blast?.evidenceStatus).toBe('verified_reference');

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
      expect(allCrops.length).toBe(10);

      const allDiseases = getAllSupportedDiseases();
      expect(allDiseases.length).toBe(10);

      const riceDiseases = getAllSupportedDiseases('crop-rice');
      expect(riceDiseases.length).toBe(1);
      expect(riceDiseases[0].id).toBe('disease-rice-blast');
    });

    it('returns full offline reference catalog synchronously', () => {
      const offlineCatalog = getOfflineReferenceCatalog();
      expect(offlineCatalog.version).toBe('1.0.0');
      expect(Object.keys(offlineCatalog.crops).length).toBe(10);
      expect(Object.keys(offlineCatalog.diseases).length).toBe(10);
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

        // Groundnut Tikka only has chemical curated; preventive is empty in treatments
        const groundnutPrev = getTreatmentsForCategory('disease-groundnut-tikka', 'preventive', 'en');
        expect(groundnutPrev.hasCuratedEntry).toBe(true);
        expect(groundnutPrev.isEmptyCategory).toBe(true);
        expect(groundnutPrev.treatments).toHaveLength(0);

        // Sugarcane Red Rot has preventive sett treatment, but NO chemical standing spray
        const sugarcaneChem = getTreatmentsForCategory('disease-sugarcane-redrot', 'chemical', 'en');
        expect(sugarcaneChem.hasCuratedEntry).toBe(true);
        expect(sugarcaneChem.isEmptyCategory).toBe(true);
        expect(sugarcaneChem.treatments).toHaveLength(0);
      });

      it('safely distinguishes populated categories from empty categories', () => {
        // Rice Blast has all 3 categories populated
        const riceOrg = getTreatmentsForCategory('disease-rice-blast', 'organic', 'en');
        const riceChem = getTreatmentsForCategory('disease-rice-blast', 'chemical', 'en');
        const ricePrev = getTreatmentsForCategory('disease-rice-blast', 'preventive', 'en');

        expect(riceOrg.isEmptyCategory).toBe(false);
        expect(riceOrg.treatments.length).toBeGreaterThan(0);
        expect(riceChem.isEmptyCategory).toBe(false);
        expect(riceChem.treatments.length).toBeGreaterThan(0);
        expect(ricePrev.isEmptyCategory).toBe(false);
        expect(ricePrev.treatments.length).toBeGreaterThan(0);
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
        const chem = chilli.treatments.find((t) => t.category === 'chemical');
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

      it('strictly suppresses chemical treatments for all unverified catalog entries', () => {
        const unverifiedIds = [
          'disease-maize-armyworm',
          'disease-sugarcane-redrot',
          'disease-tomato-earlyblight',
          'disease-mango-anthracnose',
          'disease-turmeric-rhizomerot',
        ];

        for (const id of unverifiedIds) {
          const d = AGRICULTURAL_KNOWLEDGE_CATALOG.diseases[id];
          expect(d.evidenceStatus).toBe('unverified');
          const chem = d.treatments.filter((t) => t.category === 'chemical');
          expect(chem, `Unverified disease ${id} must not have actionable chemical treatments`).toHaveLength(0);
        }
      });

      it('ensures verified entries include direct authoritative URLs and review dates', () => {
        const verifiedIds = [
          'disease-rice-blast',
          'disease-chilli-leaf-curl',
          'disease-cotton-bollworm',
          'disease-groundnut-tikka',
        ];

        for (const id of verifiedIds) {
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
});

