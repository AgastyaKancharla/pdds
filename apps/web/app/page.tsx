import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#0A1A0F' }}>
      <nav className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #1C3A22' }}>
        <span className="font-display text-2xl font-bold" style={{ color: '#2ECC71' }}>🌿 PDDS</span>
        <div className="flex gap-4">
          <Link href="/login" className="btn-secondary text-sm py-2 px-4">Sign In</Link>
          <Link href="/detect" className="btn-primary text-sm py-2 px-4">Start Detection</Link>
        </div>
      </nav>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24 gap-8">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"
             style={{ backgroundColor: '#1C3A22', border: '1px solid rgba(46,204,113,0.3)', color: '#5EE87A' }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2ECC71' }} />
          AI-Powered Plant Disease Detection
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold max-w-4xl leading-tight" style={{ color: '#F5F0E8' }}>
          Know what&apos;s wrong with your{' '}
          <span style={{ color: '#2ECC71' }}>plant</span> instantly
        </h1>

        <p className="text-xl max-w-2xl" style={{ color: 'rgba(168,230,207,0.7)' }}>
          Upload a photo of any plant or crop. Our AI detects diseases in seconds,
          gives you a confidence score, severity rating, and an actionable treatment plan.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/detect" className="btn-primary text-lg px-8 py-4">📸 Detect Disease Now</Link>
          <Link href="/grow" className="btn-secondary text-lg px-8 py-4">🌱 How to Grow</Link>
        </div>

        <div className="flex gap-12 mt-8 text-center">
          {[['38+', 'Disease Classes'], ['54K+', 'Training Images'], ['95%+', 'Accuracy']].map(([val, label]) => (
            <div key={label}>
              <div className="font-mono text-3xl font-bold" style={{ color: '#2ECC71' }}>{val}</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(168,230,207,0.5)' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-24 max-w-6xl mx-auto w-full">
        {[
          { icon: '🔬', title: 'Instant Detection', desc: 'Upload 1–4 images. EfficientNet-B4 CNN identifies the disease with confidence score in seconds.' },
          { icon: '🤖', title: 'Plant Doctor AI', desc: 'Ask unlimited follow-up questions about your diagnosis. Get grounded, cited answers.' },
          { icon: '🌱', title: 'How to Grow', desc: 'Full seed-to-harvest lifecycle guides for every plant and crop.' },
        ].map((f) => (
          <div key={f.title} className="card">
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: '#F5F0E8' }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(168,230,207,0.6)' }}>{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
