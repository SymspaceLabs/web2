import Link from "next/link";
import { H3 } from "@/components/Typography"; // ==============================================================

// ==============================================================
export default function ProductTitle({
  name,
  slug
}) {
  return (
    <Link href={`/products/${slug}`}>
      <H3 mb={1} ellipsis title={name} fontSize={14} fontWeight={600} fontFamily="Helvetica" className="title" color="#fff">
        {name}
      </H3>
    </Link>
  );
}