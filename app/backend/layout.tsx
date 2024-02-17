import type { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Tdnizer',
  description: 'Tdnizer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="ja">{children}</html>;
}
