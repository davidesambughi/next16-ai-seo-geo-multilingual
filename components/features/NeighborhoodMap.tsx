import { MapPin, ExternalLink, Coffee, School, Trees } from "lucide-react";

interface NeighborhoodMapProps {
    neighborhoodName: string;
    city?: string;
    lat: number;
    lng: number;
    exploreOnMapsLabel: string;
    amenityLabels: {
        schools: string;
        cafes: string;
        parks: string;
    };
    googleMapsUrl?: string;
}

export function NeighborhoodMap({
    neighborhoodName,
    city = "Lisbon",
    lat,
    lng,
    exploreOnMapsLabel,
    amenityLabels,
    googleMapsUrl,
}: NeighborhoodMapProps) {
    const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
    const mapsUrl =
        googleMapsUrl ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;

    const amenities = [
        { icon: School, label: amenityLabels.schools },
        { icon: Coffee, label: amenityLabels.cafes },
        { icon: Trees, label: amenityLabels.parks },
    ];

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <iframe
                title={`Amenity map for ${neighborhoodName}`}
                src={embedUrl}
                className="h-52 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />

            <div className="px-4 py-2 bg-surface-subtle border-t border-border">
                <div className="flex flex-wrap gap-2">
                    {amenities.map(({ icon: Icon, label }) => (
                        <div
                            key={label}
                            className="flex items-center gap-1 bg-card px-2 py-1 rounded-full text-xs font-medium text-ink-secondary shadow-[var(--shadow-hair)]"
                        >
                            <Icon className="h-3 w-3 text-trust" />
                            {label}
                        </div>
                    ))}
                </div>
            </div>

            <div className="px-4 py-3 bg-card flex items-center justify-between border-t border-border">
                <p className="text-sm text-ink-secondary flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-trust" />
                    {neighborhoodName}, {city}
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-trust hover:text-trust/80 transition-colors flex items-center gap-1"
                >
                    {exploreOnMapsLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
