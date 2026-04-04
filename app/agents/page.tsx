import AgentsHero from "@/components/agents/AgentsHero";
import AgentsExplainer from "@/components/agents/AgentsExplainer";
import WorkflowShowcase from "@/components/agents/WorkflowShowcase";
import AgentsCTA from "@/components/agents/AgentsCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AgentsPage() {
  return (
    <main>
      <Navbar />
      <AgentsHero />
      <AgentsExplainer />
      <WorkflowShowcase />
      <AgentsCTA />
      <Footer />
    </main>
  );
}