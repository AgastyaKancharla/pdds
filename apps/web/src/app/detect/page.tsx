'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Loader, Leaf, AlertCircle, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
type Severity = 'Mild' | 'Moderate' | 'Critical';

interface DetectionResult {
  detection_id: string;
  disease: { name: string; scientific_name: string; confidence: number; severity: Severity; affected_part: string };
  causes: string[];
  treatment_steps: string[];
  prevention: string[];
  sources: { title: string; url: string }[];
}

interface ChatMsg { role: 'user' | 'assistant'; content: string }

const SEV: Record<Severity, string> = {
  Mild:     'bg-green-100 text-green-800 border border-green-200',
  Moderate: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  Critical: 'bg-red-100 text-red-800 border border-red-200',
};

const SUGGESTIONS = [
  'Is this contagious to nearby plants?',
  'What organic treatments can I use?',
  'How long will recovery take?',
  'Can I still eat the fruit?',
  'What caused this?',
];

export default function DetectPage() {
  const supabase = createClient();
  const [files, setFiles]       = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [plantType, setPlantType] = useState('');
  const [loading, setLoading]   = useState(false);
  const [result, setResult]     = useState<DetectionResult | null>(null);
  const [error, setError]       = useState('');
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const onDrop = useCallback((accepted: File[]) => {
    const all = [...files, ...accepted].slice(0, 4);
    setFiles(all);
    setPreviews(all.map(f => URL.createObjectURL(f)));
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpg','.jpeg','.png','.webp'] }, maxFiles: 4,
  });

  const removeFile = (i: number) => {
    const nf = files.filter((_,idx)=>idx!==i);
    setFiles(nf); setPreviews(nf.map(f=>URL.createObjectURL(f)));
  };

  const handleDetect = async () => {
    if (!files.length) return;
    setLoading(true); setError(''); setResult(null);
    try {
      // Upload images to Supabase Storage
      const { data: { session } } = await supabase.auth.getSession();
      const prefix = session ? session.user.id : 'guest';
      const imageUrls: string[] = [];

      for (const file of files) {
        const path = `${prefix}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('plant-images').upload(path, file, { upsert: false });
        if (!uploadError) {
          const { data } = supabase.storage.from('plant-images').getPublicUrl(path);
          imageUrls.push(data.publicUrl);
        }
      }

      // Call detection service via gateway
      const form = new FormData();
      files.forEach(f => form.append('images', f));
      if (plantType) form.append('plant_type', plantType);

      const headers: Record<string,string> = {};
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;

      const res = await fetch(`${API}/api/v1/detect`, { method: 'POST', headers, body: form });
      if (!res.ok) throw new Error((await res.json()).error || 'Detection failed');
      setResult(await res.json());
    } catch (e: any) {
      setError(e.message || 'Detection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const sendChat = async (msg: string) => {
    if (!msg.trim() || !result) return;
    setChatMsgs(p => [...p, { role: 'user', content: msg }]);
    setChatInput(''); setChatLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const headers: Record<string,string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      const res = await fetch(`${API}/api/v1/chat/${result.detection_id}`, {
        method: 'POST', headers, body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setChatMsgs(p => [...p, { role: 'assistant', content: data.response }]);
    } catch {
      setChatMsgs(p => [...p, { role: 'assistant', content: 'Sorry, I could not respond right now.' }]);
    } finally { setChatLoading(false); }
  };

  return (
    <div className="min-h-screen bg-mist">
      <nav className="bg-forest text-white px-6 py-4 flex items-center gap-4">
        <Link href="/" className="hover:text-leaf transition-colors"><ArrowLeft size={20}/></Link>
        <Leaf className="text-leaf" size={24}/>
        <span className="font-display text-lg">Disease Detection</span>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {!result ? (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="font-display text-4xl text-forest mb-2">Detect Plant Disease</h1>
              <p className="text-forest/60">Upload 1–4 photos for the most accurate diagnosis</p>
            </div>

            <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-leaf bg-green-50 scale-[1.01]' : 'border-forest/20 bg-white hover:border-leaf hover:bg-green-50/50'}`}>
              <input {...getInputProps()}/>
              <div className="flex flex-col items-center gap-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                  ${isDragActive ? 'bg-leaf text-white' : 'bg-leaf/10 text-leaf'}`}>
                  <Upload size={28}/>
                </div>
                <div>
                  <p className="font-semibold text-forest text-lg">
                    {isDragActive ? 'Drop your photos here' : 'Drag & drop plant photos'}
                  </p>
                  <p className="text-forest/50 text-sm mt-1">or click to browse · JPG, PNG, WebP · Max 10MB · Up to 4 images</p>
                </div>
              </div>
            </div>

            {previews.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {previews.map((src,i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                    <img src={src} alt="" className="w-full h-full object-cover"/>
                    <button onClick={()=>removeFile(i)}
                      className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600">
                      <X size={10}/>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="card">
              <label className="block text-sm font-medium text-forest mb-2">
                Plant type <span className="text-forest/40 font-normal">(optional — improves accuracy)</span>
              </label>
              <input value={plantType} onChange={e=>setPlantType(e.target.value)}
                placeholder="e.g. Tomato, Potato, Apple..."
                className="w-full border border-forest/20 rounded-xl px-4 py-3 text-forest focus:outline-none focus:border-leaf focus:ring-2 focus:ring-leaf/20"/>
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
                <AlertCircle size={18}/> {error}
              </div>
            )}

            <button onClick={handleDetect} disabled={!files.length || loading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading
                ? <><Loader className="animate-spin" size={20}/> Analysing your plant...</>
                : <><Leaf size={20}/> Detect Disease</>}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <button onClick={()=>{setResult(null);setFiles([]);setPreviews([]);setChatMsgs([]);}}
                className="flex items-center gap-2 text-forest/60 hover:text-forest transition-colors text-sm">
                <ArrowLeft size={16}/> New Detection
              </button>
              <span className="text-xs text-forest/30">ID: {result.detection_id.slice(0,8)}...</span>
            </div>

            {/* Result card */}
            <div className="card border-l-4 border-l-leaf">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="text-leaf" size={16}/>
                    <span className="text-sm text-forest/60">{result.disease.confidence}% confidence</span>
                  </div>
                  <h2 className="font-display text-3xl text-forest">{result.disease.name}</h2>
                  <p className="text-forest/50 italic text-sm mt-1">{result.disease.scientific_name}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${SEV[result.disease.severity]}`}>
                    {result.disease.severity}
                  </span>
                  <span className="text-xs text-forest/40">Affected: {result.disease.affected_part}</span>
                </div>
              </div>
              {previews.length > 0 && (
                <div className="flex gap-2">
                  {previews.map((src,i)=>(
                    <img key={i} src={src} alt="" className="w-14 h-14 rounded-lg object-cover border border-mist-dark"/>
                  ))}
                </div>
              )}
            </div>

            {/* Causes */}
            <div className="card">
              <h3 className="font-semibold text-forest mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber inline-block"/> Why this happened
              </h3>
              <ul className="space-y-2">
                {result.causes.map((c,i)=>(
                  <li key={i} className="text-forest/70 text-sm flex items-start gap-2">
                    <span className="text-amber mt-0.5">•</span>{c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatment */}
            <div className="card border border-leaf/20 bg-green-50/30">
              <h3 className="font-semibold text-forest mb-4">Treatment Plan</h3>
              <ol className="space-y-3">
                {result.treatment_steps.map((s,i)=>(
                  <li key={i} className="flex items-start gap-3 text-sm text-forest/80">
                    <span className="w-6 h-6 rounded-full bg-leaf text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i+1}
                    </span>{s}
                  </li>
                ))}
              </ol>
            </div>

            {/* Prevention */}
            <div className="card">
              <h3 className="font-semibold text-forest mb-3">Prevention Tips</h3>
              <ul className="space-y-2">
                {result.prevention.map((p,i)=>(
                  <li key={i} className="text-forest/70 text-sm flex items-start gap-2">
                    <CheckCircle className="text-leaf mt-0.5 flex-shrink-0" size={14}/>{p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat */}
            <div className="card border border-blue-100 bg-blue-50/20">
              <h3 className="font-semibold text-forest mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold">AI</span>
                Ask Plant Doctor
              </h3>
              {chatMsgs.length === 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {SUGGESTIONS.map(q=>(
                    <button key={q} onClick={()=>sendChat(q)}
                      className="text-xs bg-white border border-forest/15 text-forest/70 px-3 py-1.5 rounded-full hover:border-leaf hover:text-leaf transition-colors">
                      {q}
                    </button>
                  ))}
                </div>
              )}
              {chatMsgs.length > 0 && (
                <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
                  {chatMsgs.map((m,i)=>(
                    <div key={i} className={`flex ${m.role==='user'?'justify-end':'justify-start'}`}>
                      <div className={`max-w-sm px-4 py-3 rounded-2xl text-sm leading-relaxed
                        ${m.role==='user'
                          ? 'bg-forest text-white rounded-br-sm'
                          : 'bg-white text-forest border border-mist-dark rounded-bl-sm'}`}>
                        {m.content}
                      </div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-mist-dark px-4 py-3 rounded-2xl rounded-bl-sm">
                        <Loader className="animate-spin text-leaf" size={16}/>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <input value={chatInput} onChange={e=>setChatInput(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&sendChat(chatInput)}
                  placeholder="Ask about treatment, spread risk, recovery..."
                  className="flex-1 border border-forest/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-leaf"/>
                <button onClick={()=>sendChat(chatInput)} disabled={!chatInput.trim()||chatLoading}
                  className="bg-forest text-white px-4 rounded-xl hover:bg-leaf transition-colors disabled:opacity-40">
                  <Send size={16}/>
                </button>
              </div>
            </div>

            {result.sources.length > 0 && (
              <p className="text-xs text-forest/40">
                Sources: {result.sources.map((s,i)=>(
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="underline hover:text-leaf mr-2">{s.title}</a>
                ))}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
