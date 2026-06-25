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

  const inputStyle = {
    width: '100%',
    backgroundColor: '#0F2415',
    border: '1px solid #2A5232',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#F5F0E8',
    outline: 'none',
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: '#0A1A0F' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="font-display text-3xl font-bold" style={{ color: '#2ECC71' }}>🌿 PDDS</Link>
          <p className="mt-2" style={{ color: 'rgba(168,230,207,0.5)' }}>Plant Disease Detection System</p>
        </div>

        <div className="card">
          <div className="flex rounded-xl overflow-hidden p-1 mb-8" style={{ backgroundColor: '#0F2415' }}>
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all"
                style={mode === m
                  ? { backgroundColor: '#2ECC71', color: '#0A1A0F' }
                  : { color: 'rgba(168,230,207,0.5)' }}>
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {mode === 'register' && (
              <input placeholder="Full name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle} />
            )}
            <input type="email" placeholder="Email address" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle} />
            <input type="password" placeholder="Password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && handle()}
              style={inputStyle} />
          </div>

          <button onClick={handle} disabled={loading}
            className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            style={{ opacity: loading ? 0.5 : 1 }}>
            {loading ? <Loader2 className="animate-spin" size={18} /> : null}
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}
