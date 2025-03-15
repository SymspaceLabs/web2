import Link from "next/link";
import { Fragment } from "react"; // CUSTOM ICON COMPONENTS

import Globe from "../../../../icons/Globe";
import Toggle from "../../../../icons/Toggle"; // LOCAL CUSTOM HOOKS

import { useLayout } from "../dashboard-layout-context"; // STYLED COMPONENTS

import { CustomButton, ToggleWrapper } from "./styles";
import { Typography } from "@mui/material";
export default function LeftContent() {
  const {
    handleOpenMobileSidebar
  } = useLayout();
  return <Fragment>
      <ToggleWrapper onClick={handleOpenMobileSidebar}>
        <Toggle />
      </ToggleWrapper>

      <Typography my={0} lineHeight={1} ellipsis sx={{py:5, fontFamily:'Elemental End', textTransform:'lowercase', color:'#fff', fontSize:40}}>
          Welcome, Zayden
      </Typography>

      {/* <CustomButton LinkComponent={Link} href="/" startIcon={<Globe sx={{
      color: "grey.900"
    }} />}>
        Browse Website
      </CustomButton> */}
    </Fragment>;
}