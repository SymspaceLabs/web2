
import Link from "next/link"; // MUI
import useCart from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import { Span } from "components/Typography";
import { FlexBetween, FlexBox, FlexCol } from "components/flex-box"; // DUMMY CUSTOM DATA

import countryList from "data/countryList"; // CUSTOM UTILS LIBRARY FUNCTION
import { Autocomplete, TextField, MenuItem, Card, Button, Divider } from "@mui/material";
import { currency } from "lib";
import { SymAutoComplete, SymDropdown, SymTextField } from "@/components/custom-inputs";
import { useState } from "react";

export default function CheckoutForm() {
  
  const { state: cartState } = useCart();
  const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const STATE_LIST = [
    "New York", 
    "Chicago"
  ];

  const [promo, setPromo] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  return (
    <Card sx={{ background:'rgba(255, 255, 255, 0.1)', p:3 }}>

      <FlexCol gap={2} pb={3}>
        <FlexBetween>
          <Span color="#FFF" fontSize={18} fontWeight={600}>
            Total
          </Span>
          <Span color="#FFF" fontSize={18} fontWeight={600} lineHeight="1">
            {currency(getTotalPrice())}
          </Span>
        </FlexBetween>

        <Divider />

        {/* APPLY VOUCHER TEXT FIELD */}
        <SymTextField
          placeholder="Promo Code"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        <Button
          fullWidth
          sx={{
            py: 1,
            borderRadius:'50px',
            border:'2px solid #0366FE',
            color:'#0366FE',
            '&:hover': {
              background:'#0366FE',
              color:'#FFF'
            }
          }}
        >
          Apply Promo Code
        </Button>
        <Divider />

      </FlexCol>

      <FlexCol gap={1}>
        <Span color="#FFF" fontSize={18} fontWeight={600}>
          Shipping Estimates
        </Span>
        
        {/* COUNTRY TEXT FIELD */}
        <SymAutoComplete
          placeholder="Country"
          value={country}
          onChange={(val) => setCountry(val)}
          options={countryList}
        />

        {/* STATE/CITY TEXT FIELD */}
        <SymDropdown
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          options={STATE_LIST}
        />

        {/* ZIP-CODE TEXT FIELD */}
        <SymTextField
          placeholder="Zip code"
          value={zipCode}
          onChange={(e)=>setZipCode(e.target.value)}
        />

        <Button
          fullWidth
          sx={{
            py: 1,
            borderRadius:'50px',
            border:'2px solid #0366FE',
            color:'#0366FE',
            '&:hover': {
              background:'#0366FE',
              color:'#FFF'
            }
          }}
        >
          Calculate Shipping
        </Button>

        <Button
          fullWidth
          href="/checkout"
          // LinkComponent={Link}
          sx={{
            py: 1,
            borderRadius:'50px',
            border:'2px solid #FFF',
            background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
            color:'#FFF',
            '&:hover': {
              background:'transaparent',
            }
          }}
        >
          Check Out Now
        </Button>
      </FlexCol>
      

    </Card>
  );
}