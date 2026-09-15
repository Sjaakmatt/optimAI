/** Add new clips here after placing a web-optimised MP4 and poster in public/videos. */
export const VIDEOS = [
  {
    id: "kennismaken",
    title: "De bouwer achter uw agent.",
    category: "Even kennismaken",
    duration: "1:38",
    src: "/videos/kennismaken.mp4",
    poster: "/videos/kennismaken.jpg",
  },
  {
    id: "mail-automation",
    title: "Uw mailbox kan het rustiger aan.",
    category: "In de praktijk",
    duration: "0:59",
    src: "/videos/mail-automation.mp4",
    poster: "/videos/mail-automation.jpg",
  },
  {
    id: "audit-pilots",
    title: "Begin met het juiste proces.",
    category: "Van idee naar uitvoering",
    duration: "0:52",
    src: "/videos/audit-pilots.mp4",
    poster: "/videos/audit-pilots.jpg",
  },
  {
    id: "ai-angst",
    title: "AI hoeft niet spannend te zijn.",
    category: "Nuchter over AI",
    duration: "0:58",
    src: "/videos/ai-angst.mp4",
    poster: "/videos/ai-angst.jpg",
  },
] as const;
