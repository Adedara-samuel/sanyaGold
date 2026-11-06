import Image from "next/image";
import { Camera } from "lucide-react";
import { team } from "@/content/team";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

export function TeamGrid({ members = team, detailed = false }: { members?: TeamMember[]; detailed?: boolean }) {
  return (
    <Stagger as="ul" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <StaggerItem as="li" key={member.id} className="bg-card group overflow-hidden rounded-2xl border">
          <TeamPhoto member={member} />
          <div className="p-6">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground text-sm">{member.title}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="gold">{member.credentials}</Badge>
              {detailed && <Badge variant="outline">License: {member.licenseNumber}</Badge>}
            </div>
            {detailed && <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{member.bio}</p>}
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function TeamPhoto({ member }: { member: TeamMember }) {
  if (member.photoUrl) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={member.photoUrl}
          alt={`Portrait of ${member.name}, ${member.title}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  // PHOTO SLOT: add a headshot to /public/team and set `photoUrl` in content/team.ts.
  return (
    <div className="from-accent-soft to-secondary relative grid aspect-[4/3] place-items-center bg-gradient-to-br">
      <span className="bg-card/80 text-foreground grid size-20 place-items-center rounded-full font-serif text-2xl font-semibold shadow-sm">
        {initials(member.name.replace(/[[\]]/g, "")) || "SG"}
      </span>
      <span className="text-muted-foreground absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[0.6875rem]">
        <Camera className="size-3.5" aria-hidden="true" /> Photo coming soon
      </span>
    </div>
  );
}
