import { TopBar } from '@/components/TopBar';
import { DashboardKPI, AgentTable } from '@/components/DashboardKPI';
import {
  TasksPerHourChart,
  SavingsPerAgentChart,
} from '@/components/DashboardCharts';

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-1 p-6 space-y-6 max-w-[1280px] w-full mx-auto">
        <header>
          <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
            Dashboard
          </div>
          <h1 className="font-display text-[34px] leading-tight text-[var(--text)]">
            Vandaag in cijfers
          </h1>
          <p className="mt-1 text-[13px] text-[var(--text-dim)] max-w-[640px]">
            Live KPI’s van de Control Room. Baseline is historisch verbruik van vandaag,
            getallen lopen op zodra agents taken afhandelen.
          </p>
        </header>

        <DashboardKPI />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TasksPerHourChart />
          <SavingsPerAgentChart />
        </div>

        <AgentTable />
      </main>
    </div>
  );
}
