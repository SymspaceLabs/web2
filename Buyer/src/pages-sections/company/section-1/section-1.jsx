// LOCAL CUSTOM COMPONENT
import HeroCarousel from "./carousel"; // STYLED COMPONENTS

import { Wrapper } from "./styles"; // API FUNCTIONS

export default async function Section1({company}) {

  return <Wrapper id="carouselBox">
      <HeroCarousel
         mainCarouselData={mainCarouselData}
         company={company}
      />
    </Wrapper>;
}

const mainCarouselData = [{
  id: 1,
  title: "Modern Furniture.",
  subTitle: "A Beautiful House_",
  imgUrl: "/assets/images/headers/furniture-1.jpg",
  description: `How employees, surely the a said drops. Bathroom expected that systems let place. Her safely been little. Enterprises flows films it a fly the of wasn't designer the her thought. Enterprises flows films it a fly the of wasn't designer.`,
  buttonText: "Shop Now",
  buttonLink: "#"
}, {
  id: 2,
  title: "Modern Furniture.",
  subTitle: "A Beautiful House_",
  imgUrl: "/assets/images/headers/furniture-1.jpg",
  description: `How employees, surely the a said drops. Bathroom expected that systems let place. Her safely been little. Enterprises flows films it a fly the of wasn't designer the her thought. Enterprises flows films it a fly the of wasn't designer.`,
  buttonText: "Shop Now",
  buttonLink: "#"
}]