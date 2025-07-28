// ============================================
// Search Input Component
// ============================================

import useSearch from "./hooks/use-search"; // LOCAL CUSTOM COMPONENT
import SearchResult from "./components/search-result"; // STYLED COMPONENT

import { SearchOutlinedIcon } from "./styles"; // Assuming this is correct
import { Box, Button, TextField, InputAdornment, CircularProgress, Typography } from "@mui/material";

// ============================================

export default function SearchInput({ btn = true, mxWidth = "670px" }) {
  const {
    handleSearch,
    parentRef,
    resultList,
    loading,
    error
  } = useSearch();

  const getInputProps = (isButtonPresent) => ({
    sx: {
      borderRadius: '50px',
      height: 44,
      paddingLeft: 0,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
      }
    },
    endAdornment: isButtonPresent ? (
      <InputAdornment
        position="end"
        sx={{
          height: '100%',
          ml: '-5px',
          marginRight: 0,
          maxHeight: 'none',
        }}
      >
        <Button
          disableElevation
          sx={{
            px: "1.5rem",
            height: "100%",
            borderRadius: "50px",
            fontSize: 11,
            color: '#FFF',
            background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
            border: '5px solid #FFF',
            '&:hover': {
              background: 'linear-gradient(92.78deg, #1D4F99 39.5%, #3084FF 100%)',
            }
          }}
        >
          Search
        </Button>
      </InputAdornment>
    ) : null,
    startAdornment: (
      <InputAdornment
        position="start"
        sx={{
          pl: 2,
          marginRight: 0,
          maxHeight: 'none',
        }}
      >
        {loading ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          <SearchOutlinedIcon fontSize="small" />
        )}
      </InputAdornment>
    ),
  });

  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth={mxWidth}
      mx="auto"
      ref={parentRef}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search Symspace"
        onChange={handleSearch}
        InputProps={getInputProps(btn)}
      />

      {(loading || error || (resultList.length > 0 && !loading && !error)) && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            minWidth: '250px',
            backgroundColor: 'background.paper',
            boxShadow: 3,
            borderRadius: '8px',
            mt: 2,
            zIndex: 10,
            maxHeight: '320px',
            overflowY: 'auto',
          }}
        >
          {loading && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'left' }}>
              Loading suggestions...
            </Typography>
          )}

          {error && (
            <Typography
              variant="body2"
              color="error.dark"
              sx={{
                p: 2,
                textAlign: 'center',
                backgroundColor: 'error.light',
                border: '1px solid',
                borderColor: 'error.main',
                borderRadius: '8px',
                m: 1,
              }}
            >
              {error}
            </Typography>
          )}

          {!loading && !error && resultList.length > 0 && (
            <SearchResult results={resultList} />
          )}

          {!loading && !error && resultList.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'left' }}>
              No results found. {/* Changed from "No matching categories found." */}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}