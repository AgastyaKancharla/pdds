'use client';
import Link from 'next/link';
import { Upload, MessageCircle, BookOpen, History, Leaf, ArrowRight, Zap, Shield } from 'lucide-react';

const MODULES = [
  { icon: <Upload className="text-leaf" size={28}/>, title: 'Image Detection',
    desc: 'Upload 1–4 photos. CNN model identifies disease with confidence score and severity rating.', href: '/detect', bg: 'bg-green-50 border-green-100' },
  { icon: <MessageCircle className="text-amber" size={28}/>, title: 'Symptom Diagnosis',
    desc: 'Describe symptoms in text. NLP engine returns ranked disease matches instantly.', href: '/diagnose', bg: 'bg-amber-50 border-amber-100' },
  { icon: <Zap className="text-blue-500" size={28}/>, title: 'AI Plant Doctor',
    desc: 'Post-detection RAG chatbot powered by Llama 3. Answers grounded in your specific diagnosis.', href: '/detect', bg: 'bg-blue-50 border-blue-100' },
  { icon: <BookOpen className="text-purple-500" size={28}/>, title: 'How to Grow',
    desc: 'Full seed-to-harvest lifecycle guides with stage-by-stage care for 50+ plants.', href: '/grow', bg: 'bg-purple-50 border-purple-100' },
  { icon: <History className="text-orange-500" size={28}/>, title: 'Detection History',
    desc: 'Track your plants over time. See if they are recovering, worsening, or stable.', href: '/history', bg: 'bg-orange-50 border-orange-100' },
  { icon: <Shield className="text-forest" size={28}/>, title: 'Self-Hosted AI',
    desc: 'ML runs on your own infrastructure. Zero external API dependencies for detection or chat.', href: '/detect', bg: 'bg-gray-50 border-gray-100' },
];

const STATS = [
  { value: '38',   label: 'Disease Classes' },
  { value: '54K+', label: 'Training Images' },
  { value: '<8s',  label: 'Detection Time'  },
  { value: '96%+', label: 'Target Accuracy' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-mist">
      {/* Nav */}
      <nav className="bg-forest text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2">
          <Leaf className="text-leaf" size={28} fill="currentColor"/>
          <span className="font-display text-xl font-bold">PDDS</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/detect"   className="hover:text-leaf transition-colors">Detect</Link>
          <Link href="/diagnose" className="hover:text-leaf transition-colors">Diagnose</Link>
          <Link href="/grow"     className="hover:text-leaf transition-colors">How to Grow</Link>
          <Link href="/history"  className="hover:text-leaf transition-colors">History</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="text-sm hover:text-leaf transition-colors">Sign in</Link>
          <Link href="/detect" className="bg-leaf text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-leaf-dark transition-colors">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-forest text-white px-6 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%,#4CAF50 0%,transparent 50%),radial-gradient(circle at 80% 20%,#C17F24 0%,transparent 40%)'
        }}/>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-leaf/20 border border-leaf/30 text-leaf px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap size={14}/> Results in under 8 seconds
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your plant is trying<br/><span className="text-leaf">to tell you something.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            Point your camera at any plant. PDDS identifies the disease, explains why it happened,
            and gives you a step-by-step treatment plan — powered by AI trained on 54,000+ plant images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/detect" className="btn-primary flex items-center justify-center gap-2 text-lg px-8 py-4">
              <Upload size={20}/> Upload a Photo <ArrowRight size={16}/>
            </Link>
            <Link href="/diagnose" className="border-2 border-white/30 text-white hover:bg-white/10 flex items-center justify-center gap-2 text-lg px-8 py-4 rounded-xl font-semibold transition-all">
              <MessageCircle size={20}/> Describe Symptoms
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="font-display text-4xl text-center text-forest mb-4">Everything your plant needs</h2>
        <p className="text-center text-forest/60 mb-12 max-w-xl mx-auto">
          From instant disease detection to full lifecycle care guides.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((m) => (
            <Link key={m.title} href={m.href}
              className={`card border ${m.bg} hover:shadow-md transition-all duration-200 hover:-translate-y-1 group`}>
              <div className="mb-4">{m.icon}</div>
              <h3 className="font-semibold text-forest text-lg mb-2 group-hover:text-leaf transition-colors">{m.title}</h3>
              <p className="text-forest/60 text-sm leading-relaxed">{m.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-forest text-white px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-display text-4xl font-bold text-leaf mb-2">{s.value}</div>
              <div className="text-white/60 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white/40 px-6 py-8 text-center text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Leaf className="text-leaf" size={16}/>
          <span className="text-white font-medium">PDDS</span>
        </div>
        <p>Plant Disease Detection System · MIT License · Built by AgastyaKancharla</p>
      </footer>
    </div>
  );
}
