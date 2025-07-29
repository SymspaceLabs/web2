import MeasurementPageView from "@/pages-sections/customer-dashboard/measurements/page-view/measurements";

export const metadata = {
  title: "Measurements",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://www.symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Measurement() {

  return <MeasurementPageView />
}