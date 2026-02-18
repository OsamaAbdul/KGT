import { Shield, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function AboutSection() {
    const features = [
        {
            icon: Target,
            title: "32-Year Development Plan",
            description: "A strategic roadmap designed to transform Kogi State into a sustainable industrial hub by 2050, leveraging its unique geographical advantage."
        },
        {
            icon: Lightbulb,
            title: "Civic Intelligence",
            description: "By mapping our global footprint, we create a powerful network for knowledge transfer, investment, and collaborative governance."
        },
        {
            icon: Shield,
            title: "Data Integrity",
            description: "Secure identity verification ensures that our network remains a trusted source for state-building and diaspora engagement."
        }
    ];

    return (
        <section className="py-24 bg-background relative overflow-hidden">
            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold font-display mb-4 text-white">
                        Beyond the <span className="text-gradient-kogi">Map</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        The Kogi Global Tracker is more than a directory—it is the digital foundation of our state's long-term prosperity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="glass-card p-8 rounded-2xl border border-primary/10 hover:border-primary/30 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}
