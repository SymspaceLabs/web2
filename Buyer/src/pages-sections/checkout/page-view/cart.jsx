"use client";

// ======================================================
// Cart Page Sections
// ======================================================

import { useCart } from "hooks/useCart";
import { Grid, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import Stepper from "../stepper";
import CartItem from "../cart-item";
import PaymentForm from "../payment-form";
import VoucherForm from "../voucher-form";
import CheckoutForm from "../checkout-form";
import VoucherForm2 from "../voucher-form-2";
import PaymentSummary from "../payment-summary";

// ======================================================

const STEPPER_LIST = [
  { title: "Cart", disabled: false },
  { title: "Details", disabled: false },
  { title: "Payment", disabled: false },
];

export default function MultiStepCheckout() {

  const { state: cartState, dispatch } = useCart();
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();
  const router = useRouter();
  

  // Checkout state
  const [selectedStep, setSelectedStep] = useState(0);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [userData, setUserData] = useState(null);
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [shipping, setShipping] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  });

  const [billing, setBilling] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    country: "",
    zip: ""
  });

  const [loading, setLoading] = useState(false);

  // fetch user once
  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`);
      const data = await res.json();
      setUserData(data);
      setFirstName(userData?.firstName || "");
      setLastName(userData?.lastName || "");
      setEmail(userData?.email || "");
      
    })();
  }, [user?.id, selectedStep]);

  // populate shipping from userData
  useEffect(() => {
    const addr = Array.isArray(userData?.addresses) ? userData.addresses[0] : {};
    setFirstName(userData?.firstName || "");
    setLastName(userData?.lastName || "");
    setEmail(userData?.email || "");
    setShipping({
      address1: addr?.address1 || "",
      address2: addr?.address2 || "",
      city: addr?.city || "",
      state: addr?.state || "",
      country: addr?.country || "US",
      zip: addr?.zip || "",
    });
    setBilling((b) => sameAsShipping ? {
      ...shipping
    } : b);
  }, [userData, sameAsShipping]);

  const handleStepChange = (step) => {
    if (step >= 0 && step < 3) {
      setSelectedStep(step);
    }
  };

  const  handleNext = async () => {
    if (selectedStep < 2) {
      if(selectedStep === 1){
        await handleSaveChanges()
      }
      setSelectedStep(prev => prev + 1);
    } else if (selectedStep == 2) {
        await handleCreateOrder()
    }
  };

  const handleCreateOrder = async () => {
    setLoading(true);

    try {
      // 1) Grab the first address ID off userData
      const shippingAddressId = userData?.addresses?.[0]?.id;
      if (!shippingAddressId) {
        showSnackbar("No shipping address found for this user.", "error");
      }

      // 2) Build the items array for the order
      const items = cartState.cart.map(item => ({
        variantId: item.variant,   // or however you reference the SKU/variant
        quantity: item.qty,
      }));

      if (items.length === 0) {
        showSnackbar("No valid items in cart", "error");
      }

      // 3) Build your CreateOrderDto payload
      const payload = {
        userId: user.id,
        items,
        shippingAddressId,
        paymentMethod: 'credit_card',   // e.g. "card", "paypal", etc.
      };

      // 4) POST to /orders
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/orders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const responseBody = await res.json();

      if (!res.ok) {
        showSnackbar(responseBody.message || 'Failed to create order', "error");
      }

      // 5) Success! move on to a confirmation screen, or whatever your UX is
      dispatch({ type: "CLEAR_CART" });
      localStorage.removeItem("cart");
      router.push('/orders');

    } catch (error) {
      console.error("Error creating order:", error);
      // show an error snackbar or set an error state
    } finally {
      setLoading(false);
    }
  };


  const handleSaveChanges = async () => {

    setLoading(true);
    const payload = {
      firstName,
      lastName,
      email,
      addresses: [{
        address1: shipping.address1,
        address2: shipping.address2,
        city: shipping.city,
        state: shipping.state,
        zip: shipping.zip,
        country: shipping.country.value || 'US',
      }]
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error("Error in submission:", error);
    } finally {
        setLoading(false); // Stop loading
    }



  }

  const handleBack = () => {
    if (selectedStep > 0) {
      setSelectedStep(prev => prev - 1);
    }
  };

  // Each step’s content:
  const renderStepContent = () => {
    switch (selectedStep) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              {cartState.cart.map((product, index) => (
                <CartItem product={product} key={index} />
              ))}
            </Grid>
            <Grid item md={4} xs={12}>
              <VoucherForm handleSave={handleNext} />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container flexWrap="wrap-reverse" spacing={3}>
            <Grid item md={8} xs={12}>
              <CheckoutForm
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
                billing={billing}
                handleBack={handleBack}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <VoucherForm2
                handleSave={handleNext}
                loading={loading}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container flexWrap="wrap-reverse" spacing={3}>
            <Grid item md={8} xs={12}>
              <PaymentForm
                handleBack={handleBack}
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <PaymentSummary
                handleSave={handleCreateOrder}
                loading={loading}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
      <>
        <Box mb={3} display={{ sm: "block", xs: "none" }}>
          <Stepper
            stepperList={STEPPER_LIST}
            selectedStep={selectedStep + 1}
            onChange={ind => handleStepChange(ind)}
          />
        </Box>
        {renderStepContent()}
      </>
  );
}