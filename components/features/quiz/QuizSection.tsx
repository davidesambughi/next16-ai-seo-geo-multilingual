import { getTranslations } from "next-intl/server";
import { QuizWidget } from "./QuizWidget";

/**
 * QuizSection — Server Component wrapper.
 *
 * Pattern: fetch translations on the server, pass them as plain props
 * to the Client Component QuizWidget. This keeps the quiz SSR-friendly
 * (no hydration mismatch) and avoids useTranslations in a client boundary.
 */
export async function QuizSection({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: "Quiz" });

    const translations = {
        title: t("title"),
        subtitle: t("subtitle"),
        stepLabel: t.raw("stepLabel") as string,
        nextBtn: t("nextBtn"),
        backBtn: t("backBtn"),
        restartBtn: t("restartBtn"),
        // Budget step
        budgetQuestion: t("budgetQuestion"),
        budgetLow: t("budgetLow"),
        budgetMid: t("budgetMid"),
        budgetHigh: t("budgetHigh"),
        // Lifestyle step
        lifestyleQuestion: t("lifestyleQuestion"),
        lifestyleCoastal: t("lifestyleCoastal"),
        lifestyleCity: t("lifestyleCity"),
        lifestyleNature: t("lifestyleNature"),
        // Curriculum step
        curriculumQuestion: t("curriculumQuestion"),
        curriculumBritish: t("curriculumBritish"),
        curriculumAmerican: t("curriculumAmerican"),
        curriculumFlexible: t("curriculumFlexible"),
        // Timeline step
        timelineQuestion: t("timelineQuestion"),
        timelineUrgent: t("timelineUrgent"),
        timelinePlanning: t("timelinePlanning"),
        timelineExploring: t("timelineExploring"),
        // Results
        resultsTitle: t("resultsTitle"),
        resultsOverline: t("resultsOverline"),
        resultsSchoolsHeading: t("resultsSchoolsHeading"),
        resultsNeighborhoodsHeading: t("resultsNeighborhoodsHeading"),
        viewSchoolBtn: t("viewSchoolBtn"),
        viewNeighborhoodBtn: t("viewNeighborhoodBtn"),
    };

    return (
        <section id="quiz" className="py-20 px-6 bg-surface-subtle">
            <div className="max-w-3xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="section-overline mb-3">{t("badge")}</p>
                    <h2 className="section-heading mb-4">{t("title")}</h2>
                    <p className="section-body max-w-xl mx-auto">{t("subtitle")}</p>
                </div>

                {/* Quiz Widget (Client Component) */}
                <div className="bg-card rounded-2xl shadow-[var(--shadow-float)] border border-border p-8">
                    <QuizWidget translations={translations} />
                </div>
            </div>
        </section>
    );
}
