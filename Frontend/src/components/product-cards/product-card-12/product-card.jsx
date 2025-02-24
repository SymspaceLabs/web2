import Link from "next/link";
import { H6 } from "@/components/Typography";
import { LazyImage } from "@/components/lazy-image";
import { FlexBox } from "@/components/flex-box";
import { Rating } from "@mui/material";
import { calculateDiscount, currency } from "@/lib";
import { PriceText } from "./styles";

// ==============================================================
export default function ProductCard12({
  product
}) {
  const {
    slug,
    title,
    thumbnail,
    price,
    discount,
    rating
  } = product || {};
  return <Link href={`/products/${slug}`}>
      <FlexBox bgcolor="grey.50" borderRadius={3} mb={2}>
        <LazyImage alt={title} width={380} height={379} src={thumbnail} />
      </FlexBox>

      <div>
        <Rating readOnly value={rating} size="small" precision={0.5} />
        <H6 fontSize={17} fontWeight={700}>
          {title}
        </H6>

        <PriceText>
          {discount ? <span className="base-price">{currency(price)}</span> : null}
          {calculateDiscount(price, discount)}
        </PriceText>
      </div>
    </Link>;
}