import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // LOCAL CUSTOM HOOKS

import useSearch from "./hooks/use-search"; // LOCAL CUSTOM COMPONENT

import SearchResult from "./components/search-result"; // STYLED COMPONENT

import { SearchOutlinedIcon } from "./styles";
export default function SearchInput({ btn=true, mxWidth="670px" }) {
  const {
    handleSearch,
    parentRef,
    resultList
  } = useSearch();
  const INPUT_PROPS = {
    sx: {
      borderRadius: '50px',
      height: 44,
      paddingRight: 0,
      overflow: "hidden",
      backgroundColor: "grey.200",
      "& .MuiOutlinedInput-notchedOutline": {
        border: 0
      }
    },
    endAdornment: btn && (
      <Button 
        disableElevation
        sx={{
          px: "1.5rem",
          height: "100%",
          borderRadius: "50px",
          fontFamily: 'Elemental End',
          textTransform:'lowercase',
          fontSize: 11,
          fontWeight: 400,
          color:'#FFF',
          background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
          border:'5px solid #FFF'
        }}
      >
        Search
      </Button>
    ),
    startAdornment: <SearchOutlinedIcon fontSize="small" />
  };
  return (
    <Box 
      position="relative"
      flex="1 1 0"
      maxWidth={mxWidth}
      mx="auto" 
      {...{ref: parentRef}}
    >
      <TextField fullWidth variant="outlined" placeholder="Searching for..." onChange={handleSearch} InputProps={INPUT_PROPS} />

      {/* SHOW SEARCH RESULT LIST */}
      {resultList.length > 0 ? <SearchResult results={resultList} /> : null}
    </Box>
  );
}