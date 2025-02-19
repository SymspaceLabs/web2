import categoriesMegaMenu from "./categoriesMegaMenu"; // MEGA-MENU DATA

const navbarNavigation = [
  // MARKETPLACE
  {
    title: "Marketplace",
    url: '/marketplace',
    child: categoriesMegaMenu,
    megaMenu: false,
    megaMenuWithSub: false,
  },

  // AR FOR BUSINESS
  {
    title: "AR for business",
    url: '/ar-for-business',
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "AR App Simulation",
        child: [{
          title: "Application",
          url: "/ar-app-simulation"
        },{
          title: "Features",
          url: "/ar-app-simulation#features"
        }, {
          title: "User Testimonials",
          url: "/ar-app-simulation#user_testimonials"
        }]
      }, {
        title: "Staging Furniture",
        url: "/furniture-1"
      }
    ]
  }, 

  // GLOBAL IMPACT
  // {
  //   title: "Global Impact",
  //   // url: '/global-impact',
  //   megaMenu: false,
  //   megaMenuWithSub: false,
  //   child: [
  //     {
  //       title: "Accessibility in AR",
  //       url: "/medical"
  //     }, {
  //       title: "Environmental Responsibility",
  //       url: "/gift-shop"
  //     }, {
  //       title: "Community Partnerships",
  //       url: "/furniture-1"
  //     }
  //   ]
  // }, 

  // RESOURCES
  // {
  //   title: "Resources",
  //   // url: '/global-impact',
  //   megaMenu: false,
  //   megaMenuWithSub: false,
  //   child: [
  //     {
  //       title: "How It Works",
  //       url: "/medical"
  //     }, {
  //       title: "Case Studies",
  //       url: "/gift-shop"
  //     }, {
  //       title: "Blog & Insights",
  //       url: "/furniture-1"
  //     }, {
  //       title: "Press Releases",
  //       url: "/articles"
  //     }
  //   ]
  // }, 

  // PARTNER
  {
    title: "Partner",
    // url: '/partner',
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Become a partner",
        url: "/medical"
      }, {
        title: "Pricing & Packages",
        url: "/gift-shop"
      },
      // {
      //   title: "Onboarding",
      //   url: "/furniture-1"
      // }
    ]
  }, 

  // ABOUT US
  {
    title: "About Us",
    // url: '/partner',
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "Leadership Team",
        url: "/about-us#team"
      }, {
        title: "Global Impact",
        url: "/global-impact"
      }, {
        title: "Contact Us",
        url: "/contact-us"
      }, {
        title: "Careers",
        url: "/about-us#careers"
      }
    ]
  }
];
export default navbarNavigation;


const megaMenus = [
  [
    {
      title: "Home",
      child: [
        {
          title: "Market 1",
          url: "/market-1"
        }, {
          title: "Market 2",
          url: "/market-2"
        }, {
          title: "Gadget 1",
          url: "/gadget-1"
        }, {
          title: "Gadget 2",
          url: "/gadget-2"
        }, {
          title: "Grocery 1",
          url: "/grocery-1"
        }, {
          title: "Grocery 2",
          url: "/grocery-2"
        }, // { title: "Grocery 3", url: "/grocery-3" },
        {
          title: "Fashion 1",
          url: "/fashion-1"
        }, {
          title: "Fashion 2",
          url: "/fashion-2"
        }, // { title: "Fashion 3", url: "/fashion-3" },
        {
          title: "Gift Store",
          url: "/gift-shop"
        }, {
          title: "Furniture 1",
          url: "/furniture-1"
        }, // { title: "Furniture 2", url: "/furniture-2" },
        {
          title: "Health and Beauty",
          url: "/health-beauty"
        }
      ]
    }
  ],
  [{
  title: "User Account",
  child: [{
    title: "Order List",
    url: "/orders"
  }, {
    title: "Order Details",
    url: "/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
  }, {
    title: "View Profile",
    url: "/profile"
  }, {
    title: "Edit Profile",
    url: "/profile/e42e28ea-528f-4bc8-81fb-97f658d67d75"
  }, {
    title: "Address List",
    url: "/address"
  }, {
    title: "Add Address",
    url: "/address/d27d0e28-c35e-4085-af1e-f9f1b1bd9c34"
  }, {
    title: "All tickets",
    url: "/support-tickets"
  }, {
    title: "Ticket details",
    url: "/support-tickets/when-will-my-product-arrive"
  }, {
    title: "Wishlist",
    url: "/wish-list"
  }]
}], [{
  title: "Vendor Account",
  child: [{
    title: "Dashboard",
    url: "/vendor/dashboard"
  }, {
    title: "Profile",
    url: "/vendor/account-settings"
  }]
}, {
  title: "Products",
  child: [{
    title: "All products",
    url: "/admin/products"
  }, {
    title: "Add/Edit product",
    url: "/admin/products/create"
  }]
}, {
  title: "Orders",
  child: [{
    title: "All orders",
    url: "/admin/orders"
  }, {
    title: "Order details",
    url: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
  }]
}, {
  title: "Authentication",
  child: [{
    title: "Signin",
    url: "/signin"
  }, {
    title: "Register",
    url: "/register"
  }]
}], [{
  title: "Sale Page",
  child: [{
    title: "Sales Version 1",
    url: "/sales-1"
  }, {
    title: "Sales Version 2",
    url: "/sales-2"
  }]
}, {
  title: "Shop",
  child: [{
    title: "Search product",
    url: "/products/search/mobile phone"
  }, {
    title: "Single product",
    url: "/products/lord-2019"
  }, {
    title: "Cart",
    url: "/cart"
  }, {
    title: "Checkout",
    url: "/checkout"
  }, {
    title: "Alternative Checkout",
    url: "/checkout-alternative"
  }, {
    title: "Order confirmation",
    url: "/order-confirmation"
  }]
}]]; // MAIN NAVIGATION DATA