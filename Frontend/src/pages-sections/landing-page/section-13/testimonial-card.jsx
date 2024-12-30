import LazyImage from "../../../components/LazyImage"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "../../../components/flex-box";
import { H6, Paragraph } from "../../../components/Typography"; // STYLED COMPONENTS

import { ImageWrapper, Wrapper } from "./styles"; // ==============================================================

// ==============================================================
export default function TestimonialCard({
  testimonial
}) {
  const {
    comment,
    user
  } = testimonial || {};
  return <Wrapper sx={{background:"rgba(255, 255, 255, 0.1)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 25px rgba(53, 53, 53, 0.5)", borderRadius:" 10px" }}>
      <FlexBox mb={2} gap={2}>
        <ImageWrapper>
          <LazyImage src={user.avatar} width={240} height={240} alt="User" />
        </ImageWrapper>

        <div>
          <H6 fontSize={18}>{user.name}</H6>
          <Paragraph color="grey.600">{user.designation}</Paragraph>
        </div>
      </FlexBox>

      <Paragraph>{comment}</Paragraph>
    </Wrapper>;
}