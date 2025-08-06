// ==============================================================
// Cart Item used in
// - cart drawer
// ==============================================================

import Link from "next/link";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import { LazyImage } from "@/components/lazy-image";
import Remove from "@mui/icons-material/Remove"; // GLOBAL CUSTOM COMPONENTS

import { currency } from "@/lib"; // CUSTOM DATA MODEL
import { H1, Paragraph } from "@/components/Typography";
import { Box, Button, Typography } from "@mui/material";
import { FlexBox, FlexCol } from "@/components/flex-box";

// ==============================================================

export default function MiniCartItem({
  item,
  handleCartAmountChange,
  mode = 'light' // Add mode prop with default value 'light'
}) {
  // Determine text and border colors based on the mode prop
  const textColor = mode === 'dark' ? '#000' : '#FFF';
  const salePriceColor = mode === 'dark' ? '#5B5B5B' : '#5B5B5B'; // Keep strikethrough color consistent or adjust as needed
  const borderColor = mode === 'dark' ? '#000' : 'white'; // Border color for buttons

  return (
    <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom="1px solid" borderColor="divider">

      {/* Product Image */}
      <Link href={`/products/${item.slug}`}>
        <LazyImage alt={item.name} src={item.imgUrl} width={50} height={50} sx={{mx: 1,width: 75,height: 75, m:0}} />
      </Link>

      {/* Product Info */}
      <FlexCol height="100%">
        <Link href={`/products/${item.slug}`}>
          <Paragraph color={textColor}> {/* Apply dynamic text color */}
            {item.name}
          </Paragraph>
        </Link>

        <FlexBox gap={2}>
          <Paragraph  color={textColor} mt={0.5}>
            {currency(item.salePrice)}
          </Paragraph>
          <Paragraph color={salePriceColor} sx={{ textDecoration: 'line-through' }} mt={0.5}>
            {currency(item.price)}
          </Paragraph>
        </FlexBox>

        <FlexBox alignItems="center" gap={1} pt={1} >
          <Box
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: item.selectedColor.code
            }}
          />
          <H1 color={textColor} mt={0.5}> {/* Apply dynamic text color */}
            {
              item.sizes?.find(size => size.value === item.selectedSize)?.label
            }
          </H1>
          <H1 color={textColor} mt={0.5}> {/* Apply dynamic text color */}
            QTY : {item.qty}
          </H1>
        </FlexBox>
      </FlexCol>

      <FlexCol alignItems="flex-end" gap={1} maxWidth={100}>
        <Button onClick={handleCartAmountChange(0, item)} sx={{ height: 28, width: 28 }}>
          <Close fontSize="small" sx={{color: textColor}} /> {/* Apply dynamic icon color */}
        </Button>
        <CountControlButtons
          item={item}
          handleCartAmountChange={handleCartAmountChange}
          textColor={textColor} // Pass textColor to nested component
          borderColor={borderColor} // Pass borderColor to nested component
        />
      </FlexCol>
    </FlexBox>
  );
}

const CountControlButtons = ({item, handleCartAmountChange, textColor, borderColor}) => {
  return (
    <FlexBox alignItems="center" justifyContent="flex-end" gap={1}>
      <Button disabled={item.qty === 1} onClick={handleCartAmountChange(item.qty - 1, item)}
        sx={{
          height: 28,
          width: 28,
          borderRadius: '10px',
          color: textColor, // Apply dynamic text color
          border:`1px solid ${borderColor}`, // Apply dynamic border color
        }}
      >
        <Remove fontSize="small" />
      </Button>

      <Typography fontFamily="Helvetica" color={textColor}> {/* Apply dynamic text color */}
        {item.qty}
      </Typography>

      <Button
        onClick={handleCartAmountChange(item.qty + 1, item)}
        sx={{
          height: 28,
          width: 28,
          borderRadius: '10px',
          color: 'white', // Apply dynamic text color
          border:`1px solid ${borderColor}`, // Apply dynamic border color
          background:'#0366FE' // Keep background color as is
        }}
      >
        <Add fontSize="small" />
      </Button>

  </FlexBox>
  )
}
