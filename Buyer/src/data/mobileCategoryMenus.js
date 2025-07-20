// ==================================================================
//  Categories Menu used in
//  - mobile-categories
// ==================================================================

export const categoryMenus = [
    //Clothing, Shoes & Accessories
    {
        icon: 'ShirtLine',
        slug: "/fashion",
        title: "Clothing, Shoes & Accessories",
    
        children : [
            {
                title: "Dresses",
                href: "#",
                children: [
                    { title: "Casual Dresses", slug: "casual-dresses" },
                    { title: "Formal Dresses", slug: "formal-dresses" },
                    { title: "Summer Dresses", slug: "summer-dresses" }
                ]
            },
            {
                title: "Tops",
                href: "#",
                children: [
                    { title: "Blouses", slug: "blouses" },
                    { title: "T-Shirts", slug: "t-shirts" },
                    { title: "Sweaters", slug: "sweaters" },
                    { title: "Cardigans", slug: "cardigans" }
                ]
            },
            {
                title: "Shirts",
                href: "#",
                children: [
                    { title: "Casual Shirts", slug: "casual-shirts" },
                    { title: "Dress Shirts", slug: "dress-shirts" },
                    { title: "Polo Shirts", slug: "polo-shirts" }
                ]
            },
            {
                title: "Bottoms",
                href: "#",
                children: [
                    { title: "Jeans", slug: "jeans" },
                    { title: "Trousers", slug: "trousers" },
                    { title: "Shorts", slug: "shorts" },
                    { title: "Skirts", slug: "skirts" },
                    { title: "Pants", slug: "pants" }
                ]
            },
            {
                title: "Outerwear",
                href: "#",
                children: [
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
                href: "#",
                children: [
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
                href: "#",
                children: [
                    { title: "Lingerie", slug: "lingerie" },
                    { title: "Sleepwear", slug: "sleepwear" }
                ]
            },
            {
                title: "Shoes",
                href: "#",
                children: [
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
                href: "#",
                children: [
                    { title: "Handbags", slug: "handbags" },
                    { title: "Jewelry", slug: "jewelry" },
                    { title: "Watches", slug: "watches" },
                    { title: "Scarves", slug: "scarves" },
                    { title: "Ties", slug: "ties" },
                    { title: "Wallets", slug: "wallets" },
                    { title: "Backpacks", slug: "backpacks" }
                ]
            },
            {
                title: "Underwear & Socks",
                href: "#",
                children: [
                    { title: "Boxers", slug: "/products/search/shirt" },
                    { title: "Briefs", slug: "/products/search/t-shirt" },
                    { title: "Bras", slug: "/products/search/pant" },
                    { title: "Panties", slug: "/products/search/underwear" },
                    { title: "Sleepwear", slug: "/products/search/underwear" }
                ]
            }
        ]
    },

    //Electronics
    {
        icon: 'Laptop',
        slug: "/fashion",
        title: "Electronics",
        children: [
            {
                title: "Mobile Phones & Accessories",
                href: "#",
                children: [
                    { title: "Smartphones", slug: "smartphones" },
                    { title: "Cases & Covers", slug: "cases-and-covers" },
                    { title: "Screen Protectors", slug: "screen-protectors" },
                    { title: "Chargers & Cables", slug: "chargers-and-cables" },
                    { title: "Power Banks", slug: "power-banks" }
                ]
            },
            {
                title: "Computers & Accessories",
                href: "#",
                children: [
                    { title: "Laptops", slug: "laptops"},
                    { title: "Desktops", slug: "desktops"},
                    { title: "Monitors", slug: "monitors"},
                    { title: "Keyboards & Mice", slug: "keyboards-and-mice"},
                    { title: "Printers & Scanners", slug: "printers-and-scanners"}
            ]
            }, 
            {
                title: "Home Entertainment",
                href: "#",
                children: [
                    { title: "Televisions", slug: "televisions" },
                    { title: "Sound Systems", slug: "sound-systems" },
                    { title: "Streaming Devices", slug: "streaming-devices" },
                    { title: "Blu-ray & DVD Players", slug: "blu-ray-and-dvd-players" }
                ]
                
            }, 
            {
                title: "Cameras & Photography",
                href: "#",
                children: [
                    { title: "Digital Cameras", slug: "digital-cameras"},
                    { title: "Lenses", slug: "lenses"},
                    { title: "Tripods", slug: "tripods"},
                    { title: "Camera Accessories", slug: "camera-accessories"}
                ]
            }
        ]
    },

    //Home, Furniture & Appliances
    {
        icon: 'Sofa',
        title: "Home, Furniture & Appliances",
        children: [
            {
                title: "Furniture",
                href: "#",
                children: [
                    { title: "Living Room", slug: "living-room" },
                    { title: "Sofas", slug: "sofas" },
                    { title: "Coffee Tables", slug: "coffee-tables" },
                    { title: "TV Stands", slug: "tv-stands" },
                    { title: "Recliners", slug: "recliners" },
                    { title: "Bedroom", slug: "bedroom" },
                    { title: "Beds", slug: "beds" },
                    { title: "Dressers", slug: "dressers" },
                    { title: "Nightstands", slug: "nightstands" },
                    { title: "Wardrobes", slug: "wardrobes" },
                    { title: "Office", slug: "office" },
                    { title: "Desks", slug: "desks" },
                    { title: "Office Chairs", slug: "office-chairs" },
                    { title: "Bookcases", slug: "bookcases" },
                    { title: "Outdoor", slug: "outdoor" },
                    { title: "Patio Sets", slug: "patio-sets" },
                    { title: "Outdoor Chairs", slug: "outdoor-chairs" },
                    { title: "Garden Storage", slug: "garden-storage" }
                ]
            }, {
                title: "Home Decor",
                href: "#",
                children: [
                    { title: "Lighting", slug: "lighting" },
                    { title: "Lamps", slug: "lamps" },
                    { title: "Ceiling Lights", slug: "ceiling-lights" },
                    { title: "Wall Lights", slug: "wall-lights" },
                    { title: "Rugs", slug: "rugs" },
                    { title: "Wall Art", slug: "wall-art" },
                    { title: "Clocks", slug: "clocks" },
                    { title: "Mirrors", slug: "mirrors" },
                ]
            }, {
                title: "Kitchen & Dining",
                href: "#",
                children: [
                    { title: "Cookware", slug: "cookware" },
                    { title: "Pots & Pans", slug: "pots-pans" },
                    { title: "Bakeware", slug: "bakeware" },
                    { title: "Tableware", slug: "tableware" },
                    { title: "Dinner Sets", slug: "dinner-sets" },
                    { title: "Glassware", slug: "glassware" },
                    { title: "Cutlery", slug: "cutlery" },
                    { title: "Kitchen Storage", slug: "kitchen-storage" },
                    { title: "Containers", slug: "containers" },
                    { title: "Racks & Holders", slug: "racks-holders" },
                { title: "Small Appliances", slug: "small-appliances" },
                { title: "Toasters", slug: "toasters" },
                { title: "Blenders", slug: "blenders" },
                { title: "Coffee Makers", slug: "coffee-makers" },
            ]
            }, {
                title: "Large Appliances",
                href: "#",
                children: [
                    { title: "Refrigerators", slug: "refrigerators" },
                    { title: "Washing Machines", slug: "washing-machines" },
                    { title: "Ovens", slug: "ovens" },
                    { title: "Dishwashers", slug: "dishwashers" },
                ]
            },
        ]
    },

    //Health
    {
        icon: 'MakeUp',
        slug: "beauty-health-pets", // Updated slug based on "Beauty, Health & Pets"
        title: "Beauty, Health & Pets",
        children: [
            {
                title: "Beauty",
                href: "#",
                children: [
                    { title: "Skincare", slug: "skincare" },
                    { title: "Moisturizers", slug: "moisturizers" },
                    { title: "Cleansers", slug: "cleansers" },
                    { title: "Serums", slug: "serums" },
                    { title: "Masks", slug: "masks" },
                    { title: "Haircare", slug: "haircare" },
                    { title: "Shampoos", slug: "shampoos" },
                    { title: "Conditioners", slug: "conditioners" },
                    { title: "Hair Treatments", slug: "hair-treatments" },
                    { title: "Styling Tools", slug: "styling-tools" },
                    { title: "Makeup", slug: "makeup" },
                    { title: "Foundations", slug: "foundations" },
                    { title: "Lipsticks", slug: "lipsticks" },
                    { title: "Eyeshadows", slug: "eyeshadows" },
                    { title: "Mascaras", slug: "mascaras" },
                    { title: "Blushes", slug: "blushes" },
                    { title: "Makeup Tools", slug: "makeup-tools" },
                    { title: "Concealers", slug: "concealers" },
                    { title: "Powders", slug: "powders" },
                    { title: "Eyeliners", slug: "eyeliners" },
                    { title: "Brow Products", slug: "brow-products" },
                    { title: "Fragrances", slug: "fragrances" },
                    { title: "Perfumes", slug: "perfumes" },
                    { title: "Body Sprays", slug: "body-sprays" },
                ]
            },
            {
                title: "Health & Wellness",
                href: "#",
                children: [
                    { title: "Vitamins & Supplements", slug: "vitamins-supplements" },
                    { title: "Medical Equipment", slug: "medical-equipment" },
                    { title: "Fitness Equipment", slug: "fitness-equipment" },
                    { title: "Health Monitors", slug: "health-monitors" },
                ]
            },
            {
                title: "Personal Care",
                href: "#",
                children: [
                    { title: "Oral Care", slug: "oral-care" },
                    { title: "Toothbrushes", slug: "toothbrushes" },
                    { title: "Toothpaste", slug: "toothpaste" },
                    { title: "Bath & Body", slug: "bath-body" },
                    { title: "Body Wash", slug: "body-wash" },
                    { title: "Lotions", slug: "lotions" },
                    { title: "Hand Sanitizers", slug: "hand-sanitizers" },
                    { title: "Shaving & Hair Removal", slug: "shaving-hair-removal" },
                    { title: "Razors", slug: "razors" },
                    { title: "Shaving Cream", slug: "shaving-cream" },
                    { title: "Hair Removal Devices", slug: "hair-removal-devices" },
                ]
            },
            {
                title: "Pet Supplies",
                href: "#",
                children: [
                    { title: "Dog Supplies", slug: "dog-supplies" },
                    { title: "Dog Food", slug: "dog-food" },
                    { title: "Cat Supplies", slug: "cat-supplies" },
                    { title: "Cat Food", slug: "cat-food" },
                    { title: "Fish & Aquatic Pets", slug: "fish-aquatic-pets" },
                    { title: "Small Animals", slug: "small-animals" },
                    { title: "Birds", slug: "birds" },
                ],
            },
        ]
    },

    // Baby, Kids & Toys
    {
        icon: 'TeddyBear',
        slug: "baby-kids-toys", // Updated slug based on "Baby, Kids & Toys"
        title: "Baby, Kids & Toys",
        children: [
            {
                title: "Baby",
                href: "#",
                children: [
                    { title: "Diapers", slug: "diapers" },
                    { title: "Disposable Diapers", slug: "disposable-diapers" },
                    { title: "Cloth Diapers", slug: "cloth-diapers" },
                    { title: "Feeding", slug: "feeding" },
                    { title: "Bottles", slug: "bottles" },
                    { title: "Breastfeeding Accessories", slug: "breastfeeding-accessories" },
                    { title: "Baby Gear", slug: "baby-gear" },
                    { title: "Strollers", slug: "strollers" },
                    { title: "Car Seats", slug: "car-seats" },
                    { title: "Carriers", slug: "carriers" },
                    { title: "Nursery", slug: "nursery" },
                    { title: "Cribs", slug: "cribs" },
                    { title: "Changing Tables", slug: "changing-tables" },
                    { title: "Baby Monitors", slug: "baby-monitors" },
                ]
            }, {
                title: "Toys",
                href: "#",
                children: [
                    { title: "Educational", slug: "educational" },
                    { title: "Learning Toys", slug: "learning-toys" },
                    { title: "STEM Toys", slug: "stem-toys" },
                    { title: "Action Figures", slug: "action-figures" },
                    { title: "Dolls & Accessories", slug: "dolls-accessories" },
                    { title: "Outdoor Play", slug: "outdoor-play" },
                    { title: "Playhouses", slug: "playhouses" },
                    { title: "Slides", slug: "slides" },
                    { title: "Swings", slug: "swings" },
                ]
            }, {
                title: "Kids Clothing",
                href: "#",
                children: [
                    { title: "Girls", slug: "girls" },
                    { title: "Boys", slug: "boys" },
                ]
            }
        ]
    },

    // Recipes
    {
        icon: 'Food',
        slug: "recipes", // Updated slug based on "Recipes"
        title: "Recipes",
        children: [
        {
            title: "Fresh Produce",
            href: "#",
            children: [
                { title: "Fruits", slug: "fruits" },
                { title: "Vegetables", slug: "vegetables" },
            ]
        }, {
            title: "Pantry Staples",
            href: "#",
            children: [
                { title: "Snacks", slug: "snacks" },
                { title: "Beverages", slug: "beverages" },
                { title: "Tea", slug: "tea" },
                { title: "Coffee", slug: "coffee" },
                { title: "Soft Drinks", slug: "soft-drinks" },
                { title: "Baking", slug: "baking" },
                { title: "Flour", slug: "flour" },
                { title: "Sugar", slug: "sugar" },
                { title: "Baking Mixes", slug: "baking-mixes" },
            ]
        }, {
            title: "Meat & Seafood",
            href: "#",
            children: [
                {
                    title: 'Fresh Meat',
                    slug: "fresh-meat" // Updated slug
                },
                {
                    title: 'Seafood',
                    slug: "seafood" // Updated slug
                },
            ]
        }, {
            title: "Dairy",
            href: "#",
            children: [
                {
                    title: 'Milk',
                    slug: "milk" // Updated slug
                },
                {
                    title: 'Cheese',
                    slug: "cheese" // Updated slug
                },
                {
                    title: 'Eggs',
                    slug: "eggs" // Updated slug
                },
            ]
        }, {
            title: "Frozen Foods",
            href: "#",
            children: [
                {
                    title: 'Vegetables',
                    slug: "vegetables" // Updated slug
                },
                {
                    title: 'Meats',
                    slug: "meats" // Updated slug
                },
                {
                    title: 'Desserts',
                    slug: "desserts" // Updated slug
                },
            ]
        }]
    },

    //Sports
    {
        icon: 'Football',
        slug: "sports-fitness-outdoors", // Updated slug based on "Sports, Fitness & Outdoors"
        title: "Sports, Fitness & Outdoors",

        children: [
        {
            title: "Fitness Equipment",
            href: "#",
            children: [
                {
                    title: 'Cardio Machines',
                    slug: "cardio-machines"
                },
                {
                    title: 'Treadmills',
                    slug: "treadmills"
                },
                {
                    title: 'Exercise Bikes',
                    slug: "exercise-bikes"
                },
                {
                    title: 'Strength Training',
                    slug: "strength-training"
                },
                {
                    title: 'Dumbbells',
                    slug: "dumbbells"
                },
                {
                    title: 'Weight Benches',
                    slug: "weight-benches"
                },
                {
                    title: 'Fitness Accessories',
                    slug: "fitness-accessories"
                },
                {
                    title: 'Yoga Mats',
                    slug: "yoga-mats"
                },
                {
                    title: 'Resistance Bands',
                    slug: "resistance-bands"
                }
            ]
        }, {
            title: "Outdoor Recreation",
            href: "#",
            children: [
                {
                    title: 'Camping' ,
                    slug: "camping"
                },
                {
                    title: 'Tents' ,
                    slug: "tents"
                },
                {
                    title: 'Sleeping Bags' ,
                    slug: "sleeping-bags"
                },
                {
                    title: 'Backpacks' ,
                    slug: "backpacks"
                },
                {
                    title: 'Hiking' ,
                    slug: "hiking"
                },
                {
                    title: 'Boots' ,
                    slug: "boots"
                },
                {
                    title: 'Poles' ,
                    slug: "poles"
                },
                {
                    title: 'Gear' ,
                    slug: "gear"
                },
                {
                    title: 'Water Sports' ,
                    slug: "water-sports"
                },
                {
                    title: 'Kayaks' ,
                    slug: "kayaks"
                },
                {
                    title: 'Life Jackets' ,
                    slug: "life-jackets"
                },
            ]
        }, {
            title: "Team Sports",
            href: "#",
            children: [
                { title: 'Soccer' ,
                slug: "soccer"
                },
                { title: 'Balls' ,
                slug: "balls"
                },
                { title: 'Apparel' ,
                slug: "apparel"
                },
                { title: 'Basketball' ,
                slug: "basketball"
                },
                { title: 'Shoes' ,
                slug: "shoes"
                },
                { title: 'Tennis' ,
                slug: "tennis"
                },
                { title: 'Rackets' ,
                slug: "rackets"
                },
            ]
        }]
    },

    //Automotive
    {
        icon: 'Car',
        slug: "automotive", // Updated slug based on "Automotive"
        title: "Automotive",

        children: [
            {
                title: "Vehicle Parts & Accessories",
                href: "#",
                children: [
                    { title: 'Car Electronics' ,
                        slug: "car-electronics"
                    },
                    { title: 'GPS' ,
                        slug: "gps"
                    },
                    { title: 'Stereos' ,
                        slug: "stereos"
                    },
                    { title: 'Tools & Equipment' ,
                        slug: "tools-equipment"
                    },
                    { title: 'Wrenches' ,
                        slug: "wrenches"
                    },
                    { title: 'Jacks' ,
                        slug: "jacks"
                    },
                    { title: 'Replacement Parts' ,
                        slug: "replacement-parts"
                    },
                    { title: 'Brakes' ,
                        slug: "brakes"
                    },
                    { title: 'Batteries' ,
                        slug: "batteries"
                    },
                    { title: 'Interior Accessories' ,
                        slug: "interior-accessories"
                    },
                    { title: 'Seat Covers' ,
                        slug: "seat-covers"
                    },
                    { title: 'Floor Mats' ,
                        slug: "floor-mats"
                    },
                    { title: 'Exterior Accessories' ,
                        slug: "exterior-accessories"
                    },
                    { title: 'Car Covers' ,
                        slug: "car-covers"
                    },
                    { title: 'Bike Racks' ,
                        slug: "bike-racks"
                    },
                ]
            }
        ]
    },

    //Special Needs
    {
        icon: 'Food',
        slug: "special-needs-accessibility", // Updated slug based on "Special Needs & Accessibility"
        title: "Special Needs & Accessibility",
        children: [
            {
                title: "Mobility Aids",
                href: "#",
                children: [
                    { title: 'Wheelchairs' ,
                        slug: "wheelchairs"
                    },
                    { title: 'Walkers' ,
                        slug: "walkers"
                    },
                    { title: 'Canes' ,
                        slug: "canes"
                    },
                    { title: 'Mobility Scooters' ,
                        slug: "mobility-scooters"
                    },
                ]
            },{
                title: "Daily Living Aids",
                href: "#",
                children: [
                    { title: 'Dressing Aids' ,
                        slug: "dressing-aids"
                    },
                    { title: 'Eating Aids' ,
                        slug: "eating-aids"
                    },
                    { title: 'Bathing Aids' ,
                        slug: "bathing-aids"
                    },
                    { title: 'Communication Aids' ,
                        slug: "communication-aids"
                    },
                ]
            },{
                title: "Accessibility Equipment",
                href: "#",
                children: [
                    { title: 'Ramps' ,
                        slug: "ramps"
                    },
                    { title: 'Lifts' ,
                        slug: "lifts"
                    },
                    { title: 'Accessible Furniture' ,
                        slug: "accessible-furniture"
                    },
                ]
            }
        ]
    },

    //Maternity & Prenatal Care
    {
        icon: 'Food',
        slug: "maternity-prenatal-care", // Updated slug based on "Maternity & Prenatal Care"
        title: "Maternity & Prenatal Care",

        children: [
        {
            title: "Maternity Clothing",
            href: "#",
            children: [
                { title: 'Dresses' ,
                    slug: "dresses"
                },
                { title: 'Tops' ,
                    slug: "tops"
                },
                { title: 'Bottoms' ,
                    slug: "bottoms"
                },
            ]
        },{
            title: "Prenatal Care",
            href: "#",
            children: [
                { title: 'Vitamins' ,
                    slug: "vitamins"
                },
                { title: 'Support Bands' ,
                    slug: "support-bands"
                },
                { title: 'Pregnancy Pillows' ,
                    slug: "pregnancy-pillows"
                },
                { title: 'Skincare' ,
                    slug: "skincare"
                },
            ]
        },{
            title: "Baby Essentials",
            href: "#",
            children: [
                { title: 'Clothing' ,
                    slug: "clothing"
                },
                { title: 'Diapers' ,
                    slug: "diapers"
                },
                { title: 'Feeding' ,
                    slug: "feeding"
                },
                { title: 'Nursery' ,
                    slug: "nursery"
                },
            ]
        }]
    },

    // Senior Care
    {
        icon: 'Food',
        slug: "senior-care", // Updated slug based on "Senior Care"
        title: "Senior Care",
        children: [
            {
                title: "Health & Wellness",
                href: "#",
                children: [
                    { title: 'Supplements' ,
                        slug: "supplements"
                    },
                    { title: 'Monitors' ,
                        slug: "monitors"
                    },
                    { title: 'Mobility Aids' ,
                        slug: "mobility-aids"
                    },
                    { title: 'Vision & Hearing Aids' ,
                        slug: "vision-hearing-aids"
                    },
                ]
            },{
                title: "Comfort & Care",
                href: "#",
                children: [
                    { title: 'Recliners' ,
                        slug: "recliners"
                    },
                    { title: 'Cushions' ,
                        slug: "cushions"
                    },
                    { title: 'Adjustable Beds' ,
                        slug: "adjustable-beds"
                    },
                    { title: 'Daily Living Aids' ,
                        slug: "daily-living-aids"
                    },
                ]
            },{
                title: "Recreation & Leisure",
                href: "#",
                children: [
                    { title: 'Puzzles' ,
                        slug: "puzzles"
                    },
                    { title: 'Books' ,
                        slug: "books"
                    },
                ]
            }
        ]
    },

];  
