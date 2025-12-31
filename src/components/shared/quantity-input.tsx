"use client";

import { Button } from "@/components/ui/button";

export function QuantityInput({ value, onChange }: { value: number; onChange: (value: number) => void }) {
    return (
        <div className="inline-flex items-center gap-1 rounded-lg border-2 border-gray-300 bg-white overflow-hidden">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                className="px-3 py-1.5 text-ink transition-colors hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={value <= 1}
                aria-label="Decrease quantity"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            </button>
            <span className="w-12 text-center text-sm font-semibold text-ink">{value}</span>
            <button
                onClick={() => onChange(value + 1)}
                className="px-3 py-1.5 text-ink transition-colors hover:bg-gray-100 active:bg-gray-200"
                aria-label="Increase quantity"
            >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            </button>
        </div>
    );
}
