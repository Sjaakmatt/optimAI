import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Processes from "@/components/Processes";
import ProcessScan from "@/components/ProcessScan";
import AppointmentPlanner from "@/components/AppointmentPlanner";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <Processes />
      <ProcessScan />
      <AppointmentPlanner />
      <Footer />
    </main>
  );
}
