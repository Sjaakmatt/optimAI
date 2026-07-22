import type { Script } from '@/lib/types';
import { script_chat_wismo } from './scripts/chat-wismo';
import { script_chat_address } from './scripts/chat-address';
import { script_mail_return } from './scripts/mail-return';
import { script_mail_product } from './scripts/mail-product';
import { script_mail_payment } from './scripts/mail-payment';
import { script_social_complaint } from './scripts/social-complaint';
import { script_social_restock } from './scripts/social-restock';
import { script_review_negative } from './scripts/review-negative';

export const SCRIPTS: Record<string, Script> = {
  script_chat_wismo,
  script_chat_address,
  script_mail_return,
  script_mail_product,
  script_mail_payment,
  script_social_complaint,
  script_social_restock,
  script_review_negative,
};
