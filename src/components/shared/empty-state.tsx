import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
    return (
        <div className="card-surface flex flex-col items-center gap-4 px-6 py-12 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 border border-gray-200 shadow-sm">
                <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-ink">{title}</h3>
            {description ? <p className="max-w-md text-sm text-gray-500">{description}</p> : null}
            {action ? action : <Link href="/products"><Button>Browse products</Button></Link>}
        </div>
    );
}
