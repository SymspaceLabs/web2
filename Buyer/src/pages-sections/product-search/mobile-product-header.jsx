// src/components/MobileProductHeader.js
import {
  Grid,
  Box,
  IconButton,
  Typography,
  Select,
  MenuItem,
  FormControl
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import { Paragraph } from "@/components/Typography"; // Assuming this path is correct

/**
 * Mobile-specific header component including filter and sort buttons.
 * @param {object} props - Component props.
 * @param {function} props.toggleDrawer - Function to toggle the filter drawer.
 * @param {string} props.sortOption - Current sort option.
 * @param {function} props.handleSortChange - Handler for sort option change.
 * @param {number} props.displayedProductCount - Number of currently displayed products.
 * @param {string} props.displayFilterText - Text describing current filters.
 */
export default function MobileProductHeader({ toggleDrawer, sortOption, handleSortChange, displayedProductCount, displayFilterText }) {
  return (
    <>
      <Grid item xs={12} sx={{ mb: 2 }}>
        <Box sx={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', gap: 1, flexWrap: 'wrap'
        }}>
          {/* Filter Button */}
          <IconButton onClick={toggleDrawer(true)} sx={{
            flexGrow: 1, flexBasis: '45%', border: '1px solid', borderColor: 'grey.400',
            borderRadius: 1, p: '8px 12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0.5
          }}>
            <FilterListIcon /><Paragraph>Filter</Paragraph>
          </IconButton>

          {/* Mobile Sort Control */}
          <FormControl variant="outlined" size="small" sx={{
            flexGrow: 1, flexBasis: '45%', minWidth: 'auto',
            '& .MuiOutlinedInput-root': { borderRadius: 1, px: '8px', py: '2px', display: 'flex', alignItems: 'center', gap: 0.5 },
            '& .MuiInputLabel-root': { transform: 'translate(40px, 9px) scale(0.75)', '&.MuiInputLabel-shrink': { transform: 'translate(14px, -9px) scale(0.75)', }, },
            '& .MuiSelect-select': { paddingLeft: '0 !important', paddingRight: '24px !important', display: 'flex', alignItems: 'center', },
          }}>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              startAdornment={<SortIcon sx={{ mr: 0.5 }} />}
            >
              <MenuItem value="latest">Latest</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      {/* Total results text and filtered text */}
      <Box px={4} py={3}>
        <Typography variant="body2" sx={{ whiteSpace: 'nowrap', flexShrink: 0, mr: 1 }}>
          Total {displayedProductCount} results {displayFilterText}
        </Typography>
      </Box>
    </>
  );
}
