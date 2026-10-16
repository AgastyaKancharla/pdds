# Competitive Landscape: Plant Identification & Crop Disease Diagnosis Apps (Global + India/AP Focus)

## Which apps are most widely used/cited for crop disease diagnosis globally and in India specifically?

### Takeaway
Globally, **Plantix (PEAT GmbH, now majority-owned by Helm AG)** is the most-cited dedicated crop-disease diagnosis app and the only one a peer-reviewed app-quality review found could do full image diagnosis + treatment suggestions; **PictureThis** and **PlantSnap** are the most-cited general plant-ID apps (species ID, not disease-specific); **Agrio** and **Plant.id/Kindwise** are smaller but frequently-cited diagnosis-focused players. In India, Plantix again dominates disease-diagnosis mindshare, alongside government apps (Kisan Suvidha/mKisan, ICAR/KVK apps) and agri-commerce platforms with advisory features (AgroStar, Fasal, ITC's Crop Doctor inside ITCMAARS). CropIn, despite being a well-known Indian agritech "innovator," does not show up in available sources as having an image-based disease-diagnosis product — its known public work (e.g., SmartRisk for PMFBY crop-insurance payouts) is farm-monitoring/analytics, not photo diagnosis.

### Cited Findings
- Plantix: "detect more than 120 plant pests & diseases on 30 crops worldwide," free for smallholders, offline-capable diagnosis library — [FAO e-Agriculture](https://www.fao.org/e-agriculture/es/node/13281)
- A 2022 peer-reviewed review of 606 app-store plant-disease apps narrowed to 17 for quality assessment; most scored acceptably on usability/aesthetics but poorly on "AI-based advanced functionality," and **Plantix was the only one found able to identify plants from images, detect diseases, and suggest treatments** — [Agronomy journal via DOAJ](https://doaj.org/article/c8129f375bf7451eb17765c6670de9b0), also indexed at [arXiv 2208.02446](https://arxiv.org/pdf/2208.02446)
- PictureThis and PlantSnap are the most commonly tested general plant-ID apps in independent reviews (Rutgers, University of Maryland Extension, toxic-plant study) — see accuracy section below
- Agrio (Saillog Ltd.) markets itself as a "plant diagnosis app" with disease/pest/nutrient-deficiency ID, weather-linked pest alerts, and satellite NDVI monitoring — [Apple App Store listing](https://apps.apple.com/us/app/agrio-plant-diagnosis-app/id1239193220); [FAO Agritech Observatory](https://agritechobservatory.review.fao.org/es/agrio)
- Plant.id (by Kindwise) is an API/white-label engine rather than a consumer-facing diagnosis brand; it powers "plant.health" disease identification separately from its species-ID product — [Kindwise](https://www.kindwise.com/plant-health)
- India government apps: Kisan Suvidha (via mKisan portal, Ministry of Agriculture) has a "Plant Protection" section covering pest/weed/disease info and management practices per crop stage, and lets farmers upload a photo for experts to review, plus a Kisan Call Centre link — [mKisan](https://mkisan.gov.in/Home/Downloads); [Indian Cooperative](https://www.indiancooperative.com/co-op-news-snippets/icar-develops-kisan-suvidha-mobile-applications/)
- ICAR has compiled 100+ apps from ICAR institutes, state agricultural universities, and KVKs covering crops/horticulture (e.g., MyIPM, for disease/insect/weed management guidelines) — found via search of ICAR-linked sources, no single primary ICAR URL retrieved in this pass
- AgroStar: combines an image-based "crop disease diagnosis tool" (per 2019 TechCrunch coverage) with an expert-call-center advisory flow where farmers submit a photo and then speak to an "agri doctor"; claims 10 million+ monthly active users and multilingual support in Hindi, Gujarati, Marathi, Kannada, and Telugu — [TechCrunch 2019](https://techcrunch.com/2019/03/13/agrostar-gets-27m-series-c-to-give-more-indian-farmers-increase-crop-production-with-data-analytics/); [AgroStar corporate](https://corporate.agrostar.in/farmadvisorysolutions)
- Fasal (Bengaluru, founded 2018): IoT-sensor + AI horticulture platform offering disease/pest prediction as part of a broader "virtual doctor" package (irrigation, microclimate forecasting, finance); claims coverage of 15+ crops over 75,000+ acres; human agronomists/plant pathologists are part of the analysis loop, not pure on-device AI — [Business Today](https://www.businesstoday.in/amp/magazine/corporate/story/indias-coolest-start-ups-how-ai-powered-saas-platform-fasal-disrupted-indias-horticulture-space-412997-2024-01-12)
- ITC's "Crop Doctor" (inside the ITCMAARS app ecosystem): AI image-analytics diagnostic tool covering 70 crops, reported 300,000+ uses — [AgroSpectrum India](https://agrospectrumindia.com/news/67/34012/itc-bets-on-agritech-scale-up-as-ai-platform-targets-productivity-gains-in-indian-farming.html)
- Syngenta's Cropwise Grower app also has a like-named "Crop Doctor" feature (photo → AI-assisted ID + advice); distinct product from AgroStar's — [Agriculture Post](https://agriculturepost.com/?p=7152)
- No evidence found in this search that CropIn offers an image-based disease-diagnosis consumer feature; its documented public profile centers on farm-management/satellite analytics and crop-insurance risk tools (SmartRisk/PMFBY) — multiple search passes turned up no CropIn disease-ID product page or press coverage

### Inferences
- The Indian market bifurcates into (1) pure-play AI diagnosis apps (Plantix, and smaller entrants), (2) agri-commerce platforms that bolt a diagnosis/advisory feature onto an input-selling business (AgroStar, Agrio-style models), and (3) government/public-sector advisory apps that blend static disease databases with human expert review rather than pure computer vision (Kisan Suvidha, ITCMAARS/Crop Doctor combines both).
- "Crop Doctor" is used as a generic feature name by at least two unrelated companies (AgroStar-adjacent coverage vs. Syngenta Cropwise, and ITC's ITCMAARS), which risks confusion in competitive analysis and should be disambiguated carefully by company, not just feature name.

### Gaps
- No primary CropIn source (its own site) could be reached (DNS/fetch failure in this research pass: `getaddrinfo ENOTFOUND www.cropin.com`); CropIn's disease-diagnosis capability (if any) needs direct verification from CropIn's website, app store listing, or recent press release.
- No current (2025/2026) ranked "most downloaded/most used" comparison across Indian crop-disease apps was found; download/user figures are per-company and not independently cross-verified in one source.

---

## What accuracy or performance figures (if any) are publicly verifiable for each, and from what source (company marketing vs. independent study/paper)?

### Takeaway
Verifiable, independent, peer-reviewed accuracy figures are scarce across this entire category. Most accuracy numbers in circulation are company self-reported estimates (Plantix, PictureThis, Kindwise/Plant.id); where independent tests exist, they are for general plant-species identification (not disease diagnosis specifically), they often contradict vendor marketing, and most are several years old.

### Cited Findings
**Plantix (company-reported / secondary sources, no independent field validation found):**
- A Harvard Digital Innovation (d3.harvard.edu) case study reports Plantix estimated its algorithms correctly identified disease status and specific disease "upwards of 90% of the time," while noting no single overall accuracy figure exists across all crops/diseases — [Harvard D³ case study](https://d3.harvard.edu/platform-digit/submission/plantix-bringing-crop-science-machine-learning-to-millions/)
- CGIAR reporting cites a lower figure: "detection success is now at 85 percent accuracy" — [CGIAR Big Data](https://bigdata.cgiar.org/?p=650859)
- A 2018 APS (American Phytopathological Society) conference abstract states detection accuracy "over 100 classes" is over 90%, with some diseases (e.g., early/late leaf spot of peanut, with ~15,000 training images) over 95% — [APSnet 2018 abstracts](https://www.apsnet.org/meetings/annual/meetingarchives/Pages/2018Abstracts.aspx?LID=450)
- Training-data dependency: some diseases needed as few as 400 training images, others as many as 5,000 — cited within the same Harvard case study material
- A 2020 CABI/PlantwisePlus-MSSRF project in Tamil Nadu collected 52,000 field images to improve Plantix's model but reported **no before/after accuracy numbers** — [PlantwisePlus Blog, 2020](https://blog.plantwise.org/2020/06/19/teaching-an-app-to-help-farmers/)
- Secondary/marketing-style claims: "800 symptoms across 60 crop types" and "90% accuracy across more than 100 million images" (Global Center on AI Governance) — treat as unverified secondary summary, not a primary company disclosure — [globalcenter.ai](https://www.globalcenter.ai/aorai/use-cases/plantix)
- **No independent, peer-reviewed field study with a full accuracy breakdown for Plantix was found in this research pass.**

**PictureThis / PlantSnap (general plant-species ID, independently tested; NOT disease-specific):**
- PictureThis's own marketing claims "over 98% accuracy" vs. human experts — company claim, not independently confirmed — cited via [best plant ID apps tested](https://theearthworm.substack.com/p/the-best-plant-id-apps-tested)
- University of Wisconsin genetic-barcoding study: only 51% of PictureThis IDs matched DNA-sequencing species-level identification; 23% showed no correspondence at all — [minds.wisconsin.edu](https://minds.wisconsin.edu/handle/1793/97276)
- Rutgers University tree-ID study (440 photos, 6 apps): PictureThis was the most accurate of the six — [Rutgers Urban Forestry PDF](https://sites.rutgers.edu/urbanforestry/wp-content/uploads/sites/1042/2023/06/The-Accuracy-of-Photo-Based-Plant-Identification-Apps-on-Northeastern-Trees.pdf)
- University of Maryland Extension (9 apps, hay/pasture plants): PictureThis most accurate, correctly identifying 94% of tested images on first suggestion — [UMD Extension](https://extension.umd.edu/resource/snap-it-or-scrap-it-putting-plant-id-apps-test)
- Toxic-plant ID study (peer-reviewed, 17 species, 3 apps): PictureThis correct for 10/17 (59%), Pl@ntNet 8/17, PlantSnap just 1/17 — [PMC article](https://pmc.ncbi.nlm.nih.gov/articles/PMC8938528) (DOI 10.1007/s13181-020-00803-6)
- PlantSnap consistently ranks lowest across independent tests (e.g., 26% correct-on-first-suggestion in the UMD test) — same UMD/Rutgers sources above
- **Caveat: all of the above test general plant/species identification, not crop disease diagnosis** — these apps are not primarily disease-diagnosis tools, so these figures should not be conflated with Plantix/Agrio-style disease accuracy.

**Plant.id / Kindwise (disease-specific, company-reported):**
- 2022 production release: top-3 accuracy (correct disease appearing in top 3 results) for the Health Assessment feature rose from 55.6% to 61.2% — company blog, dated, disease-specific — [Kindwise: Health Assessment Production Release](https://www.kindwise.com/post/health-assessment-production-release)
- 2026 update: disease model now covers 548 plant-health classes (up from 90), "while maintaining overall accuracy" — no new figure given — company blog
- "Over 85% accuracy in the first response (TOP 1)" appears in Plant.id's Summer 2024 update but describes **species identification, not disease** — should not be cited as a disease-accuracy figure
- **Bottom line: the most concrete disease-specific accuracy figure publicly available for Plant.id is the 2022 ~61% top-3 figure — now roughly 3-4 years old, and no independent benchmark was found.**

**Agrio:** No accuracy figures found; a third-party review (flypix.ai, itself a vendor in the same space) notes accuracy "varies significantly depending on the plant species and image quality" — no number given — [flypix.ai review](https://flypix.ai/agrio-tool-review/)

**Independent academic benchmarking landscape:**
- A 2022 peer-reviewed Agronomy-journal review graded 17 plant-disease apps (from 606 candidates) on software quality; it graded most apps poorly specifically on **AI-functionality quality**, not a disease-by-disease accuracy percentage — [DOAJ/arXiv 2208.02446](https://arxiv.org/pdf/2208.02446)
- A research prototype (non-commercial, arXiv 2019 preprint) reports 89.83% disease-recognition accuracy on its own test set, dropping to 79.33% when automatic affected-area segmentation is used — this is a research system, not a commercial app, and the preprint is not peer-reviewed — [arXiv 1912.09239](https://arxiv.org/pdf/1912.09239)
- A bioRxiv preprint titled "Evaluating the accuracy of a smartphone-based AI system, PlantVillage Nuru, in diagnosing viral diseases of cassava" exists but its specific findings could not be extracted in this pass (content not retrievable) — flagged as a gap, worth independent follow-up — [bioRxiv](https://www.biorxiv.org/content/10.1101/2020.01.26.919449v3.full.pdf+html)
- AgroStar, Fasal, ITC Crop Doctor, Kisan Suvidha, CropIn: **no accuracy/performance percentage of any kind (company or independent) was found for any of these in this research pass.**

### Inferences
- There is a systemic pattern across the category: headline accuracy claims (90%+, 98%+) are company marketing figures benchmarked against unclear or proprietary test sets, while every independent study found either tests a different capability (species ID, not disease) or returns materially lower numbers (e.g., Wisconsin's 51% species-match vs. PictureThis's 98% marketing claim).
- Disease-diagnosis accuracy specifically (as opposed to general plant species-ID) remains the least independently studied aspect of this entire market — the Agronomy 2022 review is the closest thing to an independent, peer-reviewed cross-app assessment, but it graded software/AI-functionality quality, not measured diagnostic accuracy rates.

### Gaps
- No independent accuracy benchmark exists for Plantix specifically (the market's most-cited disease app) — all available figures are company- or Harvard-case-study-sourced estimates.
- No accuracy data (of any kind, company or independent) was found for AgroStar's image-recognition tool, Fasal, ITC's Crop Doctor, Kisan Suvidha, or CropIn.
- The bioRxiv PlantVillage Nuru cassava-disease accuracy study could not be read in this pass; its actual reported sensitivity/specificity numbers are an open gap worth a direct follow-up fetch.
- No 2025/2026-dated accuracy figure exists for any disease-specific app in this category; the most recent disease-specific number found (Plant.id/Kindwise, ~61% top-3) is from 2022.

---

## Do any of them integrate organic/traditional treatment options alongside chemical ones, or are they chemical-recommendation-only?

### Takeaway
Plantix explicitly advertises both chemical and organic/biological treatment suggestions alongside input-seller connections, but its underlying monetization (retailer/agri-input commissions) has drawn specific, named criticism that its model may incentivize pesticide/chemical-input sales over sustainable alternatives. No verifiable dosage information (chemical or organic) was found for any app in this research pass — treat all "doses" as unconfirmed and a gap.

### Cited Findings
- A product feature page states Plantix's recommendations "include both chemical and organic solutions, and even connects users to nearby suppliers" — [zoftwarehub.com product feature listing](https://zoftwarehub.com/en-ae/products/plantix/features)
- Wikipedia's Plantix entry states that critics argue the company's "commission-based model incentivizes pesticide use rather than sustainable alternatives," and that the company's own claim of reducing environmentally harmful pesticide use "is increasingly being challenged due to the company's industry-dependent business model and the lack of robust evidence to support the claim" — [Wikipedia: Plantix](https://en.wikipedia.org/wiki/Plantix)
- Plantix's business model includes partnering with and taking commissions from agri-input manufacturers/retailers (e.g., a listed partnership example with BASF) via a separate "Plantix Partner" retailer app in India — [Welcome to the Jungle job listing](https://app.welcometothejungle.com/jobs/H8eAD9Kz) (secondary source, flagged as lower-quality for business-model specifics)
- Agrio's FAO Agritech Observatory profile describes "tailored treatment and integrated pest management (IPM) recommendations" — IPM implies a mix of cultural/biological and chemical controls, but no explicit organic-vs-chemical split, and no dose information, was stated — [FAO Agritech Observatory](https://agritechobservatory.review.fao.org/es/agrio)
- No source found describes AgroStar's, Fasal's, ITC Crop Doctor's, Kisan Suvidha's, or CropIn's treatment recommendations as explicitly organic, chemical, or both, nor cites doses for either.

### Inferences
- The combination of "offers organic + chemical treatment" messaging alongside a commission/input-sales-based monetization model (as documented for Plantix) represents a structural conflict-of-interest risk that is specifically flagged by critics and by Wikipedia's sourcing — this is a differentiator worth flagging for any new entrant that wants to claim credible, non-commercial-biased organic-first recommendations.

### Gaps
- No app in this landscape was found to publicly cite specific treatment doses (chemical active-ingredient quantities or organic/traditional remedy quantities) sourced to a verifiable agronomic standard (e.g., CIBRC/ICAR label rates) — this appears to be an open gap and potential differentiation opportunity, but it must be confirmed directly against each app's in-product content (not found via web search) before concluding no competitor does this.
- Whether AgroStar's, Fasal's, or ITC Crop Doctor's advisory content is organic-inclusive or chemical-only could not be determined from available sources.

---

## What monetization model do they use (free, freemium, subscription, government-funded)?

### Takeaway
The dominant Indian/global pattern is "free consumer app, monetized indirectly" — via B2B data/licensing deals, agri-input retailer commissions, or being a lead-generation layer for an e-commerce/input-sales business — rather than consumer subscriptions. Government apps (Kisan Suvidha/mKisan, ITCMAARS is private-sector-led though, Saagu Baagu) are free/publicly funded or CSR-funded. Plant.id/Kindwise is the one clear exception, operating as a paid/API-licensing B2B product.

### Cited Findings
- Plantix: free consumer app; monetized via corporate/B2B data-licensing packages, partnerships with agri-input manufacturers (cited example: BASF), and a separate "Plantix Partner" retailer app that connects farmers to nearby agri-input sellers in India — [Welcome to the Jungle listing](https://app.welcometothejungle.com/jobs/H8eAD9Kz); [futurefarming.com](https://futurefarming.com/smart-farming/plantix-more-than-a-crop-doctor-driven-by-ai)
- Plantix/PEAT GmbH ownership: Helm AG (a German chemicals distributor) invested in 2020 and became majority shareholder in July 2023; a ~€6.6M Series A was reportedly raised in April 2023 led by RTP Global — [Osborne Clarke](https://osborneclarke.com/news/sustainable-agriculture-through-ai-osborne-clarke-advises-sale-plantix-helm-ag); [Dealroom](https://app.dealroom.co/companies/peat_gmbh_plantix_app)
- Agrio: "free with in-app purchases" per app-store category, with some features (e.g., high-resolution satellite scans) gated as paid packages — [flypix.ai review](https://flypix.ai/agrio-tool-review/)
- AgroStar: free app layered on an e-commerce (agri-input sales) and call-center advisory business model; reports 10M+ monthly active users — [corporate.agrostar.in](https://corporate.agrostar.in/farmadvisorysolutions)
- Kisan Suvidha: free government app, downloadable via Google Play or mkisan.gov.in, "to access all the information free of cost" — [Indian Cooperative](https://www.indiancooperative.com/co-op-news-snippets/icar-develops-kisan-suvidha-mobile-applications/)
- Saagu Baagu (Telangana pilot): publicly/philanthropically funded — developed with the Telangana state government, supported by the Bill & Melinda Gates Foundation, implemented by Digital Green, under the WEF's AI4AI initiative — [WEF](https://www.weforum.org/stories/2024/01/ai-for-agriculture-in-india/); [Farming First](https://farmingfirst.org/2024/02/using-ai-for-agriculture-how-farmers-in-india-could-inspire-the-world/)
- Digital Green/Cisco CSR "FarmerChat"-style AP advisory initiative: CSR-funded (Cisco), targeting 50,000 farmers across 8 Andhra Pradesh districts — [AgroSpectrum India](https://agrospectrumindia.com/news/24/33222/digital-green-in-collaboration-with-cisco-csr-introduces-new-ai-powered-advisory-for-farmers-in-andhra-pradesh.html)
- Plant.id/Kindwise: positioned as an API/B2B licensing product ("plant.health," "compare plant ID" toolkit) rather than a free consumer disease-diagnosis brand — [Kindwise](https://www.kindwise.com/plant-health)
- ITC's Crop Doctor: free feature inside the ITCMAARS app, part of ITC's broader (CSR/business-integrated) agribusiness ecosystem — [AgroSpectrum India](https://agrospectrumindia.com/news/67/34012/itc-bets-on-agritech-scale-up-as-ai-platform-targets-productivity-gains-in-indian-farming.html)

### Inferences
- Nearly every India-relevant player in this space avoids direct farmer-paid subscriptions, instead monetizing through B2B/B2G data deals, retailer commissions, or treating the diagnosis feature as a loss-leader for an input-sales or call-center-advisory business — likely reflecting low smallholder willingness/ability to pay directly for software.

### Gaps
- No current (2025/2026) revenue or monetization disclosure was found for Plantix beyond its ownership/funding history; whether it has introduced any direct-to-farmer paid tier was not confirmed either way.
- CropIn's and Fasal's monetization models (B2B SaaS pricing to enterprises/cooperatives vs. any free farmer-facing tier) were not confirmed in available sources for this pass.

---

## Do any specifically target Andhra Pradesh or South Indian agriculture?

### Takeaway
Yes — Andhra Pradesh and Telangana (combined, the erstwhile united AP, and both now Telugu-speaking) are unusually active AI-agriculture testbeds: Plantix launched its Telugu-language version first in Andhra Pradesh (2017), and AP state government has since signed multiple AI-agriculture partnerships (Wadhwani AI, APAIMS 2.0, Digital Green/Cisco CSR), while neighboring Telangana ran the well-documented "Saagu Baagu" AI chilli-farming pilot. This is one of the most AI-agriculture-active regions in India specifically because of these programs.

### Cited Findings
- Plantix was "launched in Telugu language for the first time in India in May 2017, in Andhra Pradesh" — cited across multiple secondary sources in this research pass (precise primary citation not isolated; flagged for direct verification)
- Andhra Pradesh Department of Agriculture signed an MoU with Wadhwani AI (New Delhi) on February 9, 2026 to deploy AI for crop assessment and early pest/disease warning — [letsdatascience.com](https://letsdatascience.com/news/andhra-pradesh-signs-ai-agriculture-partnership-83ab1d3f)
- AP's AI-agriculture program is anchored in APAIMS 2.0 (the state's integrated agriculture data/decision-support platform) and the conversion of Rythu Seva Kendras (RSKs) into tech-enabled farmer service hubs — [mwm.ai AP AGRI app listing](https://mwm.ai/apps/ap-agri/6746475169); [Athena Infonomics project page](https://www.athenainfonomics.com/projects/technical-assistance-to-andhra-pradesh-ai-advisory-in-agriculture)
- AP State Agriculture Department completed field trials (AI tools integrated with its Performance Monitoring Application, PMA) to cross-check field-staff photos/reports, with a statewide rollout planned for January 2026 — [letsdatascience.com](https://letsdatascience.com/news/andhra-pradesh-deploys-ai-to-verify-farming-data-834be1a3)
- Digital Green + Cisco CSR launched an AI-powered multimodal horticulture-advisory mobile app targeting 50,000 farmers across 8 Andhra Pradesh districts — [AgroSpectrum India](https://agrospectrumindia.com/news/24/33222/digital-green-in-collaboration-with-cisco-csr-introduces-new-ai-powered-advisory-for-farmers-in-andhra-pradesh.html)
- Bill Gates visited in February 2026 and was shown AP's AI tools for crop-health monitoring, early pest/disease detection, and soil-based fertilizer recommendations — [uniindia.com](https://uniindia.com/ap-bill-gates-appreciates-ap-s-ai-driven-agriculture-initiatives/south/news/3743310.html)
- An earlier Microsoft + ICRISAT "Intelligent Cloud" pilot in Andhra Pradesh built a village-level advisory dashboard covering soil health, fertilizer recommendations, and 7-day weather forecasts — [ICRISAT](https://idc.icrisat.org/idc/index.php/microsoft-and-icrisats-intelligent-cloud-pilot-for-agriculture-in-andhra-pradesh-increase-crop-yield-for-farmers)
- Saagu Baagu (Telangana, Khammam district): AI chilli-farming pilot with the Telangana government, Bill & Melinda Gates Foundation funding, and Digital Green implementation; reported outcomes include a 21% rise in chilli yield/acre and a 9% drop in pesticide use (WEF-reported), plus ~$800/acre additional net income over a six-month cycle (Farming First-reported); scaled to ~500,000 farmers across additional crops (chickpeas, cotton, groundnuts, rice, turmeric) — [WEF](https://www.weforum.org/stories/2024/01/ai-for-agriculture-in-india/); [Farming First](https://farmingfirst.org/2024/02/using-ai-for-agriculture-how-farmers-in-india-could-inspire-the-world/); [DeepLearning.AI The Batch](https://www.deeplearning.ai/the-batch/ai-elevates-chili-farming-in-india-with-smarter-yields)
- AgroStar lists Telugu among its supported languages (alongside Hindi, Gujarati, Marathi, Kannada) — [AgroStar corporate](https://corporate.agrostar.in/farmadvisorysolutions)

### Inferences
- Andhra Pradesh/Telangana (Telugu-speaking region) is disproportionately represented as an AI-agriculture pilot/rollout ground in India — both as Plantix's first regional-language launch market and as the site of two separate, large, differently-funded state-level AI-agriculture programs (Telangana's Saagu Baagu, and AP's Wadhwani AI/APAIMS 2.0/Digital Green-Cisco initiatives). A new entrant focused on this region would be entering a market with substantial existing public-sector and philanthropic-sector AI-agriculture investment and name recognition, which may be both a validation of demand and a competitive/partnership consideration.
- The "Saagu Baagu" yield/pesticide-reduction/income figures are the single most concrete, named, quantified outcome dataset found for any AI-agriculture program in this region — but note they describe a broader AI-advisory program (WhatsApp chatbot, soil testing, market linkage), not a standalone disease-diagnosis image-recognition tool specifically, so they should not be presented as "disease diagnosis accuracy" figures.

### Gaps
- The exact primary source/date for "Plantix launched in Telugu first in AP in May 2017" could not be isolated to a single authoritative citation in this pass (it appeared consistently across secondary sources but no single primary press release or company page was retrieved) — recommend a direct follow-up search/fetch of Plantix's own press page or app-store changelog to confirm.
- No source found quantifies current (2025/2026) Plantix, AgroStar, or Agrio user/adoption figures specifically within Andhra Pradesh (as opposed to India-wide); AP-specific adoption numbers for any commercial (non-government) app are an open gap.
- No evidence was found of any app specifically marketing itself as built/optimized for Andhra Pradesh crops (e.g., chilli, cotton, groundnut, aquaculture) beyond the government-partnered pilots listed above; whether any commercial competitor (Plantix, Agrio, Kindwise) has AP-specific crop-model tuning is unconfirmed.
