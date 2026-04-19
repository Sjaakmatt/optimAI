'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useStore } from '@/lib/store';
import { TASKS_PER_HOUR_24H, SAVED_MINUTES_BY_AGENT } from '@/lib/data/mockHistory';
import { AGENT_DEFINITIONS } from '@/lib/agents/definitions';

export function TasksPerHourChart() {
  return (
    <section className="border border-[var(--border)] bg-[var(--bg-elev)] p-5">
      <header className="mb-4">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
          Doorloopsnelheid
        </div>
        <div className="font-display text-[17px] text-[var(--text)]">Taken per uur · 24u</div>
      </header>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={TASKS_PER_HOUR_24H} margin={{ top: 8, right: 12, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="hour"
              stroke="var(--text-faint)"
              tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
              interval={3}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              stroke="var(--text-faint)"
              tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              width={40}
            />
            <Tooltip
              cursor={{ stroke: 'var(--border-hot)' }}
              contentStyle={{
                backgroundColor: 'var(--bg-elev-2)',
                border: '1px solid var(--border-hot)',
                borderRadius: 2,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
              }}
              labelStyle={{ color: 'var(--text-dim)' }}
              itemStyle={{ color: 'var(--accent)' }}
            />
            <Line
              type="monotone"
              dataKey="taken"
              stroke="var(--accent)"
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3, fill: 'var(--accent)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export function SavingsPerAgentChart() {
  const byAgent = useStore((s) => s.roi.byAgent);
  const data = SAVED_MINUTES_BY_AGENT.map((p) => ({
    label: p.label,
    minuten: byAgent[p.agent]?.minutes ?? p.minuten,
    color: AGENT_DEFINITIONS[p.agent].color,
  }));

  return (
    <section className="border border-[var(--border)] bg-[var(--bg-elev)] p-5">
      <header className="mb-4">
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--text-faint)]">
          Verdeling
        </div>
        <div className="font-display text-[17px] text-[var(--text)]">Besparing per agent</div>
      </header>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" horizontal={false} />
            <XAxis
              type="number"
              stroke="var(--text-faint)"
              tick={{ fontSize: 10, fontFamily: 'var(--font-mono)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
            />
            <YAxis
              type="category"
              dataKey="label"
              stroke="var(--text-faint)"
              tick={{ fontSize: 11, fontFamily: 'var(--font-body)' }}
              tickLine={false}
              axisLine={{ stroke: 'var(--border)' }}
              width={92}
            />
            <Tooltip
              cursor={{ fill: 'var(--bg-elev-2)' }}
              contentStyle={{
                backgroundColor: 'var(--bg-elev-2)',
                border: '1px solid var(--border-hot)',
                borderRadius: 2,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
              }}
              labelStyle={{ color: 'var(--text-dim)' }}
              formatter={(value: number) => [`${value} min`, 'Bespaard']}
            />
            <Bar dataKey="minuten" fill="var(--accent)" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
