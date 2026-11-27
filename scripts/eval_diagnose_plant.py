"""Runs the test photo set through the live diagnose-plant function and scores it.
Usage: SUPABASE_ANON_KEY=... python3 scripts/eval_diagnose_plant.py <set_dir> <out.json>"""
import base64, json, subprocess, sys, time, urllib.request

SET, OUT = sys.argv[1], sys.argv[2]
import os
URL = os.environ.get('SUPABASE_URL', 'https://magxfdmhnanomqpxwzjv.supabase.co')
ANON = os.environ['SUPABASE_ANON_KEY']  # the public anon key, never a service-role key

def post(path, body, token=None):
    req = urllib.request.Request(URL + path, data=json.dumps(body).encode(), method='POST',
        headers={'apikey': ANON, 'Content-Type': 'application/json', 'Authorization': f'Bearer {token or ANON}'})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return r.status, json.loads(r.read())
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b'{}')

_, auth = post('/auth/v1/signup', {})
token = auth['access_token']
labels = [l.split('\t') for l in open(f'{SET}/labels.tsv').read().strip().split('\n')]
results = []
for name, label in labels:
    b64 = base64.b64encode(open(f'{SET}/{name}', 'rb').read()).decode()
    t = time.time()
    status, body = post('/functions/v1/diagnose-plant', {'imageBase64': 'data:image/jpeg;base64,' + b64}, token)
    results.append({'file': name, 'label': label, 'status': status, 'secs': round(time.time() - t, 1), 'body': body})
    d = body.get('diagnosis') or {}
    print(f"{name:24} {status} {results[-1]['secs']:5}s | {label:32} | plant={d.get('plant',{}).get('common_name','')!r:28} "
          f"health={d.get('health_status','')!s:13} top={[c['name'] for c in d.get('candidates',[])][:3]} err={body.get('error','')}", flush=True)
json.dump(results, open(OUT, 'w'), indent=1)
