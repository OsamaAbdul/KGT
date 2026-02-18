import { Globe, MapPin, Twitter, Instagram, Linkedin, Facebook, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import LegalModals, { LegalType } from "./LegalModals";

export default function Footer() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<LegalType>("privacy");

    const openLegal = (type: LegalType) => {
        setModalType(type);
        setModalOpen(true);
    };

    return (
        <footer className="bg-background/80 backdrop-blur-md border-t border-primary/10 pt-16 pb-8">
            <div className="container px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Globe className="h-8 w-8 text-primary" />
                                <MapPin className="absolute -bottom-1 -right-1 h-4 w-4 text-primary-glow" />
                            </div>
                            <div>
                                <h2 className="text-lg font-display font-bold tracking-wider text-foreground uppercase">
                                    Kogi Global Tracker
                                </h2>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                    Official Diaspora Network
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Connecting Kogites across every continent to build a unified path toward our 32-year development goals.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full glass border border-primary/10 text-muted-foreground hover:text-primary transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass border border-primary/10 text-muted-foreground hover:text-primary transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-full glass border border-primary/10 text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Resources</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><Link to="/" className="hover:text-primary transition-colors">Home Archive</Link></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Gov Portal</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Kogi Master Plan</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Node Directory</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Intelligence Policy</h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li><button onClick={() => openLegal("privacy")} className="hover:text-primary transition-colors text-left">Privacy Protocols</button></li>
                            <li><button onClick={() => openLegal("terms")} className="hover:text-primary transition-colors text-left">Terms of Engagement</button></li>
                            <li><button onClick={() => openLegal("security")} className="hover:text-primary transition-colors text-left">Data Security</button></li>
                            <li><button onClick={() => openLegal("compliance")} className="hover:text-primary transition-colors text-left">Compliance Registry</button></li>
                        </ul>
                    </div>

                    {/* Security Badge */}
                    <div className="space-y-6">
                        <h3 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Security</h3>
                        <button
                            onClick={() => openLegal("intelligence")}
                            className="w-full bg-primary/5 p-6 rounded-2xl border border-primary/20 flex flex-col items-center text-center space-y-4 group hover:bg-primary/10 transition-all"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6 text-primary glow-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Secured by Encryption</h4>
                                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">RSA-4096 Multi-Layer Auth</p>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="border-t border-primary/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground">
                    <p>© 2026 Kogi State Government. Intelligence Bureau.</p>
                    <div className="flex gap-8">
                        <span>Lokoja Node 01</span>
                        <span>Global Dispatch Beta.3</span>
                    </div>
                </div>
            </div>

            <LegalModals
                open={modalOpen}
                onOpenChange={setModalOpen}
                type={modalType}
            />
        </footer>
    );
}
