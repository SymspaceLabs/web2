import MegaMenu1 from "../components/categories/mega-menu/mega-menu-1";
import MegaMenu2 from "../components/categories/mega-menu/mega-menu-2";
import Car from "../icons/Car";
import Man from "../icons/Man";
import Home from "../icons/Home";
import Food from "../icons/Food";
import Pets from "../icons/Pets";
import Dress from "../icons/Dress";
import Woman from "../icons/Woman";
import Laptop from "../icons/Laptop";
import MakeUp from "../icons/MakeUp";
import BabyBoy from "../icons/BabyBoy";
import BabyGirl from "../icons/BabyGirl";
import Sofa from "../icons/Sofa";
import MotorBike from "../icons/MotorBike";
import TeddyBear from "../icons/TeddyBear";
export const categoryMenus = [
    //Clothing
    {
        icon: Dress,
        title: "Clothing, Shoes & Accessories",
        component: MegaMenu2.name,
        children: [
        {
            title: "Dresses",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Dresses",
                    children: [{
                        title: "Casual Dresses",
                        href: "/products/search/shirt"
                    }, {
                        title: "Formal Dresses",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Tank tops",
                        href: "/products/search/pant"
                    }, {
                        title: "Summer Dresses",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Tops",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Tops",
                    href: "#",
                    children: [{
                        title: "Blouses",
                        href: "/products/search/shirt"
                    }, {
                        title: "T-Shirts",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Tank tops",
                        href: "/products/search/pant"
                    }, {
                        title: "Sweaters",
                        href: "/products/search/underwear"
                    }, {
                        title: "Cardigans",
                        href: "/products/search/underwear"
                    }, {
                        title: "Casual Shirts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Dress Shirts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Polo Shirts",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Bottoms",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Bottoms",
                    href: "#",
                    children: [{
                        title: "Jeans",
                        href: "/products/search/shirt"
                    }, {
                        title: "Trousers",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Shorts",
                        href: "/products/search/pant"
                    }, {
                        title: "Skirts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Pants",
                        href: "/products/search/underwear"
                    }, {
                        title: "Shorts",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Outerwear",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Outerwear",
                    href: "#",
                    children: [{
                        title: "Jackets",
                        href: "/products/search/shirt"
                    }, {
                        title: "Coats",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Blazers",
                        href: "/products/search/pant"
                    }, {
                        title: "Vests",
                        href: "/products/search/underwear"
                    }, {
                        title: "Hoodies",
                        href: "/products/search/underwear"
                    }, {
                        title: "Suits",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Activewear",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Activewear",
                    href: "#",
                    children: [{
                        title: "Leggings",
                        href: "/products/search/shirt"
                    }, {
                        title: "Sport bras",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Track pants",
                        href: "/products/search/pant"
                    }, {
                        title: "Workout Tops",
                        href: "/products/search/underwear"
                    }, {
                        title: "Yoga pants",
                        href: "/products/search/underwear"
                    }, {
                        title: "Sports shorts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Joggers",
                        href: "/products/search/underwear"
                    }, {
                        title: "Gym Shorts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Sweatshirts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Compression Wear",
                        href: "/products/search/underwear"
                    }, {
                        title: "Compression Wear",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Intimates",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Intimates",
                    href: "#",
                    children: [{
                        title: "Lingerie",
                        href: "/products/search/shirt"
                    }, {
                        title: "Sleepwear",
                        href: "/products/search/t-shirt"
                    }]
                },
            ]
        },{
            title: "Shoes",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Shoes",
                    href: "#",
                    children: [{
                        title: "Sandals",
                        href: "/products/search/shirt"
                    }, {
                        title: "Flats",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Heels",
                        href: "/products/search/pant"
                    }, {
                        title: "Boots",
                        href: "/products/search/underwear"
                    }, {
                        title: "Sneakers",
                        href: "/products/search/underwear"
                    }, {
                        title: "Athletic Shoes",
                        href: "/products/search/underwear"
                    }, {
                        title: "Formal Shoes",
                        href: "/products/search/underwear"
                    }, {
                        title: "Casual Shoes",
                        href: "/products/search/underwear"
                    }, {
                        title: "Boots",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Accessories",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Accessories",
                    href: "#",
                    children: [{
                        title: "Handbags",
                        href: "/products/search/shirt"
                    }, {
                        title: "Jewelry",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Watches",
                        href: "/products/search/pant"
                    }, {
                        title: "Scarves",
                        href: "/products/search/underwear"
                    }, {
                        title: "Hats",
                        href: "/products/search/underwear"
                    }, {
                        title: "Belts",
                        href: "/products/search/underwear"
                    }, {
                        title: "Sunglasses",
                        href: "/products/search/underwear"
                    }, {
                        title: "Ties",
                        href: "/products/search/underwear"
                    }, {
                        title: "Wallets",
                        href: "/products/search/underwear"
                    }, {
                        title: "Backpacks",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        },{
            title: "Underwear & Socks",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Underwear & Socks",
                    href: "#",
                    children: [{
                        title: "Boxers",
                        href: "/products/search/shirt"
                    }, {
                        title: "Briefs",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Bras",
                        href: "/products/search/pant"
                    }, {
                        title: "Panties",
                        href: "/products/search/underwear"
                    }, {
                        title: "Sleepwear",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        }]
    },

    //Electronics
    {
        icon: Laptop,
        title: "Electronics",
        component: MegaMenu2.name,
        children: [
        {
            title: "Mobile Phones & Accessories",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Mobile Phones & Accessories",
                    children: [
                    {
                        title: "Smartphones",
                        href: "/products/search/shirt"
                    }, {
                        title: "Cases & Covers",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Screen Protectors",
                        href: "/products/search/pant"
                    }, {
                        title: "Chargers & Cables",
                        href: "/products/search/underwear"
                    }, {
                        title: "Power Banks",
                        href: "/products/search/underwear"
                    }]
                },
            ]
        }, {
            title: "Computers & Accessories",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Computers & Accessories",
                    children: [{
                        title: "Laptops",
                        href: "/products/search/belt"
                    }, {
                        title: "Desktops",
                        href: "/products/search/Hat"
                    }, {
                        title: "Monitors",
                        href: "/products/search/Watches"
                    }, {
                        title: "Keyboards & Mice",
                        href: "/products/search/Sunglasses"
                    }, {
                        title: "Printers & Scanners",
                        href: "/products/search/Sunglasses"
                    }]
                },
            ]
            
        }, {
            title: "Home Entertainment",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Computers & Accessories",
                    children: [{
                        title: "Televisions",
                        href: "/products/search/Sneakers"
                    }, 
                    {
                        title: "Sound Systems",
                        href: "/products/search/Sandals"
                    },
                    {
                        title: "Streaming Devices",
                        href: "/products/search/Formal"
                    },
                    {
                        title: "Blu-ray & DVD Players",
                        href: "/products/search/Casual"
                    }]
                },
            ]
            
        }, {
            title: "Cameras & Photography",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Cameras & Photography",
                    children: [{
                        title: "Digital Cameras",
                        href: "/products/search/backpack"
                    }, {
                        title: "Lenses",
                        href: "/products/search/Crossbody Bags"
                    }, {
                        title: "Tripods",
                        href: "/products/search/Side Bags"
                    }, {
                        title: "Camera Accessories",
                        href: "/products/search/Slides"
                    }]
                },
            ]
            
        }]
    },

    //Furniture
    {
        icon: Sofa,
        title: "Home, Furniture & Appliances",
        component: MegaMenu2.name,
        children: [
        {
            title: "Furniture",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Furniture",
                    children: [
                        {
                            title: "Living Room",
                            href: "/products/search/shirt"
                        }, {
                            title: "Sofas",
                            href: "/products/search/t-shirt"
                        }, {
                            title: "Coffee Tables",
                            href: "/products/search/pant"
                        }, {
                            title: "TV Stands",
                            href: "/products/search/underwear"
                        }, {
                            title: "Recliners",
                            href: "/products/search/underwear"
                        }, {
                            title: "Bedroom",
                            href: "/products/search/underwear"
                        }, {
                            title: "Beds",
                            href: "/products/search/underwear"
                        }, {
                            title: "Dressers",
                            href: "/products/search/underwear"
                        }, {
                            title: "Nightstands",
                            href: "/products/search/underwear"
                        }, {
                            title: "Wardrobes",
                            href: "/products/search/underwear"
                        }, {
                            title: "Office",
                            href: "/products/search/underwear"
                        }, {
                            title: "Desks",
                            href: "/products/search/underwear"
                        }, {
                            title: "Office Chairs",
                            href: "/products/search/underwear"
                        }, {
                            title: "Bookcases",
                            href: "/products/search/underwear"
                        }, {
                            title: "Outdoor",
                            href: "/products/search/underwear"
                        }, {
                            title: "Patio Sets",
                            href: "/products/search/underwear"
                        }, {
                            title: "Outdoor Chairs",
                            href: "/products/search/underwear"
                        }, {
                            title: "Garden Storage",
                            href: "/products/search/underwear"
                        }]
                },
            ]
        }, {
            title: "Home Decor",
            component: MegaMenu1.name,
            children: [{
                title: "Home Decor",
                children: [
                    {
                        title: "Lighting",
                        href: "/products/search/shirt"
                    }, {
                        title: "Lamps",
                        href: "/products/search/t-shirt"
                    }, {
                        title: "Ceiling Lights",
                        href: "/products/search/pant"
                    }, {
                        title: "Wall Lights",
                        href: "/products/search/underwear"
                    }, {
                        title: "Rugs",
                        href: "/products/search/underwear"
                    }, {
                        title: "Wall Art",
                        href: "/products/search/underwear"
                    }, {
                        title: "Clocks",
                        href: "/products/search/underwear"
                    }, {
                        title: "Mirrors",
                        href: "/products/search/underwear"
                }]
            }]
        }, {
            title: "Kitchen & Dining",
            component: MegaMenu1.name,
            children: [{
                title: "Kitchen & Dining",
                children: [{
                    title: "Cookware",
                    href: "/products/search/Sneakers"
                }, {
                    title: "Pots & Pans",
                    href: "/products/search/Sandals"
                }, {
                    title: "Bakeware",
                    href: "/products/search/Formal"
                }, {
                    title: "Tableware",
                    href: "/products/search/Casual"
                }, {
                    title: "Dinner Sets",
                    href: "/products/search/Casual"
                }, {
                    title: "Glassware",
                    href: "/products/search/Casual"
                }, {
                    title: "Cutlery",
                    href: "/products/search/Casual"
                }, {
                    title: "Kitchen Storage",
                    href: "/products/search/Casual"
                }, {
                    title: "Containers",
                    href: "/products/search/Casual"
                }, {
                    title: "Racks & Holders",
                    href: "/products/search/Casual"
                }, {
                    title: "Small Appliances",
                    href: "/products/search/Casual"
                }, {
                    title: "Toasters",
                    href: "/products/search/Casual"
                }, {
                    title: "Blenders",
                    href: "/products/search/Casual"
                }, {
                    title: "Coffee Makers",
                    href: "/products/search/Casual"
                }
                ]
            }]
        }, {
            title: "Large Appliances",
            component: MegaMenu1.name,
            children: [{
                title: "Large Appliances",
                children: [{
                    title: "Refrigerators",
                    href: "/products/search/Sneakers"
                }, {
                    title: "Washing Machines",
                    href: "/products/search/Sandals"
                }, {
                    title: "Ovens",
                    href: "/products/search/Formal"
                }, {
                    title: "Dishwashers",
                    href: "/products/search/Casual"
                }]
            }]
        },]
    },

    //Health
    {
        icon: MakeUp,
        title: "Beauty, Health & Personal Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Beauty",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Beauty",
                    children: [
                        {
                            title: "Skincare",
                            href: "/products/search/shirt"
                        }, {
                            title: "Moisturizers",
                            href: "/products/search/t-shirt"
                        }, {
                            title: "Cleansers",
                            href: "/products/search/pant"
                        }, {
                            title: "Serums",
                            href: "/products/search/underwear"
                        }, {
                            title: "Masks",
                            href: "/products/search/underwear"
                        }, {
                            title: "Haircare",
                            href: "/products/search/underwear"
                        }, {
                            title: "Shampoos",
                            href: "/products/search/underwear"
                        }, {
                            title: "Conditioners",
                            href: "/products/search/underwear"
                        }, {
                            title: "Hair Treatments",
                            href: "/products/search/underwear"
                        }, {
                            title: "Styling Tools",
                            href: "/products/search/underwear"
                        }, { 
                            title: 'Makeup' 
                        }, { 
                            title: 'Foundations' 
                        }, { 
                            title: 'Lipsticks' 
                        }, { 
                            title: 'Eyeshadows' 
                        }, { 
                            title: 'Mascaras' 
                        }, { 
                            title: 'Blushes' 
                        }, { 
                            title: 'Makeup Tools' 
                        }, { 
                            title: 'Concealers' 
                        }, { 
                            title: 'Powders' 
                        }, { 
                            title: 'Eyeliners' 
                        }, { 
                            title: 'Brow Products' 
                        }, { 
                            title: 'Fragrances' 
                        }, { 
                            title: 'Perfumes' 
                        }, { 
                            title: 'Body Sprays'
                    }]
                },
            ]
        }, {
            title: "Health & Wellness",
            component: MegaMenu1.name,
            children: [{
                title: "Health & Wellness",
                children: [
                    { 
                        title: 'Vitamins & Supplements' 
                    },
                    { 
                        title: 'Medical Equipment' 
                    },
                    { 
                        title: 'Fitness Equipment' 
                    },
                    { 
                        title: 'Health Monitors' 
                    },]
            }]
        }, {
            title: "Personal Care",
            component: MegaMenu1.name,
            children: [{
                title: "Personal Care",
                children: [
                { 
                    title: 'Oral Care' 
                },
                { 
                    title: 'Toothbrushes' 
                },
                { 
                    title: 'Toothpaste' 
                },
                { 
                    title: 'Bath & Body' 
                },
                { 
                    title: 'Body Wash' 
                },
                { 
                    title: 'Lotions' 
                },
                { 
                    title: 'Hand Sanitizers' 
                },
                { 
                    title: 'Shaving & Hair Removal' 
                },
                { 
                    title: 'Razors' 
                },
                { 
                    title: 'Shaving Cream' 
                },
                { 
                    title: 'Hair Removal Devices'
                },  
                ]
            }]
        }]
    },
    
    //Baby
    {
        icon: TeddyBear,
        title: "Baby, Kids & Toys",
        component: MegaMenu2.name,
        children: [
        {
            title: "Baby",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Baby",
                    children: [
                        { 
                            title: 'Diapers' 
                        },
                        { 
                            title: 'Disposable Diapers' 
                        },
                        { 
                            title: 'Cloth Diapers' 
                        },
                        { 
                            title: 'Feeding' 
                        },
                        { 
                            title: 'Bottles' 
                        },
                        { 
                            title: 'Breastfeeding Accessories' 
                        },
                        { 
                            title: 'Baby Gear' 
                        },
                        { 
                            title: 'Strollers' 
                        },
                        { 
                            title: 'Car Seats' 
                        },
                        { 
                            title: 'Carriers' 
                        },
                        { 
                            title: 'Nursery' 
                        },
                        { 
                            title: 'Cribs' 
                        },
                        { 
                            title: 'Changing Tables' 
                        },
                        { 
                            title: 'Baby Monitors' 
                        },
                    ]
                },
            ]
        }, {
            title: "Toys",
            component: MegaMenu1.name,
            children: [{
                title: "Toys",
                children: [
                    { 
                        title: 'Educational' 
                    },
                    { 
                        title: 'Learning Toys' 
                    },
                    { 
                        title: 'STEM Toys' 
                    },
                    { 
                        title: 'Action Figures' 
                    },
                    { 
                        title: 'Dolls & Accessories' 
                    },
                    { 
                        title: 'Outdoor Play' 
                    },
                    { 
                        title: 'Playhouses' 
                    },
                    { 
                        title: 'Slides' 
                    },
                    { 
                        title: 'Swings' 
                    },
                ]
            }]
        }, {
            title: "Kids Clothing",
            component: MegaMenu1.name,
            children: [{
                title: "Kids Clothing",
                children: [
                { 
                    title: 'Girls' 
                },
                { 
                    title: 'Boys' 
                },]
            }]
        }]
    },

    //Groceries
    {
        icon: Food,
        title: "Recipes",
        component: MegaMenu2.name,
        children: [
        {
            title: "Fresh Produce",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Fresh Produce",
                    children: [
                        { 
                            title: 'Fruits' 
                        },
                        { 
                            title: 'Vegetables' 
                        },
                    ]
                },
            ]
        }, {
            title: "Pantry Staples",
            component: MegaMenu1.name,
            children: [{
                title: "Pantry Staples",
                children: [
                    { 
                        title: 'Snacks' 
                    },
                    { 
                        title: 'Beverages'
                    },
                    { 
                        title: 'Tea'
                    },
                    { 
                        title: 'Coffee'
                    },
                    { 
                        title: 'Soft Drinks'
                    },
                    { 
                        title: 'Baking'
                    },
                    { 
                        title: 'Flour'
                    },
                    { 
                        title: 'Sugar'
                    },
                    { 
                        title: 'Baking Mixes'
                    },
                ]
            }]
        }, {
            title: "Meat & Seafood",
            component: MegaMenu1.name,
            children: [{
                title: "Meat & Seafood",
                children: [
                { 
                    title: 'Fresh Meat' 
                },
                { 
                    title: 'Seafood' 
                },]
            }]
        }, {
            title: "Dairy",
            component: MegaMenu1.name,
            children: [{
                title: "Dairy",
                children: [
                { 
                    title: 'Milk' 
                },
                { 
                    title: 'Cheese' 
                },
                { 
                    title: 'Eggs' 
                },]
            }]
        }, {
            title: "Frozen Foods",
            component: MegaMenu1.name,
            children: [{
                title: "Frozen Foods",
                children: [
                { 
                    title: 'Vegetables' 
                },
                { 
                    title: 'Meats' 
                },
                { 
                    title: 'Desserts' 
                },]
            }]
        }]
    },
    

    //Sports
    {
        icon: Food,
        title: "Sports, Fitness & Outdoors",
        component: MegaMenu2.name,
        children: [
        {
            title: "Fitness Equipment",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Fitness Equipment",
                    children: [
                        { 
                            title: 'Cardio Machines'
                        },
                        { 
                            title: 'Treadmills'
                        },
                        { 
                            title: 'Exercise Bikes'
                        },
                        { 
                            title: 'Strength Training'
                        },
                        { 
                            title: 'Dumbbells'
                        },
                        { 
                            title: 'Weight Benches'
                        },
                        { 
                            title: 'Fitness Accessories'
                        },
                        { 
                            title: 'Yoga Mats'
                        },
                        { 
                            title: 'Resistance Bands'
                        }
                    ]
                },
            ]
        }, {
            title: "Outdoor Recreation",
            component: MegaMenu1.name,
            children: [{
                title: "Outdoor Recreation",
                children: [
                    { title: 'Camping' },
                    { title: 'Tents' },
                    { title: 'Sleeping Bags' },
                    { title: 'Backpacks' },
                    { title: 'Hiking' },
                    { title: 'Boots' },
                    { title: 'Poles' },
                    { title: 'Gear' },
                    { title: 'Water Sports' },
                    { title: 'Kayaks' },
                    { title: 'Life Jackets' },
                ]
            }]
        }, {
            title: "Team Sports",
            component: MegaMenu1.name,
            children: [{
                title: "Team Sports",
                children: [
                    { title: 'Soccer' },
                    { title: 'Balls' },
                    { title: 'Apparel' },
                    { title: 'Basketball' },
                    { title: 'Balls' },
                    { title: 'Shoes' },
                    { title: 'Tennis' },
                    { title: 'Rackets' },
                    { title: 'Balls' },
                ]
            }]
        }]
    },

    //Automotive
    {
        icon: Car,
        title: "Automotive",
        component: MegaMenu2.name,
        children: [
        {
            title: "Vehicle Parts & Accessories",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Vehicle Parts & Accessories",
                    children: [
                        { title: 'Car Electronics' },
                        { title: 'GPS' },
                        { title: 'Stereos' },
                        { title: 'Tools & Equipment' },
                        { title: 'Wrenches' },
                        { title: 'Jacks' },
                        { title: 'Replacement Parts' },
                        { title: 'Brakes' },
                        { title: 'Batteries' },
                        { title: 'Interior Accessories' },
                        { title: 'Seat Covers' },
                        { title: 'Floor Mats' },
                        { title: 'Exterior Accessories' },
                        { title: 'Car Covers' },
                        { title: 'Bike Racks' },
                    ]
                },
            ]
        }]
    },
 
    //Special Needs
    {
        icon: Food,
        title: "Special Needs & Accessibility",
        component: MegaMenu2.name,
        children: [
        {
            title: "Mobility Aids",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Mobility Aids",
                    children: [
                        { title: 'Wheelchairs' },
                        { title: 'Walkers' },
                        { title: 'Canes' },
                        { title: 'Mobility Scooters' },
                    ]
                },
            ]
        },{
            title: "Daily Living Aids",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Daily Living Aids",
                    children: [
                        { title: 'Dressing Aids' },
                        { title: 'Eating Aids' },
                        { title: 'Bathing Aids' },
                        { title: 'Communication Aids' },
                    ]
                },
            ]
        },{
            title: "Accessibility Equipment",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Accessibility Equipment",
                    children: [
                        { title: 'Ramps' },
                        { title: 'Lifts' },
                        { title: 'Accessible Furniture' },
                    ]
                },
            ]
        }]
    },

    //Maternity & Prenatal Care
    {
        icon: Food,
        title: "Maternity & Prenatal Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Maternity Clothing",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Maternity Clothing",
                    children: [
                        { title: 'Dresses' },
                        { title: 'Tops' },
                        { title: 'Bottoms' },
                    ]
                },
            ]
        },{
            title: "Prenatal Care",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Prenatal Care",
                    children: [
                        { title: 'Vitamins' },
                        { title: 'Support Bands' },
                        { title: 'Pregnancy Pillows' },
                        { title: 'Skincare' },
                    ]
                }
            ]
        },{
            title: "Baby Essentials",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Baby Essentials",
                    children: [
                        { title: 'Clothing' },
                        { title: 'Diapers' },
                        { title: 'Feeding' },
                        { title: 'Nursery' },
                    ]
                },
            ]
        }]
    },

    //Senior Care
    {
        icon: Food,
        title: "Senior Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Health & Wellness",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Health & Wellness",
                    children: [
                        { title: 'Supplements' },
                        { title: 'Monitors' },
                        { title: 'Mobility Aids' },
                        { title: 'Vision & Hearing Aids' },
                    ]
                },
            ]
        },{
            title: "Comfort & Care",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Comfort & Care",
                    children: [
                        { title: 'Recliners' },
                        { title: 'Cushions' },
                        { title: 'Adjustable Beds' },
                        { title: 'Daily Living Aids' },
                    ]
                },

            ]
        },{
            title: "Recreation & Leisure",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Recreation & Leisure",
                    children: [
                        { title: 'Puzzles' },
                        { title: 'Books' },
                    ]
                },
            ]
        }]
    },
    
    
];
// export const categoryMenus = [
//     {
//         icon: Dress,
//         title: "Clothing, Shoes & Accessories",
//         href: "/fashion",
//         component: MegaMenu2.name,
//         children: [
//         {
//             icon: Man,
//             title: "Men's Clothes",
//             href: "#",
//             component: MegaMenu1.name,
//             children: [
//                 {
//                     title: "Men's Clothes",
//                     href: "#",
//                     children: [{
//                         title: "Shirt",
//                         href: "/products/search/shirt"
//                     }, {
//                         title: "T- shirt",
//                         href: "/products/search/t-shirt"
//                     }, {
//                         title: "Pant",
//                         href: "/products/search/pant"
//                     }, {
//                         title: "Underwear",
//                         href: "/products/search/underwear"
//                     }]
//                 },
//             ]
//         },
//         {
//             icon: Woman,
//             title: "Women's Clothes",
//             href: "#",
//             component: MegaMenu1.name,
//             children: [
//                 {
//                     title: "Women's Clothes",
//                     href: "#",
//                     children: [{
//                         title: "Shirt",
//                         href: "/products/search/shirt"
//                     }, {
//                         title: "T- shirt",
//                         href: "/products/search/t-shirt"
//                     }, {
//                         title: "Pant",
//                         href: "/products/search/pant"
//                     }, {
//                         title: "Underwear",
//                         href: "/products/search/underwear"
//                     }]
//                 },
//             ]
//         },
//         {
//             icon: BabyBoy,
//             title: "Baby Boy",
//             href: "/products/search/home&garden"
//         }, {
//             icon: BabyGirl,
//             title: "Baby Girl",
//             href: "/products/search/bikes"
//         }]
//     },
//     {
//         icon: Laptop,
//         title: "Electronics",
//         component: MegaMenu1.name,
//         href: "/products/search/electronics",
//         offer: {
//             url: "/assets/images/promotion/offer-5.png",
//             href: "/",
//             position: "bottom"
//         },
//         children: [{
//             title: "Men's Clothes",
//             href: "#",
//             children: [{
//             title: "Shirt",
//             href: "/products/search/shirt"
//             }, {
//             title: "T- shirt",
//             href: "/products/search/t-shirt"
//             }, {
//             title: "Pant",
//             href: "/products/search/pant"
//             }, {
//             title: "Underwear",
//             href: "/products/search/underwear"
//             }]
//         }, {
//             title: "Accessories",
//             href: "#",
//             children: [{
//             title: "Belt",
//             href: "/products/search/belt"
//             }, {
//             title: "Hat",
//             href: "/products/search/Hat"
//             }, {
//             title: "Watches",
//             href: "/products/search/Watches"
//             }, {
//             title: "Sunglasses",
//             href: "/products/search/Sunglasses"
//             }]
//         }, {
//             title: "Shoes",
//             href: "#",
//             children: [{
//             title: "Sneakers",
//             href: "/products/search/Sneakers"
//             }, {
//             title: "Sandals",
//             href: "/products/search/Sandals"
//             }, {
//             title: "Formal",
//             href: "/products/search/Formal"
//             }, {
//             title: "Casual",
//             href: "/products/search/Casual"
//             }]
//         }, {
//             title: "Bags",
//             href: "#",
//             children: [{
//             title: "Backpack",
//             href: "/products/search/backpack"
//             }, {
//             title: "Crossbody Bags",
//             href: "/products/search/Crossbody Bags"
//             }, {
//             title: "Side Bags",
//             href: "/products/search/Side Bags"
//             }, {
//             title: "Slides",
//             href: "/products/search/Slides"
//             }]
//         }, {
//             title: "Women's Clothes",
//             href: "#",
//             children: [{
//             title: "Shirt",
//             href: "/products/search/shirt"
//             }, {
//             title: "T- shirt",
//             href: "/products/search/t-shirt"
//             }, {
//             title: "Pant",
//             href: "/products/search/pant"
//             }, {
//             title: "Underwear",
//             href: "/products/search/underwear"
//             }]
//         }, {
//             title: "Accessories",
//             href: "#",
//             children: [{
//             title: "Belt",
//             href: "/products/search/belt"
//             }, {
//             title: "Hat",
//             href: "/products/search/Hat"
//             }, {
//             title: "Watches",
//             href: "/products/search/Watches"
//             }, {
//             title: "Sunglasses",
//             href: "/products/search/Sunglasses"
//             }]
//         }, {
//             title: "Shoes",
//             href: "#",
//             children: [{
//             title: "Sneakers",
//             href: "/products/search/Sneakers"
//             }, {
//             title: "Sandals",
//             href: "/products/search/Sandals"
//             }, {
//             title: "Formal",
//             href: "/products/search/Formal"
//             }, {
//             title: "Casual",
//             href: "/products/search/Casual"
//             }]
//         }, {
//             title: "Bags",
//             href: "#",
//             children: [{
//             title: "Backpack",
//             href: "/products/search/backpack"
//             }, {
//             title: "Crossbody Bags",
//             href: "/products/search/Crossbody Bags"
//             }, {
//             title: "Side Bags",
//             href: "/products/search/Side Bags"
//             }, {
//             title: "Slides",
//             href: "/products/search/Slides"
//             }]
//         }]
//     },
//     {
//         icon: Sofa,
//         title: "Home & Garden",
//         href: "#",
//         component: MegaMenu1.name,
//         children: [{
//             title: "Men's Clothes",
//             href: "#",
//             children: [{
//             title: "Shirt",
//             href: "/products/search/shirt"
//             }, {
//             title: "T- shirt",
//             href: "/products/search/t-shirt"
//             }, {
//             title: "Pant",
//             href: "/products/search/pant"
//             }, {
//             title: "Underwear",
//             href: "/products/search/underwear"
//             }]
//         }, {
//             title: "Accessories",
//             href: "#",
//             children: [{
//             title: "Belt",
//             href: "/products/search/belt"
//             }, {
//             title: "Hat",
//             href: "/products/search/Hat"
//             }, {
//             title: "Watches",
//             href: "/products/search/Watches"
//             }, {
//             title: "Sunglasses",
//             href: "/products/search/Sunglasses"
//             }]
//         }, {
//             title: "Shoes",
//             href: "#",
//             children: [{
//             title: "Sneakers",
//             href: "/products/search/Sneakers"
//             }, {
//             title: "Sandals",
//             href: "/products/search/Sandals"
//             }, {
//             title: "Formal",
//             href: "/products/search/Formal"
//             }, {
//             title: "Casual",
//             href: "/products/search/Casual"
//             }]
//         }, {
//             title: "Bags",
//             href: "#",
//             children: [{
//             title: "Backpack",
//             href: "/products/search/backpack"
//             }, {
//             title: "Crossbody Bags",
//             href: "/products/search/Crossbody Bags"
//             }, {
//             title: "Side Bags",
//             href: "/products/search/Side Bags"
//             }, {
//             title: "Slides",
//             href: "/products/search/Slides"
//             }]
//         }, {
//             title: "Women's Clothes",
//             href: "#",
//             children: [{
//             title: "Shirt",
//             href: "/products/search/shirt"
//             }, {
//             title: "T- shirt",
//             href: "/products/search/t-shirt"
//             }, {
//             title: "Pant",
//             href: "/products/search/pant"
//             }, {
//             title: "Underwear",
//             href: "/products/search/underwear"
//             }]
//         }, {
//             title: "Accessories",
//             href: "#",
//             children: [{
//             title: "Belt",
//             href: "/products/search/belt"
//             }, {
//             title: "Hat",
//             href: "/products/search/Hat"
//             }, {
//             title: "Watches",
//             href: "/products/search/Watches"
//             }, {
//             title: "Sunglasses",
//             href: "/products/search/Sunglasses"
//             }]
//         }, {
//             title: "Shoes",
//             href: "#",
//             children: [{
//             title: "Sneakers",
//             href: "/products/search/Sneakers"
//             }, {
//             title: "Sandals",
//             href: "/products/search/Sandals"
//             }, {
//             title: "Formal",
//             href: "/products/search/Formal"
//             }, {
//             title: "Casual",
//             href: "/products/search/Casual"
//             }]
//         }, {
//             title: "Bags",
//             href: "#",
//             children: [{
//             title: "Backpack",
//             href: "/products/search/backpack"
//             }, {
//             title: "Crossbody Bags",
//             href: "/products/search/Crossbody Bags"
//             }, {
//             title: "Side Bags",
//             href: "/products/search/Side Bags"
//             }, {
//             title: "Slides",
//             href: "/products/search/Slides"
//             }]
//         }]
//     },
//     {
//   icon: Gift,
//   title: "Gifts",
//   href: "#",
//   component: MegaMenu2.name,
//   children: [{
//     icon: Dress,
//     title: "Fashion",
//     href: "/products/search/fashion"
//   }, {
//     icon: Laptop,
//     title: "Electronics",
//     href: "/products/search/electronics"
//   }, {
//     icon: Sofa,
//     title: "Home & Garden",
//     href: "/products/search/home&garden"
//   }, {
//     icon: MotorBike,
//     title: "Bikes",
//     href: "/products/search/bikes"
//   }, {
//     icon: Gift,
//     title: "Gifts",
//     href: "/products/search/gifts"
//   }, {
//     icon: Food,
//     title: "Music",
//     href: "/products/search/music"
//   }, {
//     icon: MakeUp,
//     title: "Health & Beauty",
//     href: "/products/search/health&beauty"
//   }, {
//     icon: Pets,
//     title: "Pets",
//     href: "/products/search/pets"
//   }, {
//     icon: TeddyBear,
//     title: "Baby Toys",
//     href: "/products/search/baby-toys"
//   }, {
//     icon: Food,
//     title: "Groceries",
//     href: "/products/search/groceries"
//   }, {
//     icon: Car,
//     title: "Automotive",
//     href: "/products/search/automotive"
//   }]
// }, {
//   icon: Food,
//   title: "Music",
//   href: "/products/search/music"
// }, {
//   icon: MakeUp,
//   title: "Health & Beauty",
//   href: "/products/search/health&beauty"
// }, {
//   icon: Pets,
//   title: "Pets",
//   href: "/products/search/pets"
// }, {
//   icon: TeddyBear,
//   title: "Baby Toys",
//   href: "/products/search/baby-toys"
// }, {
//   icon: Food,
//   title: "Groceries",
//   href: "/products/search/groceries"
// }, {
//   icon: Car,
//   title: "Automotive",
//   href: "/products/search/automotive"
// }];