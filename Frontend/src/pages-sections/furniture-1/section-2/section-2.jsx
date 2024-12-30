"use client";

import { useEffect, useRef, useState } from "react"; // Local CUSTOM COMPONENT

import Section4 from "../section-4"; // GLOBAL CUSTOM COMPONENT

import SideNavbar from "../../../components/page-sidenav/side-navbar"; // CUSTOM DATA MODEL

// STYLED COMPONENT
import { StyledContainer } from "./styles"; // ==============================================================

// ==============================================================
export default async function Section2({products}) {
  const ref = useRef();
  const [sidebarHeight, setSidebarHeight] = useState(0);
  useEffect(() => {
    if (ref.current) setSidebarHeight(ref.current.offsetHeight);
  }, []);

  return (
    <StyledContainer>
      <div className="sidenav">
        <SideNavbar
          lineStyle="dash"
          navList={categoryNavigation}
          sidebarStyle="colored"
          sidebarHeight={sidebarHeight || "85vh"}
        />
      </div>
      <div className="pageContent" ref={ref}>
        <Section4 products={products} />
      </div>
    </StyledContainer>
  );
}

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