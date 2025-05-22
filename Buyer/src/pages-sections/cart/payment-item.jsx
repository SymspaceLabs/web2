// ================================================
// Payment Item
// ================================================

import { Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib";

// ==============================================================

export default function PaymentItem({
  title,
  amount
}) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="#000">{title}</Paragraph>
      <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
        {amount ? currency(amount) : currency(0.00)}
      </Paragraph>
    </FlexBetween>
  );
}