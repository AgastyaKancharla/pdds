# Field-photo test of the Claude diagnosis (28 Nov 2026)

**What was tested:** the live `diagnose-plant` Edge Function (Claude Sonnet 5.5) on 46 images:
44 real field photos from the public **PlantDoc** test set (13 plant species, 27 classes, photos
taken outside a lab with natural backgrounds), plus 1 deliberately blurred photo and 1 non-plant
image (a document). Photos were resized to 1280 px JPEG, exactly as the app does before upload.
No crop hint was given: the model had to identify the plant itself.

**Why PlantDoc:** models trained on lab photos (PlantVillage) score ~99% in the lab but only
~13–31% on PlantDoc field photos, so PlantDoc is the standard "real world" check.

## Results

| Measure | Result |
|---|---|
| Requests answered | 46 / 46 (no errors) |
| Plant correctly identified | 41 / 44 (93%) |
| Disease correct as the top answer | 20 / 34 (59%) |
| Disease correct within the top 3 shown | 27 / 34 (79%) |
| Healthy leaves called healthy | 7 / 10 |
| Blurry photo flagged with a retake tip | Yes |
| Non-plant image rejected | Yes |
| Average time per scan | ~8 s (max 13.6 s) |
| Approx. cost per scan | ~$0.01 (Sonnet 5.5 with prompt caching) |

Figures include a re-run of 2 slide images after a prompt fix on 28 Nov (photos of a screen or slide
showing a real plant are now analysed instead of rejected).

## For context (published results on real farmer photos, top-1 disease accuracy)

- Plantix (production): ~43%
- GPT-5.4: ~40% · Gemini 3.5 Flash: ~39%
- Specialist model trained on 1M+ field photos: ~73%

(Source: Digital Green FarmerChat study, arXiv 2609.21651, 2026. Different photo set, so this is
context, not a head-to-head comparison.)

## Caveats

- Small sample (34 disease photos). Treat the percentages as indicative, not precise.
- PlantDoc labels are known to be noisy, and some images carry captions; the prompt tells the model
  to ignore text in images.
- Most misses were between look-alike diseases (e.g. early vs late blight, gray leaf spot vs
  turcicum blight). This is why the app shows up to three possible causes rather than one answer.

## How to re-run

```
SUPABASE_ANON_KEY=<public anon key> python3 scripts/eval_diagnose_plant.py <folder-with-labels.tsv> results.json
```
`labels.tsv` lists `<file>\t<true label>` per line.
