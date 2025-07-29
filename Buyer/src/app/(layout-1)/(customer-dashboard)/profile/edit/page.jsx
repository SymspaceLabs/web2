import { ProfilePageView } from "@/pages-sections/customer-dashboard/profile/page-view";

export const metadata = {
  title: "Profile ",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function ProfileEdit() {
  return (
    <ProfilePageView isEdit={true} />
  );
}