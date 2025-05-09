"use client";

import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card"; // GLOBAL CUSTOM COMPONENTS

import { H3, H5, Paragraph } from "../../../components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { currency } from "../../../lib";

const WelcomeCard = () => {
  return (
    <Card>
      <Box sx={{ p: 3, height: "100%", display: "flex", position: "relative", flexDirection: "column", justifyContent: "center"}}>
        <H5 color="info.main" mb={0.5}>
          Good Morning, Maruf!
        </H5>
        <Paragraph color="grey.600">
          Here’s what happening with your store today!
        </Paragraph>

        <H3 mt={3}>15,350.25</H3>
        <Paragraph color="grey.600">Today’s Visit</Paragraph>

        <H3 mt={1.5}>{currency(10360.66)}</H3>
        <Paragraph color="grey.600">Today’s total sales</Paragraph>

        <Box sx={{ right: 24, bottom: 0, position: "absolute", display: { xs: "none", sm: "block" } }}>
          <Image width={195} height={171} alt="Welcome" src="/assets/images/illustrations/dashboard/welcome.svg" />
        </Box>
      </Box>
    </Card>
  );
};

export default WelcomeCard;