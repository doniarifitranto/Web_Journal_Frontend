'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import SearchBar from '@/components/molecules/SearchBar';
import FilterTabs from '@/components/molecules/FilterTabs';
import HistoryList from '@/components/organisms/HistoryList';

export default function HistoryPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const filterOptions = ['All', 'Burnout', 'At risk', 'Healthy'];

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/journal/history', {
                params: {
                    search: searchQuery,
                    status: activeFilter
                },
                withCredentials: true
            });
            setHistoryData(response.data.journals || []);
        } catch (error) {
            console.error('Error fetching history:', error);
            // Handle error, maybe set empty data or show toast
            setHistoryData([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Debounce search query
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
        if (!window.confirm("Are you sure you want to delete this journal entry?")) return;

        try {
            await axios.delete(`http://localhost:5000/api/journal/delete/${id}`, {
                withCredentials: true
            });
            // Update UI optimistically or fetch again
            setHistoryData(prevData => prevData.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting journal:', error);
            alert(error.response?.data?.message || "Failed to delete journal");
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h1 className="text-3xl font-bold text-text-dark">Daily Journal History</h1>
                <p className="text-text-muted text-sm mt-1">Review your past reflections and track your emotional journey.</p>
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

            <HistoryList 
                data={historyData} 
                isLoading={isLoading} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
            />
        </div>
    );
}
