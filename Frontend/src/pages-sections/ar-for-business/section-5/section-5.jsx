"use client";

/**
 * Section5 Component
 *
 * This component renders a pricing section with toggleable billing cycles and multiple plans.
 * It includes an animated background, a header, and a grid layout for displaying plan details.
 *
 * Features:
 * - Users can toggle between "monthly" and "yearly" billing cycles.
 * - Each plan dynamically updates pricing based on the selected billing cycle.
 * - Animated "BlobBox" elements for a visually appealing background.
 * 
 * @returns {JSX.Element} The Section5 pricing component.
 */

import { useState } from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import PlanCard from "./PlanCard"; // Displays individual pricing plans.
import PlanToggle from "./PlanToggle"; // Provides a toggle button to switch billing cycles.
import BlobBox from "../blobBox"; // Adds animated background elements.

export default function Section5() {
  const [billingCycle, setBillingCycle] = useState("monthly"); // State to track the selected billing cycle.

  // Array of pricing plans with features, dynamically updating based on billing cycle.
  const plans = [
    {
      title: "Starter",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$20" : "$200",
      basis: billingCycle === "monthly" ? "month" : "year",
      features: [
        "One 3D Product Render",
        "Unlimited Product Variants",
        "One 3D Product Ad Video",
        "AR Application Integration"
      ],
    },
    {
      title: "Standard",
      subTitle: "Most popular",
      price: billingCycle === "monthly" ? "$20" : "$200",
      basis: billingCycle === "monthly" ? "month" : "year",
      features: [
        "10 3D Product Renders",
        "Unlimited Product Variants",
        "Ten Product Ad Videos",
        "AR Application Integration",
        "Analytics"
      ],
    },
    {
      title: "Plus",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$30" : "$300",
      basis: billingCycle === "monthly" ? "month" : "year",
      isPopular: true, // Highlighted as the popular plan.
      features: [
        "20 3D Product Renders",
        "Unlimited Product Variants",
        "20 Product Ad Videos",
        "AR Application Integration",
        "Analytics and Beta Releases",
        "24/7 Support",
      ],
    },
    {
      title: "Premium",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$30" : "$300",
      basis: billingCycle === "monthly" ? "month" : "year",
      features: [
        "60 3D Product Renders",
        "Unlimited Product Variants",
        "60 Product Ad Videos",
        "AR Application Integration",
        "Analytics and Beta Releases",
        "24/7 Support",
      ],
    },
  ];

  // Handler to update the billing cycle based on user selection.
  const handleBillingCycleChange = (cycle) => {
    setBillingCycle(cycle);
  };

  return (
    <Box sx={{ py: 8 }}>
      <Container sx={{ position: "relative" }}>
        {/* Animated background elements */}
        <BlobBox sx={{ top: "10rem", right: "80rem", backgroundColor: "#0366FE" }} />
        <BlobBox sx={{ top: "30rem", right: "0rem", backgroundColor: "#933FFE", animationDelay: "4s", opacity: 0.7 }} />

        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 10,
          }}
        >
          {/* Main Header */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              fontSize={{ sm: 34, xs: 28 }}
              sx={{ fontFamily: "Elemental End", textTransform: "lowercase" }}
            >
              revolutionize shopping. simplify and save.
            </Typography>
            <Typography
              sx={{
                fontFamily: "Helvetica",
                color: "#18181B",
                fontSize: { sm: 16, xs: 14 },
                py: 2,
              }}
            >
              Choose the perfect plan for your business needs
            </Typography>
          </Box>

          {/* Toggle Button */}
          <PlanToggle onChange={handleBillingCycleChange} />
        </Box>

        {/* Plans Section */}
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={3} key={plan.title}>
              <PlanCard plan={plan} /> {/* Render individual plan details */}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
