import { Fragment } from "react";
import BoxLink from "./box-link";
import { Span } from "@/components/Typography";
import { FlexRowCenter } from "@/components/flex-box";

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