'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Loader2, CheckCircle, AlertCircle, Leaf } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function HistoryPage() {
  const [detections, setDetections] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('pdds_token') : '';

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/api/v1/history`, { headers: { Authorization: `Bearer ${token}` } }),
      axios.get(`${API}/api/v1/history/stats`, { headers: { Authorization: `Bearer ${token}` } }),
    ]).then(([h, s]) => { setDetections(h.data.data.detections); setStats(s.data.data); })
    .catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center py-24" style={{ backgroundColor: '#0A1A0F' }}><Loader2 className="animate-spin" size={32} style={{ color: '#2ECC71' }} /></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10" style={{ backgroundColor: '#0A1A0F', minHeight: '100vh' }}>
      <h1 className="font-display text-4xl font-bold mb-2" style={{ color: '#F5F0E8' }}>Detection History</h1>
      <p className="mb-8" style={{ color: 'rgba(168,230,207,0.5)' }}>Track your plants&apos; health over time</p>

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Scans', value: stats.total_detections, color: '#F5F0E8' },
            { label: 'Healthy', value: stats.healthy_count, color: '#2ECC71' },
            { label: 'Diseased', value: stats.diseased_count, color: '#E8B84B' },
            { label: 'Critical', value: stats.critical_count, color: '#f87171' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card text-center">
              <div className="font-mono text-3xl font-bold" style={{ color }}>{value}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(168,230,207,0.4)' }}>{label}</div>
            </div>
          ))}
        </div>
      )}

      {detections.length === 0 ? (
        <div className="card text-center py-16" style={{ color: 'rgba(168,230,207,0.4)' }}>
          No detections yet.{' '}
          <Link href="/detect" style={{ color: '#2ECC71' }}>Start your first scan →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {detections.map((d: any) => (
            <Link key={d._id} href={`/detect/${d._id}`}>
              <div className="card flex items-center gap-4 cursor-pointer transition-all hover:border-green-500">
                {d.images?.[0] && <img src={d.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {d.result?.severity === 'healthy'
                      ? <CheckCircle size={14} style={{ color: '#2ECC71' }} />
                      : d.result?.severity === 'critical'
                      ? <AlertCircle size={14} style={{ color: '#f87171' }} />
                      : <Leaf size={14} style={{ color: '#E8B84B' }} />}
                    <span className="font-semibold truncate" style={{ color: '#F5F0E8' }}>{d.result?.disease}</span>
                  </div>
                  <p className="text-sm mt-0.5" style={{ color: 'rgba(168,230,207,0.5)' }}>{d.result?.plant}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-sm" style={{ color: '#2ECC71' }}>{d.result?.confidence}%</div>
                  <div className="text-xs mt-1" style={{ color: 'rgba(168,230,207,0.3)' }}>
                    {formatDistanceToNow(new Date(d.created_at), { addSuffix: true })}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
