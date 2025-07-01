// ================================================
// Payment Item
// ================================================

import { Paragraph } from "components/Typography";
import { FlexBetween } from "components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTION
import { currency } from "lib"; // Assuming 'currency' function formats like "$19.99" or "-$19.99"

// ==============================================================

export default function PaymentItem({
  title,
  amount
}) {
  let displayAmount = amount;

  // Add negative symbol if it's a discount
  if (title === "Discount" && amount > 0) {
    displayAmount = -amount;
  }

  // Format the amount using the currency helper
  let formattedAmount = currency(displayAmount);

  // --- ADD A SPACE AFTER THE NEGATIVE SYMBOL IF PRESENT ---
  if (title === "Discount" && displayAmount < 0) {
    // Check if the formatted string starts with a negative sign
    if (formattedAmount.startsWith('-')) {
      // Find where the currency symbol starts after the negative sign (e.g., "-$" or "-€")
      // Assuming currency symbol is always right after the negative sign.
      // If your currency symbol can be at the end, this logic might need adjustment.
      const symbolIndex = formattedAmount.indexOf('$', 1); // Look for '$' after the first char
      if (symbolIndex > 0) {
        formattedAmount = formattedAmount.slice(0, symbolIndex) + ' ' + formattedAmount.slice(symbolIndex);
      } else {
        // Fallback for non-dollar currencies or if symbol is not found (e.g., just "-19.99")
        formattedAmount = formattedAmount.replace('-', '- ');
      }
    }
  }
  // --- END OF SPACE ADDITION ---

  return (
    <FlexBetween mb={1}>
      <Paragraph color="#000">{title}</Paragraph>
      <Paragraph fontSize={18} fontWeight={600} lineHeight={1}>
        {amount !== null ? formattedAmount : currency(0.00)}
      </Paragraph>
    </FlexBetween>
  );
}