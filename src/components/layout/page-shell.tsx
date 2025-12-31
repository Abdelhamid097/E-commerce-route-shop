import { ReactNode } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function PageShell({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-primary-50/60 via-white to-white text-ink">
            <Navbar />
            <main className="pb-12 pt-6">{children}</main>
            <Footer />
        </div>
    );
}
