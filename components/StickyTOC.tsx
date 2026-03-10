"use client";

import { useState, useEffect } from "react";
import { List, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
    id: string;
    label: string;
}

interface StickyTOCProps {
    sections: Section[];
    title?: string;
    mobileSectionsTitle?: string;
    mobileButtonLabel?: string;
    scrollingLabel?: string;
}

export function StickyTOC({
    sections,
    title = "In this guide",
    mobileSectionsTitle = "Guide Sections",
    mobileButtonLabel = "In this guide",
    scrollingLabel = "Scrolling...",
}: StickyTOCProps) {
    const [activeId, setActiveId] = useState<string>("");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [desktopMaxHeight, setDesktopMaxHeight] = useState("70vh");

    // Track active section on scroll
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        const observerOptions = {
            rootMargin: "-20% 0px -70% 0px", // Trigger when section is in top-ish part of viewport
            threshold: 0,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        sections.forEach((section) => {
            const el = document.getElementById(section.id);
            if (el) observer.observe(el);
        });

        // Show sticky TOC only after scrolling past the first 400px
        const handleScroll = () => {
            setIsVisible(window.scrollY > 400);

            const footer = document.querySelector("footer");
            if (!footer) {
                setDesktopMaxHeight("70vh");
                return;
            }

            const footerTop = footer.getBoundingClientRect().top;
            const topOffset = 128; // top-32
            const safeGap = 16;
            const available = Math.floor(footerTop - topOffset - safeGap);

            // Keep default size while far from footer; shrink near footer to avoid overlap.
            if (available > 500) {
                setDesktopMaxHeight("70vh");
                return;
            }

            if (available <= 120) {
                setDesktopMaxHeight("120px");
                return;
            }

            setDesktopMaxHeight(`${available}px`);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScroll);
        };
    }, [sections]);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 80; // offset for sticky header if any
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setIsMobileMenuOpen(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* ── DESKTOP SIDEBAR ── */}
            <aside
                className="hidden lg:block fixed left-[calc(50%+480px)] top-32 w-64 h-fit overflow-y-auto pr-4 border-l border-border pl-6 animate-in fade-in slide-in-from-right-4 duration-500"
                style={{ maxHeight: desktopMaxHeight }}
            >
                <h2 className="section-overline mb-6">{title}</h2>
                <nav>
                    <ul className="space-y-4">
                        {sections.map((section, i) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "text-sm text-left transition-all hover:text-brand",
                                        activeId === section.id
                                            ? "text-brand font-semibold translate-x-1"
                                            : "text-ink-muted"
                                    )}
                                >
                                    <span className="mr-2 opacity-50">{i + 1}.</span>
                                    {section.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* ── MOBILE BOTTOM BAR ── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-full duration-300">
                {/* Mobile Menu Backdrop */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Mobile TOC List */}
                <div className={cn(
                    "bg-surface-card border-t border-border rounded-t-2xl px-6 py-6 transition-transform duration-300 shadow-float",
                    isMobileMenuOpen ? "translate-y-0" : "translate-y-full h-0 py-0 overflow-hidden border-none"
                )}>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="section-overline">{mobileSectionsTitle}</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-ink-muted p-1">
                            <ChevronDown size={20} />
                        </button>
                    </div>
                    <ul className="space-y-4 max-h-[50vh] overflow-y-auto pb-4">
                        {sections.map((section, i) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => scrollToSection(section.id)}
                                    className={cn(
                                        "w-full text-left py-2 border-b border-border/50 text-base",
                                        activeId === section.id ? "text-brand font-semibold" : "text-ink-secondary"
                                    )}
                                >
                                    <span className="mr-3 opacity-50">{i + 1}.</span>
                                    {section.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* The Mini Bar (< 60px) */}
                <div className="bg-surface-card/90 backdrop-blur-md border-t border-border px-6 h-[58px] flex items-center justify-between shadow-lift">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="flex items-center gap-2 text-sm font-semibold text-ink-primary"
                    >
                        <List size={18} className="text-brand" />
                        <span>{mobileButtonLabel}</span>
                    </button>

                    <div className="flex-1 truncate mx-4 text-center">
                        <span className="text-xs text-brand font-medium truncate inline-block max-w-full">
                            {sections.find(s => s.id === activeId)?.label || scrollingLabel}
                        </span>
                    </div>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="p-2 text-ink-muted hover:text-brand transition-colors"
                    >
                        <ChevronUp size={20} />
                    </button>
                </div>
            </div>
        </>
    );
}
