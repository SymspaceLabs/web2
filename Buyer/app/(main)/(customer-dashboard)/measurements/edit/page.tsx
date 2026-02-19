import type { Metadata } from "next";
import MeasurementPage from "@/pages-section/measurements";

export const metadata: Metadata = {
  title: "Measurements",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default function Measurement() {
  return <MeasurementPage isEdit={true} />;
}