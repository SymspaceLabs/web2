// ==========================================
// Checkout 
// ==========================================

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@mui/material";
import { FlexBox } from "@/components/flex-box";
import { ShippingForm, BillingForm } from "@/components/custom-forms/checkout";

// ==========================================

export default function CheckoutForm() {
  const router = useRouter();

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });

  const [billing, setBilling] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    zip: ''
  });

  const handleFormSubmit = async () => {
    router.push("/payment");
  };

  return (
    <Card sx={styles.wrapper}>
      <ShippingForm
        shipping={shipping}
        setShipping={setShipping}
        sameAsShipping={sameAsShipping}
        setSameAsShipping={setSameAsShipping}
        setBilling={setBilling} // to auto-fill if sameAsShipping is true
      />
      
      <BillingForm
        billing={billing}
        setBilling={setBilling}
        sameAsShipping={sameAsShipping}
        shipping={shipping}
      />

      <FlexBox justifyContent="center" flexDirection={{ xs: "column", sm: "row" }} gap={3}>
        <Button
          sx={styles.btn}
          LinkComponent={Link}
          variant="outlined"
          color="primary"
          type="button"
          href="/cart"
          fullWidth
        >
          Back to Cart
        </Button>
        <Button
          sx={styles.btn}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleFormSubmit}
          fullWidth
        >
          Proceed to Payment
        </Button>
      </FlexBox>
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
