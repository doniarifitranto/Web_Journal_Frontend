'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import JournalForm from "@/components/organisms/JournalForm";

export default function CreateJournal() {
    return (
        <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* HEADER */}
            <div className="flex items-start sm:items-center gap-4">
                <Link
                    href="/dashboard"
                    className="p-2.5 rounded-xl bg-white border border-neutral-border text-text-muted hover:text-text-dark hover:border-sage-400 transition-all shadow-xs shrink-0 mt-1 sm:mt-0"
                >
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-text-dark">Create New Journal</h1>
                    <p className="text-text-muted text-sm mt-1">Write down your thoughts and track your emotional state</p>
                </div>
            </div>

            {/* FORM */}
            <JournalForm />
        </div>
    );
}