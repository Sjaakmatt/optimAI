import type { Metadata } from "next";
import { SitePage } from "@/components/site/SitePage";
import { VideoCarousel } from "@/components/home/VideoCarousel";
import { getVideos } from "@/lib/data/videos";
import "../home.css";

export const metadata: Metadata = {
  title: "Video’s over AI in de praktijk",
  description:
    "Kijk mee met Sjaak: korte video’s over AI, automatisering en het werk achter uw agent. Bekijk alle video’s op één plek.",
  alternates: { canonical: "/videos" },
};

// De bibliotheek komt uit het dashboard; dezelfde vijf minuten als daar op de
// route staat. Zie lib/data/videos.ts.
export const revalidate = 300;

export default async function VideosPage() {
  const { videos, categorieen } = await getVideos();

  return (
    <SitePage lucht={false}>
      <VideoCarousel videos={videos} categorieen={categorieen} library />
    </SitePage>
  );
}
