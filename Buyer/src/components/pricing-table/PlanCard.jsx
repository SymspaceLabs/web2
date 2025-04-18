import { Box, Card, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { LazyImage } from "@/components/lazy-image";
import { FlexRowCenter } from "../flex-box";
import { H1 } from "../Typography";
import { styles } from "./styles";
import Link from "next/link";

export default function PlanCard({ plan, theme }) {
  return (
    <Box position="relative">
      {/* Header Section */}
      {plan.isPopular &&
        <FlexRowCenter zIndex={3} gap={1} alignItems="center"
          sx={{
            backgroundColor: "#2563EB",
            color: "#fff",
            padding: "10px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            position:'absolute',
            top:0,
            marginTop:'-20px',
            width:'100%',
            borderRadius: "25px 25px 0 0", 
          }}
        >
          Most Popular
          <Box>
            <LazyImage
              src="/assets/images/sparkles.png"
              width={50}
              height={50}
            />
          </Box>
          
        </FlexRowCenter>
      }
      <Card
        sx={{
          minHeight: {xs:"500px", sm:"650px"}, // Guarantees a base height
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,  // Makes the card expand
          width:'100%',
          height: "100%",  // Ensures all cards match the tallest one
          border: plan.isPopular ? "3px solid #2563EB" : "1px solid rgba(255, 255, 255, 1)",
          filter: "drop-shadow(0px 5px 50px rgba(0, 0, 0, 0.25))",
          borderRadius: "25px",
          backdropFilter: "blur(10.0285px)",
          background: "rgba(255, 255, 255, 0.35)",
          boxShadow:
            "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)",
        }}
      >
        <Box sx={{ position: "relative", p:4 }}>
          <H1 sx={{ fontSize: 20, color: theme=='dark'?'#FFF':'#000' }}>
            {plan.title}
          </H1>
          <Typography sx={{ fontSize: 14, color: theme=='dark'?'#FFF':'#000' }}>
            {plan.subTitle}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Helvetica",
              textTransform: "lowercase",
              fontSize: "32px",
              pt: 3,
              fontWeight: "bold",
              color: theme=='dark'?'#FFF':'#000'
            }}
          >
            {plan.price}
            <Typography component="span" sx={{ fontSize: "18px" }}>
              /{plan.basis}
            </Typography>
          </Typography>
          {
            plan.credit > 0 ?
              <Typography sx={{ color: theme=='dark'?'#FFF':'#000' }}>
              {plan.title!=="Starter" ? "+ $"+`${plan.credit} `+ "Each Additional Credit" : <>&nbsp;</> }
            </Typography>:<></>
          }
          <Link href="/register" passHref>
            <Button fullWidth sx={styles.getStartedBtn}>
              Get Started
            </Button>
          </Link>

          <Typography
            sx={{ fontWeight: "bold", fontSize: "16px", color: theme=='dark'?'#FFF':'#000' }}
          >
            Includes:
          </Typography>
          {plan.features.map((feature, index) => (
            <Box
              key={index}
              sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1.5 }}
            >
              <CheckIcon sx={{ color: theme=='dark'?'#FFF':'#2563EB', fontSize: 24, mr: 1 }} />
              <Typography
                sx={{ fontSize: "16px" }}
                variant="body2"
                color={theme=='dark'?'#FFF':'#000'}
              >
                {feature}
              </Typography>
            </Box>
          ))}
        </Box>
      </Card>
    </Box>
  );
}
