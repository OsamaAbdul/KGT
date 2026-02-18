import { Globe, MapPin, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onJoinClick?: () => void;
  className?: string;
}

const Header = ({ onJoinClick, className }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Logout failed: " + error.message);
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  return (
    <header className={cn("z-50 glass-strong w-full", className)}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Globe className="h-8 w-8 text-primary" />
            <MapPin className="absolute -bottom-1 -right-1 h-4 w-4 text-primary-glow" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold tracking-wider text-foreground uppercase">
              Kogi Global Tracker
            </h1>

          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {onJoinClick && (
            <Button
              onClick={onJoinClick}
              className="bg-primary hover:bg-primary-glow text-primary-foreground font-display font-semibold tracking-wide glow-primary transition-all duration-300 hover:scale-105"
            >
              Join the Map
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
