"use client";

import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();

    // IMPORTANT: these are the LOGICAL route keys from i18n/routing.ts
    // next-intl's Link component handles the locale-aware URL translation automatically.
    // Do NOT use the translated SEO slugs here (e.g. '/family-friendly-neighborhoods-portugal').
    const navItems = [
        { href: "/" as const, label: t('home'), match: (path: string) => path === "/" },
        {
            href: "/best-private-and-public-international-schools-portugal-2026" as const,
            label: t('schools'),
            match: (path: string) =>
                path === "/best-private-and-public-international-schools-portugal-2026" ||
                path.startsWith("/schools"),
        },
        {
            href: "/top-neighborhoods" as const,
            label: t('neighborhoods'),
            match: (path: string) =>
                path === "/top-neighborhoods" ||
                path.startsWith("/neighborhoods"),
        },
        { href: "/relocation-guide" as const, label: t('guides'), match: (path: string) => path === "/relocation-guide" },
        { href: "/school-finder" as const, label: t('schoolFinder'), match: (path: string) => path === "/school-finder" },
        { href: "/about" as const, label: t('about'), match: (path: string) => path === "/about" },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-serif text-h3 font-semibold tracking-tight text-ink-primary">Raising Kids in Portugal</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={item.match(pathname) ? "page" : undefined}
                            className={cn(
                                "text-body-sm border-b-2 border-transparent pb-1 transition-colors",
                                item.match(pathname)
                                    ? "font-semibold text-ink-primary border-brand"
                                    : "font-medium text-ink-secondary hover:text-ink-primary",
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Menu</SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-4 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        aria-current={item.match(pathname) ? "page" : undefined}
                                        className={cn(
                                            "text-body transition-colors",
                                            item.match(pathname)
                                                ? "font-semibold text-ink-primary underline underline-offset-4 decoration-brand decoration-2"
                                                : "font-medium hover:text-primary",
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="mt-4 pt-4 border-t">
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
