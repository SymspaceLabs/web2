// ==========================================
// Checkout 
// ==========================================

import Link from "next/link";
import { Card, IconButton } from "@mui/material";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { ShippingForm, BillingForm } from "@/components/custom-forms/checkout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // <-- back icon
import { H1 } from "@/components/Typography";

// ==========================================

export default function CheckoutForm({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  shipping,
  setShipping,
  sameAsShipping,
  setSameAsShipping,
  setBilling,
  billing,
  handleBack,
}) {
 
  return (
    <Card sx={styles.wrapper}>
      {/* BACK ICON */}
      <FlexBox justifyContent="flex-start" alignItems="center"  mb={2} >
        <IconButton onClick={handleBack} color="#FFF">
          <ArrowBackIcon />
        </IconButton>
        <H1 color="#000" fontSize={{ xs: 14, sm: 20 }}>
          Shipping Address
        </H1>
      </FlexBox>

      <FlexCol px={2}>
        <ShippingForm
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          shipping={shipping}
          setShipping={setShipping}
          sameAsShipping={sameAsShipping}
          setSameAsShipping={setSameAsShipping}
          setBilling={setBilling}
        />
        
        <BillingForm
          billing={billing}
          setBilling={setBilling}
          sameAsShipping={sameAsShipping}
          shipping={shipping}
        />
      </FlexCol>

    </Card>
  );
}

const styles = {
  wrapper: {
    p: 3,
    mb: 4,
    borderRadius: "25px",
    backdropFilter: 'blur(10.0285px)',
    boxShadow: 'inset 0px 3px 6px rgba(255,255,255,0.4), inset 0px -3px 9px rgba(255,255,255,0.5), inset 0px -1.5px 20px rgba(255,255,255,0.24), inset 0px 20px 20px rgba(255,255,255,0.24), inset 0px 1px 20.5px rgba(255,255,255,0.8)',
    background: 'rgba(255,255,255,0.35)',
  },
  btn: {
    borderRadius: '25px',
  },
};
