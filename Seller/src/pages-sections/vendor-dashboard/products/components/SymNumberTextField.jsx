import { TextField } from '@mui/material';

function SymNumberTextField({ value, onChange }) {

    return (
        <TextField
            variant="outlined"
            size="small"
            value={value}
            type="number"
            onChange={onChange}
            onFocus={(event) => event.target.select() }
            fullWidth
            sx={{
                '& .MuiInputBase-input': {
                    color: 'black', // Set the input text color to black
                    backgroundColor: 'white', // Set background color to white
                    '&::placeholder': {
                        color: 'gray', // Set the placeholder text color to gray
                    },
                },
                '& .MuiInputLabel-root': {
                    color: 'black', // Set the label color to black (if used)
                },
                '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white', // Set background color for the input
                    // '& fieldset': {
                    //     borderColor: 'black', // Set the border color to black
                    // },
                    // '&:hover fieldset': {
                    //     borderColor: 'black', // Border color on hover
                    // },
                    '&.Mui-focused fieldset': {
                        borderColor: 'black', // Border color when focused
                    },
                },
            }}
            InputProps={{ style: { padding: 0 } }}
        />
    );
}

export default SymNumberTextField;
