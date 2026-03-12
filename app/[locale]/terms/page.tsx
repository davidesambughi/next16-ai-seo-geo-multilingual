import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://raisingkidsinportugal.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await params;
    return {
        title: "Terms of Service — Raising Kids in Portugal",
        description: "Raising Kids in Portugal terms of service. Rules and conditions for using our website and services.",
        alternates: {
            canonical: `${BASE}/en/terms`,
            languages: {
                en: `${BASE}/en/terms`,
                pt: `${BASE}/pt/termos`,
                de: `${BASE}/de/agb`,
                fr: `${BASE}/fr/conditions`,
                nl: `${BASE}/nl/voorwaarden`,
                es: `${BASE}/es/terminos`,
                'x-default': `${BASE}/en/terms`,
            },
        },
        robots: { index: false, follow: false },
    };
}

export default async function TermsPage({ params }: PageProps) {
    await params;
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <Breadcrumbs />
            <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-4 mt-6">
                Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: March 2026</p>

            <div className="prose max-w-none space-y-8 text-muted-foreground">
                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">1. Acceptance of Terms</h2>
                    <p>By accessing or using the Raising Kids in Portugal website at raisingkidsinportugal.com, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">2. Nature of the Service</h2>
                    <p>Raising Kids in Portugal provides informational content to help international families research schools and neighborhoods in Portugal. The information on this site is provided in good faith and based on publicly available data. It does not constitute legal, financial, or educational advice.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">3. Accuracy of Information</h2>
                    <p>We strive to keep school and neighborhood data accurate and up to date. However, fees, curricula, and other details may change without notice. Always verify critical information directly with the school or relevant authority before making decisions.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">4. Intellectual Property</h2>
                    <p>All editorial content on this site — including school verdicts, neighborhood guides, and relocation articles — is the property of Raising Kids in Portugal. You may not reproduce or distribute it without written permission.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">5. Limitation of Liability</h2>
                    <p>Raising Kids in Portugal is not liable for any decisions made based on information found on this site. We are not responsible for the actions of third-party schools, agencies, or service providers listed or referenced on the site.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">6. Changes to These Terms</h2>
                    <p>We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.</p>
                </section>
            </div>
        </main>
    );
}
