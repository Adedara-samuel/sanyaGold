import Image from "next/image";
import { Camera } from "lucide-react";
import { team } from "@/content/team";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Badge } from "@/components/ui/badge";
import { initials } from "@/lib/utils";
import type { TeamMember } from "@/lib/types";

export function TeamGrid({ members = team, detailed = false }: { members?: TeamMember[]; detailed?: boolean }) {
  return (
    <Stagger as="ul" className="grid min-w-0 grid-cols-4 gap-2 sm:gap-6">
      {members.map((member) => (
        <StaggerItem as="li" key={member.id} className="group min-w-0 overflow-hidden rounded-2xl border bg-card">
          <TeamPhoto member={member} />
          <div className="p-2 sm:p-6">
            <h3 className="break-words text-xs font-semibold sm:text-lg">{member.name}</h3>
            <p className="break-words text-[0.65rem] text-muted-foreground sm:text-sm">{member.title}</p>
            {(member.credentials || (detailed && member.licenseNumber)) && (
              <div className="mt-3 flex flex-wrap gap-2">
                {member.credentials && <Badge variant="gold">{member.credentials}</Badge>}
                {detailed && member.licenseNumber && <Badge variant="outline">License: {member.licenseNumber}</Badge>}
              </div>
            )}
            {detailed && member.bio && (
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
            )}
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
    <div className="relative grid aspect-[4/3] place-items-center bg-gradient-to-br from-accent-soft to-secondary">
      <span className="grid size-20 place-items-center rounded-full bg-card/80 font-serif text-2xl font-semibold text-foreground shadow-sm">
        {initials(member.name.replace(/[[\]]/g, "")) || "SG"}
      </span>
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[0.6875rem] text-muted-foreground">
        <Camera className="size-3.5" aria-hidden="true" /> Photo coming soon
      </span>
    </div>
  );
}
