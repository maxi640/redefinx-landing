import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "reDeFinX Platform | Infraestructura de Convergencia Financiera",
  description: "El punto de encuentro donde la solidez de la banca tradicional se integra con la eficiencia de los activos digitales. Suite multi-tenant marca blanca de tesorería, comercios y wallets.",
  keywords: ["Fintech", "Web3", "Account Abstraction", "RWA", "Stablecoins", "Bento Grid", "White Label", "PSAVaaS"],
  authors: [{ name: "reDeFinX Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
