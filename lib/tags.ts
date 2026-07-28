export const CREATIVE_TAGS = [
  "Video Editing",
  "Marketing",
  "Brand Consulting",
  "Product Design",
  "Game Development",
  "Server Infrastructure",
  "Videography",
  "Photography",
  "Social Media Marketing",
  "3D Design",
  "Minecraft Servers",
  "Graphic Design",
  "Project Management",
] as const;

export type CreativeTag = (typeof CREATIVE_TAGS)[number];

