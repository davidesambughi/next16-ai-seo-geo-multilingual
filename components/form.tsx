"use client";

import { useActionState, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { submitLead, State } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { schoolsData, neighborhoodsData } from "@/lib/data";

const initialState: State = { message: null, errors: {} };

type FormValues = {
    fullName: string;
    nationality: string;
    email: string;
    phone: string;
    interestedSchool: string;
    interestedNeighborhood: string;
    message: string;
};

const emptyValues: FormValues = {
    fullName: "",
    nationality: "",
    email: "",
    phone: "",
    interestedSchool: "",
    interestedNeighborhood: "",
    message: "",
};

export default function Form() {
    const t = useTranslations("Form");
    // @ts-ignore - useActionState type mismatch with React 19 types sometimes
    const [state, formAction, isPending] = useActionState(submitLead, initialState);
    const [submitted, setSubmitted] = useState(false);
    const [values, setValues] = useState<FormValues>(emptyValues);

    useEffect(() => { if (state.success) setSubmitted(true); }, [state.success]);

    const set = (field: keyof FormValues) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setValues((v) => ({ ...v, [field]: e.target.value }));

    if (submitted) {
        return (
            <div className="bg-trust-light p-6 rounded-xl text-center border border-trust/30">
                <h3 className="text-xl font-semibold text-ink-primary mb-2">{t("success.title")}</h3>
                <p className="text-ink-secondary">{t("success.message")}</p>
                <div className="mt-4">
                    <Button variant="outline" onClick={() => window.location.reload()}>{t("success.resetBtn")}</Button>
                </div>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4 bg-card p-6 rounded-xl shadow-[var(--shadow-hair)] border border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="fullName">{t("fields.fullName")}</Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        placeholder={t("fields.fullNamePlaceholder")}
                        aria-describedby="fullName-error"
                        value={values.fullName}
                        onChange={set("fullName")}
                    />
                    <div id="fullName-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.fullName && state.errors.fullName.map((error: string) => (
                            <p className="mt-2 text-sm text-destructive" key={error}>{error}</p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nationality">{t("fields.nationality")}</Label>
                    <Input
                        id="nationality"
                        name="nationality"
                        placeholder={t("fields.nationalityPlaceholder")}
                        aria-describedby="nationality-error"
                        value={values.nationality}
                        onChange={set("nationality")}
                    />
                    <div id="nationality-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.nationality && state.errors.nationality.map((error: string) => (
                            <p className="mt-2 text-sm text-destructive" key={error}>{error}</p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="email">{t("fields.email")}</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t("fields.emailPlaceholder")}
                        aria-describedby="email-error"
                        value={values.email}
                        onChange={set("email")}
                    />
                    <div id="email-error" aria-live="polite" aria-atomic="true">
                        {state.errors?.email && state.errors.email.map((error: string) => (
                            <p className="mt-2 text-sm text-destructive" key={error}>{error}</p>
                        ))}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">{t("fields.phone")}</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder={t("fields.phonePlaceholder")}
                        value={values.phone}
                        onChange={set("phone")}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="interestedSchool">{t("fields.school")}</Label>
                    <Select
                        name="interestedSchool"
                        value={values.interestedSchool}
                        onValueChange={(val) => setValues((v) => ({ ...v, interestedSchool: val }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t("fields.schoolPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                            {[...schoolsData].sort((a, b) => a.name.localeCompare(b.name)).map((school) => (
                                <SelectItem key={school.id} value={school.name}>
                                    {school.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="interestedNeighborhood">{t("fields.neighborhood")}</Label>
                    <Select
                        name="interestedNeighborhood"
                        value={values.interestedNeighborhood}
                        onValueChange={(val) => setValues((v) => ({ ...v, interestedNeighborhood: val }))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={t("fields.neighborhoodPlaceholder")} />
                        </SelectTrigger>
                        <SelectContent>
                            {[...neighborhoodsData].sort((a, b) => a.name.localeCompare(b.name)).map((neighborhood) => (
                                <SelectItem key={neighborhood.id} value={neighborhood.name}>
                                    {neighborhood.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">{t("fields.message")}</Label>
                <Textarea
                    id="message"
                    name="message"
                    placeholder={t("fields.messagePlaceholder")}
                    className="resize-none"
                    aria-describedby="message-error"
                    value={values.message}
                    onChange={set("message")}
                />
                <div id="message-error" aria-live="polite" aria-atomic="true">
                    {state.errors?.message && state.errors.message.map((error: string) => (
                        <p className="mt-2 text-sm text-destructive" key={error}>{error}</p>
                    ))}
                </div>
            </div>

            {/* Honeypot — hidden from real users, filled only by bots */}
            <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
            >
                <label htmlFor="trap">Leave this field empty</label>
                <input
                    id="trap"
                    name="trap"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>

            <Button type="submit" className="w-full text-lg py-6" disabled={isPending}>
                {isPending ? t("submittingBtn") : t("submitBtn")}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
                {t("privacyNote")}
            </p>
        </form>
    );
}
