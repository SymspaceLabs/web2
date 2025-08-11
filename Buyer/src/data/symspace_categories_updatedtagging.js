const CATEGORIES_DATA = [
  {
    title: "Categories",
    child: [
      {
        title: "Clothing, Shoes & Accessories", //Category
        child: [
          {
            title: "Dresses", //subcategory
            child: [
              { title: "Casual Dresses", slug: "casual-dresses", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Formal Dresses", slug: "formal-dresses", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Summer Dresses", slug: "summer-dresses", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern","season"], tag_defaults: { ar_type: "body-tracking", gender: "women", season: "summer" } }, //subcategoryitems
            ],
          },
          {
            title: "Tops", //subcategory
            child: [
              { title: "Blouses", slug: "blouses", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "T-Shirts", slug: "t-shirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Sweaters", slug: "sweaters", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Cardigans", slug: "cardigans", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Casual Shirts", slug: "casual-shirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Dress Shirts", slug: "dress-shirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Polo Shirts", slug: "polo-shirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
            ],
          },
          {
            title: "Bottoms", //subcategory
            child: [
              { title: "Jeans", slug: "jeans", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Shorts", slug: "shorts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Skirts", slug: "skirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women"  } }, //subcategoryitems
              { title: "Pants", slug: "pants", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" }, //subcategoryitems
                child: [
                  { title: "Dress Pants", slug: "dress-pants", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                  { title: "Chinos", slug: "chinos", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                  { title: "Joggers", slug: "joggers", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                  { title: "Cargos", slug: "cargos", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                ]
              }, //subcategoryitems
            ],
          },
          {
            title: "Outerwear", //subcategory
            child: [
              { title: "Jackets", slug: "jackets", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Coats", slug: "coats", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Blazers", slug: "blazers", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Vests", slug: "vests", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Hoodies", slug: "hoodies", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Suits", slug: "suits", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
            ],
          },
          {
            title: "Activewear", //subcategory
            child: [
              { title: "Leggings", slug: "leggings", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Sport Bras", slug: "sport-bras", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Track Pants", slug: "track-pants", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Workout Tops", slug: "workout-tops", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Yoga Pants", slug: "yoga-pants", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Sports Shorts", slug: "sports-shorts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Joggers", slug: "joggers", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Sweatshirts", slug: "sweatshirts", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
              { title: "Compression Wear", slug: "compression-wear", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
            ],
          },
          {
            title: "Eyewear", //subcategory
            child: [
              { title: "Prescription Glasses", slug: "prescription-glasses", tags_required: ["ar_type","age_group","gender","material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Sunglasses", slug: "sunglasses", tags_required: ["ar_type","age_group","gender","material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Blue Light Glasses", slug: "blue-light-glasses", tags_required: ["ar_type","age_group","gender","material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Kids' Eyewear", slug: "kids-eyewear", tags_required: ["ar_type","age_group","gender","material"], optional_tags: ["frame_shape"], tag_defaults: { ar_type: "face-tracking", age_group: "kids" } }, //subcategoryitems
            ],
          },
          {
            title: "Intimates", //subcategory
            child: [
              { title: "Bras", slug: "bras", tags_required: ["ar_type","age_group","gender","season","material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Panties", slug: "panties", tags_required: ["ar_type","age_group","gender","season","material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "women" } }, //subcategoryitems
              { title: "Boxers", slug: "boxers", tags_required: ["ar_type","age_group","gender","season","material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } }, //subcategoryitems
              { title: "Briefs", slug: "briefs", tags_required: ["ar_type","age_group","gender","season","material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking", gender: "men" } }, //subcategoryitems
              { title: "Sleepwear", slug: "sleepwear", tags_required: ["ar_type","age_group","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
            ],
          },
          {
            title: "Shoes", //subcategory
            child: [
              { title: "Sandals", slug: "sandals", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Flats", slug: "flats", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Heels", slug: "heels", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking", gender: "women" } }, //subcategoryitems
              { title: "Boots", slug: "boots", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Sneakers", slug: "sneakers", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Athletic Shoes", slug: "athletic-shoes", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Formal Shoes", slug: "formal-shoes", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
              { title: "Casual Shoes", slug: "casual-shoes", tags_required: ["ar_type","age_group","gender","season","occasion","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
            ],
          },
          {
            title: "Accessories", //subcategory
            child: [
              {
                title: "Bags", //subcategoryitems
                child: [
                  { title: "Handbags", slug: "handbags", tags_required: ["ar_type","gender","material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static"} }, //subcategoryitem_child
                  { title: "Backpacks", slug: "backpacks", tags_required: ["ar_type","gender","material", "indoor_outdoor"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Crossbody Bags", slug: "crossbody-bags", tags_required: ["ar_type","gender","material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Shoulder Bags", slug: "shoulder-bags", tags_required: ["ar_type","gender","material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Tote Bags", slug: "tote-bags", tags_required: ["ar_type","gender","material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Clutches", slug: "clutches", tags_required: ["ar_type","gender","material"], optional_tags: ["indoor_outdoor"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Jewelry & Watches", //subcategoryitems
                child: [
                  { title: "Earrings", slug: "earrings", tags_required: ["ar_type","gender","material","safety_certified"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Necklaces", slug: "necklaces", tags_required: ["ar_type","gender","material","safety_certified"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Rings", slug: "rings", tags_required: ["ar_type","gender","material","safety_certified"], optional_tags: ["gemstone"], tag_defaults: { ar_type: "hand-tracking" } }, //subcategoryitem_child
                  { title: "Bracelets", slug: "bracelets", tags_required: ["ar_type","gender","material","safety_certified"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Plated Jewelry", slug: "plated-jewelry", tags_required: ["ar_type","gender","material","safety_certified"], tag_defaults: { ar_type: "hand-tracking" } }, //subcategoryitem_child
                  { title: "Men's Watches", slug: "mens-watches", tags_required: ["ar_type","gender","material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "men" } }, //subcategoryitem_child
                  { title: "Women's Watches", slug: "womens-watches", tags_required: ["ar_type","gender","material"], optional_tags: ["color"], tag_defaults: { ar_type: "hand-tracking", gender: "women" } }, //subcategoryitem_child
                  { title: "Smartwatches", slug: "smartwatches", tags_required: ["ar_type","gender","material"], tag_defaults: { ar_type: "hand-tracking" } }, //subcategoryitem_child
                  { title: "Watch Bands & Accessories", slug: "watch-bands-accessories", tags_required: ["ar_type","gender","material"], tag_defaults: { ar_type: "hand-tracking" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Headwear", //subcategoryitems
                child: [
                  { title: "Hats", slug: "hats", tags_required: ["ar_type","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Caps", slug: "caps", tags_required: ["ar_type","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Beanies", slug: "beanies", tags_required: ["ar_type","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Seasonal Accessories", //subcategoryitems
                child: [
                  { title: "Gloves", slug: "gloves", tags_required: ["ar_type","gender","season","material","safety_certified"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "hand-tracking" } }, //subcategoryitem_child
                  { title: "Scarves", slug: "scarves", tags_required: ["ar_type","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Socks", slug: "socks", tags_required: ["ar_type","gender","season","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitem_child
                  { title: "Ties", slug: "ties", tags_required: ["ar_type","gender","material"], optional_tags: ["color","pattern"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Wallets & Belts", //subcategoryitems
                child: [
                  { title: "Wallets", slug: "wallets", tags_required: ["ar_type","gender","material"], optional_tags: ["color"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Belts", slug: "belts", tags_required: ["ar_type","gender","material"], optional_tags: ["color"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitem_child
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Electronics", //Category
        child: [
          {
            title: "Mobile Phones & Accessories", //subcategory
            child: [
              { title: "Smartphones", slug: "smartphones", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["brand"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Cases & Covers", slug: "cases-&-covers", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Screen Protectors", slug: "screen-protectors", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Chargers & Cables", slug: "chargers-&-cables", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Power Banks", slug: "power-banks", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
            ],
          },
          {
            title: "Computers & Accessories", //subcategory
            child: [
              { title: "Laptops", slug: "laptops", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["brand"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Desktops", slug: "desktops", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Monitors", slug: "monitors", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Keyboards & Mice", slug: "keyboards-&-mice", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Printers & Scanners", slug: "printers-&-scanners", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
            ],
          },
          {
            title: "Home Entertainment", //subcategory
            child: [
              { title: "Televisions", slug: "televisions", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Sound Systems", slug: "sound-systems", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Streaming Devices", slug: "streaming-devices", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Blu-ray & DVD Players", slug: "blu-ray-&-dvd-players", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
            ],
          },
          {
            title: "Cameras & Photography", //subcategory
            child: [
              { title: "Digital Cameras", slug: "digital-cameras", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Lenses", slug: "lenses", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Tripods", slug: "tripods", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Camera Accessories", slug: "camera-accessories", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
            ],
          },
          {
            title: "Smart Home Devices", //subcategory
            child: [
              { title: "Smart Lights", slug: "smart-lights", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Smart Speakers", slug: "smart-speakers", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Security Cameras", slug: "security-cameras", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Smart Plugs & Switches", slug: "smart-plugs-switches", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
              { title: "Smart Thermostats", slug: "smart-thermostats", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
            ],
          },
        ],
      },
      {
        title: "Home, Furniture & Appliances", //Category
        child: [
          {
            title: "Furniture", //subcategory
            child: [
              {
                title: "Sofas", //subcategoryitems
                child: [
                  { title: "Sectional Sofas", slug: "sectional-sofas", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: false } }, //subcategoryitem_child
                  { title: "Loveseats", slug: "loveseats", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: false } }, //subcategoryitem_child
                  { title: "Recliners", slug: "recliners", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: true } }, //subcategoryitem_child
                  { title: "Chesterfields", slug: "chesterfields", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Sleeper Sofas", slug: "sleeper-sofas", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Modular Sofas", slug: "modular-sofas", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Chairs & Seating", //subcategoryitems
                child: [
                  { title: "Accent Chairs", slug: "accent-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Armchairs", slug: "armchairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Club Chairs", slug: "club-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Ottomans & Poufs", slug: "ottomans-poufs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Tables", //subcategoryitems
                child: [
                  { title: "Coffee Tables", slug: "coffee-tables", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "End Tables", slug: "end-tables", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Console Tables", slug: "console-tables", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Media & Storage", //subcategoryitems
                child: [
                  { title: "TV Stands", slug: "tv-stands", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Bookcases", slug: "bookcases", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Storage Cabinets", slug: "storage-cabinets", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
            ],
          },
          {
            title: "Bedroom", //subcategory
            child: [
              {
                title: "Beds", //subcategoryitems
                child: [
                  { title: "Platform Beds", slug: "platform-beds", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: false } }, //subcategoryitem_child
                  { title: "Upholstered Beds", slug: "upholstered-beds", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: false } }, //subcategoryitem_child
                  { title: "Canopy Beds", slug: "canopy-beds", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Storage Beds", slug: "storage-beds", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Adjustable Beds", slug: "adjustable-beds", tags_required: ["ar_type","indoor_outdoor","material","accessible"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor", accessible: true } }, //subcategoryitem_child
                ],
              },
              {
                title: "Dressers & Chests", //subcategoryitems
                child: [
                  { title: "6-Drawer Dressers", slug: "6-drawer-dressers", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Chests of Drawers", slug: "chests-of-drawers", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Nightstands & Side Tables", //subcategoryitems
                child: [
                  { title: "Single Drawer Nightstands", slug: "single-drawer-nightstands", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Double Drawer Nightstands", slug: "double-drawer-nightstands", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Wardrobes & Armoires", //subcategoryitems
                child: [
                  { title: "2-Door Wardrobes", slug: "2-door-wardrobes", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Sliding Door Wardrobes", slug: "sliding-door-wardrobes", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
            ],
          },
          {
            title: "Office", //subcategory
            child: [
              {
                title: "Desks", //subcategoryitems
                child: [
                  { title: "Writing Desks", slug: "writing-desks", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Standing Desks", slug: "standing-desks", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Executive Desks", slug: "executive-desks", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Office Chairs", //subcategoryitems
                child: [
                  { title: "Ergonomic Chairs", slug: "ergonomic-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Task Chairs", slug: "task-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Executive Chairs", slug: "executive-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Storage", //subcategoryitems
                child: [
                  { title: "Filing Cabinets", slug: "filing-cabinets", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
                  { title: "Bookcases & Shelving", slug: "office-bookcases-shelving", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitems
                ],
              },
            ],
          },
          {
            title: "Outdoor", //subcategory
            child: [
              {
                title: "Seating Sets", //subcategoryitems
                child: [
                  { title: "Patio Sets", slug: "patio-sets", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Sling Chairs", slug: "sling-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Chaise Lounges", slug: "chaise-lounges", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Adirondack Chairs", slug: "adirondack-chairs", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Tables", //subcategoryitems
                child: [
                  { title: "Dining Tables", slug: "dining-tables", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Bistro Tables", slug: "bistro-tables", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Shade & Shelter", //subcategoryitems
                child: [
                  { title: "Umbrellas", slug: "umbrellas", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Gazebos", slug: "gazebos", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Storage", //subcategoryitems
                child: [
                  { title: "Deck Boxes", slug: "deck-boxes", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Garden Sheds", slug: "garden-sheds", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                ],
              },
            ],
          },
          {
            title: "Home Decor", //subcategory
            child: [
              {
                title: "Lighting", //subcategoryitems
                child: [
                  { title: "Ceiling Fixtures", slug: "ceiling-fixtures", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Wall Sconces", slug: "wall-sconces", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Table Lamps", slug: "table-lamps", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Floor Lamps", slug: "floor-lamps", tags_required: ["ar_type","indoor_outdoor","material"], optional_tags: ["style"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Wall Art & Mirrors", //subcategoryitems
                child: [
                  { title: "Paintings", slug: "paintings", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Sculptures", slug: "sculptures", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Mirrors", slug: "mirrors", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Kitchen & Dining", //subcategoryitems
                child: [
                  { title: "Cookware", slug: "cookware", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Dinnerware", slug: "dinnerware", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Appliances", slug: "appliances", tags_required: ["ar_type","indoor_outdoor","material"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Storage Containers", slug: "storage-containers", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ],
              },
            ],
          },
        ],
      },
      // Beauty, Health & Pets
      {
        title: "Beauty, Health & Pets", //Category
        child: [
          {
            title: "Skincare", //subcategory
            child: [
              { title: "Cleansers", slug: "cleansers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Moisturizers", slug: "moisturizers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Serums", slug: "serums", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Masks", slug: "masks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Toners", slug: "toners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Eye Creams", slug: "eye-creams", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Sunscreens (SPF)", slug: "sunscreens", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Acne Treatments", slug: "acne-treatments", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
              { title: "Anti-Aging Treatments", slug: "anti-aging-treatments", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } } //subcategoryitems
            ]
          },
          {
            title: "Skincare Tools", //subcategory
            child: [
              { title: "Rollers", slug: "rollers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Facial Brushes", slug: "facial-brushes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "LED Devices", slug: "led-devices", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitems
            ]
          },
          {
            title: "Makeup", //subcategory
            child: [
              {
                title: "Face", //subcategoryitems
                child: [
                  { title: "Foundations", slug: "foundations", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Concealers", slug: "concealers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Powders", slug: "powders", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Blushes & Highlighters", slug: "blushes-&-highlighters", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } } //subcategoryitem_child
                ]
              },
              {
                title: "Eyes", //subcategoryitems
                child: [
                  { title: "Eyeshadows", slug: "eyeshadows", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Mascaras", slug: "mascaras", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Eyeliners & Brow Products", slug: "eyeliners-&-brow-products", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } } //subcategoryitem_child
                ]
              },
              {
                title: "Lips", //subcategoryitems
                child: [
                  { title: "Lipsticks", slug: "lipsticks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Lip Glosses", slug: "lip-glosses", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitem_child
                  { title: "Lip Liners", slug: "lip-liners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "face-tracking" } } //subcategoryitem_child
                ]
              },
              {
                title: "Makeup Tools & Removers", //subcategoryitems
                child: [
                  { title: "Brushes & Sponges", slug: "brushes-&-sponges", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Makeup Removers", slug: "makeup-removers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              }
            ]
          },
          {
            title: "Personal Care", //subcategory
            child: [
              {
                title: "Haircare", //subcategoryitems
                child: [
                  { title: "Shampoos & Conditioners", slug: "shampoos-&-conditioners", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Hair Treatments & Masks", slug: "hair-treatments-&-masks", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Styling Tools", slug: "styling-tools", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              },
              {
                title: "Bath & Body", //subcategoryitems
                child: [
                  { title: "Body Washes", slug: "body-washes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Body Lotions & Scrubs", slug: "body-lotions-&-scrubs", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              },
              {
                title: "Shaving & Hair Removal", //subcategoryitems
                child: [
                  { title: "Razors & Shaving Creams", slug: "razors-&-shaving-creams", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Hair Removal Devices", slug: "hair-removal-devices", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              },
              {
                title: "Fragrances & Scents", //subcategoryitems
                child: [
                  { title: "Perfumes", slug: "perfumes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Body Sprays", slug: "body-sprays", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Deodorant", slug: "deodorant", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              },
              {
                title: "Oral Care & Hygiene", //subcategoryitems
                child: [
                  { title: "Toothbrushes & Pastes", slug: "toothbrushes-&-pastes", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Hygiene Essentials", slug: "hygiene-essentials", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              }
            ]
          },
          {
            title: "Pet Supplies", //subcategory
            child: [
              {
                title: "Dogs", //subcategoryitems
                child: [
                  { title: "Food & Treats", slug: "dog-food-treats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Leashes", slug: "dog-leashes", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitem_child
                  { title: "Beds & Furniture", slug: "dog-beds-furniture", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } } //subcategoryitem_child
                ]
              },
              {
                title: "Cats", //subcategoryitems
                child: [
                  { title: "Food & Treats", slug: "cat-food-treats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Toys", slug: "cat-toys", tags_required: ["ar_type","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Furniture", slug: "cat-furniture", tags_required: ["ar_type","material","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "indoor" } }, //subcategoryitem_child
                  { title: "Litter", slug: "cat-litter", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } } //subcategoryitem_child
                ]
              },
              { title: "Fish & Aquatic Pets", slug: "fish-aquatic-pets", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Small Animals", slug: "small-animals", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Birds", slug: "birds", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } } //subcategoryitems
            ]
          }
        ]
      },
     
      
      {
        title: "Baby, Kids & Toys", //Category
        child: [
          {
            title: "Baby", //subcategory
            child: [
              { title: "Diapers", slug: "diapers", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Disposable Diapers", slug: "disposable-diapers", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Cloth Diapers", slug: "cloth-diapers", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Feeding", slug: "feeding", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Bottles", slug: "bottles", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Breastfeeding Accessories", slug: "breastfeeding-accessories", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Baby Gear", slug: "baby-gear", tags_required: ["ar_type","age_group","gender","safety_certified","accessible"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Strollers", slug: "strollers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Car Seats", slug: "car-seats", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Carriers", slug: "carriers", tags_required: ["ar_type","age_group","gender"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
              { title: "Nursery", slug: "nursery", tags_required: ["ar_type","material","accessible"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Cribs", slug: "cribs", tags_required: ["ar_type","material","accessible"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Changing Tables", slug: "changing-tables", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Baby Monitors", slug: "baby-monitors", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Baby Proofing", slug: "baby-proofing", tags_required: ["ar_type","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
          {
            title: "Toys", //subcategory
            child: [
              { title: "Educational", slug: "educational", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Learning", slug: "learning", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "STEM", slug: "stem", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Action Figures", slug: "action-figures", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Dolls & Accessories", slug: "dolls-&-accessories", tags_required: ["ar_type","age_group","gender","safety_certified"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Outdoor", slug: "outdoor", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
              { title: "Playhouses", slug: "playhouses", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
              { title: "Slides", slug: "slides", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
              { title: "Swings", slug: "swings", tags_required: ["ar_type","age_group","gender","safety_certified","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
            ],
          },
          {
            title: "Kids Clothing", //subcategory
            child: [
              { title: "Girls", slug: "girls", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "kids", gender: "women" } }, //subcategoryitems
              { title: "Boys", slug: "boys", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "kids", gender: "men" } }, //subcategoryitems
            ],
          },
        ],
      },
      {
        title: "Recipes", //Category
        child: [
          {
            title: "Trending Weeknight Dinners", //subcategory
            child: [
              { title: "Chicken Alfredo", slug: "chicken-alfredo", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Chicken Tacos", slug: "chicken-tacos", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Fried Rice (Chicken/Vegetable)", slug: "fried-rice", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Baked Salmon", slug: "baked-salmon", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Stir-Fry Noodles (Lo Mein/Chow Mein)", slug: "stir-fry-noodles", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Shrimp Scampi", slug: "shrimp-scampi", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
          {
            title: "Comfort Classics", //subcategory
            child: [
              { title: "Lasagna", slug: "lasagna", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Spaghetti Bolognese", slug: "spaghetti-bolognese", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Beef Chili", slug: "beef-chili", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Mac & Cheese", slug: "mac-and-cheese", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Beef Stew", slug: "beef-stew", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Chicken Parmesan", slug: "chicken-parmesan", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
          {
            title: "Breakfast & Brunch", //subcategory
            child: [
              { title: "Pancakes", slug: "pancakes", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "French Toast", slug: "french-toast", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Omelette", slug: "omelette", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Breakfast Burritos", slug: "breakfast-burritos", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Avocado Toast with Eggs", slug: "avocado-toast-eggs", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
          {
            title: "Baking & Desserts", //subcategory
            child: [
              { title: "Chocolate Chip Cookies", slug: "chocolate-chip-cookies", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Brownies", slug: "brownies", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Banana Bread", slug: "banana-bread", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Cheesecake", slug: "cheesecake", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Cupcakes", slug: "cupcakes", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
          {
            title: "Global Favorites", //subcategory
            child: [
              {
                title: "Italian", //subcategory
                child: [
                  { title: "Carbonara", slug: "carbonara", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Margherita Pizza", slug: "margherita-pizza", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Mexican", //subcategory
                child: [
                  { title: "Tacos al Pastor", slug: "tacos-al-pastor", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Chicken Enchiladas", slug: "chicken-enchiladas", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Indian", //subcategory
                child: [
                  { title: "Butter Chicken", slug: "butter-chicken", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Chana Masala", slug: "chana-masala", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Chinese", //subcategory
                child: [
                  { title: "Kung Pao Chicken", slug: "kung-pao-chicken", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Mapo Tofu", slug: "mapo-tofu", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Japanese", //subcategory
                child: [
                  { title: "Chicken Teriyaki", slug: "chicken-teriyaki", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Katsu Curry", slug: "katsu-curry", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Thai", //subcategory
                child: [
                  { title: "Pad Thai", slug: "pad-thai", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Green Curry", slug: "green-curry", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Mediterranean", //subcategory
                child: [
                  { title: "Greek Salad + Chicken", slug: "greek-chicken-salad", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Shakshuka", slug: "shakshuka", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
            ],
          },
          {
            title: "Appliance-Guided", //subcategory
            child: [
              {
                title: "Air Fryer", //subcategory
                child: [
                  { title: "Air Fryer Chicken Wings", slug: "air-fryer-chicken-wings", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Air Fryer Salmon", slug: "air-fryer-salmon", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Instant Pot / Pressure Cooker", //subcategory
                child: [
                  { title: "Instant Pot Beef Chili", slug: "instant-pot-beef-chili", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Instant Pot Butter Chicken", slug: "instant-pot-butter-chicken", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Oven & Sheet Pan", //subcategory
                child: [
                  { title: "Sheet-Pan Chicken & Veggies", slug: "sheet-pan-chicken-veggies", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Roasted Salmon & Potatoes", slug: "roasted-salmon-potatoes", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
              {
                title: "Stovetop & Wok", //subcategory
                child: [
                  { title: "Beef Stir-Fry", slug: "beef-stir-fry", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                  { title: "Fried Rice", slug: "fried-rice-stovetop", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
                ],
              },
            ],
          },
          {
            title: "Meal Prep & Bowls", //subcategory
            child: [
              { title: "Chicken Burrito Bowls", slug: "chicken-burrito-bowls", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Teriyaki Chicken Bowls", slug: "teriyaki-chicken-bowls", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Mediterranean Grain Bowls", slug: "mediterranean-grain-bowls", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
              { title: "Korean Beef Bowls", slug: "korean-beef-bowls", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Sports, Fitness & Outdoors", //Category
    child: [
      {
        title: "Fitness Equipment", //subcategory
        child: [
          { title: "Cardio Machines", slug: "cardio-machines", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Treadmills", slug: "treadmills", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Exercise Bikes", slug: "exercise-bikes", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Strength Training", slug: "strength-training", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Dumbbells", slug: "dumbbells", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Weight Benches", slug: "weight-benches", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Fitness Accessories", slug: "fitness-accessories", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Yoga Mats", slug: "yoga-mats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Resistance Bands", slug: "resistance-bands", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
      {
        title: "Outdoor Recreation", //subcategory
        child: [
          { title: "Camping", slug: "camping", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Tents", slug: "tents", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Sleeping Bags", slug: "sleeping-bags", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Hiking", slug: "hiking", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Poles", slug: "poles", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Gear", slug: "gear", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Water Sports", slug: "water-sports", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Kayaks", slug: "kayaks", tags_required: ["ar_type","indoor_outdoor"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor" } }, //subcategoryitems
          { title: "Life Jackets", slug: "life-jackets", tags_required: ["ar_type","indoor_outdoor","safety_certified"], tag_defaults: { ar_type: "static", indoor_outdoor: "outdoor", safety_certified: true } }, //subcategoryitems
        ],
      },
      {
        title: "Team Sports", //subcategory
        child: [
          { title: "Soccer", slug: "soccer", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Balls", slug: "balls", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Apparel", slug: "apparel", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking" } }, //subcategoryitems
          { title: "Basketball", slug: "basketball", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Shoes", slug: "shoes", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "feet-tracking" } }, //subcategoryitems
          { title: "Tennis", slug: "tennis", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Rackets", slug: "rackets", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
    ],
  },
  {
    title: "Automotive", //Category
    child: [
      {
        title: "Vehicle Parts & Accessories", //subcategory
        child: [
          { title: "Car Electronics", slug: "car-electronics", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "GPS", slug: "gps", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Stereos", slug: "stereos", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Tools & Equipment", slug: "tools-&-equipment", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Wrenches", slug: "wrenches", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Jacks", slug: "jacks", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Replacement Parts", slug: "replacement-parts", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Brakes", slug: "brakes", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Batteries", slug: "batteries", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Interior Accessories", slug: "interior-accessories", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Floor Mats", slug: "floor-mats", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Exterior Accessories", slug: "exterior-accessories", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Car Covers", slug: "car-covers", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Bike Racks", slug: "bike-racks", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          {
            title: "Auto Customization", //subcategory
            child: [
              { title: "Wheels & Rims", slug: "auto-wheels-rims", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
              { title: "Seat Covers", slug: "auto-seat-covers", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
              { title: "Wraps & Decals", slug: "auto-wraps-decals", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitem_child
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Special Needs & Accessibility", //Category
    child: [
      {
        title: "Mobility Aids", //subcategory
        child: [
          { title: "Wheelchairs", slug: "wheelchairs", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Walkers", slug: "walkers", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Canes", slug: "canes", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Mobility Scooters", slug: "mobility-scooters", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
        ],
      },
      {
        title: "Daily Living Aids", //subcategory
        child: [
          { title: "Dressing Aids", slug: "dressing-aids", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Eating Aids", slug: "eating-aids", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Bathing Aids", slug: "bathing-aids", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Communication Aids", slug: "communication-aids", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
        ],
      },
      {
        title: "Accessibility Equipment", //subcategory
        child: [
          { title: "Ramps", slug: "ramps", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Lifts", slug: "lifts", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
          { title: "Accessible Furniture", slug: "accessible-furniture", tags_required: ["ar_type","accessible"], tag_defaults: { ar_type: "static", accessible: true } }, //subcategoryitems
        ],
      },
      {
        title: "Eyecare & Vision Aids", //subcategory
        child: [
          { title: "Reading Glasses", slug: "reading-glasses", tags_required: ["ar_type"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
          { title: "Contact Lens Care", slug: "contact-lens-care", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Eye Drops & Treatments", slug: "eye-drops-treatments", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Blue Light Filters", slug: "blue-light-filters", tags_required: ["ar_type"], tag_defaults: { ar_type: "face-tracking" } }, //subcategoryitems
          { title: "Magnifiers & Low Vision Aids", slug: "magnifiers-low-vision-aids", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Eye Patches & Shields", slug: "eye-patches-shields", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
    ],
  },
  {
    title: "Maternity & Prenatal Care", //Category
    child: [
      {
        title: "Maternity Clothing", //subcategory
        child: [
          { title: "Dresses", slug: "dresses", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "adult", gender: "women" } }, //subcategoryitems
          { title: "Tops", slug: "tops", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "adult", gender: "women" } }, //subcategoryitems
          { title: "Bottoms", slug: "bottoms", tags_required: ["ar_type","age_group","gender","season","occasion","material"], tag_defaults: { ar_type: "body-tracking", age_group: "adult", gender: "women" } }, //subcategoryitems
        ],
      },
      {
        title: "Prenatal Care", //subcategory
        child: [
          { title: "Vitamins", slug: "vitamins", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Support Bands", slug: "support-bands", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
          { title: "Pregnancy Pillows", slug: "pregnancy-pillows", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
      {
        title: "Baby Essentials", //subcategory
        child: [
          { title: "Clothing", slug: "clothing", tags_required: ["ar_type","age_group","gender","material"], tag_defaults: { ar_type: "body-tracking", age_group: "baby" } }, //subcategoryitems
          { title: "Diapers", slug: "diapers", tags_required: ["ar_type","age_group","safety_certified"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
          { title: "Feeding", slug: "feeding", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "baby" } }, //subcategoryitems
          { title: "Nursery", slug: "nursery", tags_required: ["ar_type","material"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
    ],
  },
  {
    title: "Senior Care", //Category
    child: [
      {
        title: "Health & Wellness", //subcategory
        child: [
          { title: "Supplements", slug: "supplements", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "senior" } }, //subcategoryitems
          { title: "Monitors", slug: "monitors", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "senior" } }, //subcategoryitems
          { title: "Mobility Aids", slug: "mobility-aids", tags_required: ["ar_type","age_group","accessible","safety_certified"], tag_defaults: { ar_type: "static", age_group: "senior", accessible: true, safety_certified: true } }, //subcategoryitems
          { title: "Vision & Hearing", slug: "vision-&-hearing", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "senior" } }, //subcategoryitems
        ],
      },
      {
        title: "Comfort & Care", //subcategory
        child: [
          { title: "Recliners", slug: "recliners", tags_required: ["ar_type","age_group","accessible"], tag_defaults: { ar_type: "static", age_group: "senior", accessible: true } }, //subcategoryitems
          { title: "Cushions", slug: "cushions", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "senior" } }, //subcategoryitems
          { title: "Adjustable Beds", slug: "adjustable-beds", tags_required: ["ar_type","age_group","accessible"], tag_defaults: { ar_type: "static", age_group: "senior", accessible: true } }, //subcategoryitems
          { title: "Daily Living Aids", slug: "daily-living-aids", tags_required: ["ar_type","age_group","accessible"], tag_defaults: { ar_type: "static", age_group: "senior", accessible: true } }, //subcategoryitems
        ],
      },
      {
        title: "Recreation & Leisure", //subcategory
        child: [
          { title: "Puzzles", slug: "puzzles", tags_required: ["ar_type","age_group"], tag_defaults: { ar_type: "static", age_group: "senior" } }, //subcategoryitems
          { title: "Books", slug: "books", tags_required: ["ar_type"], tag_defaults: { ar_type: "static" } }, //subcategoryitems
        ],
      },
    ],
  },
];

export default CATEGORIES_DATA;
