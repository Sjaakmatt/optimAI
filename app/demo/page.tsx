import type { Metadata } from 'next';
import { Workbench } from '@/components/Workbench';

export const metadata: Metadata = {
  title: 'Demo · AI-agents in actie',
  description:
    'Interactieve demo van een AI-klantenservice. Bekijk hoe agents chat, e-mail en social afhandelen en daarvoor het ERP en de vervoerder raadplegen.',
  alternates: { canonical: '/demo' },
  robots: {
    index: false,
    follow: true,
  },
};

export default function WorkbenchPage() {
  return <Workbench />;
}
