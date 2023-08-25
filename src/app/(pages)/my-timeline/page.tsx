import About from "@/app/(components)/about/about";
import Timeline from "@/app/(components)/timeline/timeline";
import PageAnimate from "@/app/(components)/page-animate/page-animate";
import MyStack from "@/app/(components)/my-stack/my-stack";

export default function AboutMePage() {
  return (
    <PageAnimate>
      <About />

      <MyStack />

      <Timeline />
    </PageAnimate>
  );
}
