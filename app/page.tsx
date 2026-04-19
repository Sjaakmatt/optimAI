import { TopBar } from '@/components/TopBar';
import { EventsPanel } from '@/components/EventsPanel';
import { AgentNetwork } from '@/components/AgentNetwork';
import { ReasoningStream } from '@/components/ReasoningStream';
import { ROITicker } from '@/components/ROITicker';
import { AutonomousRunner } from '@/components/AutonomousRunner';

export default function ControlRoomPage() {
  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[320px_1fr_420px] min-h-0">
        <EventsPanel />
        <section className="relative min-h-0 bg-[var(--bg)]">
          <AgentNetwork />
        </section>
        <ReasoningStream />
      </main>
      <ROITicker />
      <AutonomousRunner />
    </div>
  );
}
