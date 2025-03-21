"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react"; // MUI ICON COMPONENTS

import Place from "@mui/icons-material/Place";
import Person from "@mui/icons-material/Person";
import CreditCard from "@mui/icons-material/CreditCard";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "@/components/flex-box";
import { H1, Paragraph, Span } from "@/components/Typography"; // CUSTOM ICON COMPONENT

import CustomerService from "@/icons/CustomerService"; // STYLED COMPONENTS

import { MainContainer, StyledNavLink } from "./styles";
import { Divider } from "@mui/material";
export default function Navigation() {
  const pathname = usePathname();
  return (
    <MainContainer>
      {MENUS.map(item => <Fragment key={item.title}>
          {item.title && 
            <H1 p="26px 26px 0px 0px" color="white" fontSize={16} >
              {item.title}
            </H1>
          }
          <Divider sx={{ marginBottom:'5px' }} />
          {item.list.map(({ Icon, count, href, title}) => <StyledNavLink href={href} key={title} isCurrentPath={pathname.includes(href)}>
              <FlexBox alignItems="center" gap={1}>
                <Icon color="inherit" fontSize="small" className="nav-icon" />
                <H1 fontSize='12px' color='#FFF'>
                  {title}
                </H1>
              </FlexBox>

              {/* <Span>{count}</Span> */}
            </StyledNavLink>)
          }
        </Fragment>)}
    </MainContainer>
  );
}
const MENUS = [{
  title: "DASHBOARD",
  list: [{
    href: "/orders",
    title: "Orders",
    Icon: ShoppingBagOutlined,
    count: 5
  }, {
    href: "/wish-list",
    title: "Wishlist",
    Icon: FavoriteBorder,
    count: 19
  }, {
    href: "/support-tickets",
    title: "Support Tickets",
    Icon: CustomerService,
    count: 1
  }]
}, {
  title: "ACCOUNT",
  list: [{
    href: "/profile",
    title: "Profile Info",
    Icon: Person,
    count: 3
  }, {
    href: "/measurements",
    title: "Measurements",
    Icon: Person,
    count: 3
  }, {
    href: "/preferences",
    title: "Preferences",
    Icon: Person,
    count: 3
  },{
    href: "/address",
    title: "Addresses",
    Icon: Place,
    count: 16
  }, {
    href: "/payment-methods",
    title: "Payment Methods",
    Icon: CreditCard,
    count: 4
  }]
}, {
  title: "",
  list: [{
    href: "/refer-a-friend",
    title: "Refer A Friend",
    Icon: Person,
    count: 3
  }, {
    href: "/business-portal",
    title: "Business Portal",
    Icon: Person,
    count: 3
  }]
}];