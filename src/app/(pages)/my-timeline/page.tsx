import About from "@/app/(components)/about/about";
import Timeline from "@/app/(components)/timeline/timeline";
import PageAnimate from "@/app/(components)/page-animate/page-animate";
export default function AboutMePage() {
  return (
    <PageAnimate>
      <About />
      <Timeline />
    </PageAnimate>
  );
}
