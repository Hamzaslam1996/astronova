import { useEffect, useState } from "react";

const phrases = [
  "Are you a startup looking for opportunities in LEO?",
  "Want to find NASA tech that fits your business?",
  "Curious about the next launch window for rideshare?",
  "Explore the future of orbital entrepreneurship.",
];

export function RotatingHeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-sm text-muted-foreground h-6 transition-opacity duration-500 animate-fade-in">
      {phrases[index]}
    </p>
  );
}
