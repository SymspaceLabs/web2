// ================================================
// Payment Summary
// ================================================

import { useState, useEffect } from "react"; // Added useEffect
import { currency } from "lib";
import { useCart } from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
import { H1, Paragraph } from "components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION
import { Box, Card, Divider } from "@mui/material";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { SymButton } from "@/components/custom-components";

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PaymentItem from "./payment-item"; // GLOBAL CUSTOM COMPONENTS
import VoucherForm from "./voucher-form";

// ================================================

export default function PaymentSummary({
  btnText="Place Order",
  handleSave,
  loading,
  step,
  // New props to receive callbacks from parent
  onDiscountChange, // Callback to update discountAmount in parent
  onPromoCodeApplied, // Callback to update promoCodeId in parent
}) {

  const { state: cartState } = useCart();
  // const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Updated getTotalPrice function with the new logic
  const getTotalPrice = () => {
    return cartState.cart.reduce((acc, item) => {
      // Check if a salePrice exists and is valid (less than the original price)
      const priceToUse = (item.salePrice > 0 && item.salePrice < item.price) 
        ? item.salePrice 
        : item.price;
        
      return acc + priceToUse * item.qty;
    }, 0);
  };

  const subtotal = getTotalPrice();
  const shipping = 4.99; // Assuming fixed shipping
  const tax = 0; // Assuming fixed tax (or you can calculate: 0.1 * subtotal)

  // Internal state for discount and applied promo code (received from VoucherForm)
  const [internalDiscountAmount, setInternalDiscountAmount] = useState(0);
  const [internalAppliedPromoCode, setInternalAppliedPromoCode] = useState(null);

  // Callback function to receive the discount from VoucherForm
  const handleDiscountApplied = (amount, promoCode) => {
    // Ensure amount is a valid number, defaulting to 0 if not
    const safeAmount = Number(amount) || 0;
    setInternalDiscountAmount(safeAmount);
    setInternalAppliedPromoCode(promoCode);

    // Propagate changes up to the parent component
    if (onDiscountChange) {
      onDiscountChange(safeAmount); // Pass safeAmount to parent
    }
    if (onPromoCodeApplied) {
      onPromoCodeApplied(promoCode?.id); // Pass only the ID to the parent
    }
  };

  // Calculate grandTotal using the internal discountAmount
  let grandTotal = subtotal + shipping + tax - internalDiscountAmount;
  if (grandTotal < 0) grandTotal = 0; // Ensure total doesn't go negative

  return (
    <FlexCol gap={2}>
      <Card sx={styles.wrapper}>
        <H1 pb={3}>
            Payment Summary
        </H1>
        <FlexCol pb={4}>
          <PaymentItem title="Subtotal" amount={subtotal}/> {/* Use calculated subtotal */}
          <PaymentItem title="Shipping" amount={shipping} />
          <PaymentItem title="Tax" amount={tax} />
          <PaymentItem title="Discount" amount={internalDiscountAmount} /> {/* Use internal state for display */}

          <Box py={2}>
            <Divider sx={{ borderColor: 'rgba(0,0,0,0.2)'}} />
          </Box>

          <FlexBox justifyContent="space-between" alignItems="center">
            <Paragraph>
              Order total
            </Paragraph>
            <Paragraph fontSize={25} fontWeight={600} lineHeight={1} textAlign="right">
              {currency(grandTotal)}
            </Paragraph>
          </FlexBox>

        </FlexCol>

        {/* BUTTONS SECTION */}
        <SymButton
          onClick={handleSave}
          loading={loading}
          sx={styles.btn}
        >
          {
            step < 2 ?
              <FlexBox width="100%" justifyContent="space-between">
                <Box minWidth="25px" />
                {btnText}
                <ArrowForwardIcon color="#FFF" />
              </FlexBox>
            :
              btnText
          }
        </SymButton>
      </Card>

      {/* Pass cartTotal and the callback function to VoucherForm */}
      <VoucherForm
        cartTotal={subtotal} // Pass the current subtotal
        onDiscountApplied={handleDiscountApplied} // Pass the callback to receive discount and promo code
      />
    </FlexCol>
  );
}

const styles = {
  wrapper : {
    p:3,
    borderRadius: "25px",
    backdropFilter: 'blur(10.0285px)',
    boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)',
    background: 'rgba(255, 255, 255, 0.35)',
  },
  btn : {
    py: 1.5,
    borderRadius:'50px',
    border:'2px solid #FFF',
    background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
    color:'#FFF',
    '&:hover': {
      background:'transaparent',
    }
  }
}
