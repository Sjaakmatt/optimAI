import type { Script } from '@/lib/types';
import { script_order_new } from './scripts/order-new';
import { script_inquiry } from './scripts/inquiry';
import { script_complaint } from './scripts/complaint';
import { script_stock_low } from './scripts/stock-low';
import { script_supplier_delay } from './scripts/supplier-delay';
import { script_question } from './scripts/question';
import { script_invoice_overdue } from './scripts/invoice-overdue';
import { script_shipment_issue } from './scripts/shipment-issue';

export const SCRIPTS: Record<string, Script> = {
  script_order_new,
  script_inquiry,
  script_complaint,
  script_stock_low,
  script_supplier_delay,
  script_question,
  script_invoice_overdue,
  script_shipment_issue,
};
