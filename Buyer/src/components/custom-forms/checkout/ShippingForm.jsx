// ============================================
// Shipping Form
// ============================================

import { H1 } from "components/Typography";
import { FlexBox } from "@/components/flex-box";
import { AddressForm } from "@/components/custom-forms";
import { SymTextField } from "@/components/custom-inputs";
import { FormControlLabel, Checkbox, Box } from "@mui/material";

// ============================================

export default function ShippingForm({ 
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
  setBilling
}) {
  
  const handleChange = (field, value) => {
    const updated = { ...shipping, [field]: value };
    setShipping(updated);
    if (sameAsShipping) {
      setBilling(updated);
    }
  };

  return (
    <Box py={3}>
      <H1 color="#000" mb={2} fontSize={{ xs: 14, sm: 20 }}>
        Shipping Address
      </H1>

      <FlexBox flexDirection="column" gap={3}>
        <FlexBox flexDirection={{ xs: "column", sm: "row" }} gap={3}>
          <SymTextField
            title="First Name"
            placeholder="First Name"
            color="#000"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <SymTextField
            title="Last Name"
            placeholder="Last Name"
            color="#000"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FlexBox>
        <SymTextField
          title="Email"
          placeholder="Email"
          color="#000"
          value={email}
            onChange={(e) => setEmailName(e.target.value)}
        />
        <AddressForm
          section="shipping"
          color="#000"
          data={shipping}
          onChange={(field, value) => handleChange(field, value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sameAsShipping}
              onChange={(e) => setSameAsShipping(e.target.checked)}
            />
          }
          label="Billing address is same as shipping"
        />
      </FlexBox>
    </Box>
  );
}
