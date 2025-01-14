import { Small } from "../Typography";
import { TextField } from "@mui/material";

const SymTextField = ({
    title,
    value,
    onChange,
    isEdit=true
}) => {
  return (
    <>
        <Small color="white" textAlign="left">
            {title}
        </Small>
        <TextField
            value={value}
            onChange={onChange}
            disabled={!isEdit}
            InputProps={{
            style: { color: '#fff' },
        }}
            sx={{
                background: '#000',
                borderRadius: '5px',
                color: '#fff',
            }}
        />
    </>
  )
}

export default SymTextField