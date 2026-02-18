import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Privacy() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header className="fixed top-0 left-0 right-0" />

            <main className="container px-6 pt-32 pb-24 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">Privacy Protocols</h1>

                <div className="prose prose-invert prose-primary max-w-none space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">1. Data Transparency Notice</h2>
                        <p>
                            The Kogi Global Tracker is an intelligence and civic networking platform. By creating an account and registering your location, you acknowledge that your **Full Name, Professional Occupation, and Geographical Location (City, Country)** will be displayed publicly on our global map.
                        </p>
                        <p>
                            This public display is essential to the platform's core mission: visualizing the global footprint of Kogi State diaspora to foster community and strategic state development.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">2. Information Collection</h2>
                        <p>
                            We collect mandatory identity information including your National Identity Number (NIN) and photographic evidence of your NIN slip. **This data is NOT shared publicly.** It is used exclusively by authorized state administrators to verify the authenticity of registrants.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">3. Security Infrastructure</h2>
                        <p>
                            All verification evidence (NIN slips) is stored in encrypted storage buckets with strict row-level security (RLS) policies. Only users with designated "Admin" roles can access this sensitive data for verification purposes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">4. User Rights</h2>
                        <p>
                            Users maintain the right to update their location or request the deletion of their profile at any time. Deletion of a profile results in the immediate removal of all data, including verification evidence, from our active databases.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
