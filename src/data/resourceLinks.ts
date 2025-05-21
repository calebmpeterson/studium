export interface ResourceLink {
  label: string;
  href: string;
  shallow?: boolean;
}

export const RESOURCE_LINKS: ResourceLink[] = [
  { label: "First Mention", href: "/first-mention", shallow: true },
  { label: "Thompson Chain Reference", href: "/thompson-chain-reference", shallow: true },
  { label: "Timeline", href: "/timeline", shallow: true },
  { label: "Source Code", href: "https://github.com/calebmpeterson/studium" },
];
