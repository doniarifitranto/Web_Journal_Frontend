import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Calendar, Save } from "lucide-react";
import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { ENDPOINTS } from "@/lib/api";

export default function JournalForm({ isEdit = false, initialData = null }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toTimeString().split(" ")[0].slice(0, 5),
  );
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isEdit && initialData) {
      setTitle(initialData.title || "");
      setContent(initialData.journal_text || "");

      // Backend tidak simpan date/time terpisah — ambil dari createdAt
      if (initialData.createdAt) {
        const dt = new Date(initialData.createdAt);
        setDate(dt.toISOString().split("T")[0]);
        setTime(dt.toTimeString().split(" ")[0].slice(0, 5));
      }
    }
  }, [isEdit, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      if (isEdit) {
        // PUT /api/journal/:id — backend hanya menerima title & journal_text
        await axios.put(
          ENDPOINTS.journalById(initialData._id),
          { title, journal_text: content },
          { withCredentials: true },
        );
      } else {
        // POST /api/journal — backend hanya menerima title & journal_text
        await axios.post(
          ENDPOINTS.journal,
          { title, journal_text: content },
          { withCredentials: true },
        );
      }

      // Redirect setelah berhasil
      setTimeout(() => {
        setIsLoading(false);
        router.push(isEdit ? "/dashboard/history" : "/dashboard");
      }, 800);
    } catch (error) {
      console.error("Error saving journal:", error);
      setErrorMsg(error.response?.data?.message || "Gagal menyimpan jurnal!");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-border/60 p-6 md:p-8 shadow-xs">
      {errorMsg && (
        <div className="mb-6 p-4 bg-status-burnout/10 text-status-burnout border border-status-burnout/20 rounded-xl text-sm">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Date
            </label>
            <div className="relative">
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-11 pr-4 cursor-pointer"
                required
              />
              <Calendar
                size={18}
                className="absolute left-4 top-3.5 text-text-muted/60 pointer-events-none"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold text-text-dark mb-2">
              Time
            </label>
            <div className="relative">
              <Input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-11 pr-4 cursor-pointer"
                required
              />
              <Calendar
                size={18}
                className="absolute left-4 top-3.5 text-text-muted/60 pointer-events-none"
                opacity={0}
              />{" "}
              {/* Spacer to match date layout */}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-text-dark mb-2 mt-6">
            Whats on your mind?
          </label>
          <Input
            as="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing your reflection here... How do you feel today? What made you stressed or happy?"
            rows={12}
            className="resize-none leading-relaxed"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-neutral-border/40">
          <Link
            href={isEdit ? "/dashboard/history" : "/dashboard"}
            className="flex items-center gap-2 px-6 py-2 rounded-xl border border-neutral-border text-sm font-semibold text-text-muted hover:bg-mood-bg hover:text-text-dark transition-colors"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            isLoading={isLoading}
            className="w-auto px-6 py-2.5 flex items-center justify-center gap-2 !py-2.5"
          >
            {!isLoading && <Save size={16} />}
            {isEdit ? "Update Entry" : "Save Entry"}
          </Button>
        </div>
      </form>
    </div>
  );
}
