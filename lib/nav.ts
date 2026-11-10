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
