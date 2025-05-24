import Link from "next/link";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import East from "@mui/icons-material/East";
import { format } from "date-fns";

import { H5, Paragraph } from "../../../components/Typography";
import TableRow from "../table-row";
import { currency } from "../../../lib";

// =================================================
export default function OrderRow({ order }) {
  const getColor = status => {
    switch (status) {
      case "Pending":
      case "Processing":
        return "secondary";
      case "Delivered":
        return "success";
      case "Cancelled":
        return "primary";
      default:
        return "default";
    }
  };

  return (
    <Link href={`/orders/${order.id}`} passHref>
      <TableRow
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 16px",
          borderBottom: "1px solid #eee",
          cursor: "pointer",
          flexWrap: "wrap", // Optional: for better responsiveness
        }}
      >
        <H5 ellipsis sx={{ flex: 1, minWidth: 120 }}>#{order.id.substring(0, 18)}</H5>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 120 }}>
          <Chip size="small" label={order.status} color={getColor(order.status)} />
        </Box>

        <Paragraph sx={{ flex: 1, textAlign: "center", minWidth: 120 }}>
          {format(new Date(order.createdAt), "MMM dd, yyyy")}
        </Paragraph>

        <Paragraph sx={{ flex: 1, textAlign: "center", minWidth: 120 }}>
          {currency(order.totalAmount)}
        </Paragraph>

        <Box
          sx={{
            flex: 1,
            display: { sm: "flex", xs: "none" },
            justifyContent: "flex-end",
            minWidth: 120
          }}
        >
          <IconButton>
            <East
              fontSize="small"
              sx={{
                color: "grey.500",
                transform: theme => `rotate(${theme.direction === "rtl" ? "180deg" : "0deg"})`
              }}
            />
          </IconButton>
        </Box>
      </TableRow>
    </Link>
  );
}
