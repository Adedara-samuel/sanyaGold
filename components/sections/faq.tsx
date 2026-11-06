"use client";

import { ErrorState } from "@/components/query-state";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFaqs } from "@/hooks/use-faqs";
import type { Faq } from "@/lib/types";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6">
      {items.map((faq) => (
        <AccordionItem key={faq.question} value={faq.question}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function FaqSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }, (_, i) => (
        <Skeleton key={i} className="h-14" />
      ))}
    </div>
  );
}

/** Home page: the first few FAQs across categories. */
export function FaqPreview({ limit = 5 }: { limit?: number }) {
  const { data, isPending, isError, refetch, isRefetching } = useFaqs();
  if (isPending) return <FaqSkeleton />;
  if (isError)
    return <ErrorState message="We couldn't load FAQs." onRetry={() => refetch()} isRetrying={isRefetching} />;
  return <FaqList items={data.flatMap((group) => group.items).slice(0, limit)} />;
}

/** Resources page: FAQs grouped into tabs by category. */
export function FaqTabs() {
  const { data, isPending, isError, refetch, isRefetching } = useFaqs();
  if (isPending) return <FaqSkeleton />;
  if (isError)
    return <ErrorState message="We couldn't load FAQs." onRetry={() => refetch()} isRetrying={isRefetching} />;

  return (
    <Tabs defaultValue={data[0]?.category}>
      <TabsList className="mx-auto">
        {data.map((group) => (
          <TabsTrigger key={group.category} value={group.category}>
            {group.category}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((group) => (
        <TabsContent key={group.category} value={group.category}>
          <FaqList items={group.items} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
