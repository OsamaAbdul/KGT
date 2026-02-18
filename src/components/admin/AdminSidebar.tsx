import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Users,
    Map as MapIcon,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const sidebarLinks = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: MapIcon, label: "Analytics", path: "/admin/analytics" },
    { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isLargeScreen, setIsLargeScreen] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const checkScreen = () => setIsLargeScreen(window.innerWidth >= 1024);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const toggleSidebar = () => setCollapsed(!collapsed);

    return (
        <>
            {/* Mobile Toggle Trigger */}
            <Button
                variant="ghost"
                size="icon"
                className="fixed top-4 left-4 z-50 lg:hidden glass backdrop-blur-md"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X /> : <Menu />}
            </Button>

            {/* Main Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: collapsed ? "80px" : "260px",
                    x: isLargeScreen ? 0 : (mobileOpen ? 0 : -260)
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "sticky top-0 h-screen bg-card/60 backdrop-blur-2xl border-r border-primary/20 flex flex-col z-40 shrink-0",
                    !isLargeScreen && "fixed inset-y-0 left-0"
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-primary/10 h-16 shrink-0">
                    <AnimatePresence mode="wait">
                        {!collapsed && (
                            <motion.div
                                key="logo"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="font-display font-bold text-xl text-primary flex items-center gap-2 overflow-hidden truncate"
                            >
                                <div className="w-8 h-8 shrink-0 rounded-lg bg-primary/20 flex items-center justify-center">
                                    <LayoutDashboard className="w-5 h-5 text-primary" />
                                </div>
                                <span className="truncate">The Brain</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleSidebar}
                        className="hidden lg:flex h-8 w-8 text-muted-foreground hover:text-primary transition-colors"
                    >
                        {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </Button>
                </div>

                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
                    {sidebarLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        const Icon = link.icon;

                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileOpen(false)}
                                className="block"
                            >
                                <div className={cn(
                                    "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary text-primary-foreground glow-primary"
                                        : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                                )}>
                                    <Icon className={cn("w-5 h-5 shrink-0", isActive ? "" : "group-hover:scale-110 transition-transform")} />

                                    {!collapsed && (
                                        <span className="font-medium whitespace-nowrap overflow-hidden transition-opacity duration-300">
                                            {link.label}
                                        </span>
                                    )}

                                    {collapsed && (
                                        <div className="absolute left-full ml-4 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-primary/10">
                                            {link.label}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-primary/10 bg-black/5 shrink-0">
                    <div className={cn(
                        "flex items-center gap-3 p-2 rounded-lg transition-all",
                        collapsed ? "justify-center" : "bg-primary/5"
                    )}>
                        <div className="w-8 h-8 shrink-0 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary border border-primary/20">
                            A
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-semibold truncate">Admin Unit</span>
                                <span className="text-[10px] text-muted-foreground truncate opacity-70">admin@kogi.node</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.aside>

            {/* Overlay for mobile */}
            <AnimatePresence>
                {mobileOpen && !isLargeScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
                    />
                )}
            </AnimatePresence>
        </>
    );
}
