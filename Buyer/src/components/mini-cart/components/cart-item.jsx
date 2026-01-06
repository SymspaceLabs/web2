// cart-item.jsx

import Link from "next/link";
import Add from "@mui/icons-material/Add";
import Close from "@mui/icons-material/Close";
import { LazyImage } from "@/components/lazy-image";
import Remove from "@mui/icons-material/Remove";

import { currency } from "@/lib";
import { H1, Paragraph } from "@/components/Typography";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { FlexBox, FlexCol, FlexColCenter } from "@/components/flex-box";

export default function MiniCartItem({
  item,
  handleCartAmountChange,
  mode = 'light'
}) {
  const textColor = mode === 'dark' ? '#000' : '#FFF';
  const salePriceColor = mode === 'dark' ? '#666' : '#999';
  const borderColor = mode === 'dark' ? '#000' : 'white';

  // Destructure enriched cart item structure
  const {
    variantId,
    quantity,
    product,
    variant,
    currentPrice,
  } = item;

  return (
    <Box
      sx={{
        position: 'relative',
        mx: 2,
        my: 1.5,
        p: 2,
        borderRadius: '20px',
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        backdropFilter: 'blur(10px)',
        boxShadow: mode === 'dark'
          ? '0 4px 20px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
          : '0 4px 20px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        border: mode === 'dark' 
          ? '1px solid rgba(255, 255, 255, 0.8)'
          : '1px solid rgba(255, 255, 255, 0.15)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: mode === 'dark'
            ? '0 8px 30px rgba(0, 0, 0, 0.12)'
            : '0 8px 30px rgba(0, 0, 0, 0.2)',
        }
      }}
    >
      {/* Close Button - Modern Style */}
      <IconButton
        onClick={handleCartAmountChange(0, item)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          background: mode === 'dark' 
            ? 'rgba(0, 0, 0, 0.05)'
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: mode === 'dark'
            ? '1px solid rgba(0, 0, 0, 0.1)'
            : '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            background: mode === 'dark'
              ? 'rgba(255, 0, 0, 0.1)'
              : 'rgba(255, 255, 255, 0.2)',
            transform: 'rotate(90deg)',
          }
        }}
      >
        <Close fontSize="small" sx={{ color: textColor, fontSize: '18px' }} />
      </IconButton>

      <FlexBox gap={2.5} alignItems="center">
        {/* Product Image - Enhanced Modern Style */}
        <FlexColCenter 
          alignItems="center" 
          sx={{ 
            minWidth: 100,
          }}
        >
          <Link href={`/products/${product.slug}`}>
            <Box
              sx={{
                width: 90,
                height: 90,
                borderRadius: '16px',
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)'
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                boxShadow: mode === 'dark'
                  ? 'inset 0 2px 8px rgba(0, 0, 0, 0.05)'
                  : 'inset 0 2px 8px rgba(0, 0, 0, 0.1)',
                border: mode === 'dark'
                  ? '1px solid rgba(0, 0, 0, 0.06)'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                }
              }}
            >
              <LazyImage 
                alt={product.name} 
                src={variant.imageUrl} 
                width={90} 
                height={90} 
                sx={{
                  width: '100%', 
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '12px'
                }} 
              />
            </Box>
          </Link>
        </FlexColCenter>

        {/* Product Info */}
        <FlexCol height="100%" flex={1} gap={0.5}>
          <Link href={`/products/${product.slug}`}>
            <Paragraph 
              color={textColor}
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontWeight: 600,
                lineHeight: 1.3,
                fontSize: '15px',
                letterSpacing: '-0.01em'
              }}
            >
              {product.name}
            </Paragraph>
          </Link>

          {/* Price Section */}
          <FlexBox gap={1.5} alignItems="center" mt={0.5}>
            <Typography 
              sx={{
                color: textColor,
                fontSize: '16px',
                fontWeight: 700,
                letterSpacing: '-0.02em'
              }}
            >
              {currency(currentPrice)}
            </Typography>
            {variant.salePrice && variant.price !== variant.salePrice && (
              <Typography 
                sx={{
                  color: salePriceColor,
                  fontSize: '15px',
                  textDecoration: 'line-through',
                  fontWeight: 500
                }}
              >
                {currency(variant.price)}
              </Typography>
            )}
          </FlexBox>

          {/* Variant Info - Modern Pills */}
          <FlexBox alignItems="center" gap={1} pt={0.5} flexWrap="wrap">
            {variant.color?.code && (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '20px',
                  background: mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: mode === 'dark'
                    ? '1px solid rgba(0, 0, 0, 0.08)'
                    : '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    background: variant.color.code,
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)'
                  }}
                />
                <Typography 
                  sx={{
                    fontSize: '11px',
                    color: textColor,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {variant.color.name || 'Color'}
                </Typography>
              </Box>
            )}
            
            {variant.size?.label && (
              <Box
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '20px',
                  background: mode === 'dark'
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: mode === 'dark'
                    ? '1px solid rgba(0, 0, 0, 0.08)'
                    : '1px solid rgba(255, 255, 255, 0.15)',
                }}
              >
                <Typography 
                  sx={{
                    fontSize: '11px',
                    color: textColor,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {variant.size.label}
                </Typography>
              </Box>
            )}
          </FlexBox>

          {/* Quantity Controls - Below Variant Info */}
          <Box sx={{ mt: 1.5, display: 'flex' }}>
            <CountControlButtons
              item={item}
              handleCartAmountChange={handleCartAmountChange}
              textColor={textColor}
              mode={mode}
              stock={variant.stock} 
            />
          </Box>
        </FlexCol>

      </FlexBox>
    </Box>
  );
}

const CountControlButtons = ({item, handleCartAmountChange, textColor, mode, stock }) => {
  const { quantity } = item;
  const isIncrementDisabled = quantity >= stock;

  const buttonStyle = {
    minWidth: 36,
    width: 36,
    height: 36,
    borderRadius: '12px',
    background: mode === 'dark'
      ? 'rgba(0, 0, 0, 0.05)'
      : 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: mode === 'dark'
      ? '1px solid rgba(0, 0, 0, 0.08)'
      : '1px solid rgba(255, 255, 255, 0.2)',
    color: textColor,
    transition: 'all 0.2s ease',
    '&:hover:not(:disabled)': {
      background: mode === 'dark'
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(255, 255, 255, 0.15)',
      transform: 'scale(1.05)',
    },
    '&:disabled': {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  };

  return (
    <FlexBox 
      alignItems="center" 
      gap={1}
      sx={{
        px: 1.5,
        py: 1,
        borderRadius: '16px',
        background: mode === 'dark'
          ? 'rgba(0, 0, 0, 0.03)'
          : 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Button 
        disabled={quantity === 1} 
        onClick={handleCartAmountChange(quantity - 1, item)}
        sx={buttonStyle}
      >
        <Remove fontSize="small" />
      </Button>

      <Typography 
        sx={{
          fontFamily: 'Helvetica',
          color: textColor,
          fontWeight: 700,
          fontSize: '16px',
          minWidth: '32px',
          textAlign: 'center'
        }}
      >
        {quantity}
      </Typography>

      <Button
        disabled={isIncrementDisabled}
        onClick={handleCartAmountChange(quantity + 1, item)}
        sx={{
          ...buttonStyle,
          background: isIncrementDisabled 
            ? (mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.1)')
            : 'linear-gradient(135deg, #0366FE 0%, #0052CC 100%)',
          color: isIncrementDisabled ? textColor : 'white',
          boxShadow: isIncrementDisabled ? 'none' : '0 4px 12px rgba(3, 102, 254, 0.3)',
        }}
      >
        <Add fontSize="small" />
      </Button>
    </FlexBox>
  )
}