export type NavItem = {
  href: string;
  label: string;
  footerLabel?: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/resources", label: "Find Support" },
  { href: "/exchange", label: "Exchange & Contribute" },
  { href: "/about", label: "About", footerLabel: "About this prototype" },
];

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
