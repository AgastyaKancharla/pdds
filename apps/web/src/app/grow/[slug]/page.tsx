'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, Leaf, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Stage {
  name: string; order: number;
  duration_days: { min: number; max: number };
  care: { watering: string; sunlight: string; temperature_c: { min: number; max: number }; soil: string; fertilizer: string };
  common_problems: string[];
  tips: string[];
}

interface Plant {
  name: string; slug: string; scientific_name: string;
  category: string; difficulty: string; description: string;
  stages: Stage[];
}

export default function PlantPage({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const [plant, setPlant]         = useState<Plant|null>(null);
  const [openStage, setOpenStage] = useState(0);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('plants').select('*').eq('slug', params.slug).single();
      setPlant(data);
      setLoading(false);
    };
    load();
  }, [params.slug]);

  if (loading) return <div className="min-h-screen bg-mist flex items-center justify-center"><Leaf className="animate-pulse text-leaf" size={40}/></div>;
  if (!plant)  return <div className="min-h-screen bg-mist flex items-center justify-center text-forest/60">Plant not found.</div>;

  return (
    <div className="min-h-screen bg-mist">
      <nav className="bg-forest text-white px-6 py-4 flex items-center gap-4">
        <Link href="/grow" className="hover:text-leaf"><ArrowLeft size={20}/></Link>
        <Leaf className="text-leaf" size={20}/>
        <span className="font-display text-lg">{plant.name}</span>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="card mb-6">
          <p className="text-forest/50 italic text-sm mb-1">{plant.scientific_name}</p>
          <h1 className="font-display text-4xl text-forest mb-3">{plant.name}</h1>
          <p className="text-forest/70 leading-relaxed">{plant.description}</p>
        </div>

        <h2 className="font-semibold text-forest mb-4 text-lg">Lifecycle Stages</h2>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-leaf/20"/>
          <div className="space-y-3">
            {plant.stages.sort((a,b)=>a.order-b.order).map((stage,i)=>(
              <div key={stage.name} className="relative pl-12">
                <div className={`absolute left-3.5 top-4 w-4 h-4 rounded-full border-2 transition-colors
                  ${i===openStage ? 'bg-leaf border-leaf' : 'bg-white border-leaf/40'}`}/>
                <div className="card cursor-pointer" onClick={()=>setOpenStage(i===openStage ? -1 : i)}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-forest">{stage.name}</h3>
                      <p className="text-xs text-forest/50 mt-0.5">
                        {stage.duration_days.min}–{stage.duration_days.max} days
                      </p>
                    </div>
                    {i===openStage ? <ChevronUp className="text-leaf" size={20}/> : <ChevronDown className="text-forest/40" size={20}/>}
                  </div>

                  {i===openStage && (
                    <div className="mt-4 pt-4 border-t border-mist-dark space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          ['💧 Watering', stage.care.watering],
                          ['☀️ Sunlight', stage.care.sunlight],
                          ['🌱 Soil', stage.care.soil],
                          ['🌿 Fertilizer', stage.care.fertilizer],
                        ].map(([label,val])=>(
                          <div key={label} className="bg-mist rounded-xl p-3">
                            <p className="text-xs font-medium text-forest/50 mb-1">{label}</p>
                            <p className="text-sm text-forest">{val}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-mist rounded-xl p-3">
                        <p className="text-xs font-medium text-forest/50 mb-1">🌡️ Temperature</p>
                        <p className="text-sm text-forest">{stage.care.temperature_c.min}–{stage.care.temperature_c.max}°C</p>
                      </div>
                      {stage.tips.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-forest/50 mb-2">💡 Tips</p>
                          <ul className="space-y-1">
                            {stage.tips.map((t,j)=>(
                              <li key={j} className="text-sm text-forest/70 flex items-start gap-2">
                                <span className="text-leaf mt-0.5">•</span>{t}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {stage.common_problems.length > 0 && (
                        <div className="bg-amber/10 border border-amber/20 rounded-xl p-3">
                          <p className="text-xs font-medium text-amber mb-2 flex items-center gap-1">
                            <AlertTriangle size={12}/> Watch out for
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {stage.common_problems.map(prob=>(
                              <Link key={prob} href="/diagnose"
                                className="text-xs bg-white border border-amber/30 text-amber px-2 py-1 rounded-full hover:bg-amber hover:text-white transition-colors">
                                {prob}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
