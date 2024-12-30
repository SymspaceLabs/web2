import { Box, Container, Typography, Button, Grid } from '@mui/material';

import { H2 } from "../../../components/Typography"; // LOCAL CUSTOM COMPONENT
import FlexBox from "../../../components/flex-box/flex-box"; // STYLED COMPONENT

import BlogCard from "./blog-card"; // API FUNCTIONS

// import api from "../../../utils/__api__/gadget-2";
export default async function Section3() {
  // const blogs = await api.getBlogs();
  return <Box sx={{ py:10, background:'#E0F0FD' }}>
      <Container>
        <H2 sx={{ textAlign:'center', color:'#000', pt:8, pb:3, fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize: { xs: 30, sm: 30, md: 30, lg: 30, xl: 30 } }}>
          Shop Women
        </H2>

        <Grid container spacing={3}>
          {blogs.map(blog => <Grid item lg={4} md={8} xs={12} key={blog.id}>
              <BlogCard date={blog.createdAt} title={blog.title} image={blog.image}/>
            </Grid>)}
        </Grid>

        <FlexBox justifyContent="end" sx={{mt:5}}>
          <Button sx={{ background:'#fff', color:'#000', fontFamily: 'Elemental End', textTransform: 'lowercase', mt: 2, borderRadius: '50px', px: 5, py: 2, fontSize: 12 }}>Shop By Category</Button>
        </FlexBox>
      </Container>
    </Box>;
}

const blogs = [
  {
  id: "f54ee5db-ff89-4d86-ade8-86d949db7bg1",
  title: "Dresses",
  description: "Saepe praesentium saepe iste minus totam excepturi expedita. Illum deserunt suscipit rerum officiis consequatur dicta odio. Necessitatibus perferendis aspernatur eum. Saepe voluptatum beatae. Hic veritatis libero nisi excepturi omnis explicabo et.",
  image: "/assets/images/products/Women/dress.png",
  shop: {
    id: "c2a4ed2d-6708-4c1e-aa36-eddfd0496ce7",
    slug: "constant-shoppers",
    user: {
      id: "5c47a8cb-c032-4e5d-81ff-fd082f8f7740",
      email: "Berniece0@hotmail.com",
      phone: "730-935-5160 x73867",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/561.jpg",
      password: "Yj2bbCH9JqNNv_K",
      dateOfBirth: "1993-08-19T08:41:32.306Z",
      verified: true,
      name: {
        firstName: "Alphonso",
        lastName: "Goodwin"
      }
    },
    email: "Darian90@hotmail.com",
    name: "Constant Shoppers",
    phone: "(613) 343-9004",
    address: "845 N. Stonybrook Ave. Tonawanda, NY 14210, Denmark",
    verified: false,
    coverPicture: "/assets/images/banners/banner-4.png",
    profilePicture: "/assets/images/faces/propic(3).png",

  },
  createdAt: "2022-11-08T07:15:55.897Z",
  slug: "gameStop-will-provide-up-to-$1-billion-in"
}, {
  id: "f54ee5db-ff89-4d86-ade8-86d949db7bg2",
  title: "Tops",
  description: "Saepe praesentium saepe iste minus totam excepturi expedita. Illum deserunt suscipit rerum officiis consequatur dicta odio. Necessitatibus perferendis aspernatur eum. Saepe voluptatum beatae. Hic veritatis libero nisi excepturi omnis explicabo et.",
  image: "/assets/images/products/Women/top.png",
  shop: {
    id: "c2a4ed2d-6708-4c1e-aa36-eddfd0496ce7",
    slug: "constant-shoppers",
    user: {
      id: "5c47a8cb-c032-4e5d-81ff-fd082f8f7740",
      email: "Berniece0@hotmail.com",
      phone: "730-935-5160 x73867",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/561.jpg",
      password: "Yj2bbCH9JqNNv_K",
      dateOfBirth: "1993-08-19T08:41:32.306Z",
      verified: true,
      name: {
        firstName: "Alphonso",
        lastName: "Goodwin"
      }
    },
    email: "Darian90@hotmail.com",
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
  user: {
    id: "468e1914-4e05-4da7-b84b-b099a4832ce2",
    email: "Beaulah_Hodkiewicz@hotmail.com",
    phone: "407.691.9583",
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/558.jpg",
    password: "K1v19JSlmawcx2Y",
    dateOfBirth: "1945-03-08T22:29:18.813Z",
    verified: true,
    name: {
      firstName: "Eloy",
      lastName: "Breitenberg"
    }
  },
  createdAt: "2022-11-08T07:15:55.897Z",
  slug: "gameStop-will-provide-up-to-$1-billion-in"
}, {
  id: "f54ee5db-ff89-4d86-ade8-86d949db7bg3",
  title: "Bottoms",
  description: "Saepe praesentium saepe iste minus totam excepturi expedita. Illum deserunt suscipit rerum officiis consequatur dicta odio. Necessitatibus perferendis aspernatur eum. Saepe voluptatum beatae. Hic veritatis libero nisi excepturi omnis explicabo et.",
  image: "/assets/images/products/Women/bottom.png",
  shop: {
    id: "c2a4ed2d-6708-4c1e-aa36-eddfd0496ce7",
    slug: "constant-shoppers",
    user: {
      id: "5c47a8cb-c032-4e5d-81ff-fd082f8f7740",
      email: "Berniece0@hotmail.com",
      phone: "730-935-5160 x73867",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/561.jpg",
      password: "Yj2bbCH9JqNNv_K",
      dateOfBirth: "1993-08-19T08:41:32.306Z",
      verified: true,
      name: {
        firstName: "Alphonso",
        lastName: "Goodwin"
      }
    },
    email: "Darian90@hotmail.com",
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
  user: {
    id: "468e1914-4e05-4da7-b84b-b099a4832ce2",
    email: "Beaulah_Hodkiewicz@hotmail.com",
    phone: "407.691.9583",
    avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/558.jpg",
    password: "K1v19JSlmawcx2Y",
    dateOfBirth: "1945-03-08T22:29:18.813Z",
    verified: true,
    name: {
      firstName: "Eloy",
      lastName: "Breitenberg"
    }
  },
  createdAt: "2022-11-08T07:15:55.897Z",
  slug: "gameStop-will-provide-up-to-$1-billion-in"
} ];