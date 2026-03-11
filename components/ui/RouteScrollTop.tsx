"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/navigation";

export function RouteScrollTop() {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Skip scroll-to-top when navigating to a hash anchor — let the browser handle it.
        if (window.location.hash) return;

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}

