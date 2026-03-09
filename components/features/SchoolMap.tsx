import { MapPin, ExternalLink } from "lucide-react";

interface SchoolMapProps {
    schoolName: string;
    location: string;
    lat: number;
    lng: number;
    openInMapsLabel: string;
    googleMapsUrl?: string;
}

export function SchoolMap({ schoolName, location, lat, lng, openInMapsLabel, googleMapsUrl }: SchoolMapProps) {
    const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&output=embed`;
    const mapsUrl =
        googleMapsUrl ??
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${lat},${lng}`)}`;

    return (
        <div className="rounded-xl border border-border overflow-hidden">
            <iframe
                title={`Map showing location of ${schoolName}`}
                src={embedUrl}
                className="h-48 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
            />

            <div className="px-4 py-3 bg-card flex items-center justify-between">
                <p className="text-sm text-ink-secondary flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand" />
                    {location}, Portugal
                </p>
                <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-brand hover:text-brand/80 transition-colors flex items-center gap-1"
                >
                    {openInMapsLabel}
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    );
}
