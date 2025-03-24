import { Average } from "./_components/average";
import { FAQ } from "./_components/faq";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { Plans } from "./_components/plans";
import { Ready } from "./_components/ready";
import { ScrollToTop } from "./_components/scroll-to-top";
import { Testimonials } from "./_components/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Average />
      <Testimonials />
      <Plans />
      <FAQ />
      <Ready />
      <Footer />
      <ScrollToTop />
    </>
  );
}
