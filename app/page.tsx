import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Processes from "@/components/Processes";
import ProcessScan from "@/components/ProcessScan";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Problem />
      <HowItWorks />
      <Processes />
      <ProcessScan />
      <Footer />
    </main>
  );
}