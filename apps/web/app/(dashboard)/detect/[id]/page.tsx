'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Send, Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const SUGGESTED = [
  'What is the recovery rate?', 'Are there organic remedies?',
  'Can this spread to other plants?', 'Is the crop still safe to eat?',
  'How long will treatment take?', 'What caused this disease?',
];

const SeverityBadge = ({ severity }: { severity: string }) => {
  const map: Record<string, { cls: string; label: string }> = {
    healthy:  { cls: 'severity-healthy',  label: '✓ Healthy' },
    mild:     { cls: 'severity-mild',     label: '⚠ Mild' },
    moderate: { cls: 'severity-moderate', label: '⚠ Moderate' },
    critical: { cls: 'severity-critical', label: '✕ Critical' },
  };
  const s = map[severity] || map.mild;
  return <span className={s.cls}>{s.label}</span>;
};

export default function DetectionResultPage() {
  const { id } = useParams();
  const [detection, setDetection] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('pdds_token') : '';

  useEffect(() => {
    axios.get(`${API}/api/v1/detect/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(({ data }) => { setDetection(data.data); setMessages(data.data.chat_history || []); })
      .catch(() => toast.error('Failed to load detection result'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || chatLoading) return;
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setChatLoading(true);
    try {
      const { data } = await axios.post(`${API}/api/v1/chat/message`,
        { detection_id: id, question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: data.data.answer }]);
    } catch { toast.error('Plant Doctor is unavailable right now'); }
    finally { setChatLoading(false); }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0A1A0F' }}><Loader2 className="animate-spin" size={40} style={{ color: '#2ECC71' }} /></div>;
  if (!detection) return <div className="min-h-screen flex items-center justify-center text-red-400" style={{ backgroundColor: '#0A1A0F' }}>Detection not found.</div>;

  const { result, disease_info, images } = detection;

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ backgroundColor: '#0A1A0F' }}>
      {/* Result */}
      <div className="space-y-6">
        {images?.[0] && <img src={images[0]} alt="Plant" className="w-full rounded-2xl object-cover max-h-64" />}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm mb-1" style={{ color: 'rgba(168,230,207,0.5)' }}>{result.plant}</p>
              <h1 className="font-display text-3xl font-bold" style={{ color: '#F5F0E8' }}>{result.disease}</h1>
            </div>
            <SeverityBadge severity={result.severity} />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span style={{ color: 'rgba(168,230,207,0.6)' }}>Confidence</span>
              <span className="font-mono font-semibold" style={{ color: '#2ECC71' }}>{result.confidence}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#2A5232' }}>
              <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${result.confidence}%`, backgroundColor: '#2ECC71' }} />
            </div>
          </div>
        </div>

        {[
          { title: '🦠 Causes', items: disease_info?.causes },
          { title: '💊 Treatment Steps', items: disease_info?.treatment_steps },
          { title: '🛡️ Prevention', items: disease_info?.prevention },
        ].map(({ title, items }) => items?.length ? (
          <div key={title} className="card">
            <h3 className="font-semibold mb-3" style={{ color: '#F5F0E8' }}>{title}</h3>
            <ul className="space-y-2">
              {items.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm" style={{ color: 'rgba(168,230,207,0.7)' }}>
                  <span style={{ color: '#2ECC71' }}>→</span>{item}
                </li>
              ))}
            </ul>
          </div>
        ) : null)}
      </div>

      {/* Chat */}
      <div className="flex flex-col" style={{ maxHeight: '90vh', position: 'sticky', top: '24px' }}>
        <div className="card flex flex-col" style={{ height: '100%', minHeight: '500px' }}>
          <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: '1px solid #2A5232' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: 'rgba(46,204,113,0.2)' }}>🌿</div>
            <div>
              <h2 className="font-semibold" style={{ color: '#F5F0E8' }}>Plant Doctor</h2>
              <p className="text-xs" style={{ color: 'rgba(168,230,207,0.4)' }}>Ask anything about this diagnosis</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-sm mb-6" style={{ color: 'rgba(168,230,207,0.4)' }}>Ask me anything about your {result.plant}&apos;s diagnosis.</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED.map((q) => (
                    <button key={q} onClick={() => sendMessage(q)}
                      className="text-xs rounded-full px-3 py-1.5 transition-all"
                      style={{ backgroundColor: '#2A5232', border: '1px solid #3A6B44', color: 'rgba(168,230,207,0.7)' }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={msg.role === 'user'
                    ? { backgroundColor: '#2ECC71', color: '#0A1A0F', fontWeight: 500 }
                    : { backgroundColor: '#2A5232', color: 'rgba(168,230,207,0.8)' }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl px-4 py-3" style={{ backgroundColor: '#2A5232' }}>
                  <Loader2 className="animate-spin" size={16} style={{ color: '#2ECC71' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex gap-2 pt-4" style={{ borderTop: '1px solid #2A5232' }}>
            <input type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about recovery, remedies, spread..."
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none"
              style={{ backgroundColor: '#0F2415', border: '1px solid #2A5232', color: '#F5F0E8' }} />
            <button onClick={() => sendMessage(input)} disabled={!input.trim() || chatLoading}
              className="btn-primary px-4 py-3" style={{ opacity: !input.trim() || chatLoading ? 0.5 : 1 }}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
