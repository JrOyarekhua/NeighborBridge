import { MapPin, Search, Users } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";

const STEPS = [
  {
    icon: Search,
    title: "Choose your need",
    text: "Tell us whether you’re looking for food or housing support.",
  },
  {
    icon: MapPin,
    title: "Find nearby resources",
    text: "Browse clear, relevant options based on your area.",
  },
  {
    icon: Users,
    title: "Connect with support",
    text: "Review details and contact the provider directly.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto my-19 w-full max-w-narrow px-4 sm:mt-26 sm:mb-28">
      <SectionHeading
        centered
        kicker="Simple by design"
        title="How NeighborBridge works"
        description="Get from a question to a helpful next step in just a few moments."
      />
      <ol className="mt-8 grid gap-3.5 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        {STEPS.map(({ icon: Icon, title, text }, index) => (
          <li
            key={title}
            className="relative rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8"
          >
            <span
              aria-hidden="true"
              className="absolute top-5 right-6 text-4xl font-extrabold text-step-number"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="grid size-13 place-items-center rounded-lg bg-mint-pale text-brand">
              <Icon size={25} aria-hidden="true" />
            </span>
            <h3 className="mt-5 mb-2.5 text-lg font-bold text-brand-deep">{title}</h3>
            <p className="text-sm leading-relaxed text-ink-soft">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
