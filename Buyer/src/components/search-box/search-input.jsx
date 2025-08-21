// ============================================
// Search Input Component
// ============================================

import useSearch from "./hooks/use-search";
import SearchResult from "./components/search-result";
import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchOutlinedIcon } from "./styles";
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Typography,
  ClickAwayListener,
} from "@mui/material";

// ============================================

export default function SearchInput({ btn = true, mxWidth = "670px" }) {
  const { handleSearch, parentRef, resultList, loading, error } = useSearch();

  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  // ✅ Auto populate input from ?search= param only once (on first mount)
  useEffect(() => {
    if (initialized.current) return;
    const paramValue = searchParams.get("search");
    if (paramValue) {
      setSearchQuery(paramValue);
      handleSearch({ target: { value: paramValue } });
      // ❌ removed setOpen(true) so dropdown doesn't auto open
    }
    initialized.current = true;
  }, [searchParams, handleSearch]);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    handleSearch(event);
    setOpen(true); // ✅ only open while typing
  };

  const handleShopSearchClick = () => {
    if (searchQuery) {
      router.push(
        `/products/search/all?search=${encodeURIComponent(searchQuery)}`
      );
      setOpen(false);
    }
  };

  const getInputProps = (isButtonPresent) => ({
    sx: {
      borderRadius: "50px",
      height: 44,
      paddingLeft: 0,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0,
      },
    },
    endAdornment: isButtonPresent ? (
      <InputAdornment
        position="end"
        sx={{
          height: "100%",
          ml: "-5px",
          marginRight: 0,
          maxHeight: "none",
        }}
      >
        <Button
          disableElevation
          onClick={handleShopSearchClick}
          sx={{
            px: "1.5rem",
            height: "100%",
            borderRadius: "50px",
            fontSize: 11,
            color: "#FFF",
            background:
              "linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)",
            border: "2px solid #FFF",
            "&:hover": {
              background:
                "linear-gradient(92.78deg, #1D4F99 39.5%, #3084FF 100%)",
            },
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
          maxHeight: "none",
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
    <ClickAwayListener onClickAway={() => setOpen(false)}>
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
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleShopSearchClick();
            }
          }}
          onFocus={() => setOpen(true)} // ✅ open only when user clicks into the box
          InputProps={getInputProps(btn)}
        />

        {open && (searchQuery || loading || error || resultList.length > 0) && (
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              minWidth: "250px",
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: "8px",
              mt: 2,
              zIndex: 10,
              maxHeight: "320px",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {searchQuery && (
              <Box
                onClick={handleShopSearchClick}
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
              >
                <Typography variant="body1">
                  Search "{searchQuery}" Shops
                </Typography>
              </Box>
            )}

            {loading && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ p: 2, textAlign: "left" }}
              >
                Loading suggestions...
              </Typography>
            )}

            {error && (
              <Typography
                variant="body2"
                color="error.dark"
                sx={{
                  p: 2,
                  textAlign: "center",
                  backgroundColor: "error.light",
                  border: "1px solid",
                  borderColor: "error.main",
                  borderRadius: "8px",
                  m: 1,
                }}
              >
                {error}
              </Typography>
            )}

            {!loading && !error && resultList.length > 0 && (
              <SearchResult results={resultList} />
            )}

            {!loading && !error && searchQuery && resultList.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ p: 2, textAlign: "left" }}
              >
                No results found.
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
