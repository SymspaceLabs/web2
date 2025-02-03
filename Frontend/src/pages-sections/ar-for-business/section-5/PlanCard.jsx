import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function PlanCard({ plan }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "25px",
        background: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(6.5px)',
        WebkitBackdropFilter: 'blur(6.5px)',
        position: "relative",
        overflow: "hidden",
        paddingBottom: plan.isPopular ? "40px" : "0px",
        height: plan.isPopular ? null : "600px",
        border: plan.isPopular ? "2px solid #2563EB" : "1px solid rgba(255, 255, 255, 1)",
        marginTop: plan.isPopular ? "0px" : "40px",
        
      }}
    >
      {/* Header Section */}
        {plan.isPopular &&
            <Box
                sx={{
                backgroundColor: "#2563EB",
                color: "#fff",
                padding: "10px",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "16px",
                }}
            >
                Most Popular
            </Box>
        }

      <CardContent sx={{ position: "relative"}}>
        <Typography sx={{ fontWeight: "bold", fontSize: 20 }}>
          {plan.title}
        </Typography>
        <Typography sx={{ fontSize: 14 }}>{plan.subTitle}</Typography>
        <Typography
          sx={{
            fontFamily: "Helvetica",
            textTransform: "lowercase",
            fontSize: "32px",
            pt: 3,
            fontWeight: "bold",
          }}
        >
          {plan.price}
          <Typography component="span" sx={{ fontSize: "18px" }}>
            /{plan.basis}
          </Typography>
        </Typography>
        <Typography>
          {plan.title!=="Starter" ? "+ $"+`${plan.credit} `+ "Each Additional Credit" : <>&nbsp;</> }
        </Typography>
        <Button
          sx={{
            my: 5,
            borderRadius: "50px",
            py: 1.5,
            background: "#2563EB",
            color: "#fff",
            border: "2px solid transparent",
            "&:hover": {
              backgroundColor: "transparent",
              border: "2px solid #2563EB",
              color: "#2563EB",
            },
          }}
          fullWidth
        >
          Get Started
        </Button>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "16px", fontFamily: "Inter" }}
        >
          Includes:
        </Typography>
        {plan.features.map((feature, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", mt: 2, gap: 1.5 }}
          >
            <CheckIcon sx={{ color: "#2563EB", fontSize: 24, mr: 1 }} />
            <Typography
              sx={{ fontSize: "16px" }}
              variant="body2"
              color="text.secondary"
            >
              {feature}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}
