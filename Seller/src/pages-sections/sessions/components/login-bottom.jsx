import { Fragment } from "react";
import BoxLink from "./box-link";
import { FlexRowCenter } from "../../../components/flex-box";
import { Span } from "../../../components/Typography";

export default function LoginBottom() {
  return (
    <Fragment>
      <FlexRowCenter gap={1} my={3}>
          <Span lineHeight={1} sx={{color:'#fff'}}>
            Don&apos;t have an account?
          </Span>
        <BoxLink title="Sign Up" href="/register" />
      </FlexRowCenter>
    </Fragment>
  );
}