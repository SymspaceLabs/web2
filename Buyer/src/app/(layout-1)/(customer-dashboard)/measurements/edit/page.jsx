import MeasurementEditPageView from "@/pages-sections/customer-dashboard/measurements/page-view/measurements-edit";

export const metadata = {
  title: "Measurements",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce"]
};

export default async function Measurement() {

  return <MeasurementEditPageView isEdit={true} />
}