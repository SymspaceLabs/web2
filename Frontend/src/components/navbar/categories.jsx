import ChevronRight from "@mui/icons-material/ChevronRight"; // GLOBAL CUSTOM COMPONENTS
import { useCallback, useEffect, useState } from "react";
import styled from "@mui/material/styles/styled";
import { Paragraph } from "../../components/Typography";
// import CategoryMenu from "../../components/categories/category-menu"; // CUSTOM ICON COMPONENT
// import CategoryList from "../categories/category-list";
import Category from "../../icons/Category"; // STYLED COMPONENT
import { FlexBox } from "../flex-box";
import { CategoryMenuButton } from "./styles";
import { NAV_LINK_STYLES } from "./styles";
import { KeyboardArrowDown } from "@mui/icons-material";
import { ChildNavListWrapper } from "./styles";
import { StyledNavLink } from "./styles";
import BazaarCard from "../BazaarCard";
import { NavLink } from "../nav-link";
import { MenuItem } from "@mui/material";
import NavItemChild from "./nav-list/nav-item-child";

export default function Categories() {
  return (
    <CategoryMenu
      render={handler =>  <></>
      // <CategoryMenuButton variant="text" onClick={e => handler(e)}>
      //   <div className="prefix">
      //     <Category fontSize="small" currentcolor="#fff" />
      //     <Paragraph color="#fff" fontFamily="Elemental End" fontWeight="600">
      //       Categories
      //     </Paragraph>
      //   </div>
      //   {/* <ChevronRight className="dropdown-icon" fontSize="small" /> */}
      // </CategoryMenuButton>
      }
    />
  );
}

const CategoryMenu = ({ render}) => {
  const [open, setOpen] = useState(false);

  const onClick = e => {
    e.stopPropagation();
    setOpen(open => !open);
  };

  const handleDocumentClick = useCallback(() => setOpen(false), []);
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => window.removeEventListener("click", handleDocumentClick);
  }, [handleDocumentClick]);
  return <Wrapper open={open}>
      {render(onClick)}
      {/* <CategoryBasedMenu title={nav.title} menuList={nav.child} />; */}
      {/* <CategoryList open={open} /> */}
      <NavigationList />
    </Wrapper>;
}

function NavigationList() {
  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map(nav => {
      if (isRoot) {

        // if (nav.url) {
        //   return <StyledNavLink href={nav.url} key={nav.title} sx={{ "&:hover": { backgroundColor: "#000" } }}>
        //       {nav.title}
        //     </StyledNavLink>;
        // }

        if (nav.child) {
          return <FlexBox sx={{ "&:hover": { "& > .child-nav-item": { display: "block" } }}} key={nav.title} alignItems="center" position="relative" flexDirection="column" >
              {/* <FlexBox alignItems="flex-end" gap={0.3} sx={NAV_LINK_STYLES}>
                {nav.title} <KeyboardArrowDown sx={{ color: "grey.500", fontSize: "1.1rem"}} />
              </FlexBox> */}
              <CategoryMenuButton variant="text" onClick={e => handler(e)}>
                <div className="prefix">
                  <Category fontSize="small" currentcolor="#fff" />
                  <Paragraph color="#fff" fontFamily="Elemental End" fontWeight="600">
                    Categories
                  </Paragraph>
                </div>
                {/* <ChevronRight className="dropdown-icon" fontSize="small" /> */}
              </CategoryMenuButton>

              <ChildNavListWrapper className="child-nav-item">
                <BazaarCard elevation={3} sx={{ mt: 2.5, py: 1, minWidth: 100 }}>
                  {renderNestedNav(nav.child)}
                </BazaarCard>
              </ChildNavListWrapper>
            </FlexBox>;
        }
      } else {
        if (nav.url) {
          return (
            <NavLink href={nav.url} key={nav.title} sx={{ "&:hover": { backgroundColor: "#000" }, }}>
              <MenuItem>{nav.title}</MenuItem>
            </NavLink>
          )
        }

        if (nav.child) {
          return <NavItemChild nav={nav} key={nav.title}>
              {renderNestedNav(nav.child)}
            </NavItemChild>;
        }
      }
    });
  };

  return <FlexBox gap={4}>{renderNestedNav(navigation, true)}</FlexBox>;
}



const Wrapper = styled("div", {
  shouldForwardProp: prop => prop !== "open"
})(({
  open,
  theme: {
    direction
  }
}) => ({
  cursor: "pointer",
  position: "relative",
  "& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${open ? direction === "rtl" ? "-90deg" : "90deg" : "0deg"})`
  }
}));


const navigation = [
  // AR FOR BUSINESS
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
              url: "/market-1"
            },{
              title: "Formal Dresses",
              url: "/market-1"
            },{
              title: "Summer Dresses",
              url: "/market-1"
            }],
          }, {
            title: "Tops",
            child: [{
              title: "Blouses",
              url: "/market-1"
            },{
              title: "T-Shirts",
              url: "/market-1"
            },{
              title: "Sweaters",
              url: "/market-1"
            },{
              title: "Cardigans",
              url: "/market-1"
            }],
          }, {
          title: "Shirts",
          child: [{
            title: "Casual Shirts",
            url: "/market-1"
          }, {
            title: "Dress Shirts",
            url: "/market-1"
          }, {
            title: "Polo Shirts",
            url: "/market-1"
          }],
          }, {
            title: "Bottoms",
            child: [{
              title: "Jeans",
              url: "/market-1"
            }, {
              title: "Trousers",
              url: "/market-1"
            }, {
              title: "Shorts",
              url: "/market-1"
            }, {
              title: "Skirts",
              url: "/market-1"
            }, {
              title: "Pants",
              url: "/market-1"
            }],
          }, {
            title: "Outerwear",
            child: [{
              title: "Jackets",
              url: "/market-1"
            }, {
              title: "Coats",
              url: "/market-1"
            }, {
              title: "Blazers",
              url: "/market-1"
            }, {
              title: "Vests",
              url: "/market-1"
            }, {
              title: "Hoodies",
              url: "/market-1"
            }, {
              title: "Suits",
              url: "/market-1"
            }],
          }, {
            title: "Activewear",
            child: [{
              title: "Leggings",
              url: "/market-1"
            }, {
              title: "Sport bras",
              url: "/market-1"
            }, {
              title: "Track pants",
              url: "/market-1"
            }, {
              title: "Workout Tops",
              url: "/market-1"
            }, {
              title: "Yoga pants",
              url: "/market-1"
            }, {
              title: "Sports shorts",
              url: "/market-1"
            }, {
              title: "Joggers",
              url: "/market-1"
            }, {
              title: "Gym Shorts",
              url: "/market-1"
            }, {
              title: "Sweatshirts",
              url: "/market-1"
            }, {
              title: "Compression Wear",
              url: "/market-1"
            }],
          }, {
            title: "Intimates",
            child: [
              {
              title: "Lingerie",
              url: "/market-1"
              }, {
                title: "Sleepwear",
                url: "/market-1"
              }
            ],
          }, {
            title: "Shoes",
            child: [
              {
              title: "Sandals",
              url: "/market-1"
              }, {
                title: "Flats",
                url: "/market-1"
              }, {
                title: "Heels",
                url: "/market-1"
              }, {
                title: "Boots",
                url: "/market-1"
              }, {
                title: "Sneakers",
                url: "/market-1"
              }, {
                title: "Athletic Shoes",
                url: "/market-1"
              }, {
                title: "Formal Shoes",
                url: "/market-1"
              }, {
                title: "Casual Shoes",
                url: "/market-1"
              }
            ],
          }, {
            title: "Accessories",
            child: [
              {
              title: "Handbags",
              url: "/market-1"
              }, {
                title: "Jewelry",
                url: "/market-1"
              }, {
                title: "Watches",
                url: "/market-1"
              }, {
                title: "Scarves",
                url: "/market-1"
              }, {
                title: "Ties",
                url: "/market-1"
              }, {
                title: "Wallets",
                url: "/market-1"
              }, {
                title: "Backpacks",
                url: "/market-1"
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
                url: "/market-1",
              },
              {
                title: "Cases & Covers",
                url: "/market-1",
              },
              {
                title: "Screen Protectors",
                url: "/market-1",
              },
              {
                title: "Chargers & Cables",
                url: "/market-1",
              },
              {
                title: "Power Banks",
                url: "/market-1",
              },
            ],
          },
          {
            title: "Computers & Accessories",
            child: [
              {
                title: "Laptops",
                url: "/market-1",
              },
              {
                title: "Desktops",
                url: "/market-1",
              },
              {
                title: "Monitors",
                url: "/market-1",
              },
              {
                title: "Keyboards & Mice",
                url: "/market-1",
              },
              {
                title: "Printers & Scanners",
                url: "/market-1",
              },
            ],
          },
          {
            title: "Home Entertainment",
            child: [
              {
                title: "Televisions",
                url: "/market-1",
              },
              {
                title: "Sound Systems",
                url: "/market-1",
              },
              {
                title: "Streaming Devices",
                url: "/market-1",
              },
              {
                title: "Blu-ray & DVD Players",
                url: "/market-1",
              },
            ],
          },
          {
            title: "Cameras & Photography",
            child: [
              {
                title: "Digital Cameras",
                url: "/market-1",
              },
              {
                title: "Lenses",
                url: "/market-1",
              },
              {
                title: "Tripods",
                url: "/market-1",
              },
              {
                title: "Camera Accessories",
                url: "/market-1",
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
              { title: "Living Room", url: "/market-1" },
              { title: "Sofas", url: "/market-1" },
              { title: "Coffee Tables", url: "/market-1" },
              { title: "TV Stands", url: "/market-1" },
              { title: "Recliners", url: "/market-1" },
              { title: "Bedroom", url: "/market-1" },
              { title: "Beds", url: "/market-1" },
              { title: "Dressers", url: "/market-1" },
              { title: "Nightstands", url: "/market-1" },
              { title: "Wardrobes", url: "/market-1" },
              { title: "Office", url: "/market-1" },
              { title: "Desks", url: "/market-1" },
              { title: "Office Chairs", url: "/market-1" },
              { title: "Bookcases", url: "/market-1" },
              { title: "Outdoor", url: "/market-1" },
              { title: "Patio Sets", url: "/market-1" },
              { title: "Outdoor Chairs", url: "/market-1" },
              { title: "Garden Storage", url: "/market-1" },
            ],
          },
          {
            title: "Home Decor",
            child: [
              { title: "Lighting", url: "/market-1" },
              { title: "Lamps", url: "/market-1" },
              { title: "Ceiling Lights", url: "/market-1" },
              { title: "Wall Lights", url: "/market-1" },
              { title: "Rugs", url: "/market-1" },
              { title: "Wall Art", url: "/market-1" },
              { title: "Clocks", url: "/market-1" },
              { title: "Mirrors", url: "/market-1" },
            ],
          },
          {
            title: "Kitchen & Dining",
            child: [
              { title: "Cookware", url: "/market-1" },
              { title: "Pots & Pans", url: "/market-1" },
              { title: "Bakeware", url: "/market-1" },
              { title: "Tableware", url: "/market-1" },
              { title: "Dinner Sets", url: "/market-1" },
              { title: "Glassware", url: "/market-1" },
              { title: "Cutlery", url: "/market-1" },
              { title: "Kitchen Storage", url: "/market-1" },
              { title: "Containers", url: "/market-1" },
              { title: "Racks & Holders", url: "/market-1" },
              { title: "Small Appliances", url: "/market-1" },
              { title: "Toasters", url: "/market-1" },
              { title: "Blenders", url: "/market-1" },
              { title: "Coffee Makers", url: "/market-1" },
            ],
          },
          {
            title: "Large Appliances",
            child: [
              { title: "Refrigerators", url: "/market-1" },
              { title: "Washing Machines", url: "/market-1" },
              { title: "Ovens", url: "/market-1" },
              { title: "Dishwashers", url: "/market-1" },
            ],
          },
        ],
      },
      
      
      // Beauty, Health & Personal Care
      {
        title: "Beauty, Health & Personal Care",
        child: [
          {
            title: "Beauty",
            child: [
              { title: "Skincare", url: "/market-1" },
              { title: "Moisturizers", url: "/market-1" },
              { title: "Cleansers", url: "/market-1" },
              { title: "Serums", url: "/market-1" },
              { title: "Masks", url: "/market-1" },
              { title: "Haircare", url: "/market-1" },
              { title: "Shampoos", url: "/market-1" },
              { title: "Conditioners", url: "/market-1" },
              { title: "Hair Treatments", url: "/market-1" },
              { title: "Styling Tools", url: "/market-1" },
              { title: "Makeup", url: "/market-1" },
              { title: "Foundations", url: "/market-1" },
              { title: "Lipsticks", url: "/market-1" },
              { title: "Eyeshadows", url: "/market-1" },
              { title: "Mascaras", url: "/market-1" },
              { title: "Blushes", url: "/market-1" },
              { title: "Makeup Tools", url: "/market-1" },
              { title: "Concealers", url: "/market-1" },
              { title: "Powders", url: "/market-1" },
              { title: "Eyeliners", url: "/market-1" },
              { title: "Brow Products", url: "/market-1" },
              { title: "Fragrances", url: "/market-1" },
              { title: "Perfumes", url: "/market-1" },
              { title: "Body Sprays", url: "/market-1" },
            ],
          },
          {
            title: "Health & Wellness",
            child: [
              { title: "Vitamins & Supplements", url: "/market-1" },
              { title: "Medical Equipment", url: "/market-1" },
              { title: "Fitness Equipment", url: "/market-1" },
              { title: "Health Monitors", url: "/market-1" },
            ],
          },
          {
            title: "Personal Care",
            child: [
              { title: "Oral Care", url: "/market-1" },
              { title: "Toothbrushes", url: "/market-1" },
              { title: "Toothpaste", url: "/market-1" },
              { title: "Bath & Body", url: "/market-1" },
              { title: "Body Wash", url: "/market-1" },
              { title: "Lotions", url: "/market-1" },
              { title: "Hand Sanitizers", url: "/market-1" },
              { title: "Shaving & Hair Removal", url: "/market-1" },
              { title: "Razors", url: "/market-1" },
              { title: "Shaving Cream", url: "/market-1" },
              { title: "Hair Removal Devices", url: "/market-1" },
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
              { title: "Diapers", url: "/market-1" },
              { title: "Disposable Diapers", url: "/market-1" },
              { title: "Cloth Diapers", url: "/market-1" },
              { title: "Feeding", url: "/market-1" },
              { title: "Bottles", url: "/market-1" },
              { title: "Breastfeeding Accessories", url: "/market-1" },
              { title: "Baby Gear", url: "/market-1" },
              { title: "Strollers", url: "/market-1" },
              { title: "Car Seats", url: "/market-1" },
              { title: "Carriers", url: "/market-1" },
              { title: "Nursery", url: "/market-1" },
              { title: "Cribs", url: "/market-1" },
              { title: "Changing Tables", url: "/market-1" },
              { title: "Baby Monitors", url: "/market-1" },
            ],
          },
          {
            title: "Toys",
            child: [
              { title: "Educational", url: "/market-1" },
              { title: "Learning Toys", url: "/market-1" },
              { title: "STEM Toys", url: "/market-1" },
              { title: "Action Figures", url: "/market-1" },
              { title: "Dolls & Accessories", url: "/market-1" },
              { title: "Outdoor Play", url: "/market-1" },
              { title: "Playhouses", url: "/market-1" },
              { title: "Slides", url: "/market-1" },
              { title: "Swings", url: "/market-1" },
            ],
          },
          {
            title: "Kids Clothing",
            child: [
              { title: "Girls", url: "/market-1" },
              { title: "Boys", url: "/market-1" },
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
              { title: "Fruits", url: "/market-1" },
              { title: "Vegetables", url: "/market-1" },
            ],
          },
          {
            title: "Pantry Staples",
            child: [
              { title: "Snacks", url: "/market-1" },
              { title: "Beverages", url: "/market-1" },
              { title: "Tea", url: "/market-1" },
              { title: "Coffee", url: "/market-1" },
              { title: "Soft Drinks", url: "/market-1" },
              { title: "Baking", url: "/market-1" },
              { title: "Flour", url: "/market-1" },
              { title: "Sugar", url: "/market-1" },
              { title: "Baking Mixes", url: "/market-1" },
            ],
          },
          {
            title: "Meat & Seafood",
            child: [
              { title: "Fresh Meat", url: "/market-1" },
              { title: "Seafood", url: "/market-1" },
            ],
          },
          {
            title: "Dairy",
            child: [
              { title: "Milk", url: "/market-1" },
              { title: "Cheese", url: "/market-1" },
              { title: "Eggs", url: "/market-1" },
            ],
          },
          {
            title: "Frozen Foods",
            child: [
              { title: "Vegetables", url: "/market-1" },
              { title: "Meats", url: "/market-1" },
              { title: "Desserts", url: "/market-1" },
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
              { title: "Cardio Machines", url: "/market-1" },
              { title: "Treadmills", url: "/market-1" },
              { title: "Exercise Bikes", url: "/market-1" },
              { title: "Strength Training", url: "/market-1" },
              { title: "Dumbbells", url: "/market-1" },
              { title: "Weight Benches", url: "/market-1" },
              { title: "Fitness Accessories", url: "/market-1" },
              { title: "Yoga Mats", url: "/market-1" },
              { title: "Resistance Bands", url: "/market-1" },
            ],
          },
          {
            title: "Outdoor Recreation",
            child: [
              { title: "Camping", url: "/market-1" },
              { title: "Tents", url: "/market-1" },
              { title: "Sleeping Bags", url: "/market-1" },
              { title: "Backpacks", url: "/market-1" },
              { title: "Hiking", url: "/market-1" },
              { title: "Boots", url: "/market-1" },
              { title: "Poles", url: "/market-1" },
              { title: "Gear", url: "/market-1" },
              { title: "Water Sports", url: "/market-1" },
              { title: "Kayaks", url: "/market-1" },
              { title: "Life Jackets", url: "/market-1" },
            ],
          },
          {
            title: "Team Sports",
            child: [
              { title: "Soccer", url: "/market-1" },
              { title: "Balls", url: "/market-1" },
              { title: "Apparel", url: "/market-1" },
              { title: "Basketball", url: "/market-1" },
              { title: "Balls", url: "/market-1" },
              { title: "Shoes", url: "/market-1" },
              { title: "Tennis", url: "/market-1" },
              { title: "Rackets", url: "/market-1" },
              { title: "Balls", url: "/market-1" },
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
              { title: "Car Electronics", url: "/market-1" },
              { title: "GPS", url: "/market-1" },
              { title: "Stereos", url: "/market-1" },
              { title: "Tools & Equipment", url: "/market-1" },
              { title: "Wrenches", url: "/market-1" },
              { title: "Jacks", url: "/market-1" },
              { title: "Replacement Parts", url: "/market-1" },
              { title: "Brakes", url: "/market-1" },
              { title: "Batteries", url: "/market-1" },
              { title: "Interior Accessories", url: "/market-1" },
              { title: "Seat Covers", url: "/market-1" },
              { title: "Floor Mats", url: "/market-1" },
              { title: "Exterior Accessories", url: "/market-1" },
              { title: "Car Covers", url: "/market-1" },
              { title: "Bike Racks", url: "/market-1" },
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
              { title: "Wheelchairs", url: "/market-1" },
              { title: "Walkers", url: "/market-1" },
              { title: "Canes", url: "/market-1" },
              { title: "Mobility Scooters", url: "/market-1" },
            ],
          },
          {
            title: "Daily Living Aids",
            child: [
              { title: "Dressing Aids", url: "/market-1" },
              { title: "Eating Aids", url: "/market-1" },
              { title: "Bathing Aids", url: "/market-1" },
              { title: "Communication Aids", url: "/market-1" },
            ],
          },
          {
            title: "Accessibility Equipment",
            child: [
              { title: "Ramps", url: "/market-1" },
              { title: "Lifts", url: "/market-1" },
              { title: "Accessible Furniture", url: "/market-1" },
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
              { title: "Dresses", url: "/market-1" },
              { title: "Tops", url: "/market-1" },
              { title: "Bottoms", url: "/market-1" },
            ],
          },
          {
            title: "Prenatal Care",
            child: [
              { title: "Vitamins", url: "/market-1" },
              { title: "Support Bands", url: "/market-1" },
              { title: "Pregnancy Pillows", url: "/market-1" },
              { title: "Skincare", url: "/market-1" },
            ],
          },
          {
            title: "Baby Essentials",
            child: [
              { title: "Clothing", url: "/market-1" },
              { title: "Diapers", url: "/market-1" },
              { title: "Feeding", url: "/market-1" },
              { title: "Nursery", url: "/market-1" },
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
              { title: "Supplements", url: "/market-1" },
              { title: "Monitors", url: "/market-1" },
              { title: "Mobility Aids", url: "/market-1" },
              { title: "Vision & Hearing Aids", url: "/market-1" },
            ],
          },
          {
            title: "Comfort & Care",
            child: [
              { title: "Recliners", url: "/market-1" },
              { title: "Cushions", url: "/market-1" },
              { title: "Adjustable Beds", url: "/market-1" },
              { title: "Daily Living Aids", url: "/market-1" },
            ],
          },
          {
            title: "Recreation & Leisure",
            child: [
              { title: "Puzzles", url: "/market-1" },
              { title: "Books", url: "/market-1" },
            ],
          },
        ],
      },

    ]
  }, 

];

