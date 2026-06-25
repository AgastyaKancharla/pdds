import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PDDS — Plant Disease Detection System',
  description: 'Point your camera at any plant → know what is wrong → know exactly what to do.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-mist font-body text-forest antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
