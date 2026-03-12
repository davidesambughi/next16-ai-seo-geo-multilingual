/**
 * Root layout — exists solely to provide metadataBase globally.
 *
 * WHY: Next.js resolves relative OG image URLs (from app/opengraph-image.tsx)
 * against metadataBase. Without this root layout, Next.js falls back to
 * http://localhost:3000 and emits a build warning for every page.
 *
 * The html/body structure and locale providers live in app/[locale]/layout.tsx.
 * This layout just passes children through.
 */
import type { Metadata } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://raisingkidsinportugal.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
