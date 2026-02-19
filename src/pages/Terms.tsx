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

                <div className="prose prose-invert prose-primary max-w-none space-y-16 text-muted-foreground leading-relaxed text-lg pb-20">
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Registry Protocol</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">1. Eligibility, Heritage & Civic Commitment</h2>
                        <p>
                            Access to the Kogi Global Tracker is an exclusive privilege reserved for individuals who can establish undeniable Kogi State ancestry or legally recognized heritage through the submission of verified biographical data. Users must be currently residing outside the territorial borders of Kogi State to qualify for the global diaspora index.
                        </p>
                        <p>
                            Registration implies a binding commitment to the State’s developmental vision. The provision of falsified National Identity metadata (NIN) or the use of another individual's identity artifacts is codified as a "Level 1 System Infraction." Such violations will lead to permanent blacklisting from the Digital Hub, immediate node termination, and potential legal referral to the Kogi State Ministry of Justice for civic fraud investigation.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Intelligence Integrity</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">2. Intelligence Fidelity & Data Veracity</h2>
                        <p>
                            As a verified node within the global Kogi architecture, you bear the sole responsibility for the granular accuracy of your professional intelligence, including current industry classification, geographical coordinates, and contact metadata. This high-fidelity data serves as the primary dataset for the Kogi State Executive Council’s multi-decade strategic economic planning and international resource allocation.
                        </p>
                        <p>
                            The deliberate obfuscation of your geographical location or the use of virtual proxy networks (VPNs) to bypass verified IP-to-location mapping is considered an act of data sabotage. The State reserves the right to de-verify any node whose coordinates cannot be systematically validated through our multi-vector authentication protocols.
                        </p>
                    </section>

                    <section className="space-y-6 border-t border-primary/10 pt-12">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Behavioral Code</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">3. Prohibited Conduct & Intellectual Property</h2>
                        <p>
                            The diaspora registry is a sovereign intellectual asset of the Kogi State Government. Users are strictly prohibited from attempting to scrape, index, or extract the network's node-level data for external commercial utilize, political reconnaissance, or non-sanctioned soliticitation. Any attempt to monitor the movement of other nodes for non-civic purposes is a violation of State Cybersecurity mandates.
                        </p>
                        <p>
                            Furthermore, the transmission of unauthorized political propaganda, ethnic misinformation, or commercial spam through platform-integrated networking features will result in immediate "Grey Listing," where your node visibility is restricted pending a full compliance review by the Lokoja Central Intelligence Bureau.
                        </p>
                    </section>

                    <section className="space-y-6 border-t border-primary/10 pt-12">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Jurisdictional Authority</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">4. Indemnification & Sovereign Jurisdiction</h2>
                        <p>
                            By utilizing this infrastructure, you agree to indemnify and hold harmless the Kogi State Government and its technological partners from any claims, liabilities, or data contingencies arising from your use of the platform. The tracker is provided as a "Strategic Civic Asset" on an "as-is" basis, with no warranties regarding the absolute continuity of the network node.
                        </p>
                        <p>
                            These terms are governed by the internal digital statutes of the Kogi State Government and the federal laws of Nigeria. All legal disputes arising from platform interaction are subject to the exclusive jurisdiction of the Lokoja High Court, Digital Division. Any attempt to challenge platform policies in non-Nigerian jurisdictions is waived upon account initialization.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
