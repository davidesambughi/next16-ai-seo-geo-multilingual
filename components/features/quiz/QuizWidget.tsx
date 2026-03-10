"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { quizSteps, matchSchools, matchNeighborhoods, QuizAnswers } from "./quiz-data";
import { QuizResult } from "./QuizResult";
import { ArrowRight } from "lucide-react";

interface QuizWidgetProps {
    translations: {
        title: string;
        subtitle: string;
        stepLabel: string;
        nextBtn: string;
        backBtn: string;
        restartBtn: string;
        budgetLow: string; budgetMid: string; budgetHigh: string;
        budgetQuestion: string;
        lifestyleQuestion: string; lifestyleCoastal: string; lifestyleCity: string; lifestyleNature: string;
        curriculumQuestion: string; curriculumBritish: string; curriculumAmerican: string; curriculumFlexible: string;
        timelineQuestion: string; timelineUrgent: string; timelinePlanning: string; timelineExploring: string;
        resultsTitle: string;
        resultsOverline: string;
        resultsSchoolsHeading: string;
        resultsNeighborhoodsHeading: string;
        viewSchoolBtn: string;
        viewNeighborhoodBtn: string;
    };
}

export function QuizWidget({ translations: t }: QuizWidgetProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswers>({});
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    const step = quizSteps[currentStep];
    const totalSteps = quizSteps.length;

    const selectedIndex = selectedOption
        ? step.options.findIndex(o => o.value === selectedOption)
        : -1;

    // Percentage position of the dot along the track (0% | 50% | 100%)
    const dotPercent = selectedIndex >= 0
        ? (selectedIndex / (step.options.length - 1)) * 100
        : null;

    function resolveLabel(labelKey: string): string {
        return (t as Record<string, string>)[labelKey] ?? labelKey;
    }

    function handleOptionClick(value: string) {
        setSelectedOption(value);
    }

    function handleNext() {
        if (!selectedOption) return;
        const newAnswers = { ...answers, [step.id]: selectedOption };
        setAnswers(newAnswers);
        setSelectedOption(null);
        if (currentStep + 1 >= totalSteps) {
            setIsComplete(true);
        } else {
            setCurrentStep(s => s + 1);
        }
    }

    function handleBack() {
        if (currentStep === 0) return;
        setCurrentStep(s => s - 1);
        const newAnswers = { ...answers };
        delete newAnswers[quizSteps[currentStep - 1].id];
        setAnswers(newAnswers);
        setSelectedOption(answers[quizSteps[currentStep - 1].id] ?? null);
    }

    function handleRestart() {
        setCurrentStep(0);
        setAnswers({});
        setSelectedOption(null);
        setIsComplete(false);
    }

    if (isComplete) {
        const schoolSlugs = matchSchools(answers);
        const neighborhoodSlugs = matchNeighborhoods(answers);
        return (
            <QuizResult
                schoolSlugs={schoolSlugs}
                neighborhoodSlugs={neighborhoodSlugs}
                translations={t}
                onRestart={handleRestart}
            />
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">

            {/* Step progress — 4 short dashes */}
            <div className="flex gap-2 justify-center mb-10">
                {quizSteps.map((_, i) => (
                    <div
                        key={i}
                        className={`h-0.5 w-8 rounded-full transition-all duration-300 ${
                            i <= currentStep ? "bg-brand" : "bg-border"
                        }`}
                    />
                ))}
            </div>

            {/* Step counter + Question */}
            <div className="text-center mb-14">
                <p className="text-[11px] text-ink-muted uppercase tracking-[0.15em] mb-4">
                    {t.stepLabel.replace("{current}", String(currentStep + 1)).replace("{total}", String(totalSteps))}
                </p>
                <h3 className="font-serif font-semibold text-2xl md:text-3xl text-ink-primary leading-snug">
                    {resolveLabel(step.questionKey)}
                </h3>
            </div>

            {/* Track selector — px-4 ensures the dot at 0% and 100% never clips */}
            <div className="mb-14 px-4">

                {/* Track line + dot */}
                <div className="relative h-6 flex items-center">

                    {/* Background line */}
                    <div className="absolute inset-x-0 h-px bg-border/60" />

                    {/* Filled line up to selected position */}
                    {dotPercent !== null && (
                        <div
                            className="absolute left-0 h-px bg-brand transition-all duration-300 ease-out"
                            style={{ width: `${dotPercent}%` }}
                        />
                    )}

                    {/* Tick marks — clickable hit areas at each snap position */}
                    {step.options.map((option, i) => {
                        const pct = (i / (step.options.length - 1)) * 100;
                        return (
                            <button
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                aria-label={resolveLabel(option.label)}
                                className="absolute -translate-x-1/2 w-10 h-6 flex items-center justify-center cursor-pointer"
                                style={{ left: `${pct}%` }}
                            >
                                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                    selectedIndex === i
                                        ? "bg-brand/20"
                                        : "bg-border hover:bg-brand/30"
                                }`} />
                            </button>
                        );
                    })}

                    {/* The single moving dot — overlays the active tick */}
                    {dotPercent !== null && (
                        <div
                            className="absolute -translate-x-1/2 w-5 h-5 bg-brand rounded-full shadow pointer-events-none transition-all duration-300 ease-out"
                            style={{ left: `${dotPercent}%` }}
                        />
                    )}
                </div>

                {/* Labels — absolutely positioned under each tick */}
                <div className="relative h-8 mt-5">
                    {step.options.map((option, i) => {
                        const pct = (i / (step.options.length - 1)) * 100;
                        const xAlign =
                            i === 0 ? "none"
                            : i === step.options.length - 1 ? "translateX(-100%)"
                            : "translateX(-50%)";
                        return (
                            <button
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className={`absolute text-sm leading-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                                    selectedIndex === i
                                        ? "text-brand font-medium"
                                        : "text-ink-muted hover:text-ink-secondary"
                                }`}
                                style={{ left: `${pct}%`, transform: xAlign }}
                            >
                                {resolveLabel(option.label)}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="text-ink-muted"
                >
                    ← {t.backBtn}
                </Button>
                <Button
                    onClick={handleNext}
                    disabled={!selectedOption}
                    size="lg"
                    className="px-8"
                >
                    {currentStep + 1 === totalSteps ? t.resultsTitle : t.nextBtn}
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
