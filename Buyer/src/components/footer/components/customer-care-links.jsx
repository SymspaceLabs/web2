import { Fragment } from "react";
import { Heading, StyledLink } from "../styles";
import { CUSTOMER_CARE_LINKS } from "../data"; // ==============================================================
import { H1 } from "@/components/Typography";

// ==============================================================
export default function CustomerCareLinks({
  isDark
}) {
  return (
    <Fragment>
      <H1 color="#FFF" fontSize={18} lineHeight={1} mb={1}>
        Partner With Us
      </H1>

      {CUSTOMER_CARE_LINKS.map((item, ind) => <StyledLink isDark={isDark} href={item.url} key={ind}>
          {item.title}
        </StyledLink>)}
    </Fragment>
  );
}