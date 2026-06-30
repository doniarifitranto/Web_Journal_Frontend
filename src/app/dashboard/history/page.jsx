"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ENDPOINTS } from "@/lib/api";
import SearchBar from "@/components/molecules/SearchBar";
import FilterTabs from "@/components/molecules/FilterTabs";
import HistoryList from "@/components/organisms/HistoryList";

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [historyData, setHistoryData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter label harus cocok dengan nilai burnout_label dari backend
  const filterOptions = ["All", "Burnout", "At risk", "Healthy"];

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(ENDPOINTS.journal, {
        params: {
          search: searchQuery || undefined,
          // Backend pakai param 'label', bukan 'status'
          // Kirim hanya jika bukan 'All'
          label: activeFilter !== "All" ? activeFilter : undefined,
          page: 1,
          limit: 20,
        },
        withCredentials: true,
      });
      setHistoryData(response.data.journals || []);
      setPagination(response.data.pagination || null);
    } catch (error) {
      console.error("Error fetching history:", error);
      setHistoryData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search — tunggu 500ms setelah user berhenti mengetik
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchHistory();
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter]);

  const handleEdit = (entry) => {
    router.push(`/dashboard/journal/${entry._id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus jurnal ini? Tindakan tidak dapat dibatalkan."))
      return;

    try {
      // Endpoint yang benar: DELETE /api/journal/:id (bukan /api/journal/delete/:id)
      await axios.delete(ENDPOINTS.journalById(id), {
        withCredentials: true,
      });
      // Hapus item dari state tanpa re-fetch
      setHistoryData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting journal:", error);
      alert(error.response?.data?.message || "Gagal menghapus jurnal");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-text-dark">
          Daily Journal History
        </h1>
        <p className="text-text-muted text-sm mt-1">
          Review your past reflections and track your emotional journey.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-border">
        <FilterTabs
          tabs={filterOptions}
          activeTab={activeFilter}
          onTabChange={setActiveFilter}
        />
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search entries..."
        />
      </div>

      {/* Info total jika ada pagination */}
      {pagination && !isLoading && (
        <p className="text-xs text-text-muted px-1">
          Menampilkan {historyData.length} dari {pagination.total} jurnal
        </p>
      )}

      <HistoryList
        data={historyData}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

