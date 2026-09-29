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
  metadataBase: new URL("https://www.redefinx.com"),
  title: "reDeFinX Platform | Infraestructura de Convergencia Financiera",
  description: "El punto de encuentro donde la solidez de la banca tradicional se integra con la eficiencia de los activos digitales. Suite multi-tenant marca blanca de tesorería, comercios y wallets.",
  keywords: ["Fintech", "Web3", "Account Abstraction", "Cuentas de Orden", "Stablecoins", "Bento Grid", "White Label", "PSAVaaS", "CNV RG 1058/25"],
  authors: [{ name: "reDeFinX Team" }],
  icons: {
    icon: "/icon.png",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.redefinx.com/#organization",
        "name": "reDeFinX",
        "url": "https://www.redefinx.com",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://www.redefinx.com/#logo",
          "url": "https://www.redefinx.com/icon.png",
          "caption": "reDeFinX Logo"
        },
        "image": {
          "@id": "https://www.redefinx.com/#logo"
        },
        "description": "Infraestructura de convergencia financiera fiat-crypto de grado institucional."
      },
      {
        "@type": "WebSite",
        "@id": "https://www.redefinx.com/#website",
        "url": "https://www.redefinx.com",
        "name": "reDeFinX",
        "publisher": {
          "@id": "https://www.redefinx.com/#organization"
        },
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": "https://www.redefinx.com/?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Enlaces de Interés de reDeFinX",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "Acceso al Master (Control Panel)",
            "url": "https://www.redefinx.com/master",
            "description": "Inicie sesión en el panel maestro de administración y tesorería corporativa."
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "Portal del Inquilino (Corporate Login)",
            "url": "https://www.redefinx.com/login",
            "description": "Inicie sesión en su ecosistema financiero marca blanca personalizado."
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Documentación y APIs (Developers)",
            "url": "https://www.redefinx.com/developers",
            "description": "Consulte la especificación de API OpenAPI y SDKs para integración WaaS."
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Contáctenos",
            "url": "https://www.redefinx.com/#contacto",
            "description": "Hable con nuestro equipo de ingeniería de producto e integración fintech."
          }
        ]
      }
    ]
  };

  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
