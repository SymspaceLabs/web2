import ProfilePage from "@/pages-section/profile";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Profile() {
  return <ProfilePage isEdit={true} />;
}