
import type { ReactNode } from 'react';

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PaymentTier {
  level: string;
  seedsGoal: string;
  dailyHours: string;
  monthlyHours: string;
  remuneration: string;
  seedExchange: string;
  totalPayment: string;
}


export interface InfoTab {
  title: string;
  content: ReactNode;
}
