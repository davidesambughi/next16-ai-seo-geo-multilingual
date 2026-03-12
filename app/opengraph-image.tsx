import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Raising Kids in Portugal Relocation — Best International Schools & Neighborhoods in Portugal';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default Open Graph image for social sharing (Twitter, LinkedIn, Facebook).
 * Rendered at the edge for zero cold start latency.
 * Page-level OG images can override this by exporting their own opengraph-image.
 */
export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #0a7ea4 100%)',
                    fontFamily: 'sans-serif',
                    padding: '60px',
                }}
            >
                {/* Brand */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        marginBottom: '32px',
                    }}
                >
                    <div
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '12px',
                            background: '#38bdf8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                        }}
                    >
                        🏡
                    </div>
                    <span style={{ color: '#38bdf8', fontSize: '28px', fontWeight: 700, letterSpacing: '-0.5px' }}>
                        Raising Kids in Portugal
                    </span>
                </div>

                {/* Headline */}
                <h1
                    style={{
                        color: '#ffffff',
                        fontSize: '52px',
                        fontWeight: 800,
                        textAlign: 'center',
                        lineHeight: 1.15,
                        margin: '0 0 20px',
                        letterSpacing: '-1px',
                    }}
                >
                    Best International Schools &amp; Neighborhoods in Portugal
                </h1>

                {/* Sub */}
                <p
                    style={{
                        color: '#94a3b8',
                        fontSize: '22px',
                        textAlign: 'center',
                        margin: '0 0 40px',
                        maxWidth: '780px',
                    }}
                >
                    Independent data · 200+ parent reviews · Updated 2026
                </p>

                {/* Trust badges */}
                <div style={{ display: 'flex', gap: '16px' }}>
                    {['100% Independent', 'Verified by Families', 'Updated 2026'].map((badge) => (
                        <div
                            key={badge}
                            style={{
                                background: 'rgba(56,189,248,0.15)',
                                border: '1px solid rgba(56,189,248,0.4)',
                                borderRadius: '999px',
                                color: '#7dd3fc',
                                fontSize: '15px',
                                fontWeight: 600,
                                padding: '8px 20px',
                            }}
                        >
                            {badge}
                        </div>
                    ))}
                </div>
            </div>
        ),
        { ...size }
    );
}
