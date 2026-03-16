import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("Footer");

    return (
        <footer className="py-12 px-6 mt-auto bg-[var(--footer-bg)] text-[var(--footer-text)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <Link href="/" className="flex items-center gap-3 mb-3">
                        <Image 
                            src="/logo.png" 
                            alt="Logo Raising Kids in Portugal" 
                            width={24} 
                            height={24} 
                            className="w-6 h-6 object-contain"
                        />
                        <span className="font-serif text-xl font-semibold tracking-tight text-[var(--footer-heading)]">Raising Kids in Portugal</span>
                    </Link>
                    <p className="text-[var(--footer-text-muted)] text-sm leading-relaxed">
                        {t("description")}
                    </p>
                    <p className="text-[var(--footer-text-muted)] text-xs mt-4">
                        {t("tagline")}
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">{t("explore")}</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/best-private-and-public-international-schools-portugal-2026" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkSchools")}
                        </Link>
                        <Link href="/top-neighborhoods" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkNeighborhoods")}
                        </Link>
                        <Link href="/relocation-guide" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkGuide")}
                        </Link>
                        <Link href="/school-finder" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkQuiz")}
                        </Link>
                        <Link href="/blog" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkBlog")}
                        </Link>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">{t("company")}</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/about" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkAbout")}
                        </Link>
                        <Link href="/contact" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkContact")}
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">{t("legal")}</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/privacy" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkPrivacy")}
                        </Link>
                        <Link href="/terms" className="hover:text-[var(--footer-heading)] transition-colors">
                            {t("linkTerms")}
                        </Link>
                    </div>
                    <div className="text-[var(--footer-text-muted)] text-[10px] leading-relaxed mt-6 space-y-2">
                        <p>
                            © {new Date().getFullYear()} Raising Kids in Portugal.
                        </p>
                        <p className="border-t border-border/10 pt-2 italic">
                            {t("disclaimer")}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
