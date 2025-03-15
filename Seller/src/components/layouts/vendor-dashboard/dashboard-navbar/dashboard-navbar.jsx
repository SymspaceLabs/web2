import Box from "@mui/material/Box";
import Container from "@mui/material/Container"; // Local CUSTOM COMPONENTS

import LeftContent from "./left-content";
import RightContent from "./right-content"; // STYLED COMPONENTS

import { StyledToolBar, DashboardNavbarRoot } from "./styles";
export default function DashboardNavbar() {
  return (
      <DashboardNavbarRoot position="sticky">
        <Box sx={{ px:5, paddingTop: "1rem", paddingBottom: "1rem", background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', }}>
          {/* <Container maxWidth="xl"> */}
            <Box>
              <StyledToolBar disableGutters>
                <LeftContent />
                <Box flexGrow={1} />
                <RightContent />
              </StyledToolBar>
            </Box>
            
          {/* </Container> */}
        </Box>
      </DashboardNavbarRoot>
    
  );
}