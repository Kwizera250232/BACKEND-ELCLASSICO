import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'El Classico — Beach & Lake Resort',
  description:
    'Luxury apartments, boat bookings, gardens, events, and magazine at El Classico, Gisenyi.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Montserrat:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
