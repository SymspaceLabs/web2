"use client";

// ======================================================
// Checkout Page Sections
// ======================================================

import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckoutForm } from '../checkout-form';
import { useAuth } from '@/contexts/AuthContext';

import VoucherForm2 from "@/pages-sections/cart/voucher-form-2";

// ======================================================

export default function CheckoutPageView() {
  const router = useRouter();
  
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [userData, setUserData] = useState();
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

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${user.id}`);
          const data = await response.json();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
      fetchUser();
    }, []);

  useEffect(() => {
    const address = Array.isArray(userData?.address) ? userData.address[0] : {};

    setShipping({
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      email: userData?.email || '',
      address1: address?.address1 || '',
      address2: address?.address2 || '',
      city: address?.city || '',
      state: address?.state || '',
      country: address?.country || 'US',
      zip: address?.zip || '',
    });
  }, [userData]);


  const handleSave = () => {

    setLoading(true);

    setLoading(false);

    router.push('/payment')
  }

  return (
    <Grid container flexWrap="wrap-reverse" spacing={3}>
      <Grid item lg={8} md={8} xs={12}>
        <CheckoutForm
          shipping={shipping}
          setShipping={setShipping}
          sameAsShipping={sameAsShipping}
          setSameAsShipping={setSameAsShipping}
          setBilling={setBilling}
          billing={billing}
        />
      </Grid>

      <Grid item lg={4} md={4} xs={12}>
        <VoucherForm2 
          handleSave={handleSave}
        />
      </Grid>
    </Grid>
  );
}