import { firmHref } from "@/content/firms";
import { siteConfig } from "@/lib/site-config";
import type { FirmId } from "@/lib/types";

export type NavChild = { label: string; href: string; description: string; group?: string };

/** Groups dropdown items by their optional `group` (e.g. the firm that provides a service). */
export function groupNavChildren(children: readonly NavChild[]) {
  const groups: { group?: string; items: NavChild[] }[] = [];
  for (const child of children) {
    const last = groups.at(-1);
    if (last && last.group === child.group) last.items.push(child);
    else groups.push({ group: child.group, items: [child] });
  }
  return groups;
}

/**
 * Which firm's pages the visitor is on, so the header can show that firm's logo.
 * W O Oyebamiji CPA LLC: its firm page and the services it provides. Everything else: Sanyagold.
 */
export function firmForPath(pathname: string | null): FirmId {
  if (!pathname) return "sanyagold";
  const cpaGroup = siteConfig.footer.serviceGroups.find((group) => group.href === firmHref("oyebamiji-cpa"));
  const cpaPaths = [firmHref("oyebamiji-cpa"), ...(cpaGroup?.links.map((link) => link.href) ?? [])];
  return cpaPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`)) ? "oyebamiji-cpa" : "sanyagold";
}
