// ===========================================================
// Render Levels For Mobile Sidebar
// =========================================================== 

import { H1 } from "@/components/Typography";
import { NavLink } from "@/components/nav-link";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Box, AccordionSummary, Accordion } from "@mui/material";

// =========================================================== 

const ACCORDION_STYLES = {
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  },
  "&.MuiPaper-root": {
    backgroundColor: "transparent",
    color:'#FFF',    
  }
};
const ACCORDION_SUMMARY_STYLES = {
  padding: 0,
  minHeight: 48,
  boxShadow: "none",
  "& .Mui-expanded": {
    color: "primary.main",
    margin: 0
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    margin: 0,
    "& .MuiSvgIcon-root": {
      color: "primary.main"
    }
  },
  "&.MuiPaper-root": {
    backgroundColor: "transparent",
  }
};
export const renderLevels = (data, handleClose) => {
  return data.map((item, index) => {
    if (item.child) {
      return (
        <Accordion square key={index} elevation={0} disableGutters sx={ACCORDION_STYLES}>
          <AccordionSummary expandIcon={<ExpandMore sx={{color:"#FFF"}} />} sx={ACCORDION_SUMMARY_STYLES}>
            <H1 color="#FFF">
              {item.title}
            </H1>
          </AccordionSummary>

          <Box mx={2}>{renderLevels(item.child, handleClose)}</Box>
        </Accordion>
      );
    }

    if (item.extLink) {
      return (
        <H1 key={index} py={1}>
          <NavLink href={item.url}>
            {item.title}
          </NavLink>
        </H1>
      );
    }

    return (
      <Box key={index} py={1}>
        <H1 fontWeight={400} fontSize={12} color="rgba(255,255,255,0.8)">
          <NavLink href={item.url} onClick={handleClose} color="#FFF">
            {item.title}
          </NavLink>
        </H1>
      </Box>
    );
  });
};