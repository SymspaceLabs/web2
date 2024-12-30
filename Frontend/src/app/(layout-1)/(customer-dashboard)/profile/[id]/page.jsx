import { ProfileEditPageView } from "../../../../../pages-sections/customer-dashboard/profile/page-view"; // API FUNCTIONS
export const metadata = {
  title: "Profile - Bazaar Next.js E-commerce Template",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://ui-lib.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};
export default async function ProfileEdit() {

  return <ProfileEditPageView />;
}