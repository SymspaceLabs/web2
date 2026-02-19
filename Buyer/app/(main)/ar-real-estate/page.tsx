import { Metadata } from "next";
import ArRealEstatePage from "."

export const metadata: Metadata = {
  title: "Ar Real Estate - Symspace",
  description: "Ar Real Estate",
};

export default function ArRealEstate() {
  return  <ArRealEstatePage />;
}