import MobileCategoriesPageView from "./page-view";
import { categoryMenus } from "@/data/navigations";
import { MOBILE_NAVIGATION } from "@/data/mobileNavigation";

export default async function MobileCategories() {

  const data = {
    header:{
      categoryMenus,
      navigation:{}
    },
    mobileNavigation : {
      version1: MOBILE_NAVIGATION,
      logo:"/assets/images/logo.svg"
    }
  }

  return (
    <MobileCategoriesPageView data={data} />
  );
}