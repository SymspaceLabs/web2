import { AccountSettingsPageView } from "../../../../pages-sections/vendor-dashboard/account-settings/page-view";
export const metadata = {
  title: "Account Settings - Next.js E-commerce Template",
  description: `Symspace is an Ecommerce Website`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};
export default function AccountSettings() {
  return <AccountSettingsPageView />;
}