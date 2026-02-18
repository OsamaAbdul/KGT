import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import LoadingScreen from "@/components/LoadingScreen";

export default function AdminRoute() {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setIsAdmin(false);
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("user_roles")
                .select("role")
                .eq("user_id", user.id)
                .eq("role", "admin")
                .single();

            if (error || !data) {
                setIsAdmin(false);
            } else {
                setIsAdmin(true);
            }
            setLoading(false);
        }

        checkAdmin();
    }, []);

    if (loading) return <LoadingScreen />;

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
