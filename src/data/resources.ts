interface ResourceLink {
  label: string;
  href: string;
  shallow?: boolean;
}

export const RESOURCE_LINKS: ResourceLink[] = [
  { label: "First mention", href: "/first-mention", shallow: true },
  {
    label: "Thompson chain reference",
    href: "/thompson-chain-reference",
    shallow: true,
  },
  { label: "Timeline", href: "/timeline", shallow: true },
  { label: "Source code", href: "https://github.com/calebmpeterson/studium" },
];
