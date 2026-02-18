import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Trash2, UserCheck, FileText, Download, AlertCircle, Users as UsersIcon, Eye, MapPin, Briefcase, Calendar, Fingerprint, Shield, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { exportToPDF, exportToExcel } from "@/lib/exportUtils";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function UserManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterLga, setFilterLga] = useState("");
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        // Fetching profiles joining with user_roles
        const { data: profiles, error } = await supabase
            .from("profiles")
            .select(`
                *,
                user_roles (
                    role
                )
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Fetch error:", error);
            toast.error("Failed to fetch users");
        } else {
            console.log("Fetched profiles:", profiles);
            setUsers(profiles || []);
        }
        setLoading(false);
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleVerify = async (userId: string) => {
        const { error } = await supabase.from("profiles").update({ is_verified: true }).eq("id", userId);
        if (error) toast.error("Verification failed");
        else { toast.success("User verified"); fetchUsers(); }
    };

    const handleDelete = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This action is irreversible.")) return;

        // Profiles delete is cascaded from auth.users usually, but here we delete the profile specifically
        const { error } = await supabase.from("profiles").delete().eq("id", userId);
        if (error) {
            toast.error("Delete failed: " + error.message);
        } else {
            toast.success("User removed from tracker");
            fetchUsers();
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase());

        const isNonKogi = user.state_of_origin?.toLowerCase() !== "kogi";
        return matchesSearch && (filterLga === "non_kogi" ? isNonKogi : true);
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-display tracking-tight">User Management</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <UsersIcon className="w-4 h-4 text-primary" />
                        Total Members: <span className="font-bold text-foreground">{users.length}</span>
                    </p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <Button variant="outline" size="sm" className="glass flex-1 md:flex-none" onClick={() => exportToPDF(filteredUsers, ["full_name", "email", "state_of_origin", "lga", "is_verified"], "kogite_directory")}>
                        <FileText className="mr-2 h-4 w-4" /> PDF
                    </Button>
                    <Button variant="outline" size="sm" className="glass flex-1 md:flex-none" onClick={() => exportToExcel(filteredUsers, "kogite_directory")}>
                        <Download className="mr-2 h-4 w-4" /> Excel
                    </Button>
                </div>
            </div>

            <Card className="glass border-primary/20 overflow-hidden">
                <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name or email..."
                                className="pl-10 bg-background/50 border-primary/10"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Button
                            variant={filterLga === "non_kogi" ? "destructive" : "secondary"}
                            onClick={() => setFilterLga(filterLga === "non_kogi" ? "" : "non_kogi")}
                            className="transition-all"
                        >
                            <AlertCircle className="mr-2 h-4 w-4" />
                            {filterLga === "non_kogi" ? "Show All Users" : "Filter Non-Kogi"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-xl border border-primary/20 bg-card/30 backdrop-blur-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            <TableHead className="font-display">User Details</TableHead>
                            <TableHead className="font-display">Location & Origin</TableHead>
                            <TableHead className="font-display">Joined Date</TableHead>
                            <TableHead className="font-display">Role</TableHead>
                            <TableHead className="font-display">Status</TableHead>
                            <TableHead className="font-display text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 animate-pulse text-primary/40" />
                                        <p className="text-muted-foreground">Synchronizing with node...</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                                    No users found matching your intelligence parameters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id} className="hover:bg-primary/5 transition-colors border-primary/5">
                                    <TableCell>
                                        <div className="font-bold font-display">{user.full_name || "Unknown Identity"}</div>
                                        <div className="text-xs text-muted-foreground">{user.email || "No contact data"}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm font-medium">{user.state_of_origin}</div>
                                        <div className="text-xs text-muted-foreground">{user.lga || "No LGA"} • {user.country}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-sm">{user.created_at ? format(new Date(user.created_at), 'MMM dd, yyyy') : "N/A"}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="capitalize border-primary/20 text-primary">
                                            {user.user_roles?.[0]?.role || "user"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={user.is_verified ? "default" : "secondary"}
                                            className={user.is_verified ? "bg-primary glow-primary" : "bg-muted text-muted-foreground"}
                                        >
                                            {user.is_verified ? "Verified" : "Pending"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-primary hover:bg-primary/20 transition-colors"
                                                title="View Profile"
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setIsModalOpen(true);
                                                }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {!user.is_verified && (
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-primary hover:bg-primary/20 transition-colors"
                                                    title="Verify Identity"
                                                    onClick={() => handleVerify(user.id)}
                                                >
                                                    <UserCheck className="h-4 w-4" />
                                                </Button>
                                            )}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="h-8 w-8 text-destructive hover:bg-destructive/20 transition-colors"
                                                title="Delete Profile"
                                                onClick={() => handleDelete(user.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl glass-card border-primary/20 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-display flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <UsersIcon className="w-6 h-6 text-primary" />
                            </div>
                            User Intelligence Profile
                        </DialogTitle>
                        <DialogDescription className="text-muted-foreground">
                            Complete registration data for {selectedUser?.full_name}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUser && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                    <Shield className="w-4 h-4" /> Personal Stats
                                </h3>
                                <div className="space-y-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                                    <div className="flex justify-between items-center group">
                                        <span className="text-xs text-muted-foreground">Full Identity</span>
                                        <span className="text-sm font-medium">{selectedUser.full_name}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Neutral Email</span>
                                        <span className="text-sm font-medium">{selectedUser.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Birth Record</span>
                                        <span className="text-sm font-medium">
                                            {selectedUser.dob ? format(new Date(selectedUser.dob), 'MMMM dd, yyyy') : "Not recorded"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Briefcase className="w-3 h-3" /> Occupation
                                        </span>
                                        <span className="text-sm font-medium">{selectedUser.occupation || "N/A"}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Information */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                    <MapPin className="w-4 h-4" /> Geographical Context
                                </h3>
                                <div className="space-y-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Globe className="w-3 h-3" /> Current Country
                                        </span>
                                        <span className="text-sm font-medium">{selectedUser.country}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">State of Origin</span>
                                        <span className="text-sm font-medium">{selectedUser.state_of_origin}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground">Local Govt (LGA)</span>
                                        <span className="text-sm font-medium">{selectedUser.lga || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> Node Join Date
                                        </span>
                                        <span className="text-sm font-medium">
                                            {selectedUser.created_at ? format(new Date(selectedUser.created_at), 'MMM dd, yyyy') : "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Security & Verification */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center gap-2">
                                    <Fingerprint className="w-4 h-4" /> Identity Verification
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-primary/5 p-4 rounded-xl border border-primary/10">
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">NIN Number</span>
                                            <code className="text-sm font-mono bg-background/50 px-2 py-0.5 rounded text-primary">
                                                {selectedUser.nin || "UNAVAILABLE"}
                                            </code>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-muted-foreground">Initial IP Address</span>
                                            <span className="text-xs font-mono">{selectedUser.ip_address || "Hidden"}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center items-end">
                                        <Badge
                                            variant={selectedUser.is_verified ? "default" : "secondary"}
                                            className={cn(
                                                "text-sm py-1 px-4",
                                                selectedUser.is_verified ? "bg-primary glow-primary" : "bg-muted text-muted-foreground"
                                            )}
                                        >
                                            {selectedUser.is_verified ? "Identity Verified" : "Awaiting Verification"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* NIN Slip Preview */}
                                {selectedUser.nin_slip_url && (
                                    <div className="mt-4 space-y-2">
                                        <span className="text-xs text-muted-foreground">NIN Slip Evidence</span>
                                        <div className="mt-2 rounded-lg border border-primary/20 overflow-hidden bg-black/40 aspect-video flex items-center justify-center relative group">
                                            <img
                                                src={selectedUser.nin_slip_url}
                                                alt="NIN Slip"
                                                className="max-h-full object-contain transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <a
                                                    href={selectedUser.nin_slip_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                                                >
                                                    <Eye className="w-4 h-4" /> Open Original Image
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
