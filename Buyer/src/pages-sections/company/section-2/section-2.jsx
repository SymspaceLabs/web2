"use client";

import { useEffect, useRef, useState } from "react"; // React hooks for managing state and refs

import Section4 from "../section-4"; // Section4 component for rendering products
import SideNavbar from "../../../components/page-sidenav/side-navbar"; // SideNavbar component for navigation
import { StyledContainer } from "./styles"; // Styled component for layout styling

/**
 * Section2 Component
 *
 * Renders a layout with a side navigation bar and a main content area.
 * The side navigation bar adapts its height dynamically based on the content's height.
 * Includes a list of products displayed via the Section4 component.
 *
 */
export default function Section2({ products }) {
  const ref = useRef(); // Ref to track the height of the main content area
  const [sidebarHeight, setSidebarHeight] = useState(0); // State to store the sidebar height

  // Dynamically update sidebar height based on the content height
  useEffect(() => {
    if (ref.current) setSidebarHeight(ref.current.offsetHeight);
  }, []);

  return (
    <StyledContainer>
      {/* Sidebar section */}
      <div className="sidenav">
        <SideNavbar
          lineStyle="dash" // Dashed line style for the navigation
          navList={categoryNavigation} // Navigation items
          sidebarStyle="colored" // Colored sidebar styling
          sidebarHeight={sidebarHeight || "85vh"} // Sidebar height with fallback
        />
      </div>

      {/* Main content section */}
      <div className="pageContent" ref={ref}>
        <Section4 products={products} /> {/* Pass the product data to Section4 */}
      </div>
    </StyledContainer>
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