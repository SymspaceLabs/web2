// ============================================================
//  Navigation Menu used in:
//  - navbar
//  - mobile navigation
// ============================================================

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
    title: "AR for Business",
    megaMenu: false,
    megaMenuWithSub: false,
    child: [
      {
        title: "AR Application",
        url: "/ar-app-simulation"
      }, {
        title: "AR Real Estate",
        url: "/ar-real-estate"
      }, {
        title: "Services",
        url: "/sell-on-symspace"
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
        url: `${process.env.NEXT_PUBLIC_SELLER_URL}/register`
      }, {
        title: "Pricing & Packages",
        url: "/sell-on-symspace#pricing"
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
        url: "/careers"
      }
    ]
  }
];
export default navbarNavigation;
