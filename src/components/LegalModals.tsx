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

const content: Record<LegalType, { title: string; icon: any; sections: { h: string; p: string }[] }> = {
    intelligence: {
        title: "Intelligence Policy",
        icon: Info,
        sections: [
            { h: "Mission Objective", p: "The Kogi Global Tracker is an intelligence-driven node network designed to map the intellectual and economic footprint of the Kogi State diaspora." },
            { h: "Strategic Use", p: "Aggregated, non-personal location data is used by the Lokoja Central Intelligence Bureau for multi-decade economic planning." },
            { h: "Public Exposure", p: "Only vital professional coordinates (Name, Location, Skillset) are visualized on the global map to facilitate networking." }
        ]
    },
    privacy: {
        title: "Privacy Protocols",
        icon: Shield,
        sections: [
            { h: "Data Sovereignty", p: "Your identity data is encrypted at rest and in transit. We prioritize the security of sensitive metadata." },
            { h: "NIN Protection", p: "National Identity Numbers and verification slips are never exposed to the public node. They are restricted to LEVEL_04_ADMIN access." },
            { h: "Third-Party Disclosure", p: "We do not sell, trade, or transfer your intelligence data to external commercial entities." }
        ]
    },
    terms: {
        title: "Terms of Engagement",
        icon: FileText,
        sections: [
            { h: "Code of Conduct", p: "All members must represent Kogi State with professional integrity. Fraudulent registration is a violation of civic duty." },
            { h: "Node Responsibility", p: "Users are responsible for maintaining the accuracy of their location data for the collective interest of the network." },
            { h: "Termination", p: "The intelligence bureau reserves the right to deactivate nodes that distribute misinformation or spam." }
        ]
    },
    security: {
        title: "Data Security",
        icon: Lock,
        sections: [
            { h: "Encryption Standards", p: "We utilize RSA-4096 and AES-256 encryption for all sensitive verification files." },
            { h: "Access Controls", p: "Multi-factor authentication is required for all administrative access. Biometric verification is used in Lokoja HQ." },
            { h: "Audit Logs", p: "Every interaction with the database is logged and audited periodically to ensure zero unauthorized access." }
        ]
    },
    compliance: {
        title: "Compliance Registry",
        icon: Scale,
        sections: [
            { h: "Legal Framework", p: "This platform operates under the Kogi State Digital Hub Act of 2024 and Federal Nigeria Data Protection Regulations (NDPR)." },
            { h: "International Standards", p: "We strive for alignment with global GDPR principles regarding data portability and the right to be forgotten." },
            { h: "Reporting", p: "Any security breach must be reported to the Compliance Office within 72 standard node hours." }
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
