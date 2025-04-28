import { Fragment } from "react";
import BoxLink from "../../../components/BoxLink";
import { FlexRowCenter } from "../../../components/flex-box";
import { Span } from "../../../components/Typography";

export default function LoginBottom() {
  return (
    <Fragment>
      <FlexRowCenter gap={1} my={3}>
          <Span lineHeight={1} sx={{color:'#fff'}}>
            Don't have an account?
          </Span>
        <BoxLink href="/register">
          Sign Up
        </BoxLink>
      </FlexRowCenter>
    </Fragment>
  );
}