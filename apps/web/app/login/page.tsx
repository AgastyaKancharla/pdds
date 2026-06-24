'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handle = async () => {
    setLoading(true);
    try {
      const endpoint = mode === 'login' ? '/api/v1/auth/login' : '/api/v1/auth/register';
      const { data } = await axios.post(`${API}${endpoint}`, form);
      localStorage.setItem('pdds_token', data.data.token);
      toast.success(mode === 'login' ? 'Welcome back!' : 'Account created!');
      router.push('/detect');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forest-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-3xl text-chlorophyll-500 font-bold">🌿 PDDS</Link>
          <p className="text-mint-300/50 mt-2">Plant Disease Detection System</p>
        </div>

        <div className="card">
          <div className="flex rounded-xl overflow-hidden bg-forest-900 p-1 mb-8">
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all
                  ${mode === m ? 'bg-chlorophyll-500 text-forest-950' : 'text-mint-300/50 hover:text-parchment'}`}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <input placeholder="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-forest-900 border border-forest-700 rounded-xl px-4 py-3 text-parchment
                           placeholder-mint-300/30 focus:outline-none focus:border-chlorophyll-500/50" />
            )}
            <input type="email" placeholder="Email address" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-forest-900 border border-forest-700 rounded-xl px-4 py-3 text-parchment
                         placeholder-mint-300/30 focus:outline-none focus:border-chlorophyll-500/50" />
            <input type="password" placeholder="Password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handle()}
              className="w-full bg-forest-900 border border-forest-700 rounded-xl px-4 py-3 text-parchment
                         placeholder-mint-300/30 focus:outline-none focus:border-chlorophyll-500/50" />
          </div>

          <button onClick={handle} disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
