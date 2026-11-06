import type { TeamMember } from "@/lib/types";

/**
 * PLACEHOLDER DATA — replace names, titles, bios, license numbers and photos.
 * Put headshots in /public/team/ (square, at least 800×800) and set `photoUrl`.
 */
export const team: TeamMember[] = [
  {
    id: "founder",
    name: "[Founder Name], CPA",
    title: "Founder & Managing Partner",
    credentials: "CPA",
    licenseNumber: "[MN CPA License #]",
    bio: "[Short bio: background, years in practice, areas of focus (for example nonprofit audit and small business tax), and a personal note about why they started Sanyagold.]",
    linkedin: "",
  },
  {
    id: "team-2",
    name: "[Team Member Name]",
    title: "[Senior Accountant]",
    credentials: "[CPA / EA / credentials]",
    licenseNumber: "[License # if applicable]",
    bio: "[Short bio: specialties, the clients they work with most, and what they enjoy about the work.]",
  },
  {
    id: "team-3",
    name: "[Team Member Name]",
    title: "[Client Success Manager]",
    credentials: "[Credentials]",
    licenseNumber: "[License # if applicable]",
    bio: "[Short bio: how they help clients day to day, onboarding, scheduling and keeping projects on track.]",
  },
];
