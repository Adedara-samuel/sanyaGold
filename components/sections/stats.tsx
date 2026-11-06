import { stats } from "@/content/stats";
import { CountUp } from "@/components/motion/count-up";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { PlaceholderNote } from "@/components/shared";

export function StatsBar() {
  const hasPlaceholders = stats.some((stat) => stat.placeholder);

  return (
    <section aria-label="Sanyagold at a glance" className="container-page">
      <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-3xl px-6 py-10 sm:px-10">
        <div aria-hidden="true" className="bg-accent/25 absolute -top-24 -right-16 size-64 rounded-full blur-3xl" />
        <Stagger as="ul" className="relative grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem as="li" key={stat.label} className="text-center lg:text-left">
              <p className="font-serif text-4xl font-semibold sm:text-5xl">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm opacity-80">{stat.label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      {hasPlaceholders && (
        <PlaceholderNote className="mt-3 text-center">Sample figures shown — replace with verified numbers before launch.</PlaceholderNote>
      )}
    </section>
  );
}
