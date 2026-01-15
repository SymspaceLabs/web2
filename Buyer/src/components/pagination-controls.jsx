import { Box, Button, Typography } from '@mui/material';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

/**
 * Pagination controls with auto-scroll to top
 */
export default function PaginationControls({ 
  currentPage, 
  totalPages, 
  totalProducts,
  pageSize,
  onPageChange 
}) {
  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // Number of page buttons to show
    
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    // Adjust start if we're near the end
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  // Calculate the range of products currently displayed
  const startProduct = (currentPage - 1) * pageSize + 1;
  const endProduct = Math.min(currentPage * pageSize, totalProducts);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        mt: 4,
        mb: 2,
      }}
    >
      {/* Product count info */}
      <Typography
        variant="body2"
        sx={{ color: 'text.secondary' }}
      >
        Showing {startProduct}-{endProduct} of {totalProducts} products
      </Typography>

      {/* Pagination controls */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap'
        }}
      >
        {/* Previous button */}
        <Button
          variant="outlined"
          size="small"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          sx={{ minWidth: 40 }}
        >
          <ChevronLeft size={16} />
        </Button>

        {/* First page + ellipsis */}
        {getPageNumbers()[0] > 1 && (
          <>
            <Button
              variant={currentPage === 1 ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPageChange(1)}
              sx={{ minWidth: 40 }}
            >
              1
            </Button>
            {getPageNumbers()[0] > 2 && (
              <Typography sx={{ px: 1, color: 'text.secondary' }}>...</Typography>
            )}
          </>
        )}

        {/* Page number buttons */}
        {getPageNumbers().map(page => (
          <Button
            key={page}
            variant={currentPage === page ? 'contained' : 'outlined'}
            size="small"
            onClick={() => onPageChange(page)}
            sx={{ minWidth: 40 }}
          >
            {page}
          </Button>
        ))}

        {/* Last page + ellipsis */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <Typography sx={{ px: 1, color: 'text.secondary' }}>...</Typography>
            )}
            <Button
              variant={currentPage === totalPages ? 'contained' : 'outlined'}
              size="small"
              onClick={() => onPageChange(totalPages)}
              sx={{ minWidth: 40 }}
            >
              {totalPages}
            </Button>
          </>
        )}

        {/* Next button */}
        <Button
          variant="outlined"
          size="small"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          sx={{ minWidth: 40 }}
        >
          <ChevronRight size={16} />
        </Button>
      </Box>
    </Box>
  );
}