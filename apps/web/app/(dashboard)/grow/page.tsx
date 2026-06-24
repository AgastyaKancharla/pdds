'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function GrowPage() {
  const [plants, setPlants] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/education/plants`, { params: { search } });
        setPlants(data.data.plants);
      } catch { /* silent */ } finally { setLoading(false); }
    };
    const t = setTimeout(fetch, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-parchment mb-2">How to Grow</h1>
      <p className="text-mint-300/50 mb-8">Full seed-to-harvest lifecycle guides for every plant</p>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-mint-300/30" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tomato, potato, corn..."
          className="w-full bg-forest-800 border border-forest-700 rounded-xl pl-12 pr-4 py-3
                     text-parchment placeholder-mint-300/30 focus:outline-none focus:border-chlorophyll-500/50"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="animate-spin text-chlorophyll-500" size={32} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map((p: any) => (
            <Link key={p._id} href={`/grow/${p.name.toLowerCase()}`}>
              <div className="card hover:border-chlorophyll-500/50 transition-all cursor-pointer h-full">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-semibold text-parchment">{p.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    p.difficulty === 'easy' ? 'severity-healthy' :
                    p.difficulty === 'moderate' ? 'severity-mild' : 'severity-moderate'
                  }`}>{p.difficulty}</span>
                </div>
                <p className="text-xs text-mint-300/40 italic mb-3">{p.scientific_name}</p>
                <p className="text-sm text-mint-300/60 leading-relaxed line-clamp-3">{p.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-mint-300/40">
                  <span>🗓️ {p.lifecycle_days} days</span>
                  <span>·</span>
                  <span>🏷️ {p.category}</span>
                </div>
              </div>
            </Link>
          ))}
          {plants.length === 0 && (
            <div className="col-span-3 text-center py-16 text-mint-300/40">
              No plants found for &quot;{search}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
