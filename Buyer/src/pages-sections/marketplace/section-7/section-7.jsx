"use client";

// ====================================================================
// Section 7 Product Sections
// ====================================================================

import { motion } from "framer-motion"; // Import Framer Motion
import { useState, useEffect } from "react";
import { styles } from "../page-view/styles";
import { H1 } from "@/components/Typography";
import { FlexBox } from "@/components/flex-box";
import { ProductCard2 } from "@/components/custom-cards/product-cards";
import { Grid, Box, Card, CardContent, Container, Button } from "@mui/material";
import Link from "next/link";

// ====================================================================

export default function Section7() {

  const cardData = [
    {
      btnText:'Shop More',
      cardHeader:'Selected for you',
      slug: 'selected-for-you'
    },
    {
      btnText:'Shop New Arrivals',
      cardHeader:'New Arrivals',
      slug: 'new-arrivals'
    },
    {
      btnText:'Shop Sale',
      cardHeader:'Today’s deals',
      slug: 'todays-deals'
    }
  ]

  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`);
        const data = await response.json();
        setproducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchproducts();
  }, []);

  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {/* Render three identical cards */}
          {cardData.map((data, index) => (
            <Grid item xs={12} sm={4} key={index}>
              {/* Motion wrapper for fade-in animation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  sx={{
                    background: "#BDBDBD",
                    px: {xs:1, sm:2},
                    boxShadow:
                      "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)",
                    borderRadius: {xs:'25px', sm:"50px"},
                  }}
                >
                  <CardContent>
                    {/* Section Title */}
                    <H1 textAlign="center" color="#FFF" fontSize={{xs:20, sm:24}} py={3}>
                      {data.cardHeader}
                    </H1>

                    {/* Products Grid */}
                    <Grid container spacing={{xs:1, sm:2}}>
                      {products.slice(0, 4).map((product,index) => (
                        <Grid item lg={6} md={6} sm={6} xs={6} key={index}>
                          <ProductCard2 product={product} />
                        </Grid>
                      ))}
                    </Grid>

                    {/* Contact Button */}
                    <FlexBox justifyContent="center"  py={3}>
                      <Link href={`/products/search/all?tag=${data.slug}`}>
                        <Button sx={styles.buttonLight}>
                          {data.btnText}
                        </Button>
                      </Link>
                    </FlexBox>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}