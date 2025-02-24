import { Card } from "@mui/material";
import { H3 } from "../../../components/Typography";
import { LazyImage } from "@/components/lazy-image";

// ==============================================================
export default function BlogCard({title, image}) {
  return (
    <Card sx={{ borderRadius:'80px', padding: 5, background: "rgba(255, 255, 255, 0.4)", boxShadow: "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10.0285px)"}}>
      <H3 sx={{ textAlign:'center', color:'#000', fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: { xs: 21, sm: 21, md: 21, lg: 21, xl: 21 } }}>
        {title}
      </H3>
      <LazyImage width={340} height={340} alt="Apple Watch" src={image} />
    </Card>
  );
}