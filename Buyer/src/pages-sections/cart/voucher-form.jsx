// ================================================
// Voucher Form
// ================================================

import { useState } from "react";
import { currency } from "lib";
import { useCart } from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
import { Paragraph } from "components/Typography";
import { Card, Button, Divider } from "@mui/material";
import { FlexBetween, FlexCol } from "components/flex-box"; // DUMMY CUSTOM DATA
import { SymAutoComplete, SymDropdown, SymTextField } from "@/components/custom-inputs";

import countryList from "data/countryList"; // CUSTOM UTILS LIBRARY FUNCTION

// ================================================

export default function VoucherForm() {
  
  const { state: cartState } = useCart();
  const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const STATE_LIST = [
    "New York", 
    "Chicago"
  ];

  const [promo, setPromo] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState(null);

  return (
    <Card sx={styles.wrapper}>

      <FlexCol gap={2} pb={3}>
        <FlexBetween>
          <Paragraph color="#000" fontSize={18}>
            Subtotal
          </Paragraph>
          <Paragraph color="#000" fontSize={18} fontWeight={600} lineHeight="1">
            {currency(getTotalPrice())}
          </Paragraph>
        </FlexBetween>

        <Divider sx={{ borderColor: '#000' }} />

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
        <Divider sx={{ borderColor: '#000' }} />

      </FlexCol>

      <FlexCol gap={1}>
        <Paragraph color="#000" fontSize={18}>
          Shipping Estimates
        </Paragraph>
        
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

const styles = {
  wrapper : {
    p:3,
    borderRadius: "25px",
    backdropFilter: 'blur(10.0285px)',
    boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)', 
    background: 'rgba(255, 255, 255, 0.35)',
  }
}