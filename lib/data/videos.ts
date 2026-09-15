/** Add new clips here after placing a web-optimised MP4 and poster in public/videos. */
export const VIDEOS = [
  {
    id: "kennismaken",
    title: "De bouwer achter uw systemen.",
    category: "Even kennismaken",
    duration: "1:38",
    src: "/videos/kennismaken.mp4",
    poster: "/videos/kennismaken-cover.jpg",
  },
  {
    id: "mail-automation",
    title: "Uw mailbox, ondersteund door een agent.",
    category: "In de praktijk",
    duration: "0:59",
    src: "/videos/mail-automation.mp4",
    poster: "/videos/mail-automation-cover.jpg",
  },
  {
    id: "audit-pilots",
    title: "Begin met het juiste proces.",
    category: "Van idee naar uitvoering",
    duration: "0:52",
    src: "/videos/audit-pilots.mp4",
    poster: "/videos/audit-pilots-cover.jpg",
  },
  {
    id: "ai-angst",
    title: "AI ondersteunt. AI vervangt niks.",
    category: "Nuchter over AI",
    duration: "0:58",
    src: "/videos/ai-angst.mp4",
    poster: "/videos/ai-angst-cover.jpg",
  },
] as const;
