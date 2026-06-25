'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const STAGE_ICONS: Record<string, string> = { seed: '🌰', sprout: '🌱', vegetative: '🪴', flowering: '🌸', harvest: '🌾' };

export default function PlantDetailPage() {
  const { plant } = useParams();
  const [data, setData] = useState<any>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/v1/education/plants/${plant}`)
      .then((r) => setData(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [plant]);

  if (loading) return <div className="flex justify-center py-24" style={{ backgroundColor: '#0A1A0F' }}><Loader2 className="animate-spin" size={32} style={{ color: '#2ECC71' }} /></div>;
  if (!data) return <div className="text-center py-24 text-red-400" style={{ backgroundColor: '#0A1A0F' }}>Plant not found</div>;

  const stage = data.lifecycle[activeStage];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10" style={{ backgroundColor: '#0A1A0F', minHeight: '100vh' }}>
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'rgba(168,230,207,0.4)' }}>
        <Link href="/grow" style={{ color: 'rgba(168,230,207,0.4)' }}>How to Grow</Link>
        <ChevronRight size={14} /><span style={{ color: '#F5F0E8' }}>{data.name}</span>
      </div>

      <h1 className="font-display text-4xl font-bold mb-1" style={{ color: '#F5F0E8' }}>{data.name}</h1>
      <p className="italic mb-4" style={{ color: 'rgba(168,230,207,0.4)' }}>{data.scientific_name}</p>
      <p className="leading-relaxed max-w-2xl mb-4" style={{ color: 'rgba(168,230,207,0.7)' }}>{data.description}</p>

      {/* Lifecycle stepper */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {data.lifecycle.map((s: any, i: number) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <button onClick={() => setActiveStage(i)}
              className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all"
              style={i === activeStage
                ? { backgroundColor: 'rgba(46,204,113,0.2)', border: '1px solid rgba(46,204,113,0.5)' }
                : { border: '1px solid transparent' }}>
              <span className="text-2xl">{STAGE_ICONS[s.stage] || '🌿'}</span>
              <span className="text-xs font-semibold capitalize" style={{ color: i === activeStage ? '#2ECC71' : 'rgba(168,230,207,0.5)' }}>{s.stage}</span>
              <span className="text-xs" style={{ color: 'rgba(168,230,207,0.3)' }}>{s.duration_days}d</span>
            </button>
            {i < data.lifecycle.length - 1 && <div className="w-8 h-0.5 mx-1 flex-shrink-0" style={{ backgroundColor: '#2A5232' }} />}
          </div>
        ))}
      </div>

      {stage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-display text-2xl font-semibold mb-2 capitalize" style={{ color: '#F5F0E8' }}>
              {STAGE_ICONS[stage.stage]} {stage.stage} Stage
            </h2>
            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(168,230,207,0.6)' }}>{stage.description}</p>
            <h3 className="font-semibold mb-3" style={{ color: '#F5F0E8' }}>🌿 Care Guide</h3>
            <div className="space-y-2">
              {Object.entries(stage.care || {}).map(([key, val]) => (
                <div key={key} className="flex gap-3 text-sm">
                  <span className="capitalize w-24 flex-shrink-0" style={{ color: 'rgba(168,230,207,0.3)' }}>{key.replace('_', ' ')}</span>
                  <span style={{ color: 'rgba(168,230,207,0.7)' }}>{val as string}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {stage.tips?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold mb-3" style={{ color: '#F5F0E8' }}>💡 Tips</h3>
                <ul className="space-y-2">
                  {stage.tips.map((t: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'rgba(168,230,207,0.7)' }}>
                      <span style={{ color: '#2ECC71' }}>→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {stage.common_problems?.length > 0 && (
              <div className="card" style={{ borderColor: 'rgba(232,184,75,0.2)' }}>
                <h3 className="font-semibold mb-3" style={{ color: '#E8B84B' }}>⚠️ Common Problems</h3>
                <ul className="space-y-2">
                  {stage.common_problems.map((p: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm" style={{ color: 'rgba(168,230,207,0.7)' }}>
                      <span style={{ color: '#E8B84B' }}>→</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/detect">
              <div className="card text-center cursor-pointer transition-all" style={{ borderColor: 'rgba(46,204,113,0.3)' }}>
                <p className="text-sm" style={{ color: 'rgba(168,230,207,0.6)' }}>Seeing a problem at this stage?</p>
                <p className="font-semibold mt-1" style={{ color: '#2ECC71' }}>🔬 Run Disease Detection →</p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
