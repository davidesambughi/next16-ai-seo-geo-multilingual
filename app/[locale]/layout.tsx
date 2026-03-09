import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { RouteScrollTop } from "@/components/ui/RouteScrollTop";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';

/* ── Geometric sans — UI, body, captions ─────────────────────── */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

/* ── Editorial serif — display headings, pull quotes ─────────── */
const playfairDisplay = Playfair_Display({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });
  // x-default points to the English version as the canonical fallback
  languages['x-default'] = `${baseUrl}/en`;

  const ogLocaleMap: Record<string, string> = {
    en: 'en_US', pt: 'pt_PT', de: 'de_DE', fr: 'fr_FR', nl: 'nl_NL', es: 'es_ES',
  };

  return {
    metadataBase: new URL(baseUrl),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    openGraph: {
      siteName: "TrustFamily",
      locale: ogLocaleMap[locale] ?? locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "pt" | "de" | "fr" | "nl" | "es")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content — WCAG 2.1 AA */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-ink-primary focus:rounded-lg focus:shadow-lg focus:outline-2 focus:outline-brand"
          >
            Skip to main content
          </a>
          <Header />
          <RouteScrollTop />
          <div id="main-content">
            {children}
          </div>
          <Footer />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
