"use client";

import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import JournalForm from "@/components/organisms/JournalForm";

export default function EditJournal() {
  const { id } = useParams();
  const router = useRouter();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (id) {
      fetchJournalData();
    }
  }, [id]);

  const fetchJournalData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/journal/${id}`,
        {
          withCredentials: true,
        },
      );
      setInitialData(response.data.journal);
    } catch (error) {
      console.error("Error fetching journal details:", error);
      setErrorMsg(
        "Failed to load journal. It may have been deleted or you don't have permission.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-700"></div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="max-w-4xl mx-auto mt-10">
        <div className="p-6 bg-status-burnout/10 text-status-burnout border border-status-burnout/20 rounded-2xl">
          <h3 className="font-bold mb-2">Error</h3>
          <p>{errorMsg}</p>
          <button
            onClick={() => router.push("/dashboard/history")}
            className="mt-4 px-4 py-2 bg-white text-text-dark rounded-xl border border-neutral-border text-sm font-semibold hover:bg-neutral-50"
          >
            Return to History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="flex items-start sm:items-center gap-4">
        <Link
          href="/dashboard/history"
          className="p-2.5 rounded-xl bg-white border border-neutral-border text-text-muted hover:text-text-dark hover:border-sage-400 transition-all shadow-xs shrink-0 mt-1 sm:mt-0"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-text-dark">Edit Journal</h1>
          <p className="text-text-muted text-sm mt-1">Update your past entry</p>
        </div>
      </div>

      {/* FORM */}
      <JournalForm isEdit={true} initialData={initialData} />
    </div>
  );
}
