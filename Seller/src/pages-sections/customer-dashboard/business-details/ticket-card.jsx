import Link from "next/link";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";
import { format } from "date-fns"; // GLOBAL CUSTOM COMPONENTS
import { Box, Button }  from "@mui/material";
import { Paragraph, Span } from "../../../components/Typography";
import { FlexBetween, FlexBox } from "../../../components/flex-box"; // CUSTOM DATA MODEL

// ==============================================================
export default function TicketCard({
  ticket, fontSize="24px"
}) {
  const {
    id,
    slug,
    title,
    buttonTitle,
  } = ticket || {};
  return (
  // <Link href={`/vendor/business-details/${slug}`} key={id}>
    <Box sx={{background: 'linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)', boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)', backdropFilter: 'blur(12px)', borderRadius: '15px' }}>
      <FlexBetween px={2.5} py={2} mb={2} alignItems="center">
        <Paragraph lineHeight={1} sx={{fontFamily:'Elemental End', textTransform:'lowercase', fontSize:fontSize, color:'#fff'}}>
            {title}
          </Paragraph>
        <div>
          {/* <FlexBox alignItems="center" flexWrap="wrap" gap={1}>
            <Chip label={type} size="small" />
            <Chip label={status} size="small" color="success" />

            <Span className="pre" color="grey.600">
              {format(new Date(date), "MMM dd, yyyy")}
            </Span>

            <Span color="grey.600">{category}</Span>
          </FlexBox> */}
        </div>
        <Button sx={{background: 'rgba(48, 132, 255, 0.1)', border: '2px solid #FFFFFF', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', fontFamily:'Elemental End', textTransform:'lowercase', fontSize:'20px', color:'#fff', borderRadius: '59px', padding: '10px 46px', gap: '5px' }}>
          {buttonTitle}
        </Button>

        {/* <IconButton>
          <East fontSize="small" sx={{
          color: "grey.500",
          transform: ({
            direction
          }) => `rotate(${direction === "rtl" ? "180deg" : "0deg"})`
        }} />
        </IconButton> */}
      </FlexBetween>
    </Box> );
      
    {/* </Link> */}
   
}