// ================================================
// Payment Summary
// ================================================

import { currency } from "lib";
import { useCart } from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
import { Divider, Card, Box } from "@mui/material"; // LOCAL CUSTOM COMPONENT
import { Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import PaymentItem from "./payment-item"; // GLOBAL CUSTOM COMPONENTS

// ================================================

export default function PaymentSummary() {
  
  const { state: cartState } = useCart();
  const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const subtotal = getTotalPrice();
  const shipping = 4.99
  const tax = 40; // or 0.1 * subtotal
  const discount = 0; // optionally calculate from vouchers
  const grandTotal = subtotal + tax - discount;
  
  return (
    <Card sx={styles.wrapper}>
      <PaymentItem
        title="Subtotal:"
        amount={getTotalPrice()}
      />
      <PaymentItem title="Shipping:" amount={shipping} />
      <PaymentItem title="Tax:" amount={tax} />
      <PaymentItem title="Discount:" amount={discount} />

      <Box py={2}>
        <Divider sx={{ borderColor: '#000'}} />
      </Box>

      <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
        {currency(grandTotal)}
      </Paragraph>
    </Card>
  );
}

const styles = {
  wrapper : {
    p:3,
    borderRadius: "25px",
    backdropFilter: 'blur(10.0285px)',
    boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)', 
    background: 'rgba(255, 255, 255, 0.35)',
  }
}