import type { Metadata } from "next";

import { Capabilities } from "@/components/home/Capabilities";
import { ContactSection } from "@/components/home/ContactSection";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { profile } from "@/data/profile";

const title = `${profile.name} | Data Engineer, Backend Developer & Applied AI`;
const description = `Portfolio of ${profile.name}, a Seattle-based Data Engineer, Backend Developer, and Applied AI builder creating data pipelines, backend systems, and AI-powered products.`;

export const metadata: Metadata = {
  // `absolute` opts out of the "%s · Katharina Cheng" template from the root
  // layout, which would otherwise repeat her name twice in the homepage title.
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  // Next replaces the parent openGraph object wholesale rather than merging
  // into it, so siteName has to be repeated here or the homepage loses it.
  openGraph: {
    title,
    description,
    siteName: profile.name,
    url: profile.siteUrl,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

/**
 * Composition only. Each section owns its own content and layout, and reads
 * from the data files rather than receiving props from here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Capabilities />
      <ExperiencePreview />
      <ContactSection />
    </>
  );
}
