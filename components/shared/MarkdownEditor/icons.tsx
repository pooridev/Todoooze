import { FC, SVGProps } from "react";

const Icon: FC<SVGProps<SVGSVGElement>> = ({ children, ...props }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const HeadingIcon = () => (
  <Icon>
    <path d="M6 4v16M18 4v16M6 12h12" />
  </Icon>
);

export const BoldIcon = () => (
  <Icon>
    <path d="M7 4h7a4 4 0 0 1 0 8H7zM7 12h8a4 4 0 0 1 0 8H7z" />
  </Icon>
);

export const ItalicIcon = () => (
  <Icon>
    <path d="M19 4h-9M14 20H5M15 4L9 20" />
  </Icon>
);

export const StrikeIcon = () => (
  <Icon>
    <path d="M16 4H9a3 3 0 0 0-2.83 4M14 12a4 4 0 0 1 0 8H6M4 12h16" />
  </Icon>
);

export const CodeIcon = () => (
  <Icon>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Icon>
);

export const LinkIcon = () => (
  <Icon>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </Icon>
);

export const QuoteIcon = () => (
  <Icon>
    <path d="M3 21c3-3 4-6 4-10H3V4h8v7c0 5-2 8-5 10zM14 21c3-3 4-6 4-10h-4V4h8v7c0 5-2 8-5 10z" strokeWidth="1.6" />
  </Icon>
);

export const BulletListIcon = () => (
  <Icon>
    <path d="M8 6h13M8 12h13M8 18h13" />
    <path d="M3.5 6h.01M3.5 12h.01M3.5 18h.01" strokeWidth="3" />
  </Icon>
);

export const OrderedListIcon = () => (
  <Icon>
    <path d="M10 6h11M10 12h11M10 18h11" />
    <path d="M4 6h1v4M4 10h2" strokeWidth="1.6" />
    <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" strokeWidth="1.6" />
  </Icon>
);

export const ChecklistIcon = () => (
  <Icon>
    <path d="M11 6h10M11 12h10M11 18h10" />
    <path d="m3 6 1.5 1.5L7 5M3 12l1.5 1.5L7 11M3 18l1.5 1.5L7 17" strokeWidth="1.6" />
  </Icon>
);
