import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'PDDS — Plant Disease Detection System',
  description: 'AI-powered plant disease detection and treatment recommendations',
  keywords: ['plant disease', 'agriculture', 'AI', 'crop health', 'farming'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
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
