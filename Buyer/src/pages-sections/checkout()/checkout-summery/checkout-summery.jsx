// ================================================
// Voucher Form
// ================================================

import { currency } from "lib";
import { Paragraph } from "components/Typography";
import { Card, Stack, Button, Divider, TextField } from "@mui/material";
import { useCart } from "hooks/useCart"; // GLOBAL CUSTOM COMPONENTS

import ListItem from "../list-item"; // GLOBAL CUSTOM COMPONENTS

// ================================================

export default function CheckoutSummary() {
  
  const { state: cartState } = useCart();
  const getTotalPrice = () => cartState.cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  
  return (
    <Card sx={{ p: 3 }}>
      <ListItem
        mb={1}
        title="Subtotal"
        value={getTotalPrice()}
      />
      <ListItem mb={1} title="Shipping" />
      <ListItem mb={1} title="Tax" value={40} />
      <ListItem mb={1} title="Discount" />

      <Divider sx={{ my:2 }} />

      {/* Total Payment */}
      <Paragraph fontSize={25} fontWeight={600} lineHeight={1}>
        {currency(getTotalPrice())}
      </Paragraph>

      <Stack spacing={2} mt={3}>
        <TextField placeholder="Voucher" variant="outlined" size="small" fullWidth />
        <Button variant="outlined" color="primary" fullWidth>
          Apply Voucher
        </Button>
      </Stack>
    </Card>
  );
}