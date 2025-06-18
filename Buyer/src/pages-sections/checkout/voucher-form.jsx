// ================================================
// Voucher Form
// ================================================

import { useState } from "react";
import { Box, Card, Button, TextField, InputAdornment, CircularProgress } from "@mui/material";

// import { currency } from "lib";
// import { useCart } from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS
// import { Paragraph } from "components/Typography";
// import { FlexBetween, FlexCol } from "components/flex-box"; // DUMMY CUSTOM DATA
// import { SymAutoComplete, SymDropdown, SymTextField } from "@/components/custom-inputs";

// import countryList from "data/countryList"; // CUSTOM UTILS LIBRARY FUNCTION
// import { SymButton } from "@/components/custom-components";

// ================================================

export default function VoucherForm({
  // btnText="Check Out Now",
  // handleSave,
  // loading=false
}) {
  
  // const { state: cartState } = useCart();
  // const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // const STATE_LIST = [
  //   "New York", 
  //   "Chicago"
  // ];

  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(false);
  const [promoValid, setPromoValid] = useState(false);

  // const [country, setCountry] = useState(null);
  // const [state, setState] = useState("");
  // const [zipCode, setZipCode] = useState(null);

  // Function to handle promo code application logic.
  // Now includes logic to show and hide the loading spinner, and then show the checkmark.
  const handleApplyPromo = () => {
    setLoading(true); // Set loading to true when button is clicked
    setPromoValid(false); // Reset valid state when a new attempt is made

    console.log("Applying promo code:", promo);
    // Simulate an asynchronous operation (e.g., an API call)
    setTimeout(() => {
      setLoading(false); // After a delay, reset loading to false
      setPromoValid(true); // Assuming valid for demonstration, set to true
      // In a real application, you would check the API response for validity
      // and set setPromoValid(true) or setPromoValid(false) accordingly.
    }, 1500); // Simulate a 1.5-second loading time
  };

  return (
    <Card sx={styles.wrapper}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
        <TextField
          placeholder="Promo Code"
          value={promo}
          onChange={(e) => {
            setPromo(e.target.value);
            setPromoValid(false); // Reset valid state when input changes

          }}
          // endAdornment places the element at the trailing end of the input field.
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {/* The 'Apply' button is placed within the InputAdornment. */}
                <Button
                  onClick={handleApplyPromo}
                  disabled={loading || promoValid} 
                  sx={{
                    // Styling for the 'Apply' button to make it compact and fit within the input.
                    minWidth: 'auto', 
                    padding: '6px 12px', 
                    borderRadius: '15px', 
                    // border: '1px solid #0366FE',
                    color: '#0366FE',
                    // '&:hover': {
                    //   background: '#0366FE',
                    //   color: '#FFF'
                    // }
                  }}
                >
                  {loading ? (
                    // Show spinner when loading
                    <CircularProgress 
                      size={20} 
                      color="primary" // Inherits color from parent Button's color prop
                    /> 
                  ) : promoValid ? (
                    // Show green checkmark when promo is valid
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="green" 
                      width="20px" 
                      height="20px"
                    >
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  ) : (
                    // Show "Apply" text otherwise
                    "Apply"
                  )}
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* <FlexCol gap={2} py={1}>
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
      </FlexCol> */}

      {/* <SymButton
          onClick={handleSave}
          loading={loading}
          sx={styles.btn}
        >
        {btnText}
      </SymButton> */}

      {/* <FlexCol gap={1}>
        <Paragraph color="#000" fontSize={18}>
          Shipping Estimates
        </Paragraph>
        
        <SymAutoComplete
          placeholder="Country"
          value={country}
          onChange={(val) => setCountry(val)}
          options={countryList}
        />

        <SymDropdown
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          options={STATE_LIST}
        />

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

         
      </FlexCol> */}

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
  btn : {
    py: 1,
    borderRadius:'50px',
    border:'2px solid #FFF',
    background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
    color:'#FFF',
    '&:hover': {
      background:'transaparent',
    }
  }
}