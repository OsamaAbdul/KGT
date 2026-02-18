import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2, User, Calendar, Briefcase, MapPin, Landmark, Fingerprint, Upload, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

const KOGI_LGAS = [
  "Adavi", "Ajaokuta", "Ankpa", "Bassa", "Dekina", "Ibaji", "Idah", "Igalamela-Odolu",
  "Ijumu", "Kabba/Bunu", "Kogi", "Lokoja", "Mopa-Muro", "Ofu", "Ogori/Magongo",
  "Okehi", "Okene", "Olomaboro", "Omala", "Yagba East", "Yagba West"
];

const Onboarding = () => {
  const [step, setStep] = useState(2); // Starting at Step 2 as Step 1 (Auth) is handled in Index.tsx
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    dob: "",
    occupation: "",
    country: "Nigeria",
    state: "Kogi",
    lga: "",
    nin: "",
    ninSlip: null as File | null,
  });

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/");
        return;
      }
      setUser(user);

      // Check if already completed
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .single();

      if (profile?.onboarding_completed) {
        navigate("/dashboard");
      }
    };
    checkUser();
  }, [navigate]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, ninSlip: e.target.files[0] });
    }
  };

  const captureLocationAndIP = async () => {
    let coords = null;
    let ip_address = null;

    try {
      // Get Coords
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      coords = { lat: position.coords.latitude, lng: position.coords.longitude };
    } catch (err) {
      console.error("Location capture failed:", err);
    }

    try {
      // Get IP
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      ip_address = data.ip;
    } catch (err) {
      console.error("IP capture failed:", err);
    }

    return { coords, ip_address };
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { coords, ip_address } = await captureLocationAndIP();

      let nin_slip_url = "";
      if (formData.ninSlip) {
        const fileExt = formData.ninSlip.name.split('.').pop();
        const filePath = `${user.id}/${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('identity_documents')
          .upload(filePath, formData.ninSlip);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('identity_documents')
          .getPublicUrl(filePath);

        nin_slip_url = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          dob: formData.dob,
          occupation: formData.occupation,
          country: formData.country,
          state_of_origin: formData.state,
          lga: formData.lga,
          nin: formData.nin,
          nin_slip_url,
          last_known_coords: coords ? `POINT(${coords.lng} ${coords.lat})` : null,
          ip_address,
          onboarding_completed: true,
        })
        .eq("id", user.id);

      if (updateError) throw updateError;

      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00A86B", "#FFFFFF", "#FFD700"],
      });

      setStep(5); // Success step
      setTimeout(() => navigate("/dashboard"), 3000);

    } catch (error: any) {
      toast.error(error.message || "An error occurred during verification");
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-fixed">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-xl glass rounded-2xl p-8 shadow-2xl overflow-hidden"
      >
        {step < 5 && (
          <div className="flex justify-between mb-8">
            {[2, 3, 4].map((s) => (
              <div key={s} className="flex-1 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${step === s ? "border-primary bg-primary text-primary-foreground" :
                    step > s ? "border-primary bg-primary/20 text-primary" : "border-muted text-muted-foreground"
                  }`}>
                  {step > s ? <CheckCircle2 className="h-6 w-6" /> : s - 1}
                </div>
                <div className="text-[10px] mt-2 font-display uppercase tracking-wider text-muted-foreground">
                  {s === 2 ? "Profile" : s === 3 ? "Origin" : "Identity"}
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold font-display">Tell us about yourself</h1>
                <p className="text-muted-foreground">This information will help identify you in the network.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="flex items-center gap-2"><User className="h-4 w-4" /> Full Name</Label>
                  <Input
                    id="full_name"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob" className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation" className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="Software Engineer"
                    value={formData.occupation}
                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  />
                </div>
              </div>

              <Button onClick={handleNext} className="w-full font-display" disabled={!formData.full_name || !formData.dob || !formData.occupation}>
                Continue
              </Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold font-display">Where are you from?</h1>
                <p className="text-muted-foreground">Specifically validating your roots in Kogi State.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Country</Label>
                  <Select value={formData.country} onValueChange={(val) => setFormData({ ...formData, country: val })}>
                    <SelectTrigger className="bg-muted/50"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nigeria">Nigeria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Landmark className="h-4 w-4" /> State (Strictly Kogi)</Label>
                  <Select value={formData.state} onValueChange={(val) => setFormData({ ...formData, state: val })}>
                    <SelectTrigger className="bg-muted/30 opacity-80 cursor-not-allowed"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kogi">Kogi State</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Local Government Area (LGA)</Label>
                  <Select value={formData.lga} onValueChange={(val) => setFormData({ ...formData, lga: val })}>
                    <SelectTrigger><SelectValue placeholder="Select LGA" /></SelectTrigger>
                    <SelectContent>
                      {KOGI_LGAS.map(lga => (
                        <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1">Back</Button>
                <Button onClick={handleNext} className="flex-[2] font-display" disabled={!formData.lga}>Continue</Button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold font-display">Official Identity</h1>
                <p className="text-muted-foreground">Verify your identity with your National ID.</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nin" className="flex items-center gap-2"><Fingerprint className="h-4 w-4" /> NIN (11 Digits)</Label>
                  <Input
                    id="nin"
                    maxLength={11}
                    placeholder="12345678901"
                    value={formData.nin}
                    onChange={(e) => setFormData({ ...formData, nin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nin_slip" className="flex items-center gap-2"><Upload className="h-4 w-4" /> Upload NIN Slip</Label>
                  <div className="relative border-2 border-dashed border-muted rounded-xl p-8 text-center hover:border-primary transition-all">
                    <input
                      type="file"
                      id="nin_slip"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                    {formData.ninSlip ? (
                      <div className="flex items-center justify-center gap-2 text-primary font-medium">
                        <CheckCircle2 className="h-5 w-5" /> {formData.ninSlip.name}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                        <div className="text-sm text-muted-foreground">Click to upload or drag & drop</div>
                        <div className="text-xs text-muted-foreground/60">PDF, JPG or PNG (Max 5MB)</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={handleBack} className="flex-1" disabled={loading}>Back</Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-[2] font-display bg-primary hover:bg-primary-glow"
                  disabled={loading || formData.nin.length !== 11 || !formData.ninSlip}
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : "Verify & Complete"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <h1 className="text-3xl font-bold font-display">Registration Successful!</h1>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Welcome to the Kogi Global Tracker network. Redirecting you to your profile overview...
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Onboarding;

