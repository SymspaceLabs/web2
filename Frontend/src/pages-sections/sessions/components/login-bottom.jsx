import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexBox, FlexRowCenter } from "../../../components/flex-box";
import { H3, Span } from "../../../components/Typography";

export default function LoginBottom() {
  return <Fragment>
      <FlexRowCenter gap={1} my={3}>
          <Span lineHeight={1} sx={{color:'#fff'}}>
            Don&apos;t have an account?
          </Span>
        <BoxLink title="Sign Up" href="/register" />
      </FlexRowCenter>
    </Fragment>;
}