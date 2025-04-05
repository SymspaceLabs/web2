import { FlexBox } from "../flex-box";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { H1 } from "../Typography";
import { elementalEndFont } from "./styles";

const SymRadio = ({ options, selectedValue, onChange, title }) => {
  return (
    <FlexBox flexDirection="column" gap={1}>
        <H1 color="white" mb={0.5}>
            {title}  
        </H1>
        <RadioGroup value={selectedValue} onChange={onChange}>
            <FlexBox alignItems="center" gap={1}>
                {options.map((option) => (
                    <FormControlLabel
                        className="custom-radio"
                        control={
                            <Radio
                                size="small"
                                value={option}
                                sx={{
                                    color: "white",
                                    "&.Mui-checked": {
                                        color: "white",
                                        backgroundColor: "black",
                                        borderRadius: "50%",
                                        padding: "4px",
                                    },
                                    "& .MuiSvgIcon-root": {
                                        fontSize: "20px",
                                    },
                                }}
                            />
                        }
                        label={option}
                        sx={{
                            color: "white", // Make label text white
                            "& .MuiFormControlLabel-label": {
                                color: "white",
                                ...elementalEndFont
                            },
                        }}
                    />
                ))}
            </FlexBox>
        </RadioGroup>
    </FlexBox>
  );
};

export default SymRadio;
