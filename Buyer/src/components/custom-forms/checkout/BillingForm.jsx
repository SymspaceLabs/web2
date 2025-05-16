// ==============================================
// Billing Form
// ==============================================

import { Box } from "@mui/material";
import { H1 } from "components/Typography";
import { FlexBox } from "@/components/flex-box";
import { SymTextField } from "@/components/custom-inputs";
import { AddressForm } from "@/components/custom-forms";

// ==============================================

export default function BillingForm({
  billing,
  setBilling,
  sameAsShipping,
  shipping
}) {
  const data = sameAsShipping ? shipping : billing;

  const handleChange = (field, value) => {
    if (!sameAsShipping) {
      setBilling(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <Box py={3}>


      {!sameAsShipping && (
        <>
          <H1 color="#000" mb={2} fontSize={{ xs: 14, sm: 20 }}>
            Billing Address
          </H1>

          <AddressForm
            section="billing"
            color="#000"
            data={data}
            onChange={(field, value) => handleChange(field, value)}
          />
        </>
      )}
    </Box>
  );
}
