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
    //Clothing, Shoes & Accessories
    {
        icon: Dress,
        href: "/fashion",
        title: "Clothing, Shoes & Accessories",
        component: MegaMenu2.name,
        children: [
        {
            title: "Dresses",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Dresses",
                    href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
            href: "#",
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
        href: "/fashion",
        title: "Electronics",
        component: MegaMenu2.name,
        children: [
        {
            title: "Mobile Phones & Accessories",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Mobile Phones & Accessories",
                    href: "#",
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
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Computers & Accessories",
                    href: "#",
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
            href: "#",
            children: [
                {
                    title: "Computers & Accessories",
                    href: "#",
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
            href: "#",
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

    //Home, Furniture & Appliances
    {
        icon: Sofa,
        href: "/fashion",
        title: "Home, Furniture & Appliances",
        component: MegaMenu2.name,
        children: [
        {
            title: "Furniture",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Furniture",
                    href: "#",
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
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Home Decor",
                href: "#",
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
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Kitchen & Dining",
                href: "#",
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
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Large Appliances",
                href: "#",
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
        href: "/fashion",
        title: "Beauty, Health & Personal Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Beauty",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Beauty",
                    href: "#",
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
                            title: 'Makeup',
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Foundations' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Lipsticks' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Eyeshadows' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Mascaras' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Blushes' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Makeup Tools' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Concealers' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Powders' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Eyeliners' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Brow Products' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Fragrances' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Perfumes' ,
                            href: "/products/search/Casual"
                        }, { 
                            title: 'Body Sprays',
                            href: "/products/search/Casual"
                    }]
                },
            ]
        }, {
            title: "Health & Wellness",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Health & Wellness",
                href: "#",
                children: [
                    { 
                        title: 'Vitamins & Supplements',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Medical Equipment',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Fitness Equipment',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Health Monitors',
                        href: "/products/search/Casual"
                    },]
            }]
        }, {
            title: "Personal Care",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Personal Care",
                href: "#",
                children: [
                { 
                    title: 'Oral Care' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Toothbrushes' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Toothpaste' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Bath & Body' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Body Wash' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Lotions' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Hand Sanitizers' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Shaving & Hair Removal' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Razors' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Shaving Cream' ,
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Hair Removal Devices',
                    href: "/products/search/Casual"
                },  
                ]
            }]
        }]
    },
    
    // Baby, Kids & Toys
    {
        icon: TeddyBear,
        href: "/fashion",
        title: "Baby, Kids & Toys",
        component: MegaMenu2.name,
        children: [
        {
            title: "Baby",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Baby",
                    href: "#",
                    children: [
                        { 
                            title: 'Diapers',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Disposable Diapers',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Cloth Diapers',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Feeding',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Bottles',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Breastfeeding Accessories',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Baby Gear',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Strollers',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Car Seats',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Carriers',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Nursery',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Cribs',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Changing Tables',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Baby Monitors',
                            href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }, {
            title: "Toys",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Toys",
                href: "#",
                children: [
                    { 
                        title: 'Educational',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Learning Toys',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'STEM Toys',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Action Figures',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Dolls & Accessories',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Outdoor Play',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Playhouses',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Slides',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Swings',
                        href: "/products/search/Casual"
                    },
                ]
            }]
        }, {
            title: "Kids Clothing",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Kids Clothing",
                href: "#",
                children: [
                { 
                    title: 'Girls',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Boys',
                    href: "/products/search/Casual"
                },]
            }]
        }]
    },

    // Recipes
    {
        icon: Food,
        href: "/fashion",
        title: "Recipes",
        component: MegaMenu2.name,
        children: [
        {
            title: "Fresh Produce",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Fresh Produce",
                    href: "#",
                    children: [
                        { 
                            title: 'Fruits',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Vegetables',
                            href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }, {
            title: "Pantry Staples",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Pantry Staples",
                href: "#",
                children: [
                    { 
                        title: 'Snacks' ,
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Beverages',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Tea',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Coffee',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Soft Drinks',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Baking',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Flour',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Sugar',
                        href: "/products/search/Casual"
                    },
                    { 
                        title: 'Baking Mixes',
                        href: "/products/search/Casual"
                    },
                ]
            }]
        }, {
            title: "Meat & Seafood",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Meat & Seafood",
                href: "#",
                children: [
                { 
                    title: 'Fresh Meat',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Seafood',
                    href: "/products/search/Casual"
                },]
            }]
        }, {
            title: "Dairy",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Dairy",
                href: "#",
                children: [
                { 
                    title: 'Milk',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Cheese',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Eggs',
                    href: "/products/search/Casual"
                },]
            }]
        }, {
            title: "Frozen Foods",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Frozen Foods",
                href: "#",
                children: [
                { 
                    title: 'Vegetables',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Meats',
                    href: "/products/search/Casual"
                },
                { 
                    title: 'Desserts',
                    href: "/products/search/Casual"
                },]
            }]
        }]
    },
    

    //Sports
    {
        icon: Food,
        href: "/fashion",
        title: "Sports, Fitness & Outdoors",
        component: MegaMenu2.name,
        children: [
        {
            title: "Fitness Equipment",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Fitness Equipment",
                    href: "#",
                    children: [
                        { 
                            title: 'Cardio Machines',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Treadmills',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Exercise Bikes',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Strength Training',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Dumbbells',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Weight Benches',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Fitness Accessories',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Yoga Mats',
                            href: "/products/search/Casual"
                        },
                        { 
                            title: 'Resistance Bands',
                            href: "/products/search/Casual"
                        }
                    ]
                },
            ]
        }, {
            title: "Outdoor Recreation",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Outdoor Recreation",
                href: "#",
                children: [
                    { title: 'Camping' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Tents' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Sleeping Bags' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Backpacks' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Hiking' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Boots' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Poles' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Gear' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Water Sports' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Kayaks' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Life Jackets' ,
                      href: "/products/search/Casual"
                    },
                ]
            }]
        }, {
            title: "Team Sports",
            href: "#",
            component: MegaMenu1.name,
            children: [{
                title: "Team Sports",
                href: "#",
                children: [
                    { title: 'Soccer' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Balls' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Apparel' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Basketball' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Balls' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Shoes' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Tennis' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Rackets' ,
                      href: "/products/search/Casual"
                    },
                    { title: 'Balls' ,
                      href: "/products/search/Casual"
                    },
                ]
            }]
        }]
    },

    //Automotive
    {
        icon: Car,
        href: "/fashion",
        title: "Automotive",
        component: MegaMenu2.name,
        children: [
        {
            title: "Vehicle Parts & Accessories",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Vehicle Parts & Accessories",
                    href: "#",
                    children: [
                        { title: 'Car Electronics' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'GPS' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Stereos' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Tools & Equipment' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Wrenches' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Jacks' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Replacement Parts' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Brakes' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Batteries' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Interior Accessories' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Seat Covers' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Floor Mats' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Exterior Accessories' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Car Covers' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Bike Racks' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }]
    },
 
    //Special Needs
    {
        icon: Food,
        href: "/fashion",
        title: "Special Needs & Accessibility",
        component: MegaMenu2.name,
        children: [
        {
            title: "Mobility Aids",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Mobility Aids",
                    href: "#",
                    children: [
                        { title: 'Wheelchairs' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Walkers' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Canes' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Mobility Scooters' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        },{
            title: "Daily Living Aids",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Daily Living Aids",
                    href: "#",
                    children: [
                        { title: 'Dressing Aids' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Eating Aids' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Bathing Aids' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Communication Aids' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        },{
            title: "Accessibility Equipment",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Accessibility Equipment",
                    href: "#",
                    children: [
                        { title: 'Ramps' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Lifts' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Accessible Furniture' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }]
    },

    //Maternity & Prenatal Care
    {
        icon: Food,
        href: "/fashion",
        title: "Maternity & Prenatal Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Maternity Clothing",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Maternity Clothing",
                    href: "#",
                    children: [
                        { title: 'Dresses' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Tops' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Bottoms' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        },{
            title: "Prenatal Care",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Prenatal Care",
                    href: "#",
                    children: [
                        { title: 'Vitamins' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Support Bands' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Pregnancy Pillows' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Skincare' ,
                          href: "/products/search/Casual"
                        },
                    ]
                }
            ]
        },{
            title: "Baby Essentials",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Baby Essentials",
                    href: "#",
                    children: [
                        { title: 'Clothing' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Diapers' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Feeding' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Nursery' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }]
    },

    // Senior Care
    {
        icon: Food,
        href: "/fashion",
        title: "Senior Care",
        component: MegaMenu2.name,
        children: [
        {
            title: "Health & Wellness",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Health & Wellness",
                    href: "#",
                    children: [
                        { title: 'Supplements' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Monitors' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Mobility Aids' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Vision & Hearing Aids' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        },{
            title: "Comfort & Care",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Comfort & Care",
                    href: "#",
                    children: [
                        { title: 'Recliners' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Cushions' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Adjustable Beds' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Daily Living Aids' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },

            ]
        },{
            title: "Recreation & Leisure",
            href: "#",
            component: MegaMenu1.name,
            children: [
                {
                    title: "Recreation & Leisure",
                    href: "#",
                    children: [
                        { title: 'Puzzles' ,
                          href: "/products/search/Casual"
                        },
                        { title: 'Books' ,
                          href: "/products/search/Casual"
                        },
                    ]
                },
            ]
        }]
    },
    
    
];  

{/*
import MegaMenu1 from "../components/categories/mega-menu/mega-menu-1";
import MegaMenu2 from "../components/categories/mega-menu/mega-menu-2";
import Car from "../icons/Car";
import Man from "../icons/Man";
import Gift from "../icons/Gift";
import Food from "../icons/Food";
import Pets from "../icons/Pets";
import Dress from "../icons/Dress";
import Woman from "../icons/Woman";
import Laptop from "../icons/Laptop";
import MakeUp from "../icons/MakeUp";
import BabyBoy from "../icons/BabyBoy";
import BabyGirl from "../icons/BabyGirl";
import PlantPot from "../icons/PlantPot";
import MotorBike from "../icons/MotorBike";
import TeddyBear from "../icons/TeddyBear";
import Microphone from "../icons/Microphone";
export const categoryMenus = [{
  icon: Dress,
  title: "Fashion",
  href: "/fashion",
  component: MegaMenu1.name,
  offer: {
    url: "/assets/images/promotion/offer-1.png",
    href: "/sales-1",
    position: "right"
  },
  children: [{
    title: "Man Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }, {
    title: "Woman Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }]
}, {
  icon: Laptop,
  title: "Electronics",
  component: MegaMenu1.name,
  href: "/products/search/electronics",
  offer: {
    url: "/assets/images/promotion/offer-5.png",
    href: "/",
    position: "bottom"
  },
  children: [{
    title: "Man Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }, {
    title: "Woman Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }]
}, {
  icon: MotorBike,
  title: "Bikes",
  href: "/products/search/bikes",
  component: MegaMenu2.name,
  children: [{
    icon: Man,
    title: "Man",
    href: "#",
    component: MegaMenu1.name,
    children: [{
      title: "Man Clothes",
      href: "#",
      children: [{
        title: "Shirt",
        href: "/products/search/shirt"
      }, {
        title: "T- shirt",
        href: "/products/search/t-shirt"
      }, {
        title: "Pant",
        href: "/products/search/pant"
      }, {
        title: "Underwear",
        href: "/products/search/underwear"
      }]
    }, {
      title: "Accessories",
      href: "#",
      children: [{
        title: "Belt",
        href: "/products/search/belt"
      }, {
        title: "Hat",
        href: "/products/search/Hat"
      }, {
        title: "Watches",
        href: "/products/search/Watches"
      }, {
        title: "Sunglasses",
        href: "/products/search/Sunglasses"
      }]
    }, {
      title: "Shoes",
      href: "#",
      children: [{
        title: "Sneakers",
        href: "/products/search/Sneakers"
      }, {
        title: "Sandals",
        href: "/products/search/Sandals"
      }, {
        title: "Formal",
        href: "/products/search/Formal"
      }, {
        title: "Casual",
        href: "/products/search/Casual"
      }]
    }, {
      title: "Bags",
      href: "#",
      children: [{
        title: "Backpack",
        href: "/products/search/backpack"
      }, {
        title: "Crossbody Bags",
        href: "/products/search/Crossbody Bags"
      }, {
        title: "Side Bags",
        href: "/products/search/Side Bags"
      }, {
        title: "Slides",
        href: "/products/search/Slides"
      }]
    }]
  }, {
    icon: Woman,
    title: "Woman",
    href: "/products/search/electronics"
  }, {
    icon: BabyBoy,
    title: "Baby Boy",
    href: "/products/search/home&garden"
  }, {
    icon: BabyGirl,
    title: "Baby Girl",
    href: "/products/search/bikes"
  }]
}, {
  icon: PlantPot,
  title: "Home & Garden",
  href: "#",
  component: MegaMenu1.name,
  children: [{
    title: "Man Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }, {
    title: "Woman Clothes",
    href: "#",
    children: [{
      title: "Shirt",
      href: "/products/search/shirt"
    }, {
      title: "T- shirt",
      href: "/products/search/t-shirt"
    }, {
      title: "Pant",
      href: "/products/search/pant"
    }, {
      title: "Underwear",
      href: "/products/search/underwear"
    }]
  }, {
    title: "Accessories",
    href: "#",
    children: [{
      title: "Belt",
      href: "/products/search/belt"
    }, {
      title: "Hat",
      href: "/products/search/Hat"
    }, {
      title: "Watches",
      href: "/products/search/Watches"
    }, {
      title: "Sunglasses",
      href: "/products/search/Sunglasses"
    }]
  }, {
    title: "Shoes",
    href: "#",
    children: [{
      title: "Sneakers",
      href: "/products/search/Sneakers"
    }, {
      title: "Sandals",
      href: "/products/search/Sandals"
    }, {
      title: "Formal",
      href: "/products/search/Formal"
    }, {
      title: "Casual",
      href: "/products/search/Casual"
    }]
  }, {
    title: "Bags",
    href: "#",
    children: [{
      title: "Backpack",
      href: "/products/search/backpack"
    }, {
      title: "Crossbody Bags",
      href: "/products/search/Crossbody Bags"
    }, {
      title: "Side Bags",
      href: "/products/search/Side Bags"
    }, {
      title: "Slides",
      href: "/products/search/Slides"
    }]
  }]
}, {
  icon: Gift,
  title: "Gifts",
  href: "#",
  component: MegaMenu2.name,
  children: [{
    icon: Dress,
    title: "Fashion",
    href: "/products/search/fashion"
  }, {
    icon: Laptop,
    title: "Electronics",
    href: "/products/search/electronics"
  }, {
    icon: PlantPot,
    title: "Home & Garden",
    href: "/products/search/home&garden"
  }, {
    icon: MotorBike,
    title: "Bikes",
    href: "/products/search/bikes"
  }, {
    icon: Gift,
    title: "Gifts",
    href: "/products/search/gifts"
  }, {
    icon: Microphone,
    title: "Music",
    href: "/products/search/music"
  }, {
    icon: MakeUp,
    title: "Health & Beauty",
    href: "/products/search/health&beauty"
  }, {
    icon: Pets,
    title: "Pets",
    href: "/products/search/pets"
  }, {
    icon: TeddyBear,
    title: "Baby Toys",
    href: "/products/search/baby-toys"
  }, {
    icon: Food,
    title: "Groceries",
    href: "/products/search/groceries"
  }, {
    icon: Car,
    title: "Automotive",
    href: "/products/search/automotive"
  }]
}, {
  icon: Microphone,
  title: "Music",
  href: "/products/search/music"
}, {
  icon: MakeUp,
  title: "Health & Beauty",
  href: "/products/search/health&beauty"
}, {
  icon: Pets,
  title: "Pets",
  href: "/products/search/pets"
}, {
  icon: TeddyBear,
  title: "Baby Toys",
  href: "/products/search/baby-toys"
}, {
  icon: Food,
  title: "Groceries",
  href: "/products/search/groceries"
}, {
  icon: Car,
  title: "Automotive",
  href: "/products/search/automotive"
}];

*/}
