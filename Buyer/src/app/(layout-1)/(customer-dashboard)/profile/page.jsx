import { ProfilePageView } from "../../../../pages-sections/customer-dashboard/profile/page-view";

export const metadata = {
  title: "Profile",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Profile() {


  return <ProfilePageView />;
}
