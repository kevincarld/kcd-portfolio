import Intro from "./(components)/intro/intro";
import Marquee from "./(components)/marquee/marquee";
import SelectedWorks from "./(components)/selected-works/selected-works";

export default function Home() {
  return (
    <>
      <Intro />

      {/* <SelectedWorks /> */}
      <Marquee />
    </>
  );
}
