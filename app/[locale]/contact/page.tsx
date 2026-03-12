import { Breadcrumbs } from "@/components/Breadcrumbs";
import Form from "@/components/form";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });
    return {
        title: `Contact Us — Raising Kids in Portugal`,
        description: "Get in touch with Raising Kids in Portugal. Our relocation experts help international families find the right school and neighborhood in Portugal.",
        alternates: {
            canonical: `${BASE}/en/contact`,
            languages: {
                en: `${BASE}/en/contact`,
                pt: `${BASE}/pt/contato`,
                de: `${BASE}/de/kontakt`,
                fr: `${BASE}/fr/contact`,
                nl: `${BASE}/nl/contact`,
                es: `${BASE}/es/contacto`,
                'x-default': `${BASE}/en/contact`,
            },
        },
        openGraph: {
            title: `Contact Us — Raising Kids in Portugal`,
            description: "Get in touch with Raising Kids in Portugal. Our relocation experts help international families find the right school and neighborhood in Portugal.",
            url: `${BASE}/en/contact`,
            siteName: "Raising Kids in Portugal",
            type: "website",
            images: [{ url: `${BASE}/opengraph-image`, width: 1200, height: 630, alt: 'Raising Kids in Portugal — International Schools & Neighborhoods in Portugal' }],
        },
        twitter: {
            card: "summary_large_image",
            title: `Contact Us — Raising Kids in Portugal`,
            description: "Get in touch with Raising Kids in Portugal. Our relocation experts help international families find the right school and neighborhood in Portugal.",
        },
    };
}

export default async function ContactPage({ params }: PageProps) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "ContactPage" });
    return (
        <main className="container mx-auto px-4 py-12 max-w-2xl">
            <Breadcrumbs />
            <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-4 mt-6">
                {t("h1")}
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
                {t("subtitle")}
            </p>
            <Form />
        </main>
    );
}
