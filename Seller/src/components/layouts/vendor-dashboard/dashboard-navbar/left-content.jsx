// ====================================================
// Left Content
// ====================================================

import { Fragment } from "react";
import { ToggleWrapper } from "./styles";
import { H1 } from "@/components/Typography";
import { useAuth } from "@/contexts/AuthContext";
import { useLayout } from "../dashboard-layout-context";
import Toggle from "@/icons/Toggle";

// ====================================================

export default function LeftContent() {
  const {
    handleOpenMobileSidebar
  } = useLayout();

  const { user } = useAuth();

  return <Fragment>
      <ToggleWrapper onClick={handleOpenMobileSidebar}>
        <Toggle />
      </ToggleWrapper>

      <H1 my={0} lineHeight={1} ellipsis py={5} color='#fff' fontSize={40}>
          Welcome, {user?.firstName}
      </H1>

    </Fragment>;
}