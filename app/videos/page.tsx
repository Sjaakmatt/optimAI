import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import { VideoCarousel } from "@/components/home/VideoCarousel";
import "../home.css";

export const metadata: Metadata = {
  title: "Video’s over AI in de praktijk",
  description:
    "Kijk mee met Sjaak: korte video’s over AI, automatisering en het werk achter uw agent. Bekijk alle video’s op één plek.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <SitePage lucht={false}>
      <VideoCarousel library />
    </SitePage>
  );
}
