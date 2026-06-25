'use client';
import { useState } from 'react';
import { Loader, AlertCircle, ArrowLeft, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const PROMPTS = ['Which part is affected?','What colour changes do you see?','How long has this been going on?','Is it spreading?'];

interface Match { disease: string; confidence: number; disease_id: string }

export default function DiagnosePage() {
  const [desc, setDesc]           = useState('');
  const [plantType, setPlantType] = useState('');
  const [loading, setLoading]     = useState(false);
  const [matches, setMatches]     = useState<Match[]|null>(null);
  const [error, setError]         = useState('');

  const handle = async () => {
    setLoading(true); setError(''); setMatches(null);
    try {
      const res  = await fetch(`${API}/api/v1/diagnose`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: desc, plant_type: plantType||undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMatches(data.matches);
    } catch (e: any) { setError(e.message||'Diagnosis failed'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-mist">
      <nav className="bg-forest text-white px-6 py-4 flex items-center gap-4">
        <Link href="/" className="hover:text-leaf"><ArrowLeft size={20}/></Link>
        <span className="font-display text-lg">Symptom Diagnosis</span>
      </nav>
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h1 className="font-display text-4xl text-forest mb-2">Describe What You See</h1>
          <p className="text-forest/60">The more detail you provide, the better the diagnosis</p>
        </div>
        <div className="card">
          <label className="block text-sm font-medium text-forest mb-2">Plant type</label>
          <input value={plantType} onChange={e=>setPlantType(e.target.value)} placeholder="e.g. Tomato, Apple, Corn..."
            className="w-full border border-forest/20 rounded-xl px-4 py-3 focus:outline-none focus:border-leaf mb-4"/>
          <label className="block text-sm font-medium text-forest mb-2">Describe symptoms</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {PROMPTS.map(p=>(
              <button key={p} onClick={()=>setDesc(d=>d+(d?' ':'')+p+' ')}
                className="text-xs bg-mist border border-forest/10 text-forest/60 px-3 py-1 rounded-full hover:border-leaf hover:text-leaf transition-colors">
                + {p}
              </button>
            ))}
          </div>
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={5}
            placeholder="e.g. My tomato plant has yellow spots on the lower leaves with dark brown borders..."
            className="w-full border border-forest/20 rounded-xl px-4 py-3 focus:outline-none focus:border-leaf resize-none"/>
        </div>
        {error && <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl"><AlertCircle size={18}/>{error}</div>}
        <button onClick={handle} disabled={!desc.trim()||loading}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50">
          {loading?<><Loader className="animate-spin" size={20}/>Analysing symptoms...</>:<><Search size={20}/>Get Diagnosis</>}
        </button>
        {matches && (
          <div className="space-y-3">
            <h2 className="font-semibold text-forest">Top Matches</h2>
            {matches.length===0
              ? <div className="card text-center text-forest/60">No strong matches. Try adding more detail or upload a photo.</div>
              : matches.map((m,i)=>(
                <Link key={m.disease_id} href="/detect"
                  className="card flex items-center justify-between hover:border-leaf transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${i===0?'bg-leaf':i===1?'bg-amber':'bg-forest/40'}`}>{i+1}</div>
                    <div>
                      <p className="font-semibold text-forest group-hover:text-leaf transition-colors">{m.disease}</p>
                      <p className="text-sm text-forest/50">{m.confidence}% match</p>
                    </div>
                  </div>
                  <ChevronRight className="text-forest/30 group-hover:text-leaf" size={20}/>
                </Link>
              ))
            }
          </div>
        )}
      </div>
    </div>
  );
}
