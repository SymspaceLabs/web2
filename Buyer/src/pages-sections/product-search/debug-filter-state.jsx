import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ChevronDown } from 'lucide-react';

/**
 * Debug component to display current filter state
 * Add this temporarily to see what's happening with your filters
 * 
 * Usage: <DebugFilterState filters={filters} products={products} displayedProducts={displayedProducts} />
 */
export default function DebugFilterState({ filters, products, displayedProducts, pagination }) {
  return (
    <Box sx={{ mb: 2, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
      <Accordion>
        <AccordionSummary expandIcon={<ChevronDown />}>
          <Typography variant="h6">🐛 Debug Info</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ fontFamily: 'monospace', fontSize: '12px' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Products:
            </Typography>
            <Typography>Total from backend: {products?.length || 0}</Typography>
            <Typography>After filtering: {displayedProducts?.length || 0}</Typography>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
              Pagination:
            </Typography>
            <Typography>Current page: {pagination?.currentPage || 'N/A'}</Typography>
            <Typography>Total pages: {pagination?.totalPages || 'N/A'}</Typography>
            <Typography>Total products: {pagination?.totalProducts || 'N/A'}</Typography>
            
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 2, mb: 1 }}>
              Active Filters:
            </Typography>
            <Typography>Brands: {filters?.brands?.length || 0} selected</Typography>
            {filters?.brands?.map(b => (
              <Typography key={b.id} sx={{ pl: 2 }}>- {b.name}</Typography>
            ))}
            
            <Typography>Colors: {filters?.colors?.length || 0} selected</Typography>
            {filters?.colors?.map(c => (
              <Typography key={c.code} sx={{ pl: 2 }}>- {c.name}</Typography>
            ))}
            
            <Typography>Availability: {filters?.availability?.length || 0} selected</Typography>
            {filters?.availability?.map(a => (
              <Typography key={a} sx={{ pl: 2 }}>- {a}</Typography>
            ))}
            
            <Typography>Categories: {filters?.categories?.length || 0} selected</Typography>
            {filters?.categories?.map(c => (
              <Typography key={c.id} sx={{ pl: 2 }}>- {c.name || c.id}</Typography>
            ))}
            
            <Typography>Price Range: [{filters?.priceRange?.[0] || 0}, {filters?.priceRange?.[1] || 0}]</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}