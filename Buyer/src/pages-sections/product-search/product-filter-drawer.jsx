// src/components/ProductFilterDrawer.js
import {
  Box,
  Drawer,
  IconButton,
  Typography
} from "@mui/material";
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';

// Assuming ProductFilterCard is imported or defined in the same scope where FilterControls is used
// If ProductFilterCard is also a separate component, you might need to import it here.
// For now, we'll keep FilterControls as a prop to maintain flexibility.
import ProductFilterCard from "./product-filter-card";

/**
 * Encapsulates the ProductFilterCard and its props for cleaner usage.
 * This function is kept here as it's directly used by ProductFilterDrawer.
 * If ProductFilterCard is always rendered directly, this wrapper might be removed.
 * @param {object} props - Props to pass to ProductFilterCard.
 */
function FilterControls(props) {
  return <ProductFilterCard {...props} />;
}

/**
 * Side Drawer component for mobile filter controls.
 * @param {object} props - Component props.
 * @param {boolean} props.open - Whether the drawer is open.
 * @param {function} props.onClose - Handler to close the drawer.
 * @param {function} props.onResetFilters - Handler to reset all filters.
 * @param {object} props.filterControlProps - Props object for FilterControls component.
 */
export default function ProductFilterDrawer({ open, onClose, onResetFilters, filterControlProps }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Box sx={{ width: 330, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderBottom: '1px solid #e0e0e0', background: '#fff', flexShrink: 0, }}>
          <Typography variant="h6">Filter</Typography>
          <Box>
            <IconButton onClick={onResetFilters} size="small" aria-label="Reset Filters"><ReplayIcon /></IconButton>
            <IconButton onClick={onClose} size="small" aria-label="Close Drawer"><CloseIcon /></IconButton>
          </Box>
        </Box>
        {/* Scrollable content area for Product Filter Card */}
        <Box sx={{ overflowY: 'auto', flexGrow: 1, p: 5 }}>
          <FilterControls {...filterControlProps} />
        </Box>
      </Box>
    </Drawer>
  );
}
