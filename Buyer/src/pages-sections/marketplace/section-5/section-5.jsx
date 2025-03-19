"use client";

// =======================================================================
// Section 5
// ========================================================================

import Link from "next/link";
import { useState } from "react";
import { FlexRowCenter, FlexBox } from "@/components/flex-box";
import { H2, Paragraph } from "@/components/Typography";
import { calculateDiscount } from "@/lib";
import { Box, Container, Typography, Grid } from "@mui/material";
import { motion } from "framer-motion";
import { LazyImage } from "@/components/lazy-image";
import { styles } from "../page-view/styles";


export default function Section5() {
  // State to hold the list of products; initialized with static data
  const [products, setProducts] = useState(data);

  // Render the Content component, passing the product list as a prop
  return (
    <Container sx={{ py:{xs:3, sm:5} }}>
      {/* Header */}
      <FlexRowCenter mt={10} mb={5}>
        <div>
          <H2
            fontSize={{ sm: 34, xs: 28 }}
            sx={styles.elementalEndFont}
          >
            Best Seller Products
          </H2>
          <Paragraph
            sx={{
              fontFamily: "Helvetica",
              textAlign: "center",
            }}
            color="grey.600"
            fontSize={{ sm: 16, xs: 14 }}
          >
            Augmented Reality features available in the Symspace app
          </Paragraph>
        </div>
      </FlexRowCenter>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Box
          sx={{
            position: "relative",
            p: 5,
            borderRadius: "50px",
            background:
              "linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)",
            overflow: "hidden",
            boxShadow:
              "0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(50px)",
          }}
        >
          {/* Decorative overlay for gradient effect */}
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), rgba(255, 255, 255, 0.1)",
              borderRadius: "0px 0px 20px 20px",
              left: 0,
              top: 0,
              zIndex: 0,
            }}
          />

          {/* Grid container to display product cards */}
          <Grid
            container
            spacing={3}
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            {products.map((product) => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={product.id}>
                <Link href={`/products/${product.slug}`} passHref>
                  <FlexBox
                    flexDirection="column"
                    bgcolor="rgba(255, 255, 255, 0.1)"
                    borderRadius={3}
                    mb={2}
                    sx={{
                      userSelect: "text",
                    }}
                  >
                    {/* Product Image */}
                    <Box sx={{ maxHeight: 300, mt: -7, mb: 0 }}>
                      <LazyImage
                        alt={product.title}
                        width={380}
                        height={379}
                        src={product.thumbnail}
                      />
                    </Box>

                    {/* Product Details */}
                    <Box sx={{ px: 4, pb: 4 }}>
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
                          color: "#BDBDBD",
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
        </Box>
      </motion.div>
    </Container>
  );
}

/**
 * Static product data
 *
 * This data simulates product information typically fetched from an API.
 * Each product contains details such as `id`, `slug`, `title`, `price`,
 * `brand`, `shop`, `rating`, and other attributes.
 */

const data = [
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
