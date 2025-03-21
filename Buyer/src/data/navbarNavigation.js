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
        title: "AR Real Estate",
        url: "/ar-real-estate"
      }, {
        title: "Sell on Symspace",
        url: "/ar-for-business"
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
        url: "/ar-for-business#pricing"
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
