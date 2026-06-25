'use client';
import { useState } from 'react';
import { Leaf, Loader, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router   = useRouter();
  const supabase = createClient();
  const [mode, setMode]         = useState<'login'|'register'>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      if (mode === 'register') {
        const { error: err } = await supabase.auth.signUp({
          email, password, options: { data: { name } },
        });
        if (err) throw err;
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
      router.push('/detect');
    } catch (e: any) {
      setError(e.message || 'Authentication failed');
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  };

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <Leaf className="text-leaf" size={28}/>
          <span className="font-display text-2xl text-forest">PDDS</span>
        </div>
        <h1 className="font-display text-3xl text-forest mb-2">
          {mode==='login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p className="text-forest/50 mb-6 text-sm">
          {mode==='login' ? 'Sign in to your plant health dashboard' : 'Start detecting plant diseases for free'}
        </p>

        <div className="space-y-3">
          {mode==='register' && (
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"
              className="w-full border border-forest/20 rounded-xl px-4 py-3 focus:outline-none focus:border-leaf"/>
          )}
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email"
            className="w-full border border-forest/20 rounded-xl px-4 py-3 focus:outline-none focus:border-leaf"/>
          <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"
            className="w-full border border-forest/20 rounded-xl px-4 py-3 focus:outline-none focus:border-leaf"/>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl mt-4 text-sm">
            <AlertCircle size={16}/>{error}
          </div>
        )}

        <button onClick={handleSubmit} disabled={loading||!email||!password}
          className="w-full btn-primary mt-5 py-4 flex items-center justify-center gap-2 disabled:opacity-50">
          {loading
            ? <><Loader className="animate-spin" size={18}/>{mode==='login'?'Signing in...':'Creating account...'}</>
            : mode==='login' ? 'Sign In' : 'Create Account'}
        </button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-forest/10"/></div>
          <div className="relative flex justify-center"><span className="bg-white px-3 text-xs text-forest/40">or</span></div>
        </div>

        <button onClick={handleGoogle}
          className="w-full border border-forest/20 rounded-xl py-3 text-sm font-medium text-forest hover:bg-mist transition-colors flex items-center justify-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <p className="text-center text-sm text-forest/50 mt-5">
          {mode==='login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={()=>{setMode(mode==='login'?'register':'login');setError('');}}
            className="text-leaf font-medium hover:underline">
            {mode==='login' ? 'Create one' : 'Sign in'}
          </button>
        </p>

        <div className="border-t border-forest/10 mt-5 pt-4">
          <Link href="/detect" className="block text-center text-sm text-forest/40 hover:text-forest transition-colors">
            Continue without account →
          </Link>
        </div>
      </div>
    </div>
  );
}
