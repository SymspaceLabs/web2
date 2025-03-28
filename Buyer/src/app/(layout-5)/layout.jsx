import ShopLayout1 from "@/components/layouts/shop-layout-1";
export default function Layout({
  children
}) {
  return (
    <ShopLayout1 noFooter={true}>
      {children}
    </ShopLayout1>
  );
}