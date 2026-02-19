import { Metadata } from "next";
import SellOnSymspacePage from "."

export const metadata: Metadata = {
  title: "Sell on Symspace - Symspace",
  description: "Sell on Symspace",
};

export default function SellOnSymspace() {
  return  <SellOnSymspacePage />;
}