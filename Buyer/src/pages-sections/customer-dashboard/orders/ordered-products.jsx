// ============================================================
// Ordered Products
// ============================================================

import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { format } from "date-fns"; // GLOBAL CUSTOM COMPONENTS
import { LazyImage } from "@/components/lazy-image";
import { H6, Paragraph } from "@/components/Typography";
import { Card, Button, Avatar, Box } from "@mui/material";
import { FlexBetween, FlexBox } from "@/components/flex-box"; // CUSTOM UTILS LIBRARY FUNCTION

// ==============================================================

export default function OrderedProducts({
  order
}) {

  const { items = [] } = order || {};
  
  return (
    <Card sx={{ p: 0, mb: "30px"}}>
      <FlexBetween px={3} py={2} flexWrap="wrap" bgcolor="grey.200">
        <Item title="Order ID:" value={order?.id} />
        <Item title="Placed on:" value={order?.createdAt ? format(new Date(order?.createdAt), "dd MMM, yyyy"): "None"} />
        <Item title="Delivered on:" value={order?.deliveredAt ? format(new Date(order?.deliveredAt), "dd MMM, yyyy") : "None"} />
      </FlexBetween>

      {items.map((item, ind) => <FlexBetween px={2} py={1} flexWrap="wrap" key={ind}>
          <FlexBox gap={2.5} alignItems="center">
            <Box>
              <LazyImage
                alt={item?.variant?.product?.name}
                width={50}
                height={50}
                display="block"
                src={item?.variant?.product?.images[0]?.url || ""}
              />
            </Box>

            <div>
              <H6>
                {item?.variant?.product?.name}
              </H6>
              
              <Paragraph color="grey.600">
                {currency(item?.variant?.product?.price)} x {item.quantity}
              </Paragraph>
            </div>
          </FlexBox>

          <Paragraph color="grey.600" ellipsis>
            Product properties: <b>{item?.variant?.color?.name}</b>, <b>{item?.variant?.size?.size}</b>
          </Paragraph>

          <Button variant="text" color="primary">
            Write a Review
          </Button>
        </FlexBetween>)}
    </Card>
  );
}

function Item({
  title,
  value
}) {
  return <FlexBox gap={1} alignItems="center">
      <Paragraph color="grey.600">{title}</Paragraph>
      <Paragraph>{value}</Paragraph>
    </FlexBox>;
}