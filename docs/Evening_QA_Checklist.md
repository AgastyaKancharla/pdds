# HereForNature (PDDS) — Tonight's Manual Testing Checklist

For a non-technical project owner. No code or SQL reading required. Run the app with `npm run dev` and open the shown local address in your browser (or on your phone if testing on the same network).

Each item says: what to do, what success looks like, what failure looks like, and whether it needs a live AI key or a live Supabase project.

## Priority 1 — Do these first

| # | What to do | Success looks like | Failure looks like | Needs live AI? | Needs live Supabase? |
|---|---|---|---|---|---|
| 1 | Open the app home screen | Logo, app name, "Scan Crop" button, three feature cards all appear | Blank page, or an error message instead of the home screen | No | No |
| 2 | Tap "Scan Crop", then tap "🧪 Test with Sample Crop" | You land on a result screen for Rice Blast, with a clearly visible banner saying "Demonstration Sample" | No banner appears, or the result looks identical to a real scan with no "demo" labeling anywhere | No | No |
| 3 | On that result screen, tap the "Chemical" tab for a crop | You see either real guidance or a message saying the recommendation is suppressed/pending verification — never a pesticide name + exact amount with no caution text next to it | A specific pesticide and dose shown with zero caution/warning text anywhere near it | No | No |
| 4 | Tap the "Groundnut" chip at the top, then the "Chemical" tab | Under the safety text you see an italic "Evidence Note:" paragraph explaining the spray-volume figure isn't confirmed against a current label | No such note appears, or the note is missing/blank | No | No |
| 5 | Tap the "Banana" chip, scroll to "Expert Escalation Advice" | An italic "Evidence Note:" paragraph appears under the escalation text about the lime quantity | No note appears | No | No |
| 6 | Tap "English"/"Telugu" at the top of the Home screen, repeat items 2–5 | Everything above re-appears correctly in Telugu, including the two Evidence Notes | Telugu text is missing, broken, or falls back to English unexpectedly | No | No |

## Priority 2 — Do these next

| # | What to do | Success looks like | Failure looks like | Needs live AI? | Needs live Supabase? |
|---|---|---|---|---|---|
| 7 | Try uploading a non-image file (e.g. a `.txt` or `.pdf`) via "Choose from Gallery" | A clear error message appears, nothing crashes | The app accepts it, freezes, or shows a blank/broken screen | No | No |
| 8 | Try uploading a very large image file (bigger than ~10 MB) | A clear "too large" error message appears | The app hangs, crashes, or silently does nothing | No | No |
| 9 | Take a real photo via "Take Photo" or the live camera viewfinder | Camera opens (where your device/browser supports it) and a photo can be captured | Camera never opens, or capturing a photo does nothing | No (device camera only) | No |
| 10 | Tap "Save to History" on a result | A clear "Saved" status appears (local or cloud wording differs — either is fine) | The button does nothing, or shows a persistent error | No | No, unless testing the *cloud* save specifically |
| 11 | Open "History" from the bottom nav | Previously saved scans (if any) appear, or an empty/helpful message if none yet | The screen crashes or shows nothing with no explanation | No | No for guest/local history |

## Priority 3 — Only if you have a live AI key and/or a live Supabase project configured

| # | What to do | Success looks like | Failure looks like | Needs live AI? | Needs live Supabase? |
|---|---|---|---|---|---|
| 12 | Take or upload a **real** crop photo (not the sample) and wait for a result | A result appears within ~20 seconds, clearly labeled "Preliminary AI Observation" (not "Demonstration") | A real photo returns nothing, hangs indefinitely, or returns an error with no explanation | **Yes** | No |
| 13 | Turn off your internet connection, then try scanning a real photo | A clear "service unavailable, please check connection" message appears — never a fabricated result | The app shows a result anyway, or crashes | No (this specifically tests the *offline* path) | No |
| 14 | Sign in (if the app has a sign-in option configured) and save a scan, then sign out and back in | The saved scan is still there after signing back in | The scan disappears, or appears for the wrong account | No | **Yes** |

## What this checklist does **not** cover

- Whether the AI's actual disease identification is *correct* — that requires real field trials with known, confirmed diagnoses, which is outside the scope of this project and this checklist.
- Performance under many simultaneous users.
- Testing on every possible phone/browser combination — test on whatever devices you have available tonight.

If anything in Priority 1 or 2 fails, that is a real defect worth reporting before submission. Priority 3 items are expected to be "not tested" unless you specifically have a live AI key or Supabase project connected — that is not itself a failure, just an unverified area to disclose honestly in the submission if asked.
