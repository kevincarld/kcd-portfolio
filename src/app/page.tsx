import Intro from "./(components)/intro/intro";
import Marquee from "./(components)/marquee/marquee";
import PageAnimate from "./(components)/page-animate/page-animate";
export default function Home() {
  return (
    <PageAnimate>
      <Intro />

      <Marquee />
    </PageAnimate>
  );
}
