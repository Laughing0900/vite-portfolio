import Talent from "@/components/home/talent/Talent";
import { Suspense, lazy } from "react";

// Defer the three.js bundle (three + fiber + drei) so the home shell paints
// before the WebGL hero engine downloads and boots.
const Hero = lazy(() => import("@/components/home/hero/Hero"));

const HomePage = () => {
  return (
    <main>
      <Suspense fallback={<section className="relative min-h-dvh" />}>
        <Hero />
      </Suspense>
      <Talent />
    </main>
  );
};

export default HomePage;
