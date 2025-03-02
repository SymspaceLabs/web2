import categoriesMegaMenu from "./categoriesMegaMenu"; // MEGA-MENU DATA

const navbarNavigation = [
  // MARKETPLACE
  {
    title: "Marketplace",
    url: '/marketplace',
    child: false,
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

  // PARTNER
  {
    title: "Partner",
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
    ]
  }, 

  // ABOUT US
  {
    title: "About Us",
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
