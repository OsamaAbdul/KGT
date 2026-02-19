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

                <div className="prose prose-invert prose-primary max-w-none space-y-16 text-muted-foreground leading-relaxed text-lg pb-20">
                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Protocol Alpha-01</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">1. Data Sovereignty & Territorial Transparency</h2>
                        <p>
                            The Kogi Global Tracker operates as a centralized geographical intelligence node under the jurisdiction of the Kogi State Government. By initializing a connection to this network and finalizing your profile registration, you grant an explicit, irrevocable (subject to deactivation protocols) authorization for the system to index and render your **Full Identity, Professional Classification, and Real-Time Geographical Coordinates** on our secure global visualization layer.
                        </p>
                        <p>
                            This transparency is the foundational pillar of the "Kogi Connected" initiative. It serves to eliminate demographic isolation among our diaspora and provides the Lokoja Central Intelligence Bureau with the high-fidelity data required for cross-continental economic mapping and 50-year developmental forecasting.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Metadata Ingestion</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">2. Intelligence Gathering & Cryptographic Verification</h2>
                        <p>
                            The integrity of the diaspora registry depends on the absolute verification of every participating node. To this end, the system mandates the ingestion of Government-Issued National Identity Numbers (NIN) and high-density optical captures of official documentation.
                        </p>
                        <p>
                            **Non-Disclosure Protocol:** We enforce a strict "Dark Mesh" policy regarding sensitive identity metadata. This information is sequestered behind multiple layers of hardware-level isolation and is never transmitted beyond the State’s secure internal verification cluster. Access is gated by biometric-authenticated LEVEL_04_ADMIN credentials, and every retrieval is logged for permanent audit.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Security Matrix</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">3. Enterprise-Grade Security Architecture</h2>
                        <p>
                            Kogi Global Tracker utilizes a Zero-Trust security model. All data artifacts are subjected to military-grade AES-256 encryption at rest, while data in motion is enveloped in dynamic TLS 1.3 tunnels with RSA-4096 ephemeral key exchanges.
                        </p>
                        <p>
                            Our storage infrastructure utilizes decentralized, sharded database nodes to prevent single-point-of-failure exposure. Verification imagery is further isolated in air-gapped virtual vaults with cryptographic Row-Level Security (RLS) enforced at the database kernel level, ensuring that even in the event of an edge-node compromise, the core identity registry remains impenetrable.
                        </p>
                    </section>

                    <section className="space-y-6 border-t border-primary/10 pt-12">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
                            <span className="text-xs font-mono text-primary uppercase tracking-[0.3em]">Data Lifecycle</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white tracking-tight">4. Right to Decommission & Systematic Erasure</h2>
                        <p>
                            Under our "Digital Citizenship" framework, we respect the user's ultimate sovereignty over their digital presence. Users maintain the unalienable right to alter their professional visibility or initiate the permanent "Ghost Protocol"—a total decommissioning of their presence from the tracker.
                        </p>
                        <p>
                            Upon receipt of a validated decommission signal, our system triggers a "Scorched Earth" erasure process. All associated node data, including encrypted identity artifacts, is subjected to three-pass cryptographic shredding. This data is physically overwritten at the server level to ensure it cannot be recovered via forensic analysis, adhering to the highest global standards of the Nigeria Data Protection Act and GDPR.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
