import type { FaqGroup } from "@/lib/types";

export const faqGroups: FaqGroup[] = [
  {
    category: "Our two firms",
    items: [
      {
        question: "How are Sanyagold and W O Oyebamiji CPA LLC related?",
        answer:
          "They are two independent firms that complement each other. Sanyagold Accounting, Advisory and Consulting Services provides bookkeeping, payroll, HR and business advisory. W O Oyebamiji CPA LLC provides tax, audit, review and attestation services.",
      },
      {
        question: "Do I have to use both firms?",
        answer:
          "No. You can engage either firm on its own. Many clients use both, for example Sanyagold for monthly bookkeeping and payroll, and W O Oyebamiji CPA LLC for tax preparation or an audit.",
      },
    ],
  },
  {
    category: "Getting started",
    items: [
      {
        question: "Is the first consultation really free?",
        answer:
          "Yes. Your first consultation is free and comes with no obligation. We use it to understand your needs and tell you honestly whether we're the right fit.",
      },
      {
        question: "Who do you work with?",
        answer:
          "We focus on Minnesota nonprofits, small businesses and professional services firms. We also support clients with activity in other states.",
      },
      {
        question: "Do we need to meet in person?",
        answer:
          "No. Most of our work happens by video call, phone and secure document upload, and we're happy to meet in person when it helps.",
      },
    ],
  },
  {
    category: "Working together",
    items: [
      {
        question: "How do I send you my documents?",
        answer:
          "Through our client portal's document upload, or another method we agree on during onboarding. Please don't send Social Security numbers or bank details by regular email.",
      },
      {
        question: "How do you price your services?",
        answer:
          "Most ongoing work is a predictable monthly fee and most projects are a fixed fee agreed up front, so there are no surprise invoices.",
      },
      {
        question: "How quickly will you respond?",
        answer: "We aim to reply to client messages within one business day. [Confirm response-time commitment]",
      },
    ],
  },
  {
    category: "Nonprofits",
    items: [
      {
        question: "Can you prepare our Form 990?",
        answer: "Yes. W O Oyebamiji CPA LLC prepares Form 990, 990-EZ and 990-N, plus related Minnesota filings.",
      },
      {
        question: "Can you help us get ready for our first audit?",
        answer:
          "Yes. Sanyagold can help you organize your books, schedules and documentation so your first audit goes smoothly.",
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((group) => group.items);
export const homeFaqs = allFaqs.slice(0, 5);
