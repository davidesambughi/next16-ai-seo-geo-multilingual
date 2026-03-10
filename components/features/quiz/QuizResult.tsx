"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { schoolsData, getSchoolT, neighborhoodsData, getNeighborhoodT } from "@/lib/data";
import { MapPin, GraduationCap, Star, RotateCcw } from "lucide-react";
import { useLocale } from "next-intl";

interface QuizResultProps {
    schoolSlugs: string[];
    neighborhoodSlugs: string[];
    translations: {
        resultsTitle: string;
        resultsOverline: string;
        resultsSchoolsHeading: string;
        resultsNeighborhoodsHeading: string;
        viewSchoolBtn: string;
        viewNeighborhoodBtn: string;
        restartBtn: string;
    };
    onRestart: () => void;
}

export function QuizResult({ schoolSlugs, neighborhoodSlugs, translations: t, onRestart }: QuizResultProps) {
    const locale = useLocale();
    const matchedSchools = schoolSlugs
        .map((slug) => schoolsData.find((s) => s.slug === slug))
        .filter(Boolean) as typeof schoolsData;

    const matchedNeighborhoods = neighborhoodSlugs
        .map((slug) => neighborhoodsData.find((n) => n.slug === slug))
        .filter(Boolean) as typeof neighborhoodsData;

    return (
        <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-500">
            <div className="text-center mb-8">
                <p className="section-overline mb-2">{t.resultsOverline}</p>
                <h3 className="font-serif font-semibold text-3xl text-ink-primary mb-2">{t.resultsTitle}</h3>
            </div>

            {/* Matched Schools */}
            <section className="mb-8">
                <h4 className="text-base font-semibold text-ink-secondary mb-4 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-brand" />
                    {t.resultsSchoolsHeading}
                </h4>
                <div className="space-y-4">
                    {matchedSchools.map((school, idx) => (
                        <Card key={school.id}>
                            <CardHeader className="pb-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        {idx === 0 && (
                                            <Badge className="bg-warm text-primary-foreground mb-2 text-xs">
                                                <Star className="h-3 w-3 mr-1" /> Best Match
                                            </Badge>
                                        )}
                                        <CardTitle className="text-lg">{school.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1 mt-1">
                                            <MapPin className="h-3 w-3" /> {school.location} · {school.curriculum}
                                        </CardDescription>
                                    </div>
                                    <span className="text-sm font-semibold text-ink-secondary whitespace-nowrap">{school.fees}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-ink-secondary mb-4 line-clamp-2">{getSchoolT(school, locale).description}</p>
                                <Button asChild size="sm" className="w-full">
                                    <Link href={{ pathname: "/schools/[slug]", params: { slug: school.slug } }}>
                                        {t.viewSchoolBtn}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Matched Neighborhoods */}
            <section className="mb-8">
                <h4 className="text-base font-semibold text-ink-secondary mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-trust" />
                    {t.resultsNeighborhoodsHeading}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {matchedNeighborhoods.map((neighborhood) => (
                        <Card key={neighborhood.id}>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base">{neighborhood.name}</CardTitle>
                                <CardDescription>{getNeighborhoodT(neighborhood, locale).vibe}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <Link href={{ pathname: "/neighborhoods/[slug]", params: { slug: neighborhood.slug } }}>
                                        {t.viewNeighborhoodBtn}
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Restart */}
            <div className="text-center">
                <Button variant="ghost" onClick={onRestart} className="text-ink-muted">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {t.restartBtn}
                </Button>
            </div>
        </div>
    );
}
