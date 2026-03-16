import { JsonLd } from "@/components/JsonLd";

interface SchoolSchemaProps {
    name: string;
    description?: string;
    slug: string;
    location: string;
    fees?: string;
    curriculum?: string;
    coordinates?: { lat: number; lng: number } | null;
    acceptanceRate?: string;
    inspectionDate?: string;
}

export function SchoolSchema({
    name,
    description,
    slug,
    location,
    fees,
    curriculum,
    coordinates,
    acceptanceRate,
    inspectionDate
}: SchoolSchemaProps) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://raisingkidsinportugal.com";

    const schema = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${baseUrl}/en/school/${slug}#school`,
        "name": name,
        "description": description,
        "url": `${baseUrl}/school/${slug}`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": location,
            "addressCountry": "PT",
        },
        ...(coordinates && {
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": coordinates.lat,
                "longitude": coordinates.lng,
            },
        }),
        ...(acceptanceRate && {
            "additionalProperty": {
                "@type": "PropertyValue",
                "name": "acceptanceRate",
                "value": acceptanceRate,
            }
        }),
        ...(curriculum && {
            "knowsAbout": curriculum
        }),
        ...(fees && {
            "offers": {
                "@type": "Offer",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "description": fees
                }
            }
        }),
        ...(inspectionDate && { "dateModified": inspectionDate }),
    };

    return <JsonLd data={schema} />;
}
