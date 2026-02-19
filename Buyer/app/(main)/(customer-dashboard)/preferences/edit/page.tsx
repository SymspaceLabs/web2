import type { Metadata } from "next";
import PreferencesPage from "@/pages-section/preferences";

export const metadata: Metadata = {
  title: "Preferences",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Measurement() {
  return <PreferencesPage isEdit={true} />;
}