import Home from "@/icons/Home";
import User2 from "@/icons/User2";
import CategoryOutlined from "@/icons/CategoryOutline";
import ShoppingBagOutlined from "@/icons/ShoppingBagOutlined"; // GLOBAL CUSTOM HOOK

export const MOBILE_NAVIGATION = [{
    title: "Home",
    Icon: Home,
    href: "/"
  }, {
    title: "Category",
    Icon: CategoryOutlined,
    href: "/mobile-categories"
  }, {
    title: "Cart",
    Icon: ShoppingBagOutlined,
    href: "/cart"
  }, {
    title: "Account",
    Icon: User2,
    href: "/profile"
  }];