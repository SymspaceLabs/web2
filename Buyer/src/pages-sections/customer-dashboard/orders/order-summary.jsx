
import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { Grid, Card, Divider } from "@mui/material"; // GLOBAL CUSTOM COMPONENTS
import { FlexBetween } from "@/components/flex-box";
import { H5, H6, Paragraph } from "@/components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

// ==============================================================
function ListItem({
  title,
  value
}) {
  return (
    <FlexBetween mb={1}>
      <Paragraph color="grey.600">{title}</Paragraph>
      <H6>{value}</H6>
    </FlexBetween>
  );
}

export default function OrderSummary({
  order
}) {
  return (
    <Grid container spacing={3}>
      {/* SHIPMENT ADDRESS SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{p: 3}}>
          <H5 mt={0} mb={2}>
            Shipping Address
          </H5>

          <Paragraph fontSize={14} my={0}>
            {order?.shippingAddress?.address1},&nbsp;
            {order?.shippingAddress?.address2},&nbsp;
            {order?.shippingAddress?.city},&nbsp;
            {order?.shippingAddress?.state},&nbsp;
            {order?.shippingAddress?.zip},&nbsp;
            {order?.shippingAddress?.country}.
          </Paragraph>
        </Card>
      </Grid>

      {/* TOTAL SUMMERY SECTION */}
      <Grid item lg={6} md={6} xs={12}>
        <Card sx={{p: 3}}>
          <H5 mt={0} mb={2}>
            Total Summary
          </H5>

          <ListItem title="Subtotal:" value={currency(order.subtotal)} />
          <ListItem title="Shipping fee:" value={currency(order.shippingCost)} />
          {/* Added a space after the negative sign for discount amount */}
          <ListItem
            title="Discount:"
            value={
              order.discountAmount > 0
                ? `- ${currency(order.discountAmount)}`
                : currency(0)
            }
          />
          <Divider sx={{mb: 1}} />

          <FlexBetween mb={2}>
            <H6>Total</H6>
            <H6>{currency(order.totalAmount)}</H6>
          </FlexBetween>

          <Paragraph>Paid by <span style={{textTransform:'capitalize'}}>{order.paymentMethod}</span></Paragraph>
        </Card>
      </Grid>
    </Grid>
    );
}