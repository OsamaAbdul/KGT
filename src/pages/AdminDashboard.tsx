import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UserManagement from "@/components/admin/UserManagement";
import Analytics from "@/components/admin/Analytics";
import Settings from "@/components/admin/Settings";
import WorldMap from "@/components/WorldMap";
import { Routes, Route } from "react-router-dom";
import {
    Users,
    MapPin,
    TrendingUp,
    Globe,
    Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </AdminLayout>
    );
}

function DashboardOverview() {
    const [stats, setStats] = useState({
        totalMembers: 0,
        activeNodes: 0,
        verifiedPercentage: 0,
        topRegion: "Loading...",
        growth: [] as number[],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);

            // 1. Total Members & Verified Count
            const { data: profiles, error: pError } = await supabase
                .from("profiles")
                .select("is_verified, country, created_at");

            if (pError || !profiles) return;

            const total = profiles.length;
            const verified = profiles.filter(p => p.is_verified).length;
            const verifiedPct = total > 0 ? Math.round((verified / total) * 100) : 0;

            // 2. Active Nodes (Unique Countries)
            const uniqueCountries = new Set(profiles.map(p => p.country).filter(Boolean));

            // 3. Top Region (Density)
            const countryCounts: Record<string, number> = {};
            profiles.forEach(p => {
                if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
            });
            const topCountry = Object.entries(countryCounts)
                .sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

            // 4. Growth Chart (Last 7 days)
            const now = new Date();
            const last7Days = Array.from({ length: 10 }, (_, i) => {
                const d = new Date();
                d.setDate(now.getDate() - (9 - i));
                return d.toISOString().split('T')[0];
            });

            const growthData = last7Days.map(date => {
                return profiles.filter(p => p.created_at?.startsWith(date)).length;
            });

            setStats({
                totalMembers: total,
                activeNodes: uniqueCountries.size,
                verifiedPercentage: verifiedPct,
                topRegion: topCountry,
                growth: growthData
            });
            setLoading(false);
        }

        fetchStats();
    }, []);

    const cards = [
        { label: "Total Members", value: stats.totalMembers.toLocaleString(), icon: Users, diff: "Live database count" },
        { label: "Active Nodes", value: stats.activeNodes.toString(), icon: Globe, diff: "Countries represented" },
        { label: "Verified Data", value: `${stats.verifiedPercentage}%`, icon: TrendingUp, diff: "Identity verified" },
        { label: "Map Density", value: stats.topRegion, icon: MapPin, diff: "Top Diaspora hub" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold font-display tracking-tight">System Overview</h2>
                <p className="text-muted-foreground mt-1">Real-time insights into the Kogi Diaspora intelligence network.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((stat) => (
                    <div key={stat.label} className="glass rounded-xl p-6 border-primary/20 hover:border-primary/40 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                            <stat.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold">
                            {loading ? <Loader2 className="h-6 w-6 animate-spin text-muted-foreground/30" /> : stat.value}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{stat.diff}</p>
                    </div>
                ))}
            </div>

            {/* Global Node Map */}
            <div className="glass rounded-2xl border border-primary/10 overflow-hidden h-[500px] relative">
                <div className="absolute top-6 left-8 z-10">
                    <h3 className="text-xl font-display font-semibold">Global Distribution</h3>
                    <p className="text-sm text-muted-foreground">Real-time geographical tracking of verified nodes.</p>
                </div>
                <WorldMap />
            </div>

            <div className="bg-card/30 backdrop-blur-md rounded-2xl border border-primary/10 p-8 text-center">
                <h3 className="text-xl font-display font-semibold mb-2">Network Growth</h3>
                <p className="text-muted-foreground max-w-lg mx-auto mb-6">Visualizing real user registrations over the last 10 days.</p>
                <div className="h-64 flex items-end justify-between gap-2 px-10">
                    {loading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            <Loader2 className="h-12 w-12 animate-spin text-primary/20" />
                        </div>
                    ) : stats.growth.map((count, i) => {
                        const max = Math.max(...stats.growth, 1);
                        const height = (count / max) * 100;
                        return (
                            <div key={i} className="group relative w-full">
                                <div
                                    className="bg-primary/40 w-full rounded-t-lg transition-all hover:bg-primary"
                                    style={{ height: `${Math.max(height, 5)}%` }}
                                />
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    {count} users
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

