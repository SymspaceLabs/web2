import React from 'react'
import { TextField, MenuItem, Box, Typography, Button, Tooltip, IconButton, Dialog, DialogTitle,  DialogContent, DialogActions } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { H1 } from '@/components/Typography';
import { FlexBox, FlexCol } from '@/components/flex-box';

const baseSizes = [
    { name: 'S' },
    { name: 'M' },
    { name: 'L' },
    { name: 'XL' },
    { name: 'XXL' },
  ];


const SizeDialog = ({
    newSize,
    open,
    onClose,
    sizeChartUrl,
    handleChangeSize,
    handleAddCustomSize,
    handleChangeSizeChartUrl
}) => {
  return (
    <div>
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { background: "rgba(255, 255, 255, 0.4)", boxShadow: "inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)", backdropFilter: "blur(10.0285px)", borderRadius: "80px",  width: "1039px", }, }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: "20px 46px", gap: "5px", background: "rgba(188, 188, 188, 0.1)", boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)", backdropFilter: "blur(50px)" }}>
            <DialogTitle sx={{ fontFamily: 'Elemental End', textTransform: 'lowercase', color: '#000' }}>Size selection</DialogTitle>
            <DialogContent sx={{ width:'100%', px:0 }}>
                
                {/* Size name */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <H1 sx={{ color: '#000' }}>
                        Size name
                    </H1>
                    <Tooltip title="Enter the product's name">
                    <IconButton>
                        <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                    </IconButton>
                    </Tooltip>
                </Box>
                <TextField fullWidth label="" value={newSize} onChange={handleChangeSize} h="Enter a color" InputProps={{ style: { backgroundColor: 'white', color: '#000', borderRadius: '2px', },}} />

                {/* Base size */}
                <Box sx={{ display: 'flex', alignItems: 'center', pt: 3 }}>
                    <H1 sx={{ color: '#000' }}>
                        Base size
                    </H1>
                    <Tooltip title="Select a base color">
                        <IconButton>
                        <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                        </IconButton>
                    </Tooltip>
                </Box>
                <TextField
                    select
                    fullWidth
                    size="medium"
                    // onChange={handleBaseColorChange} // Update color when a base color is selected
                    InputProps={{
                        style: {
                        backgroundColor: 'white',
                        color: '#000',
                        boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                        borderRadius: '8px',
                        },
                    }}
                >
                    {baseSizes.map((baseSize) => (
                        <MenuItem key={baseSize.name} value={baseSize.name}>
                        {baseSize.name}
                        </MenuItem>
                    ))}
                </TextField>

                <FlexCol sx={{ pt: 3 }}>
                    <FlexBox sx={{ alignItems: 'center' }}>
                        <H1 sx={{ color: '#000' }}>
                            Size Chart Url
                        </H1>
                        <Tooltip title="Enter the product's name">
                        <IconButton>
                            <InfoOutlined sx={{ color: '#000', fontSize: 10 }} />
                        </IconButton>
                        </Tooltip>
                    </FlexBox>

                    <TextField 
                        fullWidth
                        label=""
                        value={sizeChartUrl}
                        onChange={handleChangeSizeChartUrl}
                        h="Enter a color"
                        InputProps={{ 
                            style: { 
                                backgroundColor: 'white', 
                                color: '#000', 
                                borderRadius: '2px'
                            }
                        }}
                    />
                </FlexCol>
                

            </DialogContent>
            <DialogActions sx={{ width:'100%'}}>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddCustomSize} variant="contained" color="info" type="submit" sx={{ padding: '5px 46px', background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 102, 254, 0.1) 100%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(50px)', borderRadius: '12px' }}>
                    Add
                </Button>
            </DialogActions>
            </Box>
        </Dialog>
  </div>
  )
}

export default SizeDialog