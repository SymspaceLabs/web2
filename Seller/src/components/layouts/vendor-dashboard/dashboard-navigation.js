import duotone from "../../../icons/duotone";
export const navigation = [

  {
    type: "label",
    label: ""
  },

  //DASHBOARD
  {
    name: "Dashboard",
    icon: duotone.Dashboard,
    path: "/"
  },

  //SIMULATION
  {
    name: "Simulation",
    icon: duotone.Products,
    children: [{
      name: "Playground",
      path: "/vendor/simulation/playground"
    }, {
      name: "3D Product Viewer",
      path: "/vendor/simulation/3d-product-viewer"
    }]
  },

  //3D PRODUCTS
  {
    name: "3D PRODUCTS",
    icon: duotone.Products,
    children: [{
      name: "Generate 3D Model",
      path: "/vendor/3d-products"
    }, {
      name: "3D Repository",
      path: "/vendor/3d-products/create"
    }, {
      name: "3D Product Video",
      path: "/vendor/3d-products/create"
    }, {
      name: "Request History",
      path: "/vendor/3d-products/create"
    } ]
  },

  //AR Visual
  {
    name: "AR Visual",
    icon: duotone.Products,
    children: [{
      name: "Create AR Visual",
      path: "/vendor/ar-visual"
    }, {
      name: "Request History",
      path: "/vendor/ar-visual/create"
    }]
  },

  //PRODUCTS
  {
    name: "Products",
    icon: duotone.Products,
    children: [{
        name: "Product List",
        path: "/vendor/products"
      }, {
        name: "Create Product",
        path: "/vendor/products/create"
      }, {
        name: "Product Reviews",
        path: "/vendor/products/reviews"
      }
    ]
  },

  //ORDERS
  {
    name: "Orders",
    icon: duotone.Order,
    children: [{
      name: "Order List",
      path: "/admin/orders"
    }, {
      name: "Orders Pending",
      path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
    }, {
      name: "Orders Complete",
      path: "/admin/orders/f0ba538b-c8f3-45ce-b6c1-209cf07ba5f8"
    }]
  },

  //RETURNS
  {
    name: "Returns",
    icon: duotone.Accounts,
    children: [{
      name: "Returns Received",
      path: "/admin/categories"
    }, {
      name: "Returns Complete",
      path: "/admin/categories/create"
    }, {
      name: "Refunds Complete",
      path: "/admin/categories/create"
    }]
  },

  //EARNINGS
  {
    name: "Earnings",
    icon: duotone.Apps,
    path: "/vendor/reviews"
  },

  //REVIEW
  {
    name: "Reviews",
    icon: duotone.Review,
    path: "/vendor/reviews"
  }, 

// {
//   name: "Refunds",
//   icon: duotone.Refund,
//   children: [{
//     name: "Refund Request",
//     path: "/admin/refund-request"
//   }, {
//     name: "Refund Settings",
//     path: "/admin/refund-setting"
//   }]
// },
//  {
//   name: "Sellers",
//   icon: duotone.Seller,
//   children: [{
//     name: "Seller List",
//     path: "/admin/sellers"
//   }, {
//     name: "Seller Package",
//     path: "/admin/seller-package"
//   }, {
//     name: "Package Payments",
//     path: "/admin/package-payments"
//   }, {
//     name: "Earning History",
//     path: "/admin/earning-history"
//   }, {
//     name: "Payouts",
//     path: "/admin/payouts"
//   }, {
//     name: "Payout Request",
//     path: "/admin/payout-requests"
//   }]
// }, 
{
  type: "label",
  label: "Account"
}, 

  // SETTINGS
  {
    name: "Settings",
    icon: duotone.SiteSetting,
    children: [{
      name: "Company Page",
      path: "/vendor/shop-settings"
    }, {
      name: "Account Settings",
      path: "/vendor/shop-settings"
    }, {
      name: "Notification Settings",
      path: "/vendor/shop-settings"
    }, {
      name: "Manage Contacts",
      path: "/vendor/shop-settings"
    }, {
      name: "Returns",
      path: "/vendor/shop-settings"
    }, {
      name: "Customer Service",
      path: "/vendor/shop-settings"
    }, {
      name: "Taxes",
      path: "/vendor/shop-settings"
    }]
  },

  //TEAM
  {
    name: "Team",
    icon: duotone.ProjectChart,
    path: "/vendor/earning-history"

  },

  //SUPPORT
  {
    name: "Support",
    icon: duotone.ElementHub,
    children: [{
      name: "Billing",
      path: "/vendor/earning-history"
    }, {
      name: "Tickets",
      path: "/vendor/payouts"
    }, {
      name: "Help",
      path: "/vendor/payout-requests"
    }, {
      name: "Docs",
      path: "/vendor/payout-settings"
    }, {
      name: "Contact Us",
      path: "/vendor/payout-settings"
    }]
  },

  //INTEGRATION
 {
  name: "Integration",
  icon: duotone.Refund,
  children: [{
    name: "Billing",
    path: "/vendor/earning-history"
  }, {
    name: "Augmented Reality",
    path: "/vendor/payouts"
  }, {
    name: "APIs",
    path: "/vendor/payout-requests"
  }, {
    name: "Apps",
    path: "/vendor/payout-settings"
  }, {
    name: "Connected Apps",
    path: "/vendor/payout-settings"
  }]
},
  
// {
//   name: "Account Settings",
//   icon: duotone.AccountSetting,
//   path: "/vendor/account-settings"
// }, {
//   name: "Site Settings",
//   icon: duotone.SiteSetting,
//   path: "/vendor/site-settings"
// }, 
{
  name: "Logout",
  icon: duotone.Session,
  path: "/logout"
}];