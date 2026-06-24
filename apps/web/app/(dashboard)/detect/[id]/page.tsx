'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Send, Loader2, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const SUGGESTED_QUESTIONS = [
  'What is the recovery rate?',
  'Are there organic remedies?',
  'Can this spread to other plants?',
  'Is the crop still safe to eat?',
  'How long will treatment take?',
  'What caused this disease?',
];

const SeverityBadge = ({ severity }: { severity: string }) => {
  const map: Record<string, { cls: string; icon: React.ReactNode; label: string }> = {
    healthy:  { cls: 'severity-healthy',  icon: <CheckCircle size={14}/>,   label: 'Healthy' },
    mild:     { cls: 'severity-mild',     icon: <AlertTriangle size={14}/>, label: 'Mild' },
    moderate: { cls: 'severity-moderate', icon: <AlertTriangle size={14}/>, label: 'Moderate' },
    critical: { cls: 'severity-critical', icon: <AlertCircle size={14}/>,  label: 'Critical' },
  };
  const s = map[severity] || map.mild;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
      {s.icon} {s.label}
    </span>
  );
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
    const fetchDetection = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/detect/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDetection(data.data);
        setMessages(data.data.chat_history || []);
      } catch {
        toast.error('Failed to load detection result');
      } finally {
        setLoading(false);
      }
    };
    fetchDetection();
  }, [id]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || chatLoading) return;
    const userMsg = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setChatLoading(true);
    try {
      const { data } = await axios.post(
        `${API}/api/v1/chat/message`,
        { detection_id: id, question },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: data.data.answer }]);
    } catch {
      toast.error('Plant Doctor is unavailable right now');
    } finally {
      setChatLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-chlorophyll-500" size={40} />
      </div>
    );
  }

  if (!detection) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Detection not found.
      </div>
    );
  }

  const { result, disease_info, images } = detection;

  return (
    <div className="min-h-screen bg-forest-950 max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ─── LEFT: Detection Result ─────────────────────────── */}
      <div className="space-y-6 animate-fade-up">
        {/* Image */}
        {images?.[0] && (
          <img src={images[0]} alt="Plant" className="w-full rounded-2xl object-cover max-h-64" />
        )}

        {/* Result header */}
        <div className="card">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-mint-300/50 text-sm mb-1">{result.plant}</p>
              <h1 className="font-display text-3xl font-bold text-parchment">{result.disease}</h1>
            </div>
            <SeverityBadge severity={result.severity} />
          </div>

          {/* Confidence meter */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-mint-300/60">Confidence</span>
              <span className="font-mono text-chlorophyll-400 font-semibold">{result.confidence}%</span>
            </div>
            <div className="h-2 bg-forest-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-chlorophyll-500 rounded-full transition-all duration-1000"
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>

          {result.low_confidence && (
            <div className="mt-4 flex gap-2 text-amber-400 text-sm bg-amber-500/10 
                            border border-amber-500/30 rounded-xl p-3">
              <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
              {result.low_confidence_message}
            </div>
          )}
        </div>

        {/* Disease info sections */}
        {[
          { title: '🦠 Causes', items: disease_info?.causes },
          { title: '💊 Treatment Steps', items: disease_info?.treatment_steps },
          { title: '🛡️ Prevention', items: disease_info?.prevention },
        ].map(({ title, items }) => items?.length ? (
          <div key={title} className="card">
            <h3 className="font-semibold text-parchment mb-3">{title}</h3>
            <ul className="space-y-2">
              {items.map((item: string, i: number) => (
                <li key={i} className="flex gap-2 text-sm text-mint-300/70">
                  <span className="text-chlorophyll-500 font-bold mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null)}

        {/* Key stats */}
        {disease_info && (
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Recovery Rate', value: disease_info.recovery_rate },
              { label: 'Spread Risk', value: disease_info.spread_risk },
              { label: 'Time to Recovery', value: disease_info.time_to_recovery },
              { label: 'Affected Parts', value: disease_info.affected_parts?.join(', ') },
            ].filter(s => s.value).map(({ label, value }) => (
              <div key={label} className="card py-4">
                <p className="text-xs text-mint-300/40 mb-1">{label}</p>
                <p className="text-sm text-parchment font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Sources */}
        {disease_info?.sources?.length > 0 && (
          <div className="card">
            <h3 className="font-semibold text-parchment mb-3">📚 Sources</h3>
            {disease_info.sources.map((s: any, i: number) => (
              <a key={i} href={s.url} target="_blank" rel="noopener noreferrer"
                 className="text-sm text-chlorophyll-400 hover:underline block">
                {s.title} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ─── RIGHT: Plant Doctor Chat ────────────────────────── */}
      <div className="flex flex-col h-full max-h-screen sticky top-6">
        <div className="card flex-1 flex flex-col min-h-0">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-forest-700">
            <div className="w-10 h-10 rounded-full bg-chlorophyll-500/20 flex items-center 
                            justify-center text-xl animate-pulse-green">
              🌿
            </div>
            <div>
              <h2 className="font-semibold text-parchment">Plant Doctor</h2>
              <p className="text-xs text-mint-300/40">Ask anything about this diagnosis</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <p className="text-mint-300/40 text-sm mb-6">
                  I know everything about your {result.plant}&apos;s diagnosis. Ask me anything.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs bg-forest-700 hover:bg-forest-600 border border-forest-600 
                                 hover:border-chlorophyll-500/50 rounded-full px-3 py-1.5 
                                 text-mint-300/70 hover:text-parchment transition-all"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-chlorophyll-500 text-forest-950 font-medium rounded-br-sm'
                      : 'bg-forest-700 text-mint-300/80 rounded-bl-sm'}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-forest-700 rounded-2xl rounded-bl-sm px-4 py-3">
                  <Loader2 className="animate-spin text-chlorophyll-500" size={16} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 border-t border-forest-700 pt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about recovery, remedies, spread..."
              className="flex-1 bg-forest-900 border border-forest-700 rounded-xl px-4 py-3
                         text-sm text-parchment placeholder-mint-300/30 
                         focus:outline-none focus:border-chlorophyll-500/50"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || chatLoading}
              className="btn-primary px-4 py-3 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
