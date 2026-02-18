import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
    User,
    Settings as SettingsIcon,
    Shield,
    Download,
    LogOut,
    Bell,
    Database,
    CheckCircle2,
    Search
} from "lucide-react";
import { toast } from "sonner";
import { exportToPDF, exportToExcel } from "@/lib/exportUtils";

export default function Settings() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", user.id)
                    .single();
                setUser({ ...user, ...profile });
            }
            setLoading(false);
        }
        getProfile();
    }, []);

    const handleExportAll = async (type: 'pdf' | 'excel') => {
        const { data: profiles } = await supabase.from("profiles").select("*");
        if (!profiles) return;

        if (type === 'pdf') {
            const columns = ["full_name", "email", "country", "state_of_origin", "lga", "is_verified", "created_at"];
            exportToPDF(profiles, columns, "global_tracker_master_list");
        } else {
            exportToExcel(profiles, "global_tracker_master_list");
        }
        toast.success(`Master ${type.toUpperCase()} exported successfully`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <div>
                <h2 className="text-3xl font-bold font-display tracking-tight text-white">Registry Settings</h2>
                <p className="text-muted-foreground mt-1">Manage your administrative profile and global system parameters.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Admin Profile */}
                <Card className="glass border-primary/20 shadow-xl overflow-hidden">
                    <CardHeader className="bg-primary/5 border-b border-primary/10">
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5 text-primary" />
                            Admin Credentials
                        </CardTitle>
                        <CardDescription>Your identity within the intelligence network.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
                                <Shield className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{user?.full_name || "System Admin"}</h3>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                                <Badge className="mt-2 bg-primary/20 text-primary border-primary/30">Authorized Node</Badge>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-primary/10">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Access Level</span>
                                <span className="font-mono text-primary font-bold">LEVEL_04_ADMIN</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Assigned Region</span>
                                <span className="font-medium">{user?.country || "Global Control"}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* System Status */}
                <Card className="glass border-primary/20 shadow-xl">
                    <CardHeader className="bg-primary/5 border-b border-primary/10">
                        <CardTitle className="flex items-center gap-2">
                            <Database className="w-5 h-5 text-primary" />
                            System Architecture
                        </CardTitle>
                        <CardDescription>Real-time node and database health status.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        <div className="space-y-4">
                            {[
                                { label: "Supabase Engine", status: "Operational", icon: CheckCircle2 },
                                { label: "PostgREST API", status: "Active", icon: CheckCircle2 },
                                { label: "Map Service", status: "Stable", icon: CheckCircle2 },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-background/40 border border-primary/5">
                                    <span className="text-sm">{item.label}</span>
                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                                        <item.icon className="w-4 h-4" />
                                        {item.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Global Actions */}
                <Card className="md:col-span-2 glass border-primary/20 shadow-xl">
                    <CardHeader className="bg-primary/5 border-b border-primary/10">
                        <CardTitle className="flex items-center gap-2">
                            <SettingsIcon className="w-5 h-5 text-primary" />
                            Administrative Controls
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 glass-card hover:bg-primary/20 border-primary/20"
                            onClick={() => handleExportAll('pdf')}
                        >
                            <Download className="w-6 h-6 text-primary" />
                            <span>Export Master PDF</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 glass-card hover:bg-primary/20 border-primary/20"
                            onClick={() => handleExportAll('excel')}
                        >
                            <FileSpreadsheet className="w-6 h-6 text-primary" />
                            <span>Export Master Excel</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-24 flex flex-col gap-2 glass-card hover:bg-destructive/20 border-destructive/20 text-destructive"
                            onClick={() => toast.info("Audit log initialized (simulated)")}
                        >
                            <Search className="w-6 h-6" />
                            <span>System Audit Log</span>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
            {children}
        </span>
    );
}

function FileSpreadsheet({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <path d="M8 13h2" />
            <path d="M8 17h2" />
            <path d="M10 13v4" />
            <path d="M14 13h2" />
            <path d="M14 17h2" />
            <path d="M16 13v4" />
        </svg>
    )
}
