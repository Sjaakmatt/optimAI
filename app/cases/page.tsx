import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CasesContent from "@/components/CasesContent";

export const metadata = {
  title: "Cases — FactumAI",
  description:
    "Voorbeelden van AI-implementaties en procesoptimalisaties die FactumAI heeft uitgevoerd voor MKB-bedrijven.",
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
