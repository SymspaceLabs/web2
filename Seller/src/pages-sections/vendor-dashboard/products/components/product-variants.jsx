import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TextField,
  InputAdornment,
  tableCellClasses,
  Tooltip,
  IconButton 
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'; // Import Info icon
import SymMoneyTextField from './SymMoneyTextField';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: 2,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '& td, & th': {
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(variant, price, salePrice, supply, cost, profit) {
  return { variant, price, salePrice, supply, cost, profit };
}

function generateVariants(colors, sizes) {
  const variants = [];

  if (sizes.length === 0) {
    colors.forEach((color) => {
      variants.push(createData(color, null, null, 0, null, null)); 
    });
  } else if (colors.length === 0) {
    sizes.forEach((size) => {
      variants.push(createData(size, null, null, 0, null, null));
    });
  } else {
    colors.forEach((color) => {
      sizes.forEach((size) => {
        const variant = `${color} - ${size}`;
        variants.push(createData(variant, null, null, 0, null, null));
      });
    });
  }

  return variants;
}

function ProductVariantsTable({ colors, sizes }) {
  const [rows, setRows] = useState([]);
  const [price, setPrice] = useState(null);
  const [salePrice, setSalePrice] = useState(null);
  const [supply, setSupply] = useState(0);
  const [cost, setCost] = useState(null);


  useEffect(() => {
    const newRows = generateVariants(colors, sizes);
    setRows(newRows);
  }, [colors, sizes]);

  const [selected, setSelected] = useState([]);

  const handleSelectRow = (variant) => {
    const selectedIndex = selected.indexOf(variant);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, variant);
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleInputChange = (e, index, field) => {
    let value = e.target.value;
    value = value.replace(/[^\d.]/g, '');
    const numericValue = parseFloat(value) || 0;
  
    // Update the rows state with the new value
    const updatedRows = [...rows];
    updatedRows[index][field] = numericValue;
    setRows(updatedRows);
  };
  
  const handleMasterInputChange = (e, field) => {
    const value = e.target.value;
    const updatedRows = rows.map((row) => ({
      ...row,
      [field]: value,
    }));
    setRows(updatedRows);
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const formatPrice = (value) => {
    const formattedValue = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value || 0);
    return formattedValue;
  };

  const calculateProfit = (salePrice = 0, cost = 0, supply = 0) => {
    return (salePrice - cost) * supply || 0;
  };

  const columnWidth = '350px';

  // Add a condition to hide the table when colors and sizes are empty
  if (colors.length === 0 && sizes.length === 0) {
    return null; // Hide the table
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell sx={{ width: '30%', textAlign: 'left' }}>
              Variant
              <Tooltip title="Select the product variant">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Price
              <Tooltip title="Enter the product price">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ minWidth: '150px' }}>
              Sale Price
              <Tooltip title="Enter the discounted sale price">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Supply
              <Tooltip title="Enter the available supply">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Cost
              <Tooltip title="Enter the product cost">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} /> {/* Change icon color to white */}
                </IconButton>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: columnWidth }}>
              Profit
              <Tooltip title="Calculated profit based on sale price and cost">
                <IconButton size="small" aria-label="info">
                  <InfoOutlinedIcon fontSize="small" sx={{ color: 'white' }} />
                </IconButton>
              </Tooltip>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Master row */}
          <StyledTableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
              Master
            </StyledTableCell>

            {/* PRICE - MASTER*/}
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={price}
                placeholder="0.00"
                onChange={(e) => {
                  setPrice(e.target.value);
                  handleMasterInputChange({ ...e, target: { ...e.target, price } }, 'price');
                }}
              />
            </StyledTableCell>

            {/* SALE PRICE - MASTER*/}
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={salePrice}
                onChange={(e) => {
                  setSalePrice(e.target.value);
                  handleMasterInputChange(e, 'salePrice');
                }}
              />
            </StyledTableCell>

            {/* SUPPLY - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                value={supply}
                type="number"
                onChange={(e) => {
                  setSupply(e.target.value);
                  handleMasterInputChange(e, 'supply');
                }}
                fullWidth
                InputProps={{ style: { padding: 0 } }}
              />
            </StyledTableCell>

            {/* COST - MASTER*/}
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                  handleMasterInputChange(e, 'cost');
                }}
              />
              {/* <TextField
                variant="outlined"
                size="small"
                onChange={(e) => handleMasterInputChange(e, 'cost')}
                fullWidth
                InputProps={{
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
                inputProps={{
                  inputMode: 'decimal',
                }}
              /> */}
            </StyledTableCell>

            {/* PROFIT - MASTER*/}
            <StyledTableCell align="right">
              <TextField
                variant="outlined"
                size="small"
                // value={formatPrice(calculateProfit(row.salePrice, row.cost, row.supply))} // Pass row.supply to calculateProfit
                fullWidth
                disabled
                InputProps={{
                  readOnly: true,
                  style: { paddingLeft: '8px' },
                  startAdornment: (
                    <InputAdornment position="start">
                      $
                    </InputAdornment>
                  ),
                }}
              />
            </StyledTableCell>
          </StyledTableRow>

          {/* Product rows */}
          {rows.map((row, index) => {
            const isItemSelected = isSelected(row.variant);
            return (
              <StyledTableRow key={row.variant} hover selected={isItemSelected} >
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={() => handleSelectRow(row.variant)}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                  {row.variant}
                </StyledTableCell>

                {/* Price */}
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={row.price}
                    onChange={(e) => {
                      handleInputChange({ ...e, target: { ...e.target, value: e.target.value } }, index, 'price');
                    }}
                  />
                </StyledTableCell>


                {/* Sale Price */}
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={row.salePrice}
                    onChange={(e) => handleInputChange(e, index, 'salePrice')}
                  />
                </StyledTableCell>



                {/* Supply */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    value={row.supply}
                    onChange={(e) => handleInputChange(e, index, 'supply')}
                    fullWidth
                  />
                </StyledTableCell>

                {/* Cost */}
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={row.cost}
                    onChange={(e) => handleInputChange(e, index, 'cost')}
                  />
                </StyledTableCell>

                {/* Profit */}
                <StyledTableCell align="right">
                  <TextField
                    variant="outlined"
                    size="small"
                    value={formatPrice(calculateProfit(row.salePrice, row.cost, row.supply)).replace('$', '')} // Pass row.supply to calculateProfit
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      style: { paddingLeft: '8px' },
                      startAdornment: (
                        <InputAdornment position="start">
                          $
                        </InputAdornment>
                      ),
                    }}
                  />
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;
