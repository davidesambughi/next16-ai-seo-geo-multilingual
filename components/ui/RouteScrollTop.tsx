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

        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}

