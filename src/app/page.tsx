import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { SupportSearch } from "@/components/home/support-search";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SupportSearch />
      <HowItWorks />
    </main>
  );
}
