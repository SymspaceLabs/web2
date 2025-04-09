import UploadModel from "@/components/upload";

export const metadata = {
  title: "Upload 3D Model",
  description: `Symspace is an E-commerce website.`,
  authors: [{
    name: "SYMSPACE LABS",
    url: "https://symspacelabs.com"
  }],
  keywords: ["e-commerce", "e-commerce template", "next.js", "react"]
};

export default function Staging() {
  return <UploadModel />
}