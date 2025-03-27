import { Fragment } from "react";
import { StyledLink } from "../styles";
import { ABOUT_LINKS } from "../data"; // ==============================================================
import { H1 } from "@/components/Typography";

// ==============================================================
export default function AboutLinks({isDark}) {
  return (
    <Fragment>
      <H1 color="#FFF" fontSize={18} lineHeight={1} mb={1}>
        Get To Know Us
      </H1>

      <div>
        {ABOUT_LINKS.map((item, ind) => <StyledLink isDark={isDark} href={item.url} key={ind}>
            {item.title}
          </StyledLink>)}
      </div>
    </Fragment>
  );
}