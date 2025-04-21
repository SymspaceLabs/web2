export const styles = {
  paper: {
    elevation: 0,
    mt: 1, 
    boxShadow: 2, 
    minWidth: 200, 
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid",
    borderColor: "grey.200",
    color: '#fff',
    background: 'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
    "& .MuiMenuItem-root:hover": {
      background: 'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)',
      color: "#fff",
    }
  },
  text: {
    textTransform:'lowercase',
    color: "#fff",
    "& .MuiMenuItem-root:hover": {
      color: "#fff",
    },
    ":hover": {
      color: "#fff",
    }
  }
}