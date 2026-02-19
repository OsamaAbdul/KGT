import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Landmark, Briefcase, Fingerprint, LogOut, Ghost } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import Header from "@/components/Header";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [profile, setProfile] = useState<any>(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/");
    };

    const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();
            setProfile(data);
        }
    };

    useEffect(() => {
        fetchProfile();

        // Real-time subscription for profile changes
        const setupSubscription = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const channel = supabase
                    .channel(`profile:${user.id}`)
                    .on(
                        'postgres_changes',
                        {
                            event: 'UPDATE',
                            schema: 'public',
                            table: 'profiles',
                            filter: `id=eq.${user.id}`
                        },
                        (payload) => {
                            console.log('Profile updated real-time:', payload);
                            setProfile(payload.new);
                        }
                    )
                    .subscribe();

                return channel;
            }
        };

        const channelPromise = setupSubscription();

        return () => {
            channelPromise.then(channel => {
                if (channel) supabase.removeChannel(channel);
            });
        };
    }, []);

    const toggleGhostMode = async (enabled: boolean) => {
        const { error } = await supabase
            .from("profiles")
            .update({ ghost_mode: enabled })
            .eq("id", profile.id);

        if (error) {
            toast.error("Failed to update privacy settings");
        } else {
            setProfile({ ...profile, ghost_mode: enabled });
            toast.success(enabled ? "Ghost Mode enabled" : "Ghost Mode disabled");
        }
    };

    if (!profile) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="max-w-4xl mx-auto p-8 mt-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-display">Profile Overview</h1>
                        <p className="text-muted-foreground">Welcome to your Kogi Global Tracker dashboard.</p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={handleLogout}
                        className="group border-primary/20 hover:bg-destructive hover:text-white transition-all glass w-fit"
                    >
                        <LogOut className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                        Sign Out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Personal Info</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground flex items-center gap-2"><User className="h-4 w-4" /> Full Name</span>
                                <span className="font-medium">{profile.full_name}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground flex items-center gap-2"><Briefcase className="h-4 w-4" /> Occupation</span>
                                <span className="font-medium">{profile.occupation}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground flex items-center gap-2"><Fingerprint className="h-4 w-4" /> Account Status</span>
                                <Badge
                                    variant={profile.is_verified ? "default" : "outline"}
                                    className={profile.is_verified
                                        ? "bg-primary glow-primary text-white"
                                        : "text-muted-foreground border-muted"
                                    }
                                >
                                    {profile.is_verified ? "Verified Identity" : "Verification Pending"}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle>Origin Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground flex items-center gap-2"><Landmark className="h-4 w-4" /> LGA</span>
                                <span className="font-medium">{profile.lga}</span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                                <span className="text-muted-foreground flex items-center gap-2"><MapPin className="h-4 w-4" /> State</span>
                                <span className="font-medium">{profile.state_of_origin}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Country</span>
                                <span className="font-medium">{profile.country}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass md:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Ghost className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <CardTitle>Privacy Settings</CardTitle>
                                    <p className="text-sm text-muted-foreground">Manage your visibility on the global tracker</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-background/40 p-3 rounded-xl border border-primary/10">
                                <span className="text-sm font-medium">Ghost Mode</span>
                                <Switch
                                    checked={profile.ghost_mode}
                                    onCheckedChange={toggleGhostMode}
                                />
                            </div>
                        </CardHeader>
                    </Card>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
