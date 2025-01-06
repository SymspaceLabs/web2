import { PreferencesPageView } from "../../../../pages-sections/customer-dashboard/preferences/page-view"; // API FUNCTIONS

export const metadata = {
  title: "Preferences",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Preferences() {
  return (
    <PreferencesPageView />
  )
}
