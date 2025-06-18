// ================================================
// Payment Summary
// ================================================


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
  step
}) {
  
  const { state: cartState } = useCart();
  const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const subtotal = getTotalPrice();
  const shipping = 4.99
  const tax = 40; // or 0.1 * subtotal
  const discount = 0; // optionally calculate from vouchers
  const grandTotal = subtotal + tax - discount;
  
  return (
    <FlexCol gap={2}>
      <Card sx={styles.wrapper}>
        <H1 pb={3}>
            Payment Summary
        </H1>
        {/* <Box pb={2}>
          
          <Divider sx={{ borderColor: '#000'}} />
        </Box> */}
        <FlexCol pb={4}>
          <PaymentItem title="Subtotal" amount={getTotalPrice()}/>
          <PaymentItem title="Shipping" amount={shipping} />
          <PaymentItem title="Tax" amount={tax} />
          <PaymentItem title="Discount" amount={discount} />

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
      <VoucherForm />
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