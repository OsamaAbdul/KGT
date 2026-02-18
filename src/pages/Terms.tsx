import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

export default function Terms() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header className="fixed top-0 left-0 right-0" />

            <main className="container px-6 pt-32 pb-24 max-w-4xl">
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-8">Terms of Engagement</h1>

                <div className="prose prose-invert prose-primary max-w-none space-y-8 text-muted-foreground leading-relaxed">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">1. Eligibility</h2>
                        <p>
                            Access to the Kogi Global Tracker is restricted to individuals of Kogi State origin or their legally recognized family members residing outside their primary local government areas. Use of fraudulent NIN data will result in permanent blacklisting from all Kogi State digital services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">2. Accuracy of Intelligence</h2>
                        <p>
                            Users are responsible for ensuring that their reported location and occupation data is accurate. This data is used for state-level strategic planning and resource allocation. Deliberate misreporting of global location is considered an act against civic development.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">3. Prohibited Conduct</h2>
                        <p>
                            Users may not use the platform to harass, dox, or monitor other users for non-civic purposes. The diaspora network is intended for unity and development; any commercial solicitation or political propaganda is strictly prohibited without written state authorization.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-white border-b border-primary/20 pb-2">4. Governing Law</h2>
                        <p>
                            These terms are governed by the laws of the Federal Republic of Nigeria and the specific statutes of Kogi State. All intelligence data collected remains the property of the state intelligence network.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
