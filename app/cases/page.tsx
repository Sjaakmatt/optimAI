import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasesContent from "@/components/CasesContent";

export const metadata = {
  title: "Cases — FactumAI",
  description:
    "Voorbeelden van AI agents en automatiseringsoplossingen die FactumAI heeft gebouwd voor MKB-bedrijven.",
};

export default function CasesPage() {
  return (
    <main>
      <Navbar />
      <CasesContent />
      <Footer />
    </main>
  );
}
