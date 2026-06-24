import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDDS — Plant Disease Detection System',
  description: 'AI-powered plant disease detection and treatment recommendations',
  keywords: ['plant disease', 'agriculture', 'AI', 'crop health', 'farming'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-forest-950 text-parchment font-body antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: { background: '#1C3A22', color: '#F5F0E8', border: '1px solid #2ECC71' },
          }}
        />
      </body>
    </html>
  );
}
