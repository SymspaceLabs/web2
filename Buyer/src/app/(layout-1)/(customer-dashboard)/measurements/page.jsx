import MeasurementPageView from "@/pages-sections/customer-dashboard/measurements/page-view/measurements";

export const metadata = {
  title: "Measurements",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "UI-LIB",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default async function Measurement() {

  return <MeasurementPageView />
}