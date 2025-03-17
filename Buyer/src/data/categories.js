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
              child: [{
                title: "Casual Dresses",
                url: "/products/search"
              },{
                title: "Formal Dresses",
                url: "/products/search"
              },{
                title: "Summer Dresses",
                url: "/products/search"
              }],
            }, {
              title: "Tops",
              child: [{
                title: "Blouses",
                url: "/products/search"
              },{
                title: "T-Shirts",
                url: "/products/search"
              },{
                title: "Sweaters",
                url: "/products/search"
              },{
                title: "Cardigans",
                url: "/products/search"
              }],
            }, {
            title: "Shirts",
            child: [{
              title: "Casual Shirts",
              url: "/products/search"
            }, {
              title: "Dress Shirts",
              url: "/products/search"
            }, {
              title: "Polo Shirts",
              url: "/products/search"
            }],
            }, {
              title: "Bottoms",
              child: [{
                title: "Jeans",
                url: "/products/search"
              }, {
                title: "Trousers",
                url: "/products/search"
              }, {
                title: "Shorts",
                url: "/products/search"
              }, {
                title: "Skirts",
                url: "/products/search"
              }, {
                title: "Pants",
                url: "/products/search"
              }],
            }, {
              title: "Outerwear",
              child: [{
                title: "Jackets",
                url: "/products/search"
              }, {
                title: "Coats",
                url: "/products/search"
              }, {
                title: "Blazers",
                url: "/products/search"
              }, {
                title: "Vests",
                url: "/products/search"
              }, {
                title: "Hoodies",
                url: "/products/search"
              }, {
                title: "Suits",
                url: "/products/search"
              }],
            }, {
              title: "Activewear",
              child: [{
                title: "Leggings",
                url: "/products/search"
              }, {
                title: "Sport bras",
                url: "/products/search"
              }, {
                title: "Track pants",
                url: "/products/search"
              }, {
                title: "Workout Tops",
                url: "/products/search"
              }, {
                title: "Yoga pants",
                url: "/products/search"
              }, {
                title: "Sports shorts",
                url: "/products/search"
              }, {
                title: "Joggers",
                url: "/products/search"
              }, {
                title: "Gym Shorts",
                url: "/products/search"
              }, {
                title: "Sweatshirts",
                url: "/products/search"
              }, {
                title: "Compression Wear",
                url: "/products/search"
              }],
            }, {
              title: "Intimates",
              child: [
                {
                title: "Lingerie",
                url: "/products/search"
                }, {
                  title: "Sleepwear",
                  url: "/products/search"
                }
              ],
            }, {
              title: "Shoes",
              child: [
                {
                title: "Sandals",
                url: "/products/search"
                }, {
                  title: "Flats",
                  url: "/products/search"
                }, {
                  title: "Heels",
                  url: "/products/search"
                }, {
                  title: "Boots",
                  url: "/products/search"
                }, {
                  title: "Sneakers",
                  url: "/products/search"
                }, {
                  title: "Athletic Shoes",
                  url: "/products/search"
                }, {
                  title: "Formal Shoes",
                  url: "/products/search"
                }, {
                  title: "Casual Shoes",
                  url: "/products/search"
                }
              ],
            }, {
              title: "Accessories",
              child: [
                {
                title: "Handbags",
                url: "/products/search"
                }, {
                  title: "Jewelry",
                  url: "/products/search"
                }, {
                  title: "Watches",
                  url: "/products/search"
                }, {
                  title: "Scarves",
                  url: "/products/search"
                }, {
                  title: "Ties",
                  url: "/products/search"
                }, {
                  title: "Wallets",
                  url: "/products/search"
                }, {
                  title: "Backpacks",
                  url: "/products/search"
                }
              ],
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
                {
                  title: "Smartphones",
                  url: "/products/search",
                },
                {
                  title: "Cases & Covers",
                  url: "/products/search",
                },
                {
                  title: "Screen Protectors",
                  url: "/products/search",
                },
                {
                  title: "Chargers & Cables",
                  url: "/products/search",
                },
                {
                  title: "Power Banks",
                  url: "/products/search",
                },
              ],
            },
            {
              title: "Computers & Accessories",
              child: [
                {
                  title: "Laptops",
                  url: "/products/search",
                },
                {
                  title: "Desktops",
                  url: "/products/search",
                },
                {
                  title: "Monitors",
                  url: "/products/search",
                },
                {
                  title: "Keyboards & Mice",
                  url: "/products/search",
                },
                {
                  title: "Printers & Scanners",
                  url: "/products/search",
                },
              ],
            },
            {
              title: "Home Entertainment",
              child: [
                {
                  title: "Televisions",
                  url: "/products/search",
                },
                {
                  title: "Sound Systems",
                  url: "/products/search",
                },
                {
                  title: "Streaming Devices",
                  url: "/products/search",
                },
                {
                  title: "Blu-ray & DVD Players",
                  url: "/products/search",
                },
              ],
            },
            {
              title: "Cameras & Photography",
              child: [
                {
                  title: "Digital Cameras",
                  url: "/products/search",
                },
                {
                  title: "Lenses",
                  url: "/products/search",
                },
                {
                  title: "Tripods",
                  url: "/products/search",
                },
                {
                  title: "Camera Accessories",
                  url: "/products/search",
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
                { title: "Living Room", url: "/products/search" },
                { title: "Sofas", url: "/products/search" },
                { title: "Coffee Tables", url: "/products/search" },
                { title: "TV Stands", url: "/products/search" },
                { title: "Recliners", url: "/products/search" },
                { title: "Bedroom", url: "/products/search" },
                { title: "Beds", url: "/products/search" },
                { title: "Dressers", url: "/products/search" },
                { title: "Nightstands", url: "/products/search" },
                { title: "Wardrobes", url: "/products/search" },
                { title: "Office", url: "/products/search" },
                { title: "Desks", url: "/products/search" },
                { title: "Office Chairs", url: "/products/search" },
                { title: "Bookcases", url: "/products/search" },
                { title: "Outdoor", url: "/products/search" },
                { title: "Patio Sets", url: "/products/search" },
                { title: "Outdoor Chairs", url: "/products/search" },
                { title: "Garden Storage", url: "/products/search" },
              ],
            },
            {
              title: "Home Decor",
              child: [
                { title: "Lighting", url: "/products/search" },
                { title: "Lamps", url: "/products/search" },
                { title: "Ceiling Lights", url: "/products/search" },
                { title: "Wall Lights", url: "/products/search" },
                { title: "Rugs", url: "/products/search" },
                { title: "Wall Art", url: "/products/search" },
                { title: "Clocks", url: "/products/search" },
                { title: "Mirrors", url: "/products/search" },
              ],
            },
            {
              title: "Kitchen & Dining",
              child: [
                { title: "Cookware", url: "/products/search" },
                { title: "Pots & Pans", url: "/products/search" },
                { title: "Bakeware", url: "/products/search" },
                { title: "Tableware", url: "/products/search" },
                { title: "Dinner Sets", url: "/products/search" },
                { title: "Glassware", url: "/products/search" },
                { title: "Cutlery", url: "/products/search" },
                { title: "Kitchen Storage", url: "/products/search" },
                { title: "Containers", url: "/products/search" },
                { title: "Racks & Holders", url: "/products/search" },
                { title: "Small Appliances", url: "/products/search" },
                { title: "Toasters", url: "/products/search" },
                { title: "Blenders", url: "/products/search" },
                { title: "Coffee Makers", url: "/products/search" },
              ],
            },
            {
              title: "Large Appliances",
              child: [
                { title: "Refrigerators", url: "/products/search" },
                { title: "Washing Machines", url: "/products/search" },
                { title: "Ovens", url: "/products/search" },
                { title: "Dishwashers", url: "/products/search" },
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
                { title: "Skincare", url: "/products/search" },
                { title: "Moisturizers", url: "/products/search" },
                { title: "Cleansers", url: "/products/search" },
                { title: "Serums", url: "/products/search" },
                { title: "Masks", url: "/products/search" },
                { title: "Haircare", url: "/products/search" },
                { title: "Shampoos", url: "/products/search" },
                { title: "Conditioners", url: "/products/search" },
                { title: "Hair Treatments", url: "/products/search" },
                { title: "Styling Tools", url: "/products/search" },
                { title: "Makeup", url: "/products/search" },
                { title: "Foundations", url: "/products/search" },
                { title: "Lipsticks", url: "/products/search" },
                { title: "Eyeshadows", url: "/products/search" },
                { title: "Mascaras", url: "/products/search" },
                { title: "Blushes", url: "/products/search" },
                { title: "Makeup Tools", url: "/products/search" },
                { title: "Concealers", url: "/products/search" },
                { title: "Powders", url: "/products/search" },
                { title: "Eyeliners", url: "/products/search" },
                { title: "Brow Products", url: "/products/search" },
                { title: "Fragrances", url: "/products/search" },
                { title: "Perfumes", url: "/products/search" },
                { title: "Body Sprays", url: "/products/search" },
              ],
            },
            {
              title: "Health & Wellness",
              child: [
                { title: "Vitamins & Supplements", url: "/products/search" },
                { title: "Medical Equipment", url: "/products/search" },
                { title: "Fitness Equipment", url: "/products/search" },
                { title: "Health Monitors", url: "/products/search" },
              ],
            },
            {
              title: "Personal Care",
              child: [
                { title: "Oral Care", url: "/products/search" },
                { title: "Toothbrushes", url: "/products/search" },
                { title: "Toothpaste", url: "/products/search" },
                { title: "Bath & Body", url: "/products/search" },
                { title: "Body Wash", url: "/products/search" },
                { title: "Lotions", url: "/products/search" },
                { title: "Hand Sanitizers", url: "/products/search" },
                { title: "Shaving & Hair Removal", url: "/products/search" },
                { title: "Razors", url: "/products/search" },
                { title: "Shaving Cream", url: "/products/search" },
                { title: "Hair Removal Devices", url: "/products/search" },
              ],
            },
            {
              title: "Pet Supplies",
              child: [
                { title: "Dog Supplies", url: "/products/search" },
                { title: "Dog Food", url: "/products/search" },
                { title: "Cat Supplies", url: "/products/search" },
                { title: "Cat Food", url: "/products/search" },
                { title: "Fish & Aquatic Pets", url: "/products/search" },
                { title: "Small Animals", url: "/products/search" },
                { title: "Birds", url: "/products/search" },
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
                { title: "Diapers", url: "/products/search" },
                { title: "Disposable Diapers", url: "/products/search" },
                { title: "Cloth Diapers", url: "/products/search" },
                { title: "Feeding", url: "/products/search" },
                { title: "Bottles", url: "/products/search" },
                { title: "Breastfeeding Accessories", url: "/products/search" },
                { title: "Baby Gear", url: "/products/search" },
                { title: "Strollers", url: "/products/search" },
                { title: "Car Seats", url: "/products/search" },
                { title: "Carriers", url: "/products/search" },
                { title: "Nursery", url: "/products/search" },
                { title: "Cribs", url: "/products/search" },
                { title: "Changing Tables", url: "/products/search" },
                { title: "Baby Monitors", url: "/products/search" },
              ],
            },
            {
              title: "Toys",
              child: [
                { title: "Educational", url: "/products/search" },
                { title: "Learning Toys", url: "/products/search" },
                { title: "STEM Toys", url: "/products/search" },
                { title: "Action Figures", url: "/products/search" },
                { title: "Dolls & Accessories", url: "/products/search" },
                { title: "Outdoor Play", url: "/products/search" },
                { title: "Playhouses", url: "/products/search" },
                { title: "Slides", url: "/products/search" },
                { title: "Swings", url: "/products/search" },
              ],
            },
            {
              title: "Kids Clothing",
              child: [
                { title: "Girls", url: "/products/search" },
                { title: "Boys", url: "/products/search" },
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
                { title: "Fruits", url: "/products/search" },
                { title: "Vegetables", url: "/products/search" },
              ],
            },
            {
              title: "Pantry Staples",
              child: [
                { title: "Snacks", url: "/products/search" },
                { title: "Beverages", url: "/products/search" },
                { title: "Tea", url: "/products/search" },
                { title: "Coffee", url: "/products/search" },
                { title: "Soft Drinks", url: "/products/search" },
                { title: "Baking", url: "/products/search" },
                { title: "Flour", url: "/products/search" },
                { title: "Sugar", url: "/products/search" },
                { title: "Baking Mixes", url: "/products/search" },
              ],
            },
            {
              title: "Meat & Seafood",
              child: [
                { title: "Fresh Meat", url: "/products/search" },
                { title: "Seafood", url: "/products/search" },
              ],
            },
            {
              title: "Dairy",
              child: [
                { title: "Milk", url: "/products/search" },
                { title: "Cheese", url: "/products/search" },
                { title: "Eggs", url: "/products/search" },
              ],
            },
            {
              title: "Frozen Foods",
              child: [
                { title: "Vegetables", url: "/products/search" },
                { title: "Meats", url: "/products/search" },
                { title: "Desserts", url: "/products/search" },
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
                { title: "Cardio Machines", url: "/products/search" },
                { title: "Treadmills", url: "/products/search" },
                { title: "Exercise Bikes", url: "/products/search" },
                { title: "Strength Training", url: "/products/search" },
                { title: "Dumbbells", url: "/products/search" },
                { title: "Weight Benches", url: "/products/search" },
                { title: "Fitness Accessories", url: "/products/search" },
                { title: "Yoga Mats", url: "/products/search" },
                { title: "Resistance Bands", url: "/products/search" },
              ],
            },
            {
              title: "Outdoor Recreation",
              child: [
                { title: "Camping", url: "/products/search" },
                { title: "Tents", url: "/products/search" },
                { title: "Sleeping Bags", url: "/products/search" },
                { title: "Backpacks", url: "/products/search" },
                { title: "Hiking", url: "/products/search" },
                { title: "Boots", url: "/products/search" },
                { title: "Poles", url: "/products/search" },
                { title: "Gear", url: "/products/search" },
                { title: "Water Sports", url: "/products/search" },
                { title: "Kayaks", url: "/products/search" },
                { title: "Life Jackets", url: "/products/search" },
              ],
            },
            {
              title: "Team Sports",
              child: [
                { title: "Soccer", url: "/products/search" },
                { title: "Balls", url: "/products/search" },
                { title: "Apparel", url: "/products/search" },
                { title: "Basketball", url: "/products/search" },
                { title: "Shoes", url: "/products/search" },
                { title: "Tennis", url: "/products/search" },
                { title: "Rackets", url: "/products/search" },
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
                { title: "Car Electronics", url: "/products/search" },
                { title: "GPS", url: "/products/search" },
                { title: "Stereos", url: "/products/search" },
                { title: "Tools & Equipment", url: "/products/search" },
                { title: "Wrenches", url: "/products/search" },
                { title: "Jacks", url: "/products/search" },
                { title: "Replacement Parts", url: "/products/search" },
                { title: "Brakes", url: "/products/search" },
                { title: "Batteries", url: "/products/search" },
                { title: "Interior Accessories", url: "/products/search" },
                { title: "Seat Covers", url: "/products/search" },
                { title: "Floor Mats", url: "/products/search" },
                { title: "Exterior Accessories", url: "/products/search" },
                { title: "Car Covers", url: "/products/search" },
                { title: "Bike Racks", url: "/products/search" },
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
                { title: "Wheelchairs", url: "/products/search" },
                { title: "Walkers", url: "/products/search" },
                { title: "Canes", url: "/products/search" },
                { title: "Mobility Scooters", url: "/products/search" },
              ],
            },
            {
              title: "Daily Living Aids",
              child: [
                { title: "Dressing Aids", url: "/products/search" },
                { title: "Eating Aids", url: "/products/search" },
                { title: "Bathing Aids", url: "/products/search" },
                { title: "Communication Aids", url: "/products/search" },
              ],
            },
            {
              title: "Accessibility Equipment",
              child: [
                { title: "Ramps", url: "/products/search" },
                { title: "Lifts", url: "/products/search" },
                { title: "Accessible Furniture", url: "/products/search" },
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
                { title: "Dresses", url: "/products/search" },
                { title: "Tops", url: "/products/search" },
                { title: "Bottoms", url: "/products/search" },
              ],
            },
            {
              title: "Prenatal Care",
              child: [
                { title: "Vitamins", url: "/products/search" },
                { title: "Support Bands", url: "/products/search" },
                { title: "Pregnancy Pillows", url: "/products/search" },
                { title: "Skincare", url: "/products/search" },
              ],
            },
            {
              title: "Baby Essentials",
              child: [
                { title: "Clothing", url: "/products/search" },
                { title: "Diapers", url: "/products/search" },
                { title: "Feeding", url: "/products/search" },
                { title: "Nursery", url: "/products/search" },
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
                { title: "Supplements", url: "/products/search" },
                { title: "Monitors", url: "/products/search" },
                { title: "Mobility Aids", url: "/products/search" },
                { title: "Vision & Hearing Aids", url: "/products/search" },
              ],
            },
            {
              title: "Comfort & Care",
              child: [
                { title: "Recliners", url: "/products/search" },
                { title: "Cushions", url: "/products/search" },
                { title: "Adjustable Beds", url: "/products/search" },
                { title: "Daily Living Aids", url: "/products/search" },
              ],
            },
            {
              title: "Recreation & Leisure",
              child: [
                { title: "Puzzles", url: "/products/search" },
                { title: "Books", url: "/products/search" },
              ],
            },
          ],
        },
  
      ]
    }, 
  
];

export default CATEGORIES_DATA 