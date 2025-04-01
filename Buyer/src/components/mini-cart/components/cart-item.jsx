import Link from "next/link";
import { Box, Button, Avatar, IconButton, Typography } from "@mui/material";

import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox, FlexCol } from "@/components/flex-box";
import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { H1, Paragraph } from "@/components/Typography";

// ==============================================================
export default function MiniCartItem({
  item,
  handleCartAmountChange
}) {
  return (
    <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom="1px solid" borderColor="divider">
      
      {/* Product Image */}
      <Link href={`/products/${item.slug}`}>
        <Avatar alt={item.name} src={item.imgUrl} sx={{mx: 1,width: 75,height: 75, m:0}} />
      </Link>

      {/* Product Info */}
      <FlexCol height="100%">
        <Link href={`/products/${item.slug}`}>
          <Paragraph color="#FFF">
            {item.name}
          </Paragraph>
        </Link>

        <Paragraph color="#FFF" mt={0.5}>
          {currency(item.qty * item.price)} x {item.qty}
        </Paragraph>
        <FlexBox alignItems="center" gap={1} pt={1} >
          <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#000' }}/>
          <H1 color="#FFF" mt={0.5}>
            QTY : {item.qty}
          </H1>
        </FlexBox>
        
      </FlexCol>
      
      <FlexCol alignItems="flex-end" gap={1} maxWidth={100}>
        <Button onClick={handleCartAmountChange(0, item)} sx={{ height: 28, width: 28 }}>
          <Close fontSize="small" sx={{color:"#FFF"}} />
        </Button>
        <CountControlButtons
          item={item}
          handleCartAmountChange={handleCartAmountChange}
        />
      </FlexCol>
    </FlexBox>
  );
}

const CountControlButtons = ({item,handleCartAmountChange}) => {
  return (
    <FlexBox alignItems="center" justifyContent="flex-end" gap={1}>
      <Button disabled={item.qty === 1} onClick={handleCartAmountChange(item.qty - 1, item)} 
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

      <Typography fontFamily="Helvetica" color="#FFF">
        {item.qty}
      </Typography>

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

  </FlexBox>
  )
}