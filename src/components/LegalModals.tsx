import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Shield, FileText, Lock, Scale, Info } from "lucide-react";

export type LegalType = "privacy" | "terms" | "security" | "compliance" | "intelligence";

interface LegalModalsProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: LegalType;
}

const content = {
    intelligence: {
        title: "Intelligence Policy",
        icon: Info,
        sections: [
            { h: "Mission Objective & Visualization", p: "The Kogi Global Tracker is an advanced, high-fidelity intelligence grid designed to catalog the intellectual, professional, and economic output of the Kogi State diaspora. By visualizing this human capital, the State creates a direct bridge between global talent and local development needs." },
            { h: "Strategic Intelligence Utilization", p: "Every data point ingested into the registry serves as a vital input for the Lokoja Central Intelligence Bureau's 50-year economic framework. Aggregated metadata is utilized to identify skill clusters, geographical influence zones, and potential investment corridors for state-level projects." },
            { h: "Node Exposure Protocol", p: "Visibility on the global map is limited to verified professional attributes. Only your Identity, Geographical Location, and Occupation are exposed to facilitate networking. Sensitive identity metadata remains strictly sequestered from the map visualization layer." }
        ]
    },
    privacy: {
        title: "Privacy Protocols",
        icon: Shield,
        sections: [
            { h: "Digital Sovereignty Framework", p: "Your data is treated as an extension of your personhood. We utilize a Zero-Trust architecture where identity metadata is encrypted using AES-256-GCM at rest and TLS 1.3 in transit. We prioritize the absolute sovereignty of your digital footprint across all nodes." },
            { h: "Sensitive Identifier Encryption", p: "National Identity Numbers (NIN) and photographic verification evidence are never exposed to public or third-party nodes. These artifacts are stored in air-gapped virtual vaults with Row-Level Security (RLS) and are accessible only via audited LEVEL_04_ADMIN credentials." },
            { h: "Anti-Commercial Data Pledge", p: "The Kogi State Intelligence Network operates for civic good, not profit. We maintain an ironclad prohibition against the sale, trade, or transfer of user data to external commercial conglomerates for advertising, profiling, or psychological data-mining." }
        ]
    },
    terms: {
        title: "Terms of Engagement",
        icon: FileText,
        sections: [
            { h: "Civic Integrity Mandate", p: "Registered members are expected to represent Kogi State with professional excellence. The submission of fraudulent identifiers, stolen NIN artifacts, or simulated coordinates is a breach of the State Digital Code and will result in immediate node termination." },
            { h: "Coordinate Veracity Duty", p: "Users are under a continuous legal obligation to maintain the granular accuracy of their geographical and professional data. Maintaining a truthful presence in the index is a vital contribution to the State’s strategic resource mapping efforts." },
            { h: "Operational Deactivation Clause", p: "The Lokoja Digital Hub reserves the absolute authority to deactivate or 'Grey List' nodes that distribute misinformation, political propaganda, or non-sanctioned solitications that undermine the unity of the diaspora network." }
        ]
    },
    security: {
        title: "Data Security Standards",
        icon: Lock,
        sections: [
            { h: "Cryptographic Architecture", p: "Our security matrix utilizes military-grade AES-256 for document encryption, RSA-4096 for key exchanges, and SHA-384 for integrity hashing. This ensures that every verification artifact is protected by state-of-the-art cryptographic perimeters." },
            { h: "Multi-Factor Authentication Hub", p: "All administrative access to the core registry requires hardware-based Multi-Factor Authentication (MFA) and is subject to biometric perimeter checks at our central data facility, ensuring that identity data cannot be leaked via stolen credentials." },
            { h: "Real-Time Threat Monitoring", p: "The network is monitored by automated AI-driven threat detection algorithms that analyze node interactions for signs of scraping, reconnaissance, or unauthorized access attempts. Breach response protocols are automated via digital smart-contracts." }
        ]
    },
    compliance: {
        title: "Compliance Registry",
        icon: Scale,
        sections: [
            { h: "Multi-Tier Regulatory Layer", p: "The Kogi Global Tracker operates under the dual jurisdiction of the Kogi State Digital Hub Act (2024) and the Nigeria Data Protection Act (NDPR). We ensure comprehensive compliance with global high-watermark standards like the GDPR." },
            { h: "Right to Systematic Erasure", p: "Every node retains the 'Right to be Forgotten.' Upon a validated request, our system executes a cryptographic wipe of all associated identity artifacts, ensuring no residual data remains on backup tapes or secondary storage nodes." },
            { h: "Audit & Disclosure Transparency", p: "The platform undergoes bi-annual third-party security audits. Any detected anomaly or unauthorized access attempt is documented in the Compliance Registry and reported to the affected nodes within 72 network hours." }
        ]
    }
};

export default function LegalModals({ open, onOpenChange, type }: LegalModalsProps) {
    const active = content[type] || content.privacy;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl glass-card border-primary/20 max-h-[85vh] overflow-y-auto">
                <DialogHeader className="mb-6">
                    <DialogTitle className="text-2xl font-display flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <active.icon className="w-6 h-6 text-primary" />
                        </div>
                        {active.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-8 pr-2">
                    {active.sections.map((section, i) => (
                        <div key={i} className="space-y-3">
                            <h3 className="text-sm font-bold text-primary uppercase tracking-widest border-l-2 border-primary/40 pl-3">
                                {section.h}
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {section.p}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 pt-6 border-t border-primary/10 flex justify-between items-center text-[10px] uppercase tracking-tighter text-muted-foreground">
                    <span>Lokoja Node Compliance</span>
                    <span>Version 2.0.4 - Secure</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
