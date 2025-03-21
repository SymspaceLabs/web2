import Link from "next/link";
import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "@/components/flex-box";
import { currency } from "@/lib"; // CUSTOM DATA MODEL

// ==============================================================
export default function MiniCartItem({
  item,
  handleCartAmountChange
}) {
  return (
    <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom="1px solid" borderColor="divider">
      
      {/* Product Image */}
      <Link href={`/products/${item.slug}`}>
        <Avatar alt={item.name} src={item.imgUrl} sx={{mx: 1,width: 75,height: 75}} />
      </Link>

      {/* Product Info */}
      <Box flex="1" textOverflow="ellipsis" whiteSpace="nowrap" overflow="hidden" gap={3}>
        <Link href={`/products/${item.slug}`}>
          <Typography fontFamily="Helvetica" color="#FFF">
            {item.name}
          </Typography>
        </Link>

        <Typography color="#FFF" mt={0.5}>
          {currency(item.qty * item.price)} x {item.qty}
        </Typography>

        <CountControlButtons
          item={item}
          handleCartAmountChange={handleCartAmountChange}
        />
      </Box>

      <IconButton 
        size="small" 
        onClick={handleCartAmountChange(0, item)} 
        sx={{marginLeft: 2.5}}
      >
        <Close fontSize="small" color="#FFF" />
      </IconButton>
    </FlexBox>
  );
}

const CountControlButtons = ({item,handleCartAmountChange}) => {
  return (
    <FlexBox alignItems="center" gap={1}>
      <Button 
        onClick={handleCartAmountChange(item.qty + 1, item)} 
        sx={{ 
          height: 28,
          width: 28,
          borderRadius: '10px',
          color:'#FFF',
          border:'1px solid white',
          background:'#0366FE'
        }}
      >
        <Add fontSize="small" />
      </Button>

      <Typography fontFamily="Helvetica" color="#FFF">
        {item.qty}
      </Typography>

      <Button 
        disabled={item.qty === 1} 
        onClick={handleCartAmountChange(item.qty - 1, item)} 
        sx={{ 
          height: 28,
          width: 28,
          borderRadius: '10px',
          color:'#FFF',
          border:'1px solid white',
        }}
      >
        <Remove fontSize="small" />
      </Button>
  </FlexBox>
  )
}