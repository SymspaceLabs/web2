"use client";

import { Grid, TextField, InputAdornment } from "@mui/material";

const DefaultCardIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#999" >
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-12-6h8v2H8z"/>
  </svg>
);


export default function PaymentForm({
  values = {},
  errors = {},
  touched = {},
  handleChange,
  handleBlur,
  cardBrand,
}) {

  // Function to get the appropriate icon component or image source
  const getCardIcon = (brand) => {
    switch (brand) {
      case 'visa':
        return { type: 'img', src: '/assets/images/credit-cards/visa.svg', alt: 'Visa' }; // Assuming /visa.svg is in public folder
      case 'mastercard':
        return { type: 'img', src: '/assets/images/credit-cards/mastercard.svg', alt: 'Mastercard' }; // Example path
      case 'amex':
        return { type: 'img', src: '/assets/images/credit-cards/amex.svg', alt: 'American Express' }; // Example path
      // Add cases for 'discover', 'diners', 'jcb' etc.
      default:
        return { type: 'component', component: DefaultCardIcon };
    }
  };

  const cardIconData = getCardIcon(cardBrand);

  // Determine dynamic maxLength for card number input
  let cardInputMaxLength = 19; // Default for 16 digits + 3 spaces
  if (cardBrand === 'amex') {
    cardInputMaxLength = 17; // 15 digits + 2 spaces
  } else if (cardBrand === 'diners' || cardBrand === 'jcb') {
    cardInputMaxLength = 22; // For 19-digit cards (19 digits + 4 spaces)
  }

  return (
    <Grid container spacing={3}>
      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          name="card_no"
          label="Card Number"
          type="tel" // Use type="tel" to bring up numeric keyboard on mobile
          inputProps={{
            maxLength: cardInputMaxLength, // Dynamic max length
            pattern: "[0-9 ]*", // Hint for browser validation, allows numbers and spaces
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.card_no || ""}
          error={!!touched.card_no && !!errors.card_no}
          helperText={touched.card_no && errors.card_no}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {cardIconData.type === 'img' ? (
                  <img src={cardIconData.src} alt={cardIconData.alt} style={{ width: 24, height: 24 }} />
                ) : (
                  <cardIconData.component />
                )}
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          name="name"
          label="Name on Card"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.name || ""}
          error={!!touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          name="exp"
          label="Exp. Date (MM/YY)"
          placeholder="MM/YY"
          type="tel" // Use type="tel" for numeric keyboard on mobile
          inputProps={{
            maxLength: 5, // MM/YY = 4 digits + 1 slash = 5 characters
            pattern: "[0-9/]*", // Allows numbers and forward slash
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.exp || ""}
          error={!!touched.exp && !!errors.exp}
          helperText={touched.exp && errors.exp}
        />
      </Grid>

      <Grid item md={6} xs={12}>
        <TextField
          fullWidth
          name="cvc"
          label="CVC"
          type="tel" // Use type="tel" for numeric keyboard
          inputProps={{
            maxLength: 3, // NEW: Limit to 3 characters
            pattern: "[0-9]*", // Only allow numbers
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.cvc || ""}
          error={!!touched.cvc && !!errors.cvc}
          helperText={touched.cvc && errors.cvc}
        />
      </Grid>
    </Grid>
  );
}