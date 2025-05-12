// ================================================
// Payment Form
// ================================================

import { useState } from "react"; // MUI
import { H1 } from "@/components/Typography";
import { FlexBox } from "components/flex-box";
import { Card, Stack, Button, Divider, TextField, Radio, FormControlLabel } from "@mui/material";

import Link from "next/link";
import { CreditCardForm } from "@/components/custom-forms/checkout";

// ================================================

export default function PaymentForm() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  const handlePaymentMethodChange = event => {
    setPaymentMethod(event.target.name);
  };

      // CREDIT CARD
    const [cardNo, setCardNo] = useState("");
    const [expiryMonth, setExpiryMonth] = useState("");
    const [expiryYear, setExpiryYear] = useState("");
    const [cvv, setCvv] = useState(null);
    const [cardHolderName, setCardHolderName] = useState("");


  return (
      <Card sx={styles.wrapper}>
        
        {/* CREDIT CARD OPTION */}
        <FormLabel
          name="credit-card"
          title="Pay with credit card"
          handleChange={handlePaymentMethodChange}
          checked={paymentMethod === "credit-card"}
        />

        {paymentMethod === "credit-card" &&
          <CreditCardForm
              color="#000"
              cardNo={cardNo}
              setCardNo={setCardNo}
              expiryMonth={expiryMonth}
              setExpiryMonth={setExpiryMonth}
              expiryYear={expiryYear}
              setExpiryYear={setExpiryYear}
              cvv={cvv}
              setCvv={setCvv}
              cardHolderName={cardHolderName}
              setCardHolderName={setCardHolderName}
          />
        
        }

        <Divider sx={{ my: 3, mx:-4 }} />

        {/* PAYPAL CARD OPTION */}
        <FormLabel name="paypal" title="Pay with Paypal" handleChange={handlePaymentMethodChange} checked={paymentMethod === "paypal"} />

        <Divider sx={{my: 3,mx: -4}} />

        {/* Apple Pay */}
        <FormLabel name="apple" title="Pay with Apple Pay" handleChange={handlePaymentMethodChange} checked={paymentMethod === "apple"} />

        <Divider sx={{my: 3,mx: -4}} />

        {/* Google Pay */}
        <FormLabel name="google" title="Pay with Google Pay" handleChange={handlePaymentMethodChange} checked={paymentMethod === "google"} />
      
        {/* BUTTONS SECTION */}
        <Stack direction="row" spacing={3} pt={3}>
          <Button sx={styles.btn} LinkComponent={Link} href="/checkout" variant="outlined" color="primary" type="button" fullWidth>
            Back to checkout
          </Button>

          <Button sx={styles.btn} LinkComponent={Link} variant="contained" color="primary" href="/orders" type="submit" fullWidth>
            Place Order
          </Button>
        </Stack>
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
  },
  btn: {
    borderRadius: '25px',
  },
}

function FormLabel({
  name,
  checked,
  title,
  handleChange
}) {
  return(
    <FormControlLabel
      name={name}
      onChange={handleChange}
      label={
        <H1>
          {title}
        </H1>
      } 
      control={
        <Radio
          checked={checked}
          color="primary"
          size="small"
        />
      }
    />
  )
}