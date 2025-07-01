// src/components/voucher-form.js
// ================================================
// Voucher Form
// ================================================

import { useState } from "react";
import { Box, Card, Button, TextField, InputAdornment, CircularProgress } from "@mui/material";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useAuth } from "@/contexts/AuthContext";

// ================================================

export default function VoucherForm({
  cartTotal = 0,
  onDiscountApplied,
}) {
  const { user, token } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [promo, setPromo] = useState("");
  const [loading, setLoading] = useState(false);
  const [promoValid, setPromoValid] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const getAuthToken = () => {
    return token;
  };

  const handleApplyPromo = async () => {
    setLoading(true);
    setPromoValid(false);

    const currentToken = getAuthToken();
    if (!currentToken) {
      showSnackbar("Please log in to apply a promo code. Token is missing.", "error");
      setLoading(false);
      return;
    }

    if (!promo.trim()) {
      showSnackbar("Please enter a promo code.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:3000/promo-codes/apply',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`,
          },
          body: JSON.stringify({ code: promo.trim() }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to apply promo code.');
      }

      const data = await response.json();
      const { discountPercentage: receivedDiscount } = data;

      const rawDiscountAmount = cartTotal * receivedDiscount;
      const calculatedDiscountAmount = Math.floor(rawDiscountAmount * 100) / 100;

      setDiscountPercentage(receivedDiscount);
      setPromoValid(true);
      setAppliedPromo(promo.trim());
      
      showSnackbar(
        `Promo code "${promo.trim()}" applied! You get a ${(receivedDiscount * 100).toFixed(0)}% discount.`,
        "success"
      );
      
      if (onDiscountApplied) {
        onDiscountApplied(calculatedDiscountAmount);
      }

    } catch (error) {
      console.error('Error applying promo code:', error.message);
      setDiscountPercentage(0);
      setPromoValid(false);
      setAppliedPromo(null);
      
      showSnackbar(error.message || 'Failed to apply promo code. Please try again.', "error");
      
      if (onDiscountApplied) {
        onDiscountApplied(0);
      }

    } finally {
      setLoading(false);
    }
  };

  const handleRemovePromo = () => {
    setPromo("");
    setLoading(false);
    setPromoValid(false);
    setAppliedPromo(null);
    setDiscountPercentage(0);
    
    showSnackbar("Promo code removed.", "info");

    if (onDiscountApplied) {
      onDiscountApplied(0);
    }
  };

  return (
    <Card sx={styles.wrapper}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
        <TextField
          placeholder="Promo Code"
          value={promoValid ? appliedPromo : promo}
          onChange={(e) => {
            setPromo(e.target.value.toUpperCase()); 
            if (promoValid) {
              handleRemovePromo();
            }
          }}
          disabled={promoValid && !loading} 
          // --- UPDATED STYLING FOR VISIBILITY USING SX PROP ---
          sx={{
            // Target the actual input element when it's disabled (which it is when promoValid is true)
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'black !important', // For Webkit browsers (Chrome, Safari)
              color: 'black !important',             // For other browsers
              opacity: '1 !important',                // Ensure full opacity
              fontWeight: 'bold',                     // Make it bold for emphasis
            },
            // Fallback/general style for the input if not disabled (e.g., when user is typing)
            '& .MuiInputBase-input': {
                textTransform: 'uppercase', // Ensure text input is visually uppercase
            }
          }}
          InputProps={{
            // The `style` prop here is less specific than `sx` on the TextField component itself for disabled states.
            // Keeping it for clarity, but the `sx` on TextField is more likely to fix the disabled transparency.
            style: promoValid ? { color: 'black', opacity: 1, fontWeight: 'bold' } : {},
            endAdornment: (
              <InputAdornment position="end">
                {promoValid && !loading ? (
                  <Button
                    onClick={handleRemovePromo}
                    sx={{
                      minWidth: 'auto', 
                      padding: '6px 12px', 
                      borderRadius: '15px', 
                      color: 'red',
                      '&:hover': {
                         backgroundColor: 'rgba(255, 0, 0, 0.1)',
                      }
                    }}
                  >
                    REMOVE
                  </Button>
                ) : (
                  <Button
                    onClick={handleApplyPromo}
                    disabled={loading || !promo.trim()} 
                    sx={{
                      minWidth: 'auto', 
                      padding: '6px 12px', 
                      borderRadius: '15px', 
                      color: '#0366FE', 
                      '&:hover': {
                         backgroundColor: 'rgba(3, 102, 254, 0.1)',
                      }
                    }}
                  >
                    {loading ? (
                      <CircularProgress 
                        size={20} 
                        color="primary" 
                      /> 
                    ) : (
                      "APPLY"
                    )}
                  </Button>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>
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
      background:'transparent',
    }
  }
}