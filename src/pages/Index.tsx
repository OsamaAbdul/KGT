import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import AuthTabs from "@/components/AuthTabs";
import WorldMap from "@/components/WorldMap";
import LoadingScreen from "@/components/LoadingScreen";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin } from "lucide-react";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [stats, setStats] = useState({ kogites: "...", countries: "...", verified: "..." });
  const authRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Real Stats
    const fetchGlobalStats = async () => {
      const { data: profiles } = await supabase.from("profiles").select("is_verified, country");
      if (profiles) {
        const uniqueCountries = new Set(profiles.map(p => p.country).filter(Boolean));
        const verifiedCount = profiles.filter(p => p.is_verified).length;
        setStats({
          kogites: profiles.length.toLocaleString() + "+",
          countries: uniqueCountries.size.toString(),
          verified: verifiedCount.toLocaleString() + "+"
        });
      }
    };

    fetchGlobalStats();
    const handleRedirection = async (user: any) => {
      if (!user) return;

      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (data) {
        navigate("/admin");
      } else {
        navigate("/onboarding");
      }
    };

    // Check session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) {
        handleRedirection(data.session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        handleRedirection(session.user);
      }
    });

    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2200);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  const scrollToAuth = () => {
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <div className="min-h-screen bg-background">
        <Header onJoinClick={scrollToAuth} className="fixed top-0 left-0 right-0" />

        {/* Hero */}
        <section className="relative pt-16 min-h-screen flex flex-col lg:flex-row overflow-hidden">
          {/* Left — Auth (Order 1 on mobile) */}
          <div
            ref={authRef}
            className="w-full lg:w-[40%] flex flex-col justify-center px-6 py-12 lg:px-12 order-1 lg:order-none"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 2.4 }}
            >
              <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Track the Kogi{" "}
                <span className="text-gradient-kogi">Diaspora</span>{" "}
                Worldwide
              </h2>
              <p className="text-muted-foreground mb-8 text-base lg:text-lg max-w-md">
                Join thousands of Kogites mapped across the globe. Register your
                location and become part of the largest Kogi State civic
                intelligence network.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { icon: Users, label: "Kogites", value: stats.kogites },
                  { icon: MapPin, label: "Countries", value: stats.countries },
                  { icon: Shield, label: "Verified", value: stats.verified },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="glass rounded-lg p-3 text-center">
                    <Icon className="mx-auto mb-1 h-4 w-4 text-primary" />
                    <p className="font-display text-lg font-bold text-foreground">{value}</p>
                    <p className="text-[11px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              <AuthTabs />
            </motion.div>
          </div>

          {/* Right — Map (Order 2 on mobile) */}
          <div className="w-full lg:w-[60%] relative min-h-[500px] lg:min-h-0 order-2 lg:order-none">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.6 }}
            >
              <WorldMap />
            </motion.div>

            {/* Decorative gradient overlay */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent lg:block hidden" />
          </div>
        </section>

        <AboutSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
