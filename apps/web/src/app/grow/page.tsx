'use client';
import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Leaf, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

interface Plant { name: string; slug: string; category: string; difficulty: string; description: string }

const DIFF: Record<string,string> = {
  beginner:     'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  expert:       'bg-red-100 text-red-700',
};

export default function GrowPage() {
  const supabase = createClient();
  const [plants, setPlants]   = useState<Plant[]>([]);
  const [query, setQuery]     = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      let q = supabase.from('plants').select('name,slug,category,difficulty,description');
      if (query) q = q.ilike('name', `%${query}%`);
      const { data } = await q.order('name');
      setPlants(data || []);
      setLoading(false);
    };
    load();
  }, [query]);

  return (
    <div className="min-h-screen bg-mist">
      <nav className="bg-forest text-white px-6 py-4 flex items-center gap-4">
        <Link href="/" className="hover:text-leaf"><ArrowLeft size={20}/></Link>
        <Leaf className="text-leaf" size={20}/>
        <span className="font-display text-lg">How to Grow</span>
      </nav>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl text-forest mb-2">Plant Care Library</h1>
          <p className="text-forest/60">Seed-to-harvest guides for every plant</p>
        </div>
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-forest/40" size={18}/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search plants..."
            className="w-full bg-white border border-forest/20 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-leaf"/>
        </div>
        {loading
          ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(6)].map((_,i)=>(
              <div key={i} className="card animate-pulse"><div className="h-4 bg-gray-200 rounded mb-2"/><div className="h-3 bg-gray-100 rounded w-2/3"/></div>
            ))}</div>
          : plants.length===0
            ? <div className="text-center py-16 text-forest/50"><Leaf size={48} className="mx-auto mb-4 opacity-30"/><p>No plants found.</p></div>
            : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plants.map(p=>(
                  <Link key={p.slug} href={`/grow/${p.slug}`}
                    className="card hover:border-leaf transition-all hover:-translate-y-1 hover:shadow-md group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 bg-leaf/10 rounded-xl flex items-center justify-center">
                        <Leaf className="text-leaf" size={20}/>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${DIFF[p.difficulty]||'bg-gray-100 text-gray-600'}`}>
                        {p.difficulty}
                      </span>
                    </div>
                    <h3 className="font-semibold text-forest mb-1 group-hover:text-leaf transition-colors">{p.name}</h3>
                    <p className="text-xs text-forest/50 capitalize mb-2">{p.category}</p>
                    <p className="text-sm text-forest/60 line-clamp-2">{p.description}</p>
                    <div className="flex items-center gap-1 mt-3 text-leaf text-sm font-medium">
                      View guide <ChevronRight size={14}/>
                    </div>
                  </Link>
                ))}
              </div>
        }
      </div>
    </div>
  );
}
