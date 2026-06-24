'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Loader2, Leaf, AlertCircle, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const severityIcon = (s: string) =>
  s === 'healthy' ? <CheckCircle size={14} className="text-chlorophyll-500" /> :
  s === 'critical' ? <AlertCircle size={14} className="text-red-400" /> :
  <Leaf size={14} className="text-amber-400" />;

export default function HistoryPage() {
  const [detections, setDetections] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('pdds_token') : '';

  useEffect(() => {
    const fetch = async () => {
      try {
        const [h, s] = await Promise.all([
          axios.get(`${API}/api/v1/history`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${API}/api/v1/history/stats`, { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setDetections(h.data.data.detections);
        setStats(s.data.data);
      } catch { /* silent */ } finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="animate-spin text-chlorophyll-500" size={32} /></div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-parchment mb-2">Detection History</h1>
      <p className="text-mint-300/50 mb-8">Track your plants&apos; health over time</p>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Scans', value: stats.total_detections, color: 'text-parchment' },
            { label: 'Healthy', value: stats.healthy_count, color: 'text-chlorophyll-400' },
            { label: 'Diseased', value: stats.diseased_count, color: 'text-amber-400' },
            { label: 'Critical', value: stats.critical_count, color: 'text-red-400' },
          ].map(({ label, value, color }) => (
            <div key={label} className="card text-center">
              <div className={`font-mono text-3xl font-bold ${color}`}>{value}</div>
              <div className="text-xs text-mint-300/40 mt-1">{label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Detection list */}
      {detections.length === 0 ? (
        <div className="card text-center py-16 text-mint-300/40">
          No detections yet. <Link href="/detect" className="text-chlorophyll-400 hover:underline">Start your first scan →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {detections.map((d: any) => (
            <Link key={d._id} href={`/detect/${d._id}`}>
              <div className="card hover:border-chlorophyll-500/40 transition-all cursor-pointer flex items-center gap-4">
                {d.images?.[0] && (
                  <img src={d.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {severityIcon(d.result?.severity)}
                    <span className="font-semibold text-parchment truncate">{d.result?.disease}</span>
                  </div>
                  <p className="text-sm text-mint-300/50 mt-0.5">{d.result?.plant}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-sm text-chlorophyll-400">{d.result?.confidence}%</div>
                  <div className="text-xs text-mint-300/30 mt-1">
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
