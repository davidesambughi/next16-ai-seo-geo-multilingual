import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";

interface PageProps {
    params: Promise<{ locale: string }>;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://trustfamily.com';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await params;
    return {
        title: "Privacy Policy — TrustFamily",
        description: "TrustFamily privacy policy. How we collect, use, and protect your personal data.",
        alternates: {
            canonical: `${BASE}/en/privacy`,
            languages: {
                en: `${BASE}/en/privacy`,
                pt: `${BASE}/pt/privacidade`,
                de: `${BASE}/de/datenschutz`,
                fr: `${BASE}/fr/confidentialite`,
                nl: `${BASE}/nl/privacy`,
                es: `${BASE}/es/privacidad`,
                'x-default': `${BASE}/en/privacy`,
            },
        },
        robots: { index: false, follow: false },
    };
}

export default async function PrivacyPage({ params }: PageProps) {
    await params;
    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <Breadcrumbs />
            <h1 className="font-serif font-semibold text-4xl text-ink-primary mb-4 mt-6">
                Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-10">Last updated: March 2026</p>

            <div className="prose max-w-none space-y-8 text-muted-foreground">
                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">1. Who We Are</h2>
                    <p>TrustFamily operates the website at trustfamily.com. We provide relocation guidance and lead-generation services for international families moving to Portugal. For privacy-related questions, contact us at the address provided on our contact page.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">2. Data We Collect</h2>
                    <p>We collect personal data only when you submit the contact form on our website. This includes: your name, email address, phone number (optional), nationality, and any message you send us. We do not use tracking cookies beyond standard analytics.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">3. How We Use Your Data</h2>
                    <p>We use your contact information solely to respond to your inquiry and provide the relocation assistance you requested. We do not sell your data to third parties. We do not use your data for automated decision-making.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">4. Data Retention</h2>
                    <p>We retain your contact information for as long as necessary to provide our services, or until you request deletion. To request deletion of your data, contact us via the form on our contact page.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">5. Your Rights (GDPR)</h2>
                    <p>If you are located in the European Union, you have the right to access, correct, delete, or port your personal data. You also have the right to object to processing. To exercise any of these rights, contact us directly.</p>
                </section>

                <section>
                    <h2 className="font-serif font-semibold text-2xl text-ink-primary mb-3">6. Changes to This Policy</h2>
                    <p>We may update this policy as the service evolves. Significant changes will be noted on this page with a revised date. Continued use of the site after changes constitutes acceptance of the updated policy.</p>
                </section>
            </div>
        </main>
    );
}
