"use client";

import { useEffect, useRef, useState } from "react";
import { Container, Button, Grid, Box } from "@mui/material";
import { H1, Paragraph } from "@/components/Typography";
import { ProductCard3 } from "@/components/custom-cards/product-cards";
import SideNavbar from "@/components/page-sidenav/side-navbar";
import { layoutConstant } from "utils/constants";

// ============================================================

export default function Section2({ 
  products,
  company
}) {
  const ref = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);

  useEffect(() => {
    if (ref.current) setSidebarHeight(ref.current.offsetHeight);
  }, []);

  return (
    <Container sx={{ mt: 4, pb: 4 }}>
      <Box
        sx={{
          gap: "1.75rem",
          display: "flex",
        }}
      >
        {/* Sidebar */}
        <Box
          className="sidenav"
          sx={{
            top: 0,
            bottom: 0,
            position: "relative",
            transition: "all 350ms ease-in-out",
            width: layoutConstant.grocerySidenavWidth,
            minWidth: layoutConstant.grocerySidenavWidth,
            "& .MuiPaper-root": {
              borderRadius: 0,
              backgroundColor: "transparent",
            },
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <SideNavbar
            lineStyle="dash"
            navList={categoryNavigation}
            sidebarStyle="colored"
            sidebarHeight={sidebarHeight || "85vh"}
          />
        </Box>

        {/* Main Content */}
        <Box
          className="pageContent"
          ref={ref}
          sx={{
            position: "relative",
            width: {
              xs: "100%",
              md: `calc(100% - ${layoutConstant.grocerySidenavWidth}px)`,
            },
          }}
        >
          <H1>All Products</H1>
          <Paragraph color="grey.600" mb={4}>
            Tall blind but were, been folks not the expand
          </Paragraph>

          <Grid container spacing={1}>
            {products?.map((product) => (
              <Grid key={product.id} item md={4} sm={4} xs={12}>
                <ProductCard3 product={product} company={company} />
              </Grid>
            ))}
          </Grid>

          <Box mt={6} display="flex" justifyContent="center">
            <Button color="primary" variant="contained">
              Load More...
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}


// Navigation data for the side navigation bar
const categoryNavigation = [{
  category: "Top Categories",
  categoryItem: [{
    icon: "Home",
    title: "Home",
    href: "/products/search/Dariry & Eggs"
  }, {
    icon: "Popular",
    title: "Popular Products",
    href: "/products/search/Breakfast"
  }, {
    icon: "Trending",
    title: "Trending Products",
    href: "/products/search/Frozen"
  }, {
    icon: "Products",
    title: "All Products",
    href: "/products/search/vegetables"
  }]
}, {
  category: "Top Categories",
  categoryItem: [{
    icon: "Chair",
    title: "Chair",
    href: "/products/search/vegetables",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Decoration",
    title: "Decors",
    href: "/products/search/Fruits & Vegetables",
    child: [{
      title: "Onion",
      href: "/products/search/Onion"
    }, {
      title: "Potato",
      href: "/products/search/Potato"
    }, {
      title: "Vegetable Pack",
      href: "/products/search/Vegetable Pack"
    }]
  }, {
    icon: "Interior",
    title: "Interior",
    href: "/products/search/Dariry & Eggs",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Furniture",
    title: "Furniture",
    href: "/products/search/Dariry & Eggs",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Sofa",
    title: "Sofa",
    href: "/products/search/Breakfast",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Stool",
    title: "Stool",
    href: "/products/search/Frozen",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Wardrobe",
    title: "Wardrobe",
    href: "/products/search/Organic",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Dining",
    title: "Dining",
    href: "/products/search/Canned Food",
    child: [{
      title: "Pears, apples, quinces",
      href: "/products/search/Pears, apples, quinces"
    }, {
      title: "Peaches, plums, apricots",
      href: "/products/search/Peaches, plums, apricots"
    }, {
      title: "Grapes",
      href: "/products/search/Grapes"
    }]
  }, {
    icon: "Living",
    title: "Living",
    href: "/products/search/Coffee & Snacks"
  }, {
    icon: "RoundTable",
    title: "Coffee Tea Table",
    href: "/products/search/Coffee & Snacks"
  }, {
    icon: "RoomSet",
    title: "Living Room Sets",
    href: "/products/search/Coffee & Snacks"
  }]
}]