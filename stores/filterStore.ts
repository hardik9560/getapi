"use client";
import { create } from "zustand";
import { FilterState } from "@/types";

interface FilterStore extends FilterState {
    setCategories: (categories: string[]) => void;
    toggleCategory: (category: string) => void;
    setPriceRange: (range: [number, number]) => void;
    setFrameworks: (frameworks: string[]) => void;
    toggleFramework: (framework: string) => void;
    setStylings: (stylings: string[]) => void;
    setRatings: (ratings: number) => void;
    setLicenseTypes: (types: string[]) => void;
    setDateRange: (range: string) => void;
    setFreeOnly: (free: boolean) => void;
    setSearchQuery: (query: string) => void;
    setSortBy: (sort: string) => void;
    clearAll: () => void;
}

const defaultState: FilterState = {
    categories: [],
    priceRange: [99, 599],
    frameworks: [],
    stylings: [],
    ratings: 0,
    licenseTypes: [],
    dateRange: "",
    freeOnly: false,
    searchQuery: "",
    sortBy: "popular",
};

export const useFilterStore = create<FilterStore>((set, get) => ({
    ...defaultState,
    setCategories: (categories) => set({ categories }),
    toggleCategory: (category) => {
        const current = get().categories;
        set({ categories: current.includes(category) ? current.filter(c => c !== category) : [...current, category] });
    },
    setPriceRange: (priceRange) => set({ priceRange }),
    setFrameworks: (frameworks) => set({ frameworks }),
    toggleFramework: (framework) => {
        const current = get().frameworks;
        set({ frameworks: current.includes(framework) ? current.filter(f => f !== framework) : [...current, framework] });
    },
    setStylings: (stylings) => set({ stylings }),
    setRatings: (ratings) => set({ ratings }),
    setLicenseTypes: (types) => set({ licenseTypes: types }),
    setDateRange: (dateRange) => set({ dateRange }),
    setFreeOnly: (freeOnly) => set({ freeOnly }),
    setSearchQuery: (searchQuery) => set({ searchQuery }),
    setSortBy: (sortBy) => set({ sortBy }),
    clearAll: () => set(defaultState),
}));
