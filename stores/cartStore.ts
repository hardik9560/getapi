"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, LicenseType, ComponentItem, Coupon } from "@/types";
import { getLicensePrice, generateId } from "@/lib/utils";
import { coupons } from "@/lib/mock-data";

interface CartStore {
    items: CartItem[];
    appliedCoupon: Coupon | null;
    couponError: string;
    addItem: (component: ComponentItem, license: LicenseType) => void;
    removeItem: (componentId: string) => void;
    updateLicense: (componentId: string, license: LicenseType) => void;
    clearCart: () => void;
    getTotal: () => number;
    getDiscount: () => number;
    getFinalTotal: () => number;
    getItemCount: () => number;
    isInCart: (componentId: string) => boolean;
    applyCoupon: (code: string) => boolean;
    removeCoupon: () => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            appliedCoupon: null,
            couponError: "",
            addItem: (component, license) => {
                const { items } = get();
                if (items.find(i => i.componentId === component.id)) return;
                set({
                    items: [...items, { id: generateId(), component, componentId: component.id, licenseType: license }],
                });
            },
            removeItem: (componentId) => {
                set({ items: get().items.filter(i => i.componentId !== componentId) });
            },
            updateLicense: (componentId, license) => {
                set({
                    items: get().items.map(i =>
                        i.componentId === componentId ? { ...i, licenseType: license } : i
                    ),
                });
            },
            clearCart: () => set({ items: [], appliedCoupon: null, couponError: "" }),
            getTotal: () => {
                return get().items.reduce((sum, item) => sum + getLicensePrice(item.component, item.licenseType), 0);
            },
            getDiscount: () => {
                const { appliedCoupon } = get();
                if (!appliedCoupon) return 0;
                if (appliedCoupon.discountAmount) {
                    return Math.min(appliedCoupon.discountAmount, get().getTotal());
                }
                return Math.round(get().getTotal() * appliedCoupon.discountPercent / 100);
            },
            getFinalTotal: () => {
                return get().getTotal() - get().getDiscount();
            },
            getItemCount: () => get().items.length,
            isInCart: (componentId) => get().items.some(i => i.componentId === componentId),
            applyCoupon: (code: string) => {
                const found = coupons.find(c => c.code === code.toUpperCase() && c.active);
                if (found) {
                    set({ appliedCoupon: found, couponError: "" });
                    return true;
                } else {
                    set({ couponError: "This coupon code is not valid.", appliedCoupon: null });
                    return false;
                }
            },
            removeCoupon: () => set({ appliedCoupon: null, couponError: "" }),
        }),
        { name: "cart-storage" }
    )
);
