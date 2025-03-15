import { Box } from "@mui/material";

export const BlobBox = ({top=null, right=null, bottom=null, left=null, color="#0366FE"}) => {
    return(
      <Box
        sx={{
          position: 'absolute',
          top: top,
          right: right,
          bottom: bottom,
          left: left,
          width: '50vw',
          height: '50vw',
          maxWidth: '500px',
          maxHeight: '500px',
          borderRadius: '50%',
          filter: 'blur(150px)',
          opacity: 0.5,
          backgroundColor: color,
        }}
      />
    )
  }