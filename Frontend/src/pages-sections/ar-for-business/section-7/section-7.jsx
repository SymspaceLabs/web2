"use client";

import Link from "next/link";
import { useState } from "react";
import { Grid, Box, Card, CardContent, Container, Typography, Button } from '@mui/material';
import { FlexBox } from "@/components/flex-box";
import { LazyImage } from '@/components/lazy-image';
import { calculateDiscount } from "@/lib"; // STYLED COMPONENTS


export default async function Section7() {

  const [products, setProducts] = useState(data);

return  <Box sx={{py:5}}>
    <Container>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{background:'#BDBDBD', px:2, boxShadow: "inset -5px -5px 20px 1px rgba(255, 255, 255, 0.25), inset 5px 5px 20px 1px rgba(255, 255, 255, 0.25)", borderRadius:"50px" }}>
            <CardContent>
              <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: 36, fontWeight: 700, py:2 }} variant="h5" component="div">
                Selected for you
              </Typography>
              <Grid container spacing={2}>
                {products.slice(0, 4).map((product) => (
                  <Grid item lg={6} md={6} sm={6} xs={12} key={product.id}>
                    <Link href={`/products/${product.slug}`} passHref>
                      <FlexBox
                        flexDirection="column"
                        bgcolor="rgba(255, 255, 255, 0.1)"
                        borderRadius={3}
                        mb={2}
                        sx={{ userSelect: 'text', textDecoration: 'none' }}
                      >
                        <Box sx={{ maxHeight: 150, mt: -2, mb: '25px' }}>
                          <LazyImage
                            alt={product.title}
                            width={100}
                            height={100}
                            src={product.thumbnail}
                          />
                        </Box>

                        <Box sx={{ px: 4, pb: 1 }}>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "18px", fontWeight: 500 }}>
                            {product.title}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "16px", fontWeight: 500 }}>
                            {product.brand}
                          </Typography>
                          <Typography sx={{ fontFamily: 'Helvetica', color: "#fff", fontSize: "20px", fontWeight: 700 }}>
                            {calculateDiscount(product.price, product.discount)}
                          </Typography>
                        </Box>
                      </FlexBox>
                    </Link>
                  </Grid>
                ))}
              </Grid>
              <FlexBox justifyContent="center">
                <Button sx={{ background:'#fff', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 16 }}>Contact Us</Button>
              </FlexBox>

            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
  ;
}

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