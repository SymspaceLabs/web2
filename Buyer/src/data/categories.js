const CATEGORIES_DATA = [
    {
      title: "Categories",
      child: [
  
        // CLOTHING
        {
          title: "Clothing, Shoes & Accessories",
          child: [
            {
              title: "Dresses",
              child: [
                { title: "Casual Dresses", slug: "casual-dresses" },
                { title: "Formal Dresses", slug: "formal-dresses" },
                { title: "Summer Dresses", slug: "summer-dresses" }
              ]
            },
            {
              title: "Tops",
              child: [
                { title: "Blouses", slug: "blouses" },
                { title: "T-Shirts", slug: "t-shirts" },
                { title: "Sweaters", slug: "sweaters" },
                { title: "Cardigans", slug: "cardigans" }
              ]
            },
            {
              title: "Shirts",
              child: [
                { title: "Casual Shirts", slug: "casual-shirts" },
                { title: "Dress Shirts", slug: "dress-shirts" },
                { title: "Polo Shirts", slug: "polo-shirts" }
              ]
            },
            {
              title: "Bottoms",
              child: [
                { title: "Jeans", slug: "jeans" },
                { title: "Trousers", slug: "trousers" },
                { title: "Shorts", slug: "shorts" },
                { title: "Skirts", slug: "skirts" },
                { title: "Pants", slug: "pants" }
              ]
            },
            {
              title: "Outerwear",
              child: [
                { title: "Jackets", slug: "jackets" },
                { title: "Coats", slug: "coats" },
                { title: "Blazers", slug: "blazers" },
                { title: "Vests", slug: "vests" },
                { title: "Hoodies", slug: "hoodies" },
                { title: "Suits", slug: "suits" }
              ]
            },
            {
              title: "Activewear",
              child: [
                { title: "Leggings", slug: "leggings" },
                { title: "Sport bras", slug: "sport-bras" },
                { title: "Track pants", slug: "track-pants" },
                { title: "Workout Tops", slug: "workout-tops" },
                { title: "Yoga pants", slug: "yoga-pants" },
                { title: "Sports shorts", slug: "sports-shorts" },
                { title: "Joggers", slug: "joggers" },
                { title: "Gym Shorts", slug: "gym-shorts" },
                { title: "Sweatshirts", slug: "sweatshirts" },
                { title: "Compression Wear", slug: "compression-wear" }
              ]
            },
            {
              title: "Intimates",
              child: [
                { title: "Lingerie", slug: "lingerie" },
                { title: "Sleepwear", slug: "sleepwear" }
              ]
            },
            {
              title: "Shoes",
              child: [
                { title: "Sandals", slug: "sandals" },
                { title: "Flats", slug: "flats" },
                { title: "Heels", slug: "heels" },
                { title: "Boots", slug: "boots" },
                { title: "Sneakers", slug: "sneakers" },
                { title: "Athletic Shoes", slug: "athletic-shoes" },
                { title: "Formal Shoes", slug: "formal-shoes" },
                { title: "Casual Shoes", slug: "casual-shoes" }
              ]
            },
            {
              title: "Accessories",
              child: [
                { title: "Handbags", slug: "handbags" },
                { title: "Jewelry", slug: "jewelry" },
                { title: "Watches", slug: "watches" },
                { title: "Scarves", slug: "scarves" },
                { title: "Ties", slug: "ties" },
                { title: "Wallets", slug: "wallets" },
                { title: "Backpacks", slug: "backpacks" }
              ]
            }
          ]
        },

        
        // ELECTRONICS
        {
          title: "Electronics",
          child: [
            {
              title: "Mobile Phones & Accessories",
              child: [
                { title: "Smartphones", slug: "t-shirt" },
                { title: "Cases & Covers", slug: "t-shirt" },
                { title: "Screen Protectors", slug: "t-shirt" },
                { title: "Chargers & Cables", slug: "t-shirt" },
                { title: "Power Banks", slug: "t-shirt" },
              ],
            },
            {
              title: "Computers & Accessories",
              child: [
                { title: "Laptops", slug: "t-shirt" },
                { title: "Desktops", slug: "t-shirt" },
                { title: "Monitors", slug: "t-shirt" },
                { title: "Keyboards & Mice", slug: "t-shirt" },
                { title: "Printers & Scanners", slug: "t-shirt" },
              ],
            },
            {
              title: "Home Entertainment",
              child: [
                { title: "Televisions", slug: "t-shirt" },
                { title: "Sound Systems", slug: "t-shirt" },
                { title: "Streaming Devices", slug: "t-shirt" },
                { title: "Blu-ray & DVD Players", slug: "t-shirt" },
              ],
            },
            {
              title: "Cameras & Photography",
              child: [
                { title: "Digital Cameras", slug: "t-shirt" },
                { title: "Lenses", slug: "t-shirt" },
                { title: "Tripods", slug: "t-shirt" },
                { title: "Camera Accessories", slug: "t-shirt" },
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
                { title: "Living Room",  slug: "t-shirt" },
                { title: "Sofas",  slug: "t-shirt" },
                { title: "Coffee Tables",  slug: "t-shirt" },
                { title: "TV Stands",  slug: "t-shirt" },
                { title: "Recliners",  slug: "t-shirt" },
                { title: "Bedroom",  slug: "t-shirt" },
                { title: "Beds",  slug: "t-shirt" },
                { title: "Dressers",  slug: "t-shirt" },
                { title: "Nightstands",  slug: "t-shirt" },
                { title: "Wardrobes",  slug: "t-shirt" },
                { title: "Office",  slug: "t-shirt" },
                { title: "Desks",  slug: "t-shirt" },
                { title: "Office Chairs",  slug: "t-shirt" },
                { title: "Bookcases",  slug: "t-shirt" },
                { title: "Outdoor",  slug: "t-shirt" },
                { title: "Patio Sets",  slug: "t-shirt" },
                { title: "Outdoor Chairs",  slug: "t-shirt" },
                { title: "Garden Storage",  slug: "t-shirt" },
              ],
            },
            {
              title: "Home Decor",
              child: [
                { title: "Lighting",  slug: "t-shirt" },
                { title: "Lamps",  slug: "t-shirt" },
                { title: "Ceiling Lights",  slug: "t-shirt" },
                { title: "Wall Lights",  slug: "t-shirt" },
                { title: "Rugs",  slug: "t-shirt" },
                { title: "Wall Art",  slug: "t-shirt" },
                { title: "Clocks",  slug: "t-shirt" },
                { title: "Mirrors",  slug: "t-shirt" },
              ],
            },
            {
              title: "Kitchen & Dining",
              child: [
                { title: "Cookware",  slug: "t-shirt" },
                { title: "Pots & Pans",  slug: "t-shirt" },
                { title: "Bakeware",  slug: "t-shirt" },
                { title: "Tableware",  slug: "t-shirt" },
                { title: "Dinner Sets",  slug: "t-shirt" },
                { title: "Glassware",  slug: "t-shirt" },
                { title: "Cutlery",  slug: "t-shirt" },
                { title: "Kitchen Storage",  slug: "t-shirt" },
                { title: "Containers",  slug: "t-shirt" },
                { title: "Racks & Holders",  slug: "t-shirt" },
                { title: "Small Appliances",  slug: "t-shirt" },
                { title: "Toasters",  slug: "t-shirt" },
                { title: "Blenders",  slug: "t-shirt" },
                { title: "Coffee Makers",  slug: "t-shirt" },
              ],
            },
            {
              title: "Large Appliances",
              child: [
                { title: "Refrigerators",  slug: "t-shirt" },
                { title: "Washing Machines",  slug: "t-shirt" },
                { title: "Ovens",  slug: "t-shirt" },
                { title: "Dishwashers",  slug: "t-shirt" },
              ],
            },
          ],
        },
        
        
        // Beauty, Health & Pets
        {
          title: "Beauty, Health & Pets",
          child: [
            {
              title: "Beauty",
              child: [
                { title: "Skincare",  slug: "t-shirt" },
                { title: "Moisturizers",  slug: "t-shirt" },
                { title: "Cleansers",  slug: "t-shirt" },
                { title: "Serums",  slug: "t-shirt" },
                { title: "Masks",  slug: "t-shirt" },
                { title: "Haircare",  slug: "t-shirt" },
                { title: "Shampoos",  slug: "t-shirt" },
                { title: "Conditioners",  slug: "t-shirt" },
                { title: "Hair Treatments",  slug: "t-shirt" },
                { title: "Styling Tools",  slug: "t-shirt" },
                { title: "Makeup",  slug: "t-shirt" },
                { title: "Foundations",  slug: "t-shirt" },
                { title: "Lipsticks",  slug: "t-shirt" },
                { title: "Eyeshadows",  slug: "t-shirt" },
                { title: "Mascaras",  slug: "t-shirt" },
                { title: "Blushes",  slug: "t-shirt" },
                { title: "Makeup Tools",  slug: "t-shirt" },
                { title: "Concealers",  slug: "t-shirt" },
                { title: "Powders",  slug: "t-shirt" },
                { title: "Eyeliners",  slug: "t-shirt" },
                { title: "Brow Products",  slug: "t-shirt" },
                { title: "Fragrances",  slug: "t-shirt" },
                { title: "Perfumes",  slug: "t-shirt" },
                { title: "Body Sprays",  slug: "t-shirt" },
              ],
            },
            {
              title: "Health & Wellness",
              child: [
                { title: "Vitamins & Supplements",  slug: "t-shirt" },
                { title: "Medical Equipment",  slug: "t-shirt" },
                { title: "Fitness Equipment",  slug: "t-shirt" },
                { title: "Health Monitors",  slug: "t-shirt" },
              ],
            },
            {
              title: "Personal Care",
              child: [
                { title: "Oral Care",  slug: "t-shirt" },
                { title: "Toothbrushes",  slug: "t-shirt" },
                { title: "Toothpaste",  slug: "t-shirt" },
                { title: "Bath & Body",  slug: "t-shirt" },
                { title: "Body Wash",  slug: "t-shirt" },
                { title: "Lotions",  slug: "t-shirt" },
                { title: "Hand Sanitizers",  slug: "t-shirt" },
                { title: "Shaving & Hair Removal",  slug: "t-shirt" },
                { title: "Razors",  slug: "t-shirt" },
                { title: "Shaving Cream",  slug: "t-shirt" },
                { title: "Hair Removal Devices",  slug: "t-shirt" },
              ],
            },
            {
              title: "Pet Supplies",
              child: [
                { title: "Dog Supplies",  slug: "t-shirt" },
                { title: "Dog Food",  slug: "t-shirt" },
                { title: "Cat Supplies",  slug: "t-shirt" },
                { title: "Cat Food",  slug: "t-shirt" },
                { title: "Fish & Aquatic Pets",  slug: "t-shirt" },
                { title: "Small Animals",  slug: "t-shirt" },
                { title: "Birds",  slug: "t-shirt" },
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
                { title: "Diapers",  slug: "t-shirt" },
                { title: "Disposable Diapers",  slug: "t-shirt" },
                { title: "Cloth Diapers",  slug: "t-shirt" },
                { title: "Feeding",  slug: "t-shirt" },
                { title: "Bottles",  slug: "t-shirt" },
                { title: "Breastfeeding Accessories",  slug: "t-shirt" },
                { title: "Baby Gear",  slug: "t-shirt" },
                { title: "Strollers",  slug: "t-shirt" },
                { title: "Car Seats",  slug: "t-shirt" },
                { title: "Carriers",  slug: "t-shirt" },
                { title: "Nursery",  slug: "t-shirt" },
                { title: "Cribs",  slug: "t-shirt" },
                { title: "Changing Tables",  slug: "t-shirt" },
                { title: "Baby Monitors",  slug: "t-shirt" },
              ],
            },
            {
              title: "Toys",
              child: [
                { title: "Educational",  slug: "t-shirt" },
                { title: "Learning Toys",  slug: "t-shirt" },
                { title: "STEM Toys",  slug: "t-shirt" },
                { title: "Action Figures",  slug: "t-shirt" },
                { title: "Dolls & Accessories",  slug: "t-shirt" },
                { title: "Outdoor Play",  slug: "t-shirt" },
                { title: "Playhouses",  slug: "t-shirt" },
                { title: "Slides",  slug: "t-shirt" },
                { title: "Swings",  slug: "t-shirt" },
              ],
            },
            {
              title: "Kids Clothing",
              child: [
                { title: "Girls",  slug: "t-shirt" },
                { title: "Boys",  slug: "t-shirt" },
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
                { title: "Fruits",  slug: "t-shirt" },
                { title: "Vegetables",  slug: "t-shirt" },
              ],
            },
            {
              title: "Pantry Staples",
              child: [
                { title: "Snacks",  slug: "t-shirt" },
                { title: "Beverages",  slug: "t-shirt" },
                { title: "Tea",  slug: "t-shirt" },
                { title: "Coffee",  slug: "t-shirt" },
                { title: "Soft Drinks",  slug: "t-shirt" },
                { title: "Baking",  slug: "t-shirt" },
                { title: "Flour",  slug: "t-shirt" },
                { title: "Sugar",  slug: "t-shirt" },
                { title: "Baking Mixes",  slug: "t-shirt" },
              ],
            },
            {
              title: "Meat & Seafood",
              child: [
                { title: "Fresh Meat",  slug: "t-shirt" },
                { title: "Seafood",  slug: "t-shirt" },
              ],
            },
            {
              title: "Dairy",
              child: [
                { title: "Milk",  slug: "t-shirt" },
                { title: "Cheese",  slug: "t-shirt" },
                { title: "Eggs",  slug: "t-shirt" },
              ],
            },
            {
              title: "Frozen Foods",
              child: [
                { title: "Vegetables",  slug: "t-shirt" },
                { title: "Meats",  slug: "t-shirt" },
                { title: "Desserts",  slug: "t-shirt" },
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
                { title: "Cardio Machines",  slug: "t-shirt" },
                { title: "Treadmills",  slug: "t-shirt" },
                { title: "Exercise Bikes",  slug: "t-shirt" },
                { title: "Strength Training",  slug: "t-shirt" },
                { title: "Dumbbells",  slug: "t-shirt" },
                { title: "Weight Benches",  slug: "t-shirt" },
                { title: "Fitness Accessories",  slug: "t-shirt" },
                { title: "Yoga Mats",  slug: "t-shirt" },
                { title: "Resistance Bands",  slug: "t-shirt" },
              ],
            },
            {
              title: "Outdoor Recreation",
              child: [
                { title: "Camping",  slug: "t-shirt" },
                { title: "Tents",  slug: "t-shirt" },
                { title: "Sleeping Bags",  slug: "t-shirt" },
                { title: "Backpacks",  slug: "t-shirt" },
                { title: "Hiking",  slug: "t-shirt" },
                { title: "Boots",  slug: "t-shirt" },
                { title: "Poles",  slug: "t-shirt" },
                { title: "Gear",  slug: "t-shirt" },
                { title: "Water Sports",  slug: "t-shirt" },
                { title: "Kayaks",  slug: "t-shirt" },
                { title: "Life Jackets",  slug: "t-shirt" },
              ],
            },
            {
              title: "Team Sports",
              child: [
                { title: "Soccer",  slug: "t-shirt" },
                { title: "Balls",  slug: "t-shirt" },
                { title: "Apparel",  slug: "t-shirt" },
                { title: "Basketball",  slug: "t-shirt" },
                { title: "Shoes",  slug: "t-shirt" },
                { title: "Tennis",  slug: "t-shirt" },
                { title: "Rackets",  slug: "t-shirt" },
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
                { title: "Car Electronics",  slug: "t-shirt" },
                { title: "GPS",  slug: "t-shirt" },
                { title: "Stereos",  slug: "t-shirt" },
                { title: "Tools & Equipment",  slug: "t-shirt" },
                { title: "Wrenches",  slug: "t-shirt" },
                { title: "Jacks",  slug: "t-shirt" },
                { title: "Replacement Parts",  slug: "t-shirt" },
                { title: "Brakes",  slug: "t-shirt" },
                { title: "Batteries",  slug: "t-shirt" },
                { title: "Interior Accessories",  slug: "t-shirt" },
                { title: "Seat Covers",  slug: "t-shirt" },
                { title: "Floor Mats",  slug: "t-shirt" },
                { title: "Exterior Accessories",  slug: "t-shirt" },
                { title: "Car Covers",  slug: "t-shirt" },
                { title: "Bike Racks",  slug: "t-shirt" },
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
                { title: "Wheelchairs",  slug: "t-shirt" },
                { title: "Walkers",  slug: "t-shirt" },
                { title: "Canes",  slug: "t-shirt" },
                { title: "Mobility Scooters",  slug: "t-shirt" },
              ],
            },
            {
              title: "Daily Living Aids",
              child: [
                { title: "Dressing Aids",  slug: "t-shirt" },
                { title: "Eating Aids",  slug: "t-shirt" },
                { title: "Bathing Aids",  slug: "t-shirt" },
                { title: "Communication Aids",  slug: "t-shirt" },
              ],
            },
            {
              title: "Accessibility Equipment",
              child: [
                { title: "Ramps",  slug: "t-shirt" },
                { title: "Lifts",  slug: "t-shirt" },
                { title: "Accessible Furniture",  slug: "t-shirt" },
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
                { title: "Dresses",  slug: "t-shirt" },
                { title: "Tops",  slug: "t-shirt" },
                { title: "Bottoms",  slug: "t-shirt" },
              ],
            },
            {
              title: "Prenatal Care",
              child: [
                { title: "Vitamins",  slug: "t-shirt" },
                { title: "Support Bands",  slug: "t-shirt" },
                { title: "Pregnancy Pillows",  slug: "t-shirt" },
                { title: "Skincare",  slug: "t-shirt" },
              ],
            },
            {
              title: "Baby Essentials",
              child: [
                { title: "Clothing",  slug: "t-shirt" },
                { title: "Diapers",  slug: "t-shirt" },
                { title: "Feeding",  slug: "t-shirt" },
                { title: "Nursery",  slug: "t-shirt" },
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
                { title: "Supplements",  slug: "t-shirt" },
                { title: "Monitors",  slug: "t-shirt" },
                { title: "Mobility Aids",  slug: "t-shirt" },
                { title: "Vision & Hearing Aids",  slug: "t-shirt" },
              ],
            },
            {
              title: "Comfort & Care",
              child: [
                { title: "Recliners",  slug: "t-shirt" },
                { title: "Cushions",  slug: "t-shirt" },
                { title: "Adjustable Beds",  slug: "t-shirt" },
                { title: "Daily Living Aids",  slug: "t-shirt" },
              ],
            },
            {
              title: "Recreation & Leisure",
              child: [
                { title: "Puzzles",  slug: "t-shirt" },
                { title: "Books",  slug: "t-shirt" },
              ],
            },
          ],
        },
      ]
    }, 
  
];

export default CATEGORIES_DATA 