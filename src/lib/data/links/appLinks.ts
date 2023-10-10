import type { NavigationLink } from "$lib/interfaces/navigationLink";

const fixedLinks: NavigationLink[] = [
  {
    href: "/",
    icon: "fa-home",
    text: "Home"
  }
];

const moduleLinks: NavigationLink[] = [
  {
    href: "/modules/per-diem",
    icon: "fa-bed",
    text: "Per Diem"
  }
];

export { fixedLinks, moduleLinks };
