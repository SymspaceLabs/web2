import { Box } from "@mui/material";
import { FlexColCenter } from "@/components/flex-box";
import Section1 from "../section-1";

export default async function StagingPageView() {
  return (
    <Box sx={{ position:'relative', overflow:'hidden', backgroundColor: '#fff' }}>
      {/* GRADIENT CIRCLES */}
      <BlobBox top='1%' right={-150} />
      {/* <BlobBox top='35%' left={250} />
      <BlobBox top='45%' right={100} />
      <BlobBox top='55%' left={100} color="#933FFE"/>
      <BlobBox top='65%' right={-150} /> */}

      {/* CONTENT */}
      <FlexColCenter sx={{ width:'100%' }}>
        <Section1 /> {/* HERO  */}
      </FlexColCenter>
    </Box>
  );
}


const BlobBox = ({top=null, right=null, bottom=null, left=null, color="#0366FE"}) => {
  return(
    <Box
      sx={{
        position: 'absolute',
        top: top,
        right: right,
        bottom: bottom,
        left: left,
        width: '50vw',
        height: '50vw',
        maxWidth: '500px',
        maxHeight: '500px',
        borderRadius: '50%',
        filter: 'blur(150px)',
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  )
}