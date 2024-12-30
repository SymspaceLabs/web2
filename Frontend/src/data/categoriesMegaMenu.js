import Icons from "../icons/duotone";
const categoriesMegaMenu = [
  // Clothing, Shoes & Accessories
  {
    title: "Clothing, Shoes & Accessories",
    child: [
      {
        title: "Dresses",
        child: [
          { title: "Casual Dresses", url: "#", Icon: Icons.CasualDresses },
          { title: "Formal Dresses", url: "#", Icon: Icons.FormalDresses },
          { title: "Summer Dresses", url: "#", Icon: Icons.SummerDresses },
        ],
        tags: [
          { name: "Gender", options: ["Women"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Kids", "Teens", "Babies"] }
        ]
      },
      {
        title: "Tops",
        child: [
          { title: "Blouses", url: "#", Icon: Icons.Blouses },
          { title: "T-Shirts", url: "#", Icon: Icons.TShirts },
          { title: "Sweaters", url: "#", Icon: Icons.Sweaters },
          { title: "Cardigans", url: "#", Icon: Icons.Cardigans },
        ],
        tags: [
          { name: "Gender", options: ["Women"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Kids", "Teens", "Babies"] }
        ]
      },
      {
        title: "Shirts",
        child: [
          { title: "Casual Shirts", url: "#", Icon: Icons.CasualShirts },
          { title: "Dress Shirts", url: "#", Icon: Icons.DressShirts },
          { title: "Polo Shirts", url: "#", Icon: Icons.PoloShirts },
        ],
        tags: [
          { name: "Gender", options: ["Women", "Men", "Unisex"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Kids", "Teens", "Babies"] }
        ]
      },
      {
        title: "Bottoms",
        child: [
          { title: "Jeans", url: "#", Icon: Icons.Jeans },
          { title: "Trousers", url: "#", Icon: Icons.Trousers },
          { title: "Shorts", url: "#", Icon: Icons.Shorts },
          { title: "Skirts", url: "#", Icon: Icons.Skirts },
          { title: "Pants", url: "#", Icon: Icons.Pants },
        ],
        tags: [
          { name: "Gender", options: ["Women", "Men", "Unisex"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Teens", "Babies"] }
        ]
      },
      {
        title: "Outerwear",
        child: [
          { title: "Jackets", url: "#", Icon: Icons.Jackets },
          { title: "Coats", url: "#", Icon: Icons.Coats },
          { title: "Blazers", url: "#", Icon: Icons.Blazers },
          { title: "Vests", url: "#", Icon: Icons.Vests },
          { title: "Hoodies", url: "#", Icon: Icons.Hoodies },
          { title: "Suits", url: "#", Icon: Icons.Suits },
        ],
        tags: [
          { name: "Gender", options: ["Women", "Men", "Unisex"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Teens", "Babies"] }
        ]
      },
      {
        title: "Activewear",
        child: [
          { title: "Leggings", url: "#", Icon: Icons.Leggings },
          { title: "Sport bras", url: "#", Icon: Icons.SportBras },
          { title: "Track pants", url: "#", Icon: Icons.TrackPants },
          { title: "Workout Tops", url: "#", Icon: Icons.WorkoutTops },
          { title: "Yoga pants", url: "#", Icon: Icons.YogaPants },
          { title: "Sports shorts", url: "#", Icon: Icons.SportsShorts },
          { title: "Joggers", url: "#", Icon: Icons.Joggers },
          { title: "Gym Shorts", url: "#", Icon: Icons.GymShorts },
          { title: "Sweatshirts", url: "#", Icon: Icons.Sweatshirts },
          { title: "Compression Wear", url: "#", Icon: Icons.CompressionWear },
        ],
        tags: [
          { name: "Gender", options: ["Women", "Men", "Unisex"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Teens", "Babies"] }
        ]
      },
      {
        title: "Intimates",
        child: [
          { title: "Lingerie", url: "#", Icon: Icons.Lingerie },
          { title: "Sleepwear", url: "#", Icon: Icons.Sleepwear },
        ],
        tags: [
          { name: "Gender", options: ["Women"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Teens", "Babies"] }
        ]
      },
      {
        title: "Shoes",
        child: [
          { title: "Sandals", url: "#", Icon: Icons.Sandals },
          { title: "Flats", url: "#", Icon: Icons.Flats },
          { title: "Heels", url: "#", Icon: Icons.Heels },
          { title: "Boots", url: "#", Icon: Icons.Boots },
          { title: "Sneakers", url: "#", Icon: Icons.Sneakers },
          { title: "Athletic Shoes", url: "#", Icon: Icons.AthleticShoes },
          { title: "Formal Shoes", url: "#", Icon: Icons.FormalShoes },
          { title: "Casual Shoes", url: "#", Icon: Icons.CasualShoes },
        ],
        tags: [
          { name: "Gender", options: ["Women", "Men", "Unisex"] },
          { name: "Age Group", options: ["All Ages", "Adults", "Teens", "Babies"] }
        ]
      },
      {
        title: "Accessories",
        child: [
          { title: "Handbags", url: "#", Icon: Icons.Handbags },
          { title: "Jewelry", url: "#", Icon: Icons.Jewelry },
          { title: "Watches", url: "#", Icon: Icons.Watches },
          { title: "Scarves", url: "#", Icon: Icons.Scarves },
          { title: "Ties", url: "#", Icon: Icons.Ties },
          { title: "Wallets", url: "#", Icon: Icons.Wallets },
          { title: "Backpacks", url: "#", Icon: Icons.Backpacks },
        ],
      },
    ],
  }, 

  // Electronics
  {
    title: "Electronics",
    child: [
      {
        title: "Mobile Phones & Accessories",
        child: [
          {
            title: "Smartphones",
            url: "#",
            Icon: Icons.Phone,
          },
          {
            title: "Cases & Covers",
            url: "#",
            Icon: Icons.Cover,
          },
          {
            title: "Screen Protectors",
            url: "#",
            Icon: Icons.Screen,
          },
          {
            title: "Chargers & Cables",
            url: "#",
            Icon: Icons.Charger,
          },
          {
            title: "Power Banks",
            url: "#",
            Icon: Icons.Battery,
          },
        ],
      },
      {
        title: "Computers & Accessories",
        child: [
          {
            title: "Laptops",
            url: "#",
            Icon: Icons.Laptop,
          },
          {
            title: "Desktops",
            url: "#",
            Icon: Icons.Desktop,
          },
          {
            title: "Monitors",
            url: "#",
            Icon: Icons.Monitor,
          },
          {
            title: "Keyboards & Mice",
            url: "#",
            Icon: Icons.Keyboard,
          },
          {
            title: "Printers & Scanners",
            url: "#",
            Icon: Icons.Printer,
          },
        ],
      },
      {
        title: "Home Entertainment",
        child: [
          {
            title: "Televisions",
            url: "#",
            Icon: Icons.TV,
          },
          {
            title: "Sound Systems",
            url: "#",
            Icon: Icons.Speaker,
          },
          {
            title: "Streaming Devices",
            url: "#",
            Icon: Icons.Streaming,
          },
          {
            title: "Blu-ray & DVD Players",
            url: "#",
            Icon: Icons.Disc,
          },
        ],
      },
      {
        title: "Cameras & Photography",
        child: [
          {
            title: "Digital Cameras",
            url: "#",
            Icon: Icons.Camera,
          },
          {
            title: "Lenses",
            url: "#",
            Icon: Icons.Lens,
          },
          {
            title: "Tripods",
            url: "#",
            Icon: Icons.Tripod,
          },
          {
            title: "Camera Accessories",
            url: "#",
            Icon: Icons.Accessories,
          },
        ],
      },
    ],
  },

  // HOME
  {
    title: "Home, Furniture & Appliances",
    child: [
      {
        title: "Furniture",
        child: [
          { title: "Living Room", url: "#", Icon: Icons.LivingRoom },
          { title: "Sofas", url: "#", Icon: Icons.Sofa },
          { title: "Coffee Tables", url: "#", Icon: Icons.CoffeeTable },
          { title: "TV Stands", url: "#", Icon: Icons.TVStand },
          { title: "Recliners", url: "#", Icon: Icons.Recliner },
          { title: "Bedroom", url: "#", Icon: Icons.Bedroom },
          { title: "Beds", url: "#", Icon: Icons.Bed },
          { title: "Dressers", url: "#", Icon: Icons.Dresser },
          { title: "Nightstands", url: "#", Icon: Icons.Nightstand },
          { title: "Wardrobes", url: "#", Icon: Icons.Wardrobe },
          { title: "Office", url: "#", Icon: Icons.Office },
          { title: "Desks", url: "#", Icon: Icons.Desk },
          { title: "Office Chairs", url: "#", Icon: Icons.OfficeChair },
          { title: "Bookcases", url: "#", Icon: Icons.Bookcase },
          { title: "Outdoor", url: "#", Icon: Icons.Outdoor },
          { title: "Patio Sets", url: "#", Icon: Icons.Patio },
          { title: "Outdoor Chairs", url: "#", Icon: Icons.OutdoorChair },
          { title: "Garden Storage", url: "#", Icon: Icons.GardenStorage },
        ],
      },
      {
        title: "Home Decor",
        child: [
          { title: "Lighting", url: "#", Icon: Icons.Lighting },
          { title: "Lamps", url: "#", Icon: Icons.Lamp },
          { title: "Ceiling Lights", url: "#", Icon: Icons.CeilingLight },
          { title: "Wall Lights", url: "#", Icon: Icons.WallLight },
          { title: "Rugs", url: "#", Icon: Icons.Rug },
          { title: "Wall Art", url: "#", Icon: Icons.WallArt },
          { title: "Clocks", url: "#", Icon: Icons.Clock },
          { title: "Mirrors", url: "#", Icon: Icons.Mirror },
        ],
      },
      {
        title: "Kitchen & Dining",
        child: [
          { title: "Cookware", url: "#", Icon: Icons.Cookware },
          { title: "Pots & Pans", url: "#", Icon: Icons.PotsPans },
          { title: "Bakeware", url: "#", Icon: Icons.Bakeware },
          { title: "Tableware", url: "#", Icon: Icons.Tableware },
          { title: "Dinner Sets", url: "#", Icon: Icons.DinnerSet },
          { title: "Glassware", url: "#", Icon: Icons.Glassware },
          { title: "Cutlery", url: "#", Icon: Icons.Cutlery },
          { title: "Kitchen Storage", url: "#", Icon: Icons.KitchenStorage },
          { title: "Containers", url: "#", Icon: Icons.Container },
          { title: "Racks & Holders", url: "#", Icon: Icons.Rack },
          { title: "Small Appliances", url: "#", Icon: Icons.SmallAppliance },
          { title: "Toasters", url: "#", Icon: Icons.Toaster },
          { title: "Blenders", url: "#", Icon: Icons.Blender },
          { title: "Coffee Makers", url: "#", Icon: Icons.CoffeeMaker },
        ],
      },
      {
        title: "Large Appliances",
        child: [
          { title: "Refrigerators", url: "#", Icon: Icons.Refrigerator },
          { title: "Washing Machines", url: "#", Icon: Icons.WashingMachine },
          { title: "Ovens", url: "#", Icon: Icons.Oven },
          { title: "Dishwashers", url: "#", Icon: Icons.Dishwasher },
        ],
      },
    ],
  },

  //Beauty, Health & Personal Care
  {
    title: "Beauty, Health & Personal Care",
    child: [
      {
        title: "Beauty",
        child: [
          { title: "Skincare", url: "#", Icon: Icons.Skincare },
          { title: "Moisturizers", url: "#", Icon: Icons.Moisturizer },
          { title: "Cleansers", url: "#", Icon: Icons.Cleanser },
          { title: "Serums", url: "#", Icon: Icons.Serum },
          { title: "Masks", url: "#", Icon: Icons.Mask },
          { title: "Haircare", url: "#", Icon: Icons.Haircare },
          { title: "Shampoos", url: "#", Icon: Icons.Shampoo },
          { title: "Conditioners", url: "#", Icon: Icons.Conditioner },
          { title: "Hair Treatments", url: "#", Icon: Icons.HairTreatment },
          { title: "Styling Tools", url: "#", Icon: Icons.StylingTool },
          { title: "Makeup", url: "#", Icon: Icons.Makeup },
          { title: "Foundations", url: "#", Icon: Icons.Foundation },
          { title: "Lipsticks", url: "#", Icon: Icons.Lipstick },
          { title: "Eyeshadows", url: "#", Icon: Icons.Eyeshadow },
          { title: "Mascaras", url: "#", Icon: Icons.Mascara },
          { title: "Blushes", url: "#", Icon: Icons.Blush },
          { title: "Makeup Tools", url: "#", Icon: Icons.MakeupTool },
          { title: "Concealers", url: "#", Icon: Icons.Concealer },
          { title: "Powders", url: "#", Icon: Icons.Powder },
          { title: "Eyeliners", url: "#", Icon: Icons.Eyeliner },
          { title: "Brow Products", url: "#", Icon: Icons.BrowProduct },
          { title: "Fragrances", url: "#", Icon: Icons.Fragrance },
          { title: "Perfumes", url: "#", Icon: Icons.Perfume },
          { title: "Body Sprays", url: "#", Icon: Icons.BodySpray },
        ],
      },
      {
        title: "Health & Wellness",
        child: [
          { title: "Vitamins & Supplements", url: "#", Icon: Icons.Vitamins },
          { title: "Medical Equipment", url: "#", Icon: Icons.MedicalEquipment },
          { title: "Fitness Equipment", url: "#", Icon: Icons.FitnessEquipment },
          { title: "Health Monitors", url: "#", Icon: Icons.HealthMonitor },
        ],
      },
      {
        title: "Personal Care",
        child: [
          { title: "Oral Care", url: "#", Icon: Icons.OralCare },
          { title: "Toothbrushes", url: "#", Icon: Icons.Toothbrush },
          { title: "Toothpaste", url: "#", Icon: Icons.Toothpaste },
          { title: "Bath & Body", url: "#", Icon: Icons.BathBody },
          { title: "Body Wash", url: "#", Icon: Icons.BodyWash },
          { title: "Lotions", url: "#", Icon: Icons.Lotion },
          { title: "Hand Sanitizers", url: "#", Icon: Icons.HandSanitizer },
          { title: "Shaving & Hair Removal", url: "#", Icon: Icons.Shaving },
          { title: "Razors", url: "#", Icon: Icons.Razor },
          { title: "Shaving Cream", url: "#", Icon: Icons.ShavingCream },
          { title: "Hair Removal Devices", url: "#", Icon: Icons.HairRemovalDevice },
        ],
      },
    ],
  },

  // Baby, Kids & Toys
  {
    title: "Baby, Kids & Toys",
    child: [
      {
        title: "Baby",
        child: [
          { title: "Diapers", url: "#", Icon: Icons.Diapers },
          { title: "Disposable Diapers", url: "#", Icon: Icons.DisposableDiapers },
          { title: "Cloth Diapers", url: "#", Icon: Icons.ClothDiapers },
          { title: "Feeding", url: "#", Icon: Icons.Feeding },
          { title: "Bottles", url: "#", Icon: Icons.Bottles },
          { title: "Breastfeeding Accessories", url: "#", Icon: Icons.BreastfeedingAccessories },
          { title: "Baby Gear", url: "#", Icon: Icons.BabyGear },
          { title: "Strollers", url: "#", Icon: Icons.Strollers },
          { title: "Car Seats", url: "#", Icon: Icons.CarSeats },
          { title: "Carriers", url: "#", Icon: Icons.Carriers },
          { title: "Nursery", url: "#", Icon: Icons.Nursery },
          { title: "Cribs", url: "#", Icon: Icons.Cribs },
          { title: "Changing Tables", url: "#", Icon: Icons.ChangingTables },
          { title: "Baby Monitors", url: "#", Icon: Icons.BabyMonitors },
        ],
      },
      {
        title: "Toys",
        child: [
          { title: "Educational", url: "#", Icon: Icons.Educational },
          { title: "Learning Toys", url: "#", Icon: Icons.LearningToys },
          { title: "STEM Toys", url: "#", Icon: Icons.STEMToys },
          { title: "Action Figures", url: "#", Icon: Icons.ActionFigures },
          { title: "Dolls & Accessories", url: "#", Icon: Icons.DollsAccessories },
          { title: "Outdoor Play", url: "#", Icon: Icons.OutdoorPlay },
          { title: "Playhouses", url: "#", Icon: Icons.Playhouses },
          { title: "Slides", url: "#", Icon: Icons.Slides },
          { title: "Swings", url: "#", Icon: Icons.Swings },
        ],
      },
      {
        title: "Kids Clothing",
        child: [
          { title: "Girls", url: "#", Icon: Icons.Girls },
          { title: "Boys", url: "#", Icon: Icons.Boys },
        ],
      },
    ],
  },

  // Recipes
  {
    title: "Recipes",
    child: [
      {
        title: "Fresh Produce",
        child: [
          { title: "Fruits", url: "#", Icon: Icons.Fruits },
          { title: "Vegetables", url: "#", Icon: Icons.Vegetables },
        ],
      },
      {
        title: "Pantry Staples",
        child: [
          { title: "Snacks", url: "#", Icon: Icons.Snacks },
          { title: "Beverages", url: "#", Icon: Icons.Beverages },
          { title: "Tea", url: "#", Icon: Icons.Tea },
          { title: "Coffee", url: "#", Icon: Icons.Coffee },
          { title: "Soft Drinks", url: "#", Icon: Icons.SoftDrinks },
          { title: "Baking", url: "#", Icon: Icons.Baking },
          { title: "Flour", url: "#", Icon: Icons.Flour },
          { title: "Sugar", url: "#", Icon: Icons.Sugar },
          { title: "Baking Mixes", url: "#", Icon: Icons.BakingMixes },
        ],
      },
      {
        title: "Meat & Seafood",
        child: [
          { title: "Fresh Meat", url: "#", Icon: Icons.FreshMeat },
          { title: "Seafood", url: "#", Icon: Icons.Seafood },
        ],
      },
      {
        title: "Dairy",
        child: [
          { title: "Milk", url: "#", Icon: Icons.Milk },
          { title: "Cheese", url: "#", Icon: Icons.Cheese },
          { title: "Eggs", url: "#", Icon: Icons.Eggs },
        ],
      },
      {
        title: "Frozen Foods",
        child: [
          { title: "Vegetables", url: "#", Icon: Icons.FrozenVegetables },
          { title: "Meats", url: "#", Icon: Icons.FrozenMeats },
          { title: "Desserts", url: "#", Icon: Icons.FrozenDesserts },
        ],
      },
    ],
  },

  // Sports, Fitness & Outdoors
  {
    title: "Sports, Fitness & Outdoors",
    child: [
      {
        title: "Fitness Equipment",
        child: [
          { title: "Cardio Machines", url: "#", Icon: Icons.CardioMachines },
          { title: "Treadmills", url: "#", Icon: Icons.Treadmills },
          { title: "Exercise Bikes", url: "#", Icon: Icons.ExerciseBikes },
          { title: "Strength Training", url: "#", Icon: Icons.StrengthTraining },
          { title: "Dumbbells", url: "#", Icon: Icons.Dumbbells },
          { title: "Weight Benches", url: "#", Icon: Icons.WeightBenches },
          { title: "Fitness Accessories", url: "#", Icon: Icons.FitnessAccessories },
          { title: "Yoga Mats", url: "#", Icon: Icons.YogaMats },
          { title: "Resistance Bands", url: "#", Icon: Icons.ResistanceBands },
        ],
      },
      {
        title: "Outdoor Recreation",
        child: [
          { title: "Camping", url: "#", Icon: Icons.Camping },
          { title: "Tents", url: "#", Icon: Icons.Tents },
          { title: "Sleeping Bags", url: "#", Icon: Icons.SleepingBags },
          { title: "Backpacks", url: "#", Icon: Icons.Backpacks },
          { title: "Hiking", url: "#", Icon: Icons.Hiking },
          { title: "Boots", url: "#", Icon: Icons.Boots },
          { title: "Poles", url: "#", Icon: Icons.Poles },
          { title: "Gear", url: "#", Icon: Icons.Gear },
          { title: "Water Sports", url: "#", Icon: Icons.WaterSports },
          { title: "Kayaks", url: "#", Icon: Icons.Kayaks },
          { title: "Life Jackets", url: "#", Icon: Icons.LifeJackets },
        ],
      },
      {
        title: "Team Sports",
        child: [
          { title: "Soccer", url: "#", Icon: Icons.Soccer },
          { title: "Balls", url: "#", Icon: Icons.Balls },
          { title: "Apparel", url: "#", Icon: Icons.Apparel },
          { title: "Basketball", url: "#", Icon: Icons.Basketball },
          { title: "Balls", url: "#", Icon: Icons.BasketballBalls },
          { title: "Shoes", url: "#", Icon: Icons.Shoes },
          { title: "Tennis", url: "#", Icon: Icons.Tennis },
          { title: "Rackets", url: "#", Icon: Icons.Rackets },
          { title: "Balls", url: "#", Icon: Icons.TennisBalls },
        ],
      },
    ],
  },

  // Automotive
  {
    title: "Automotive",
    child: [
      {
        title: "Vehicle Parts & Accessories",
        child: [
          { title: "Car Electronics", url: "#", Icon: Icons.CarElectronics },
          { title: "GPS", url: "#", Icon: Icons.GPS },
          { title: "Stereos", url: "#", Icon: Icons.Stereos },
          { title: "Tools & Equipment", url: "#", Icon: Icons.ToolsEquipment },
          { title: "Wrenches", url: "#", Icon: Icons.Wrenches },
          { title: "Jacks", url: "#", Icon: Icons.Jacks },
          { title: "Replacement Parts", url: "#", Icon: Icons.ReplacementParts },
          { title: "Brakes", url: "#", Icon: Icons.Brakes },
          { title: "Batteries", url: "#", Icon: Icons.Batteries },
          { title: "Interior Accessories", url: "#", Icon: Icons.InteriorAccessories },
          { title: "Seat Covers", url: "#", Icon: Icons.SeatCovers },
          { title: "Floor Mats", url: "#", Icon: Icons.FloorMats },
          { title: "Exterior Accessories", url: "#", Icon: Icons.ExteriorAccessories },
          { title: "Car Covers", url: "#", Icon: Icons.CarCovers },
          { title: "Bike Racks", url: "#", Icon: Icons.BikeRacks },
        ],
      },
    ],
  },

  // Special Needs & Accessibility
  {
    title: "Special Needs & Accessibility",
    child: [
      {
        title: "Mobility Aids",
        child: [
          { title: "Wheelchairs", url: "#", Icon: Icons.Wheelchairs },
          { title: "Walkers", url: "#", Icon: Icons.Walkers },
          { title: "Canes", url: "#", Icon: Icons.Canes },
          { title: "Mobility Scooters", url: "#", Icon: Icons.MobilityScooters },
        ],
      },
      {
        title: "Daily Living Aids",
        child: [
          { title: "Dressing Aids", url: "#", Icon: Icons.DressingAids },
          { title: "Eating Aids", url: "#", Icon: Icons.EatingAids },
          { title: "Bathing Aids", url: "#", Icon: Icons.BathingAids },
          { title: "Communication Aids", url: "#", Icon: Icons.CommunicationAids },
        ],
      },
      {
        title: "Accessibility Equipment",
        child: [
          { title: "Ramps", url: "#", Icon: Icons.Ramps },
          { title: "Lifts", url: "#", Icon: Icons.Lifts },
          { title: "Accessible Furniture", url: "#", Icon: Icons.AccessibleFurniture },
        ],
      },
    ],
  },

  // Maternity & Prenatal Care
  {
    title: "Maternity & Prenatal Care",
    child: [
      {
        title: "Maternity Clothing",
        child: [
          { title: "Dresses", url: "#", Icon: Icons.Dresses },
          { title: "Tops", url: "#", Icon: Icons.Tops },
          { title: "Bottoms", url: "#", Icon: Icons.Bottoms },
        ],
      },
      {
        title: "Prenatal Care",
        child: [
          { title: "Vitamins", url: "#", Icon: Icons.Vitamins },
          { title: "Support Bands", url: "#", Icon: Icons.SupportBands },
          { title: "Pregnancy Pillows", url: "#", Icon: Icons.PregnancyPillows },
          { title: "Skincare", url: "#", Icon: Icons.Skincare },
        ],
      },
      {
        title: "Baby Essentials",
        child: [
          { title: "Clothing", url: "#", Icon: Icons.Clothing },
          { title: "Diapers", url: "#", Icon: Icons.Diapers },
          { title: "Feeding", url: "#", Icon: Icons.Feeding },
          { title: "Nursery", url: "#", Icon: Icons.Nursery },
        ],
      },
    ],
  },

  // Senior Care
  {
    title: "Senior Care",
    child: [
      {
        title: "Health & Wellness",
        child: [
          { title: "Supplements", url: "#", Icon: Icons.Supplements },
          { title: "Monitors", url: "#", Icon: Icons.Monitors },
          { title: "Mobility Aids", url: "#", Icon: Icons.MobilityAids },
          { title: "Vision & Hearing Aids", url: "#", Icon: Icons.VisionHearingAids },
        ],
      },
      {
        title: "Comfort & Care",
        child: [
          { title: "Recliners", url: "#", Icon: Icons.Recliners },
          { title: "Cushions", url: "#", Icon: Icons.Cushions },
          { title: "Adjustable Beds", url: "#", Icon: Icons.AdjustableBeds },
          { title: "Daily Living Aids", url: "#", Icon: Icons.DailyLivingAids },
        ],
      },
      {
        title: "Recreation & Leisure",
        child: [
          { title: "Puzzles", url: "#", Icon: Icons.Puzzles },
          { title: "Books", url: "#", Icon: Icons.Books },
        ],
      },
    ],
  },
];
export default categoriesMegaMenu;