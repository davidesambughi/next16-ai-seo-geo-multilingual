import { Link } from "@/i18n/navigation";

export default function Footer() {
    return (
        <footer className="py-12 px-6 mt-auto bg-[var(--footer-bg)] text-[var(--footer-text)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <Link href="/" className="font-serif text-2xl font-semibold text-[var(--footer-heading)] mb-3 block tracking-tight">
                        Raising Kids in Portugal
                    </Link>
                    <p className="text-[var(--footer-text-muted)] text-sm leading-relaxed">
                        Independent intelligence for families relocating to Portugal.
                        We verify schools and neighborhoods so you can move with confidence.
                    </p>
                    <p className="text-[var(--footer-text-muted)] text-xs mt-4">
                        100% independent · No paid placements
                    </p>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">Explore</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/best-private-and-public-international-schools-portugal-2026" className="hover:text-[var(--footer-heading)] transition-colors">
                            International Schools
                        </Link>
                        <Link href="/top-neighborhoods" className="hover:text-[var(--footer-heading)] transition-colors">
                            Family Neighborhoods
                        </Link>
                        <Link href="/relocation-guide" className="hover:text-[var(--footer-heading)] transition-colors">
                            Relocation Guide
                        </Link>
                        <Link href="/school-finder" className="hover:text-[var(--footer-heading)] transition-colors">
                            School Finder Quiz
                        </Link>
                        <Link href="/blog" className="hover:text-[var(--footer-heading)] transition-colors">
                            Blog & Guides
                        </Link>
                    </div>
                </div>

                {/* Company */}
                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">Company</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/about" className="hover:text-[var(--footer-heading)] transition-colors">
                            About Raising Kids in Portugal
                        </Link>
                        <Link href="/contact" className="hover:text-[var(--footer-heading)] transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-[var(--footer-heading)] font-semibold mb-3 text-sm uppercase tracking-wide">Legal</h3>
                    <div className="flex flex-col gap-2 text-sm">
                        <Link href="/privacy" className="hover:text-[var(--footer-heading)] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[var(--footer-heading)] transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                    <p className="text-[var(--footer-text-muted)] text-xs mt-6">
                        © {new Date().getFullYear()} Raising Kids in Portugal.<br />
                        All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
