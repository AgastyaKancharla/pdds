'use client';
import { useState, useEffect } from 'react';
import { ArrowLeft, History, Leaf, Calendar } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface Detection {
  id: string; disease_name: string; confidence: number;
  severity: string; plant_type: string; created_at: string; image_urls: string[];
}

const SEV_DOT: Record<string,string> = {
  Mild:'bg-green-400', Moderate:'bg-yellow-400', Critical:'bg-red-400',
};

export default function HistoryPage() {
  const supabase = createClient();
  const [detections, setDetections] = useState<Detection[]>([]);
  const [loading, setLoading]       = useState(true);
  const [authed, setAuthed]         = useState(false);

  useEffect(()=>{
    const load = async () => {
      const { data:{ session } } = await supabase.auth.getSession();
      if (!session) { setLoading(false); return; }
      setAuthed(true);
      const { data } = await supabase
        .from('detections')
        .select('id,disease_name,confidence,severity,plant_type,created_at,image_urls')
        .eq('status','active')
        .order('created_at',{ascending:false});
      setDetections(data||[]);
      setLoading(false);
    };
    load();
  },[]);

  return (
    <div className="min-h-screen bg-mist">
      <nav className="bg-forest text-white px-6 py-4 flex items-center gap-4">
        <Link href="/" className="hover:text-leaf"><ArrowLeft size={20}/></Link>
        <History size={20} className="text-leaf"/>
        <span className="font-display text-lg">Detection History</span>
      </nav>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl text-forest">Your Plant History</h1>
          <Link href="/detect" className="btn-primary text-sm py-2 px-4">New Detection</Link>
        </div>
        {loading
          ? <div className="space-y-4">{[...Array(3)].map((_,i)=>(
              <div key={i} className="card animate-pulse flex gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-xl"/>
                <div className="flex-1"><div className="h-4 bg-gray-200 rounded mb-2 w-1/2"/><div className="h-3 bg-gray-100 rounded w-1/3"/></div>
              </div>
            ))}</div>
          : !authed
            ? <div className="text-center py-16">
                <History size={48} className="mx-auto mb-4 text-forest/20"/>
                <p className="text-forest/60 mb-4">Sign in to view your detection history</p>
                <Link href="/auth/login" className="btn-primary">Sign In</Link>
              </div>
            : detections.length===0
              ? <div className="text-center py-16">
                  <Leaf size={48} className="mx-auto mb-4 text-forest/20"/>
                  <p className="text-forest/60 mb-4">No detections yet</p>
                  <Link href="/detect" className="btn-primary">Detect Your First Plant</Link>
                </div>
              : <div className="space-y-4">
                  {detections.map(d=>(
                    <div key={d.id} className="card flex items-center gap-4">
                      <div className="w-16 h-16 bg-leaf/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        {d.image_urls?.[0]
                          ? <img src={d.image_urls[0]} alt="" className="w-full h-full object-cover rounded-xl"/>
                          : <Leaf className="text-leaf" size={24}/>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`w-2 h-2 rounded-full ${SEV_DOT[d.severity]||'bg-gray-400'}`}/>
                          <p className="font-semibold text-forest truncate">{d.disease_name}</p>
                        </div>
                        <p className="text-sm text-forest/50">{d.plant_type||'Unknown plant'} · {d.confidence}% confidence</p>
                        <div className="flex items-center gap-1 text-xs text-forest/40 mt-1">
                          <Calendar size={12}/>
                          {formatDistanceToNow(new Date(d.created_at),{addSuffix:true})}
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        d.severity==='Mild'?'bg-green-100 text-green-700':
                        d.severity==='Moderate'?'bg-yellow-100 text-yellow-700':
                        'bg-red-100 text-red-700'}`}>{d.severity}</span>
                    </div>
                  ))}
                </div>
        }
      </div>
    </div>
  );
}
