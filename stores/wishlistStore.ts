"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ComponentItem } from "@/types";
import { generateId } from "@/lib/utils";

interface WishlistStore {
    items: { id: string; component: ComponentItem; componentId: string }[];
    addItem: (component: ComponentItem) => void;
    removeItem: (componentId: string) => void;
    isInWishlist: (componentId: string) => boolean;
    getItemCount: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (component) => {
                if (get().items.find(i => i.componentId === component.id)) return;
                set({ items: [...get().items, { id: generateId(), component, componentId: component.id }] });
            },
            removeItem: (componentId) => {
                set({ items: get().items.filter(i => i.componentId !== componentId) });
            },
            isInWishlist: (componentId) => get().items.some(i => i.componentId === componentId),
            getItemCount: () => get().items.length,
        }),
        { name: "wishlist-storage" }
    )
);
