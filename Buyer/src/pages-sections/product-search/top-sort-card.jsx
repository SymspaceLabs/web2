"use client";

// ==============================================
// Top Sort Card used in Product Search Page
// ==============================================

import { Paragraph } from "@/components/Typography";
import { FlexBetween, FlexBox } from "@/components/flex-box";
import { MenuItem, TextField, Container } from "@mui/material";

// ==============================================


const TopSortCard = ({
    products
}) => {
  return (
    <FlexBetween
        mb="10px"
        py={{ sm: "1rem", md: "0.5rem", xs: "1.25rem 0.25rem" }}
        flexWrap="wrap"
        alignItems="center"
        gap={1}
    >
        <Paragraph color="grey.600">
            Total {products.length} results
        </Paragraph>

        <FlexBox alignItems="center" gap={2}>
            <Paragraph color="grey.600" whiteSpace="pre">
                Sort by:
            </Paragraph>
            <TextField
                select
                size="small"
                variant="outlined"
                placeholder="Sort by"
                defaultValue={SORT_OPTIONS[0].value}
                sx={{ minWidth: "150px", width: "auto" }}
            >
                {SORT_OPTIONS.map((item) => (
                    <MenuItem value={item.value} key={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </FlexBox>
        
    </FlexBetween>
  )
}

export default TopSortCard

const SORT_OPTIONS = [
  { label: "Relevance", value: "Relevance" },
  { label: "Date", value: "Date" },
  { label: "Price Low to High", value: "Price Low to High" },
  { label: "Price High to Low", value: "Price High to Low" },
];