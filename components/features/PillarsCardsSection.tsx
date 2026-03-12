import Image from "next/image";
import { Link as I18nLink } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/**
 * PillarsCardsSection — editorial feature spread, no section/container wrappers.
 * The parent article in page.tsx provides all layout context and padding.
 */
export function PillarsCardsSection() {
    const t = useTranslations('Pillars');

    return (
        <div>
            {/* Editorial section intro — i18n'd, left-aligned */}
            <div className="max-w-2xl mb-14">
                <p className="section-overline mb-3">{t("introOverline")}</p>
                <h2 className="section-heading mb-5">{t("introHeading")}</h2>
                <p className="section-body text-ink-secondary">{t("introBody")}</p>
            </div>

            {/* Asymmetric editorial spread — cover story left, sidebar right */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-start">

                {/* Cover story — Relocation Guide (dominant feature) */}
                <I18nLink href="/relocation-guide" className="group block">
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-subtle mb-7">
                        <Image
                            src="/guides-card-img.png"
                            alt="Family relocating to Portugal — Raising Kids in Portugal relocation guide 2026"
                            fill
                            loading="lazy"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        />
                    </div>
                    <p className="section-overline mb-3">{t("softLandingTitle")}</p>
                    <h3 className="font-serif font-semibold text-h2 text-ink-primary leading-tight mb-4 group-hover:text-brand transition-colors duration-200">
                        {t("introHeading")}
                    </h3>
                    <p className="text-body text-ink-secondary leading-relaxed mb-5 max-w-xl">
                        {t("softLandingTeaser")}
                    </p>
                    <span className="inline-flex items-center text-sm font-medium text-brand gap-1 group-hover:gap-2 transition-all duration-200">
                        {t("readGuide")}
                        <span aria-hidden="true">→</span>
                    </span>
                </I18nLink>

                {/* Sidebar — Schools + Neighborhoods (secondary features) */}
                <div className="flex flex-col gap-10 lg:border-l lg:border-border lg:pl-10">

                    {/* Schools */}
                    <I18nLink
                        href="/best-private-and-public-international-schools-portugal-2026"
                        className="group block"
                    >
                        <div className="relative w-full aspect-video overflow-hidden bg-surface-subtle mb-4">
                            <Image
                                src="/school-card-img.png"
                                alt="International school campus in Portugal — Raising Kids in Portugal schools guide"
                                fill
                                loading="lazy"
                                sizes="(max-width: 1024px) 100vw, 35vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                        </div>
                        <p className="section-overline mb-2">{t("educationTitle")}</p>
                        <h3 className="font-serif font-semibold text-h3 text-ink-primary leading-tight mb-3 group-hover:text-brand transition-colors duration-200">
                            {t("educationDesc")}
                        </h3>
                        <span className="inline-flex items-center text-sm font-medium text-brand gap-1 group-hover:gap-2 transition-all duration-200">
                            {t("readGuide")}
                            <span aria-hidden="true">→</span>
                        </span>
                    </I18nLink>

                    <hr className="border-border" />

                    {/* Neighborhoods */}
                    <I18nLink href="/top-neighborhoods" className="group block">
                        <div className="relative w-full aspect-video overflow-hidden bg-surface-subtle mb-4">
                            <Image
                                src="/neighborhood-card-img.png"
                                alt="Family-friendly neighborhood in Cascais, Portugal — Raising Kids in Portugal neighborhoods guide"
                                fill
                                loading="lazy"
                                sizes="(max-width: 1024px) 100vw, 35vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                        </div>
                        <p className="section-overline mb-2">{t("livingTitle")}</p>
                        <h3 className="font-serif font-semibold text-h3 text-ink-primary leading-tight mb-3 group-hover:text-brand transition-colors duration-200">
                            {t("livingDesc")}
                        </h3>
                        <span className="inline-flex items-center text-sm font-medium text-brand gap-1 group-hover:gap-2 transition-all duration-200">
                            {t("readGuide")}
                            <span aria-hidden="true">→</span>
                        </span>
                    </I18nLink>

                </div>
            </div>
        </div>
    );
}
