import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Globe, ShieldCheck, Users, MapPin, TrendingUp, BarChart as BarChartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Analytics() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        countries: [] as { name: string; count: number; percentage: number }[],
        verifications: { verified: 0, pending: 0, total: 0 },
        recentActivity: [] as any[],
    });

    useEffect(() => {
        async function fetchAnalytics() {
            setLoading(true);
            const { data: profiles, error } = await supabase
                .from("profiles")
                .select("country, is_verified, created_at, full_name");

            if (error || !profiles) return;

            // 1. Geography Stats
            const countryCounts: Record<string, number> = {};
            profiles.forEach(p => {
                if (p.country) countryCounts[p.country] = (countryCounts[p.country] || 0) + 1;
            });
            const sortedCountries = Object.entries(countryCounts)
                .map(([name, count]) => ({
                    name,
                    count,
                    percentage: Math.round((count / profiles.length) * 100)
                }))
                .sort((a, b) => b.count - a.count);

            // 2. Verification Stats
            const verified = profiles.filter(p => p.is_verified).length;
            const pending = profiles.length - verified;

            // 3. Recent Activity (Simulated from actual joined users)
            const recent = profiles
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .slice(0, 5);

            setStats({
                countries: sortedCountries,
                verifications: { verified, pending, total: profiles.length },
                recentActivity: recent
            });
            setLoading(false);
        }

        fetchAnalytics();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl font-bold font-display tracking-tight text-white">Map Analytics</h2>
                <p className="text-muted-foreground mt-1">Deep dive into global distribution and network health.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Geographics Card */}
                <Card className="lg:col-span-2 glass border-primary/20 shadow-xl overflow-hidden">
                    <CardHeader className="border-b border-primary/10 bg-primary/5">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Globe className="w-5 h-5 text-primary" />
                            Geographical Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            {stats.countries.map((c, i) => (
                                <div key={c.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium flex items-center gap-2">
                                            <span className="text-primary/40 font-mono text-xs w-4">{i + 1}.</span>
                                            {c.name}
                                        </span>
                                        <span className="text-muted-foreground">{c.count} Members ({c.percentage}%)</span>
                                    </div>
                                    <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full glow-primary transition-all duration-1000"
                                            style={{ width: `${c.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Verification Card */}
                <Card className="glass border-primary/20 shadow-xl">
                    <CardHeader className="border-b border-primary/10 bg-primary/5">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-primary" />
                            Verification Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 flex flex-col items-center justify-center h-full space-y-8">
                        <div className="relative w-48 h-48 flex items-center justify-center">
                            {/* Simple CSS Circular Chart */}
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="96" cy="96" r="80"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    className="text-primary/10"
                                />
                                <circle
                                    cx="96" cy="96" r="80"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    strokeDasharray={2 * Math.PI * 80}
                                    strokeDashoffset={2 * Math.PI * 80 * (1 - (stats.verifications.verified / stats.verifications.total))}
                                    strokeLinecap="round"
                                    className="text-primary transition-all duration-1000 glow-primary"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-3xl font-bold font-display">
                                    {Math.round((stats.verifications.verified / stats.verifications.total) * 100)}%
                                </span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold">Verified</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 w-full">
                            <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 text-center">
                                <div className="text-xl font-bold text-primary">{stats.verifications.verified}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-black">Success</div>
                            </div>
                            <div className="bg-muted/30 rounded-xl p-3 border border-border/10 text-center">
                                <div className="text-xl font-bold">{stats.verifications.pending}</div>
                                <div className="text-[10px] text-muted-foreground uppercase font-black">Pending</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Activity Feed */}
                <Card className="lg:col-span-3 glass border-primary/20 shadow-xl">
                    <CardHeader className="border-b border-primary/10 bg-primary/5 px-6">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            Node Influx (Recent Joins)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="divide-y divide-primary/10">
                            {stats.recentActivity.map((user, i) => (
                                <div key={user.id} className="flex items-center justify-between p-4 px-6 hover:bg-primary/5 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary text-xs">
                                            {user.full_name?.[0] || "U"}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{user.full_name}</div>
                                            <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                                <MapPin className="w-2 h-2" /> {user.country}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-mono opacity-50">
                                        {new Date(user.created_at).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
