'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Loader2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const STAGE_ICONS: Record<string, string> = {
  seed: '🌰', sprout: '🌱', vegetative: '🪴', flowering: '🌸', harvest: '🌾',
};

export default function PlantDetailPage() {
  const { plant } = useParams();
  const [data, setData] = useState<any>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/api/v1/education/plants/${plant}`)
      .then((r) => setData(r.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [plant]);

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-chlorophyll-500" size={32} /></div>;
  if (!data) return <div className="text-center py-24 text-red-400">Plant not found</div>;

  const stage = data.lifecycle[activeStage];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center gap-2 text-sm text-mint-300/40 mb-8">
        <Link href="/grow" className="hover:text-chlorophyll-400">How to Grow</Link>
        <ChevronRight size={14} />
        <span className="text-parchment">{data.name}</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold text-parchment mb-1">{data.name}</h1>
        <p className="text-mint-300/40 italic mb-4">{data.scientific_name}</p>
        <p className="text-mint-300/70 leading-relaxed max-w-2xl">{data.description}</p>
        <div className="flex gap-4 mt-4 text-sm">
          <span className="text-mint-300/40">🗓️ Full lifecycle: <strong className="text-parchment">{data.lifecycle_days} days</strong></span>
          <span className="text-mint-300/40">📊 Difficulty: <strong className="text-parchment capitalize">{data.difficulty}</strong></span>
        </div>
      </div>

      {/* Lifecycle stepper */}
      <div className="flex items-center gap-0 mb-8 overflow-x-auto pb-2">
        {data.lifecycle.map((s: any, i: number) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <button
              onClick={() => setActiveStage(i)}
              className={`flex flex-col items-center gap-1 px-4 py-3 rounded-xl transition-all
                ${i === activeStage
                  ? 'bg-chlorophyll-500/20 border border-chlorophyll-500/50'
                  : 'hover:bg-forest-800 border border-transparent'}`}
            >
              <span className="text-2xl">{STAGE_ICONS[s.stage] || '🌿'}</span>
              <span className={`text-xs font-semibold capitalize ${i === activeStage ? 'text-chlorophyll-400' : 'text-mint-300/50'}`}>
                {s.stage}
              </span>
              <span className="text-xs text-mint-300/30">{s.duration_days}d</span>
            </button>
            {i < data.lifecycle.length - 1 && (
              <div className="w-8 h-0.5 bg-forest-700 mx-1 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Stage detail */}
      {stage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-up">
          <div className="card">
            <h2 className="font-display text-2xl font-semibold text-parchment mb-2 capitalize">
              {STAGE_ICONS[stage.stage]} {stage.stage} Stage
            </h2>
            <p className="text-sm text-mint-300/60 mb-6 leading-relaxed">{stage.description}</p>

            <h3 className="font-semibold text-parchment mb-3">🌿 Care Guide</h3>
            <div className="space-y-2">
              {Object.entries(stage.care || {}).map(([key, val]) => (
                <div key={key} className="flex gap-3 text-sm">
                  <span className="text-mint-300/30 capitalize w-24 flex-shrink-0">{key.replace('_', ' ')}</span>
                  <span className="text-mint-300/70">{val as string}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {stage.tips?.length > 0 && (
              <div className="card">
                <h3 className="font-semibold text-parchment mb-3">💡 Tips</h3>
                <ul className="space-y-2">
                  {stage.tips.map((t: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-mint-300/70">
                      <span className="text-chlorophyll-500">→</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {stage.common_problems?.length > 0 && (
              <div className="card border-amber-500/20">
                <h3 className="font-semibold text-amber-400 mb-3">⚠️ Common Problems</h3>
                <ul className="space-y-2">
                  {stage.common_problems.map((p: string, i: number) => (
                    <li key={i} className="flex gap-2 text-sm text-mint-300/70">
                      <span className="text-amber-500">→</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href="/detect" className="card border-chlorophyll-500/30 hover:bg-forest-700 
                                            transition-all text-center block cursor-pointer">
              <p className="text-sm text-mint-300/60">Seeing a problem at this stage?</p>
              <p className="text-chlorophyll-400 font-semibold mt-1">🔬 Run Disease Detection →</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
