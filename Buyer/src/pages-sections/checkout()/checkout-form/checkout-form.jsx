// ==========================================
// Checkout 
// ==========================================

import Link from "next/link";
import { Card, IconButton } from "@mui/material";
import { FlexBox, FlexCol } from "@/components/flex-box";
import { ShippingForm, BillingForm } from "@/components/custom-forms/checkout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // <-- back icon

// ==========================================

export default function CheckoutForm({
  shipping,
  setShipping,
  sameAsShipping,
  setSameAsShipping,
  setBilling,
  billing,
}) {
 
  return (
    <Card sx={styles.wrapper}>
      {/* BACK ICON */}
      <FlexBox justifyContent="flex-start">
        <IconButton component={Link} href="/cart" color="#FFF">
          <ArrowBackIcon />
        </IconButton>
      </FlexBox>

      <FlexCol px={2}>
        <ShippingForm
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
