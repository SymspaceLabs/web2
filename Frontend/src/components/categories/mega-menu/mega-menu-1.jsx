import Link from "next/link"; // MUI
import ColumnList from "./column-list"; // DATA TYPE

// =========================================================
export default function MegaMenu1({
  banner,
  data
}) {
  return <ColumnList list={data} banner={banner}>
      {banner?.position === "bottom" ? <Link href={banner.href}></Link> : null}
    </ColumnList>;
}