import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import Header from "@/components/Header";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar is sticky and stays in flow */}
            <AdminSidebar />

            <div className="flex flex-1 flex-col min-w-0 h-screen relative bg-background/50">
                {/* Header Container - Uses sticky to move with scroll area if needed, or just stay atop the flex col */}
                <div className="sticky top-0 z-30 w-full border-b border-primary/10 bg-background/80 backdrop-blur-md">
                    <Header className="relative" />
                </div>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-6 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
