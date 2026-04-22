import Image from "next/image";
import { TrustBar } from "./TrustBar";
import { useTranslations } from "next-intl";

/* Placeholder blur (tiny gray) to avoid CLS until image loads */
const HERO_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PJyYzYwIGZpbGw9IiM5NGEzYjgiLz48L3N2Zz4=";

/**
 * Hero — article header content, no section/container wrappers.
 * The parent article in page.tsx provides all layout context.
 */
export default function Hero() {
  const t = useTranslations("Hero");

  return (
    <>
      {/* Editorial grid — copy left, image right (bleeds off-canvas on desktop).
          items-stretch: both columns reach the same height — left column text
          top + secondary image bottom, right column portrait fills full height. */}
      {/* Desktop: Grid with 1fr copy and 42% image. Mobile: stacked block. */}
      <div className="flex flex-col md:grid md:grid-cols-[1fr_42%] gap-8 md:gap-12 md:items-stretch pt-4 md:pt-16">

        {/* Copy — article header copy */}
        <div className="order-last md:order-first flex flex-col justify-start md:pt-10 md:pb-8">
          <p className="section-overline mb-4 md:mb-5 tracking-widest">{t("overline")}</p>
          <h1 className="font-serif text-hero font-bold tracking-tight text-ink-primary leading-[1.1] mb-7">
            {t("title")}
          </h1>
          <p className="text-body text-ink-secondary leading-relaxed max-w-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Hero image — fills full column height via grid stretch, bleeds right on desktop.
            On mobile, we break out of the standard padding (-mx-6) to make it full width. */}
        <div className="order-first md:order-last relative aspect-[4/3] w-[calc(100%+3rem)] -ml-6 md:ml-0 md:aspect-auto md:w-full md:-mr-6 lg:-mr-12 overflow-hidden bg-surface-subtle overflow-x-hidden">
          {/* Explicit preload so the browser discovers the LCP image before render-blocking resources */}
          <link rel="preload" as="image" href="/hero-img.jpg" fetchPriority="high" />
          <Image
            src="/hero-img.jpg"
            alt="Expat family in Lisbon, Portugal - Raising Kids in Portugal relocation guide"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 45vw"
            placeholder="blur"
            blurDataURL={HERO_BLUR}
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* TrustBar — editorial byline strip, separated by thin rule */}
      <div className="border-t border-border mt-10 pt-6 pb-8">
        <TrustBar />
      </div>
    </>
  );
}
