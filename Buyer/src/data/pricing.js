const AR_FOR_BUSINESS_PLANS = (billingCycle) => [
    {
      title: "Starter",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$20" : "$200",
      basis: billingCycle === "monthly" ? "month" : "year",
      credit:0,
      features: [
        "One 3D Product Render",
        "Unlimited Product Variants",
        "One 3D Product Ad Video",
        "AR Application Integration"
      ],
    },
    {
      title: "Standard",
      subTitle: "Most popular",
      price: billingCycle === "monthly" ? "$150" : "$1,700",
      basis: billingCycle === "monthly" ? "month" : "year",
      credit:18,
      features: [
        "10 3D Product Renders",
        "Unlimited Product Variants",
        "Ten Product Ad Videos",
        "AR Application Integration",
        "Analytics"
      ],
    },
    {
      title: "Plus",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$300" : "$3,400",
      basis: billingCycle === "monthly" ? "month" : "year",
      isPopular: true,
      credit:15,
      features: [
        "20 3D Product Renders",
        "Unlimited Product Variants",
        "20 Product Ad Videos",
        "AR Application Integration",
        "Analytics and Beta Releases",
        "24/7 Support",
      ],
    },
    {
      title: "Premium",
      subTitle: "No Commitment",
      price: billingCycle === "monthly" ? "$800" : "$9,200",
      basis: billingCycle === "monthly" ? "month" : "year",
      credit:12,
      features: [
        "60 3D Product Renders",
        "Unlimited Product Variants",
        "60 Product Ad Videos",
        "AR Application Integration",
        "Analytics and Beta Releases",
        "24/7 Support",
      ],
    },
];

const AR_REAL_ESTATE_PLANS = (billingCycle) => [
  {
    title: "basic",
    subTitle: "Up to 10 Units",
    price: billingCycle === "monthly" ? "$119.99" : "$1,399.99",
    basis: billingCycle === "monthly" ? "month" : "anually",
    credit:0,
    features: [
      "Unlimited AR Support for up to 10 Units for staging",
      "Unlimited 3D Tours",
      "Access to Catalogue of 1000+ products"
    ],
  },
  {
    title: "Standard",
    subTitle: "Up to 20 Units",
    price: billingCycle === "monthly" ? "$219.99" : "$2,499.99",
    basis: billingCycle === "monthly" ? "month" : "annually",
    credit:0,
    features: [
      "Unlimited AR Support for up to 20 Units for staging",
      "Unlimited 3D Tours",
      "Access to Catalogue of 1000+ products",
      "Analytics"
    ],
  },
  {
    title: "Plus",
    subTitle: "Up to 30 Units",
    price: billingCycle === "monthly" ? "$319.99" : "$3,599.99",
    basis: billingCycle === "monthly" ? "month" : "annually",
    isPopular: true,
    credit:15,
    features: [
      "Unlimited AR Support for up to 30 Units for staging",
      "Unlimited 3D Tours",
      "Access to Catalogue of 1000+ products",
      "Analytics and Beta Releases",
      "24/7 Support",
    ],
  },
  {
    title: "Premium",
    subTitle: "30+ Units",
    price: billingCycle === "monthly" ? "$479.99" : "$5,499.99",
    basis: billingCycle === "monthly" ? "month" : "annually",
    credit:12,
    features: [
      "Unlimited AR Support 30+ Units for staging",
      "Unlimited 3D Tours",
      "Access to Catalogue of 1000+ products",
      "Analytics and Beta Releases",
      "24/7 Support",
    ],
  },
];



export { AR_FOR_BUSINESS_PLANS, AR_REAL_ESTATE_PLANS }

