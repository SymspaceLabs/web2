'use client';

import { motion } from "framer-motion";
import { styles } from "../page-view/styles";
import { FlexColCenter } from "@/components/flex-box";
import { Container, Box } from '@mui/material';
import { AR_REAL_ESTATE_PLANS } from "@/data/pricing";
import PricingTable from "@/components/pricing-table/pricingTable";
import { H1, Paragraph } from "@/components/Typography";

export default function Section6() {
  return (
    <Box width="100%" zIndex={1}>
      <Container sx={{ py: {xs:2, sm:5} }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{ height: "100%" }}
        >
          <FlexColCenter sx={{ py:{xs:2, sm:5}, px:{xs:2}, gap:4 }}>
            <H1 sx={styles.header}>
              Stage faster. Lease Smarter.
            </H1>
            <Paragraph sx={styles.subheader}>
              Reduce staging costs by up to 80% and increase rental value by 20% with AR-powered staging.
            </Paragraph>
            

            {/* Pricing Table */}
            <PricingTable 
              plans={AR_REAL_ESTATE_PLANS}
              title="flexible  pricing  for  every  property"
              theme="dark"
            />

          </FlexColCenter>
        </motion.div>
      </Container>
    </Box>
  );
}
