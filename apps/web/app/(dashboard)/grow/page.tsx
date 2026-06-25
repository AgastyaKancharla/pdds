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
    const t = setTimeout(() => {
      axios.get(`${API}/api/v1/education/plants`, { params: { search } })
        .then(({ data }) => setPlants(data.data.plants))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10" style={{ backgroundColor: '#0A1A0F', minHeight: '100vh' }}>
      <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#F5F0E8' }}>How to Grow</h1>
      <p className="mb-8" style={{ color: 'rgba(168,230,207,0.5)' }}>Full seed-to-harvest lifecycle guides</p>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: 'rgba(168,230,207,0.3)' }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tomato, potato, corn..."
          className="w-full rounded-xl pl-12 pr-4 py-3 outline-none"
          style={{ backgroundColor: '#1C3A22', border: '1px solid #2A5232', color: '#F5F0E8' }} />
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="animate-spin" size={32} style={{ color: '#2ECC71' }} /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {plants.map((p: any) => (
            <Link key={p._id} href={`/grow/${p.name.toLowerCase()}`}>
              <div className="card cursor-pointer h-full transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-xl font-semibold" style={{ color: '#F5F0E8' }}>{p.name}</h3>
                  <span className={p.difficulty === 'easy' ? 'severity-healthy' : p.difficulty === 'moderate' ? 'severity-mild' : 'severity-moderate'}>
                    {p.difficulty}
                  </span>
                </div>
                <p className="text-xs italic mb-3" style={{ color: 'rgba(168,230,207,0.4)' }}>{p.scientific_name}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,230,207,0.6)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                <div className="mt-4 flex items-center gap-2 text-xs" style={{ color: 'rgba(168,230,207,0.4)' }}>
                  <span>🗓️ {p.lifecycle_days} days</span><span>·</span><span>🏷️ {p.category}</span>
                </div>
              </div>
            </Link>
          ))}
          {plants.length === 0 && (
            <div className="col-span-3 text-center py-16" style={{ color: 'rgba(168,230,207,0.4)' }}>No plants found for &quot;{search}&quot;</div>
          )}
        </div>
      )}
    </div>
  );
}
