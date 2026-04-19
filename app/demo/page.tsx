import type { Metadata } from 'next';
import { Workbench } from '@/components/Workbench';

export const metadata: Metadata = {
  title: 'Demo · AI-agents in actie',
  description:
    'Interactieve demo van een AI-agent-workbench. Bekijk hoe agents samenwerken aan mails, offertes en orders.',
  alternates: { canonical: '/demo' },
};

export default function WorkbenchPage() {
  return <Workbench />;
}
