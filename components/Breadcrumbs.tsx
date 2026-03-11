"use client";

import { usePathname } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { getBreadcrumbPath } from "@/lib/breadcrumbs";

export function Breadcrumbs({ leafLabel }: { leafLabel?: string }) {
    const pathname = usePathname();
    const tNav = useTranslations("Navigation");
    const tCrumb = useTranslations("Breadcrumbs");

    // Don't show breadcrumbs on home page
    if (pathname === "/") return null;

    const logicalLabelMap: Record<string, string> = {
        "/best-private-and-public-international-schools-portugal-2026": tCrumb("schoolsGuide"),
        "/top-neighborhoods": tCrumb("neighborhoodsGuide"),
        "/relocation-guide": tCrumb("relocationGuide"),
        "/school-finder": tNav("schoolFinder"),
        "/about": tNav("about"),
        "/blog": tCrumb("blog"),
        "/privacy": tCrumb("privacy"),
        "/terms": tCrumb("terms"),
        "/contact": tCrumb("contact"),
    };

    const pathSegments = pathname.split("/").filter((segment) => segment);

    return (
        <nav className="flex items-center text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            {/* BreadcrumbList JSON-LD is rendered server-side by each page via <JsonLd> */}
            <ol className="flex items-center space-x-2">
                <li>
                    <Link href="/" className="hover:text-foreground transition-colors">
                        {tNav("home")}
                    </Link>
                </li>

                {pathSegments.map((segment, index) => {
                    // Reconstruct path for next-intl Link
                    let href = `/${pathSegments.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathSegments.length - 1;

                    // Use centralized mapping for parent routes
                    const mappedPath = getBreadcrumbPath(segment);
                    if (mappedPath) {
                        href = mappedPath;
                    }

                    // Prefer translated label for known logical routes.
                    const translatedLabel = logicalLabelMap[href];

                    // Fallback: format segment for display
                    const formatSegment = (str: string) => {
                        return str
                            .replace(/-/g, " ")
                            .replace(/\b\w/g, (char) => char.toUpperCase());
                    };
                    // For the leaf node, prefer the explicit entity name passed by the page.
                    const displayLabel = (isLast && leafLabel) ? leafLabel : (translatedLabel ?? formatSegment(segment));

                    return (
                        <li key={segment} className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2" />
                            {isLast ? (
                                <span className="font-medium text-foreground" aria-current="page">
                                    {displayLabel}
                                </span>
                            ) : (
                                <Link href={href as any} className="hover:text-foreground transition-colors">
                                    {displayLabel}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
