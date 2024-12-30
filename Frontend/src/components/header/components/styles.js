export const styles = {
    paper:  {
        elevation: 0,
        sx: { mt: 1, boxShadow: 2, minWidth: 200, borderRadius: "8px",
          overflow: "visible",
          border: "1px solid",
          borderColor: "grey.200",
          fontFamily:'Elemental End',
          color:'#fff',
          background:'linear-gradient(180deg, rgba(62, 61, 69, 0.48) 0%, rgba(32, 32, 32, 0.64) 100%)',
          "& .MuiMenuItem-root:hover": {
            background:'linear-gradient(92.78deg, #3084FF 39.5%, #1D4F99 100%)'
          },
          "&:before": {
            top: 0,
            right: 14,
            zIndex: 0,
            width: 10,
            height: 10,
            content: '""',
            display: "block",
            position: "absolute",
            borderTop: "1px solid",
            borderLeft: "1px solid",
            borderColor: "grey.200",
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)"
          }
        }
    },
    text: {
        fontFamily:'Elemental End',
        textTransform:'lowercase'
    }
}