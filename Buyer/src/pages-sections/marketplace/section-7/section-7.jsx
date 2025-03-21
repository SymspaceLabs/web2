"use client";

/**
 * Section7 Component
 * Displays a section featuring products selected for users.
 * Each product is displayed in a card layout, including its image, title, brand, and price.
 * A 'Contact Us' button is provided below the product list in each card.
 */

import Link from "next/link";
import { useState } from "react";
import { Grid, Box, Card, CardContent, Container, Typography, Button } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import { calculateDiscount } from "@/lib";
import { motion } from "framer-motion"; // Import Framer Motion
import { LazyImage } from "@/components/lazy-image";
import { styles } from "../page-view/styles";
import { H1 } from "@/components/Typography";

export default function Section7() {
  // Simulated product data
  const [products, setProducts] = useState(data);

  const cardData = [
    {
      btnText:'Shop More',
      cardHeader:'Selected for you'
    },
    {
      btnText:'Shop New Arrivals',
      cardHeader:'New Arrivals'
    },
    {
      btnText:'Shop Sale',
      cardHeader:'Today’s deals'
    }
  ]

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
                    px: 2,
                    boxShadow:
                      "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)",
                    borderRadius: "50px",
                  }}
                >
                  <CardContent>
                    {/* Section Title */}
                    <H1 textAlign="center" color="#FFF" fontSize={24} py={3}>
                      {data.cardHeader}
                    </H1>

                    {/* Products Grid */}
                    <Grid container spacing={2}>
                      {products.slice(0, 4).map((product,index) => (
                        <Grid item lg={6} md={6} sm={6} xs={12} key={index}>
                          <Link href={`/products/${product.slug}`} passHref>
                            <FlexBox
                              flexDirection="column"
                              bgcolor="rgba(255, 255, 255, 0.1)"
                              borderRadius={3}
                              mb={2}
                              sx={{ userSelect: "text", textDecoration: "none" }}
                            >
                              {/* Product Image */}
                              <Box sx={{ maxHeight: 150, mt: -2, mb: "25px" }}>
                                <LazyImage
                                  alt={product.title}
                                  width={100}
                                  height={100}
                                  src={product.thumbnail}
                                />
                              </Box>

                              {/* Product Details */}
                              <Box sx={{ px: 4, pb: 1 }}>
                                <Typography
                                  sx={{
                                    fontFamily: "Helvetica",
                                    color: "#fff",
                                    fontSize: "18px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {product.title}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "Helvetica",
                                    color: "#fff",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {product.brand}
                                </Typography>
                                <Typography
                                  sx={{
                                    fontFamily: "Helvetica",
                                    color: "#fff",
                                    fontSize: "20px",
                                    fontWeight: 700,
                                  }}
                                >
                                  {calculateDiscount(product.price, product.discount)}
                                </Typography>
                              </Box>
                            </FlexBox>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Contact Button */}
                    <FlexBox justifyContent="center">
                      <Button sx={styles.buttonLight}>
                        {data.btnText}
                      </Button>
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

// Sample product data for demonstration purposes
export const data = [
  {
    id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
    slug: "t-shirt",
    brand:'WAVE WORLD',
    title: "Spaceman T-shirt",
    shop: {
      id: "584323a3-059a-4990-8498-aa4fac9f22a7",
      slug: "constant-shoppers",
      user: {
        id: "08959f95-8448-42a1-b71b-9903504aad9b",
        email: "Elmo_Shields20@yahoo.com",
        phone: "(779) 888-4964",
        avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
        password: "n1yvwoxzoG7t_Lc",
        dateOfBirth: "1967-12-07T08:26:11.321Z",
        verified: true,
        name: {
          firstName: "Margot",
          lastName: "Batz"
        }
      },
      email: "Larry.Roberts13@yahoo.com",
      name: "Constant Shoppers",
      phone: "(613) 343-9004",
      address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
      verified: false,
      coverPicture: "/assets/images/banners/banner-4.png",
      profilePicture: "/assets/images/faces/propic(3).png",
      socialLinks: {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null
      }
    },
    price: 250,
    size: null,
    discount: 15,
    thumbnail: "/assets/images/furniture-products/t-shirt-3.png",
    images: ["/assets/images/furniture-products/t-shirt-3.png", "/assets/images/furniture-products/furniture-1.png"],
    categories: [],
    status: null,
    reviews: [],
    rating: 4,
    for: {
      demo: "furniture-2",
      type: "new-arrival"
    }
  }, {
    id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
    slug: "hand-bag",
    brand:'Xandevera',
    shop: {
      id: "584323a3-059a-4990-8498-aa4fac9f22a7",
      slug: "constant-shoppers",
      user: {
        id: "08959f95-8448-42a1-b71b-9903504aad9b",
        email: "Elmo_Shields20@yahoo.com",
        phone: "(779) 888-4964",
        avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
        password: "n1yvwoxzoG7t_Lc",
        dateOfBirth: "1967-12-07T08:26:11.321Z",
        verified: true,
        name: {
          firstName: "Margot",
          lastName: "Batz"
        }
      },
      email: "Larry.Roberts13@yahoo.com",
      name: "Constant Shoppers",
      phone: "(613) 343-9004",
      address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
      verified: false,
      coverPicture: "/assets/images/banners/banner-4.png",
      profilePicture: "/assets/images/faces/propic(3).png",
      socialLinks: {
        facebook: null,
        youtube: null,
        twitter: null,
        instagram: null
      }
    },
    title: "Hand Bag",
    price: 250,
    size: null,
    discount: 15,
    thumbnail: "/assets/images/furniture-products/xandevera-bag.png",
    images: ["/assets/images/furniture-products/xandevera-bag.png", "/assets/images/furniture-products/xandevera-bag.png"],
    categories: [],
    status: null,
    reviews: [],
    rating: 4,
    for: {
      demo: "furniture-2",
      type: "new-arrival"
    }
  }, {
  id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76901",
  slug: "wood-tool",
  shop: {
    id: "584323a3-059a-4990-8498-aa4fac9f22a7",
    slug: "constant-shoppers",
    user: {
      id: "08959f95-8448-42a1-b71b-9903504aad9b",
      email: "Elmo_Shields20@yahoo.com",
      phone: "(779) 888-4964",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
      password: "n1yvwoxzoG7t_Lc",
      dateOfBirth: "1967-12-07T08:26:11.321Z",
      verified: true,
      name: {
        firstName: "Margot",
        lastName: "Batz"
      }
    },
    email: "Larry.Roberts13@yahoo.com",
    name: "Constant Shoppers",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/banner-4.png",
    profilePicture: "/assets/images/faces/propic(3).png",
    socialLinks: {
      facebook: null,
      youtube: null,
      twitter: null,
      instagram: null
    }
  },
  title: "Wood Tool",
  price: 250,
  size: null,
  discount: 15,
  brand:'Company A',
  thumbnail: "/assets/images/furniture-products/furniture-1.png",
  images: ["/assets/images/furniture-products/furniture-1.png", "/assets/images/furniture-products/furniture-1.png"],
  categories: [],
  status: null,
  reviews: [],
  rating: 4,
  for: {
    demo: "furniture-2",
    type: "new-arrival"
  }
  }, {
  id: "8b9f5a78-0dbb-4dd3-a718-aa7342b76902",
  slug: "brown-single",
  brand:'Company A',
  shop: {
    id: "584323a3-059a-4990-8498-aa4fac9f22a7",
    slug: "constant-shoppers",
    user: {
      id: "08959f95-8448-42a1-b71b-9903504aad9b",
      email: "Elmo_Shields20@yahoo.com",
      phone: "(779) 888-4964",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/549.jpg",
      password: "n1yvwoxzoG7t_Lc",
      dateOfBirth: "1967-12-07T08:26:11.321Z",
      verified: true,
      name: {
        firstName: "Margot",
        lastName: "Batz"
      }
    },
    email: "Larry.Roberts13@yahoo.com",
    name: "Constant Shoppers",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/banner-4.png",
    profilePicture: "/assets/images/faces/propic(3).png",
    socialLinks: {
      facebook: null,
      youtube: null,
      twitter: null,
      instagram: null
    }
  },
  title: "Brown Single",
  price: 150,
  size: null,
  discount: 0,
  thumbnail: "/assets/images/furniture-products/furniture-2.png",
  images: ["/assets/images/furniture-products/furniture-2.png", "/assets/images/furniture-products/furniture-2.png"],
  categories: [],
  status: null,
  reviews: [],
  rating: 4,
  for: {
    demo: "furniture-2",
    type: "new-arrival"
  }
  },
];