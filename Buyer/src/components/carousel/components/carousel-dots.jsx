import { Fragment } from "react";
// STYLED COMPONENTS
import { Dot, DotList } from "../styles";

export default function CarouselDots({ dotColor, ...props }) {
  return {
    customPaging: () => <Dot dotColor={dotColor} />,
    appendDots: dots => (
      <DotList component="ul" {...props}>
        {dots}
      </DotList>
    )
  };
}
