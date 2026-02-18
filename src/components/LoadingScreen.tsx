import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="mb-8"
      >
        <Globe className="h-16 w-16 text-primary" />
      </motion.div>

      <motion.p
        className="font-display text-lg tracking-[0.25em] text-muted-foreground"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Authenticating Neural Access…
      </motion.p>

      <div className="mt-6 h-0.5 w-48 overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full bg-primary"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "50%" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
