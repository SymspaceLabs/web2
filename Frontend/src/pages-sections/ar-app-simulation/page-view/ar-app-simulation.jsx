import Section1 from "../section-1";
import Section2 from "../section-2";
import Section3 from "../section-3";
import Section4 from "../section-4";
import Section5 from "../section-5";

export default async function ArAppSimulationPageView() {
  return (
    <>
      <Section1 /> {/* HERO  */}
      <Section2 /> {/* 3 MOBILE SCREENS */}
      <Section3 /> {/* BENEFITS */}
      <Section4 /> {/* BANNER */}
      <Section5 /> {/* MARQUEE */}
    </>
  );
}