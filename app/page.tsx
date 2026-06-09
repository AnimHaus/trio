import BackgroundVideo from "@/components/BackgroundVideo";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import LatestReleases from "@/components/LatestReleases";

export default function Home() {
  return (
    <main className="flex flex-col">
      <BackgroundVideo />
      <Hero />
      <AboutSection />
      <LatestReleases />
    </main>
  );
}
