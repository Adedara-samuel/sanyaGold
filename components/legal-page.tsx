import { PageHero } from "@/components/shared";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={`Last updated ${updated}`} title={title} description={intro} />
      <div className="container-page max-w-3xl pb-24">
        <div className="space-y-4 leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:mt-2 [&_p]:text-muted-foreground [&_ul]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </div>
    </>
  );
}
