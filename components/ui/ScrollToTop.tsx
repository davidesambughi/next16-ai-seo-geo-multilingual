"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * ScrollToTop — floating action button that appears after scrolling 400px.
 * Uses CSS transitions (opacity + scale) instead of Framer Motion to avoid
 * bundling the entire framer-motion library on every page.
 */
export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
    const t = useTranslations("Common");

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label={t("scrollToTop")}
            // Keep in DOM for CSS transition; hide from AT and pointer events when invisible
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
            className={cn(
                "fixed bottom-6 right-6 z-[60] flex h-12 w-12 items-center justify-center rounded-full",
                "bg-brand text-white shadow-float ring-1 ring-brand-light",
                "transition-all duration-200 ease-out",
                "hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                "md:bottom-8 md:right-8 lg:bottom-10 lg:right-10",
                isVisible
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 translate-y-2.5 pointer-events-none"
            )}
        >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
        </button>
    );
};
