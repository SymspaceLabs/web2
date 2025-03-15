import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SymMoneyTextField from './SymMoneyTextField';
import SymNumberTextField from './SymNumberTextField';
import SymTooltip from './SymTooltip';

import { StyledTableCell, tableContainerStyles, tableFooterTextStyles, StyledTableRow  } from './TableStyles';


function createData(color, size, price, salePrice, supply, cost, profit) {
  return { color, size, price, salePrice, supply, cost, profit };
}

function groupVariantsByColor(variants) {
  const grouped = {};
  variants.forEach((variant) => {
    const { color } = variant;
    if (!grouped[color]) {
      grouped[color] = [];
    }
    grouped[color].push(variant);
  });
  return grouped;
}

function generateVariants(colors, sizes, masterValues) {
  const variants = [];

  colors.forEach((color) => {
    if (sizes.length === 0) {
      // Create a single row for the color with no size
      const profit = masterValues.supply > 0 ? (masterValues.salePrice - masterValues.cost) * masterValues.supply : 0;
      variants.push(createData(color, null, masterValues.price, masterValues.salePrice, masterValues.supply, masterValues.cost, profit));
    } else {
      // Create a row for each size under the color
      sizes.forEach((size) => {
        const profit = masterValues.supply > 0 ? (masterValues.salePrice - masterValues.cost) * masterValues.supply : 0;
        variants.push(createData(color, size, masterValues.price, masterValues.salePrice, masterValues.supply, masterValues.cost, profit));

      });
    }
  });

  return variants;
}

function ProductVariantsTable({ colors, sizes }) {
  const [rows, setRows] = useState([]);
  const [variantValues, setVariantValues] = useState({});
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);
  const [masterValues, setMasterValues] = useState({
    price: '',
    salePrice: '',
    supply: 0,
    cost: '',
    profit: '',
  });
  const [totalProfit, setTotalProfit] = useState(0);


  // Function to update color-specific rows and variantValues simultaneously
  const updateColorRows = (color, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.color === color && row.size === null) {
          // Update the parent row (color row) directly
          return { ...row, [field]: value };
        }
        return row;
      })
    );
    
    // Update color-specific variants but skip size rows
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        const [variantColor, size] = key.split('-');
        if (variantColor === color && size === 'null') {
          updatedValues[key] = { ...updatedValues[key], [field]: value };
          
          // Recalculate profit if relevant fields are updated
          if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
            const salePrice = parseFloat(updatedValues[key].salePrice || updatedValues[key].price || 0);
            updatedValues[key].profit = (salePrice - parseFloat(updatedValues[key].cost || 0)) * parseFloat(updatedValues[key].supply || 0);
          }
        }
      });
      return updatedValues;
    });
  };
  

  const handleMasterChange = (field, value) => {
    const updatedMasterValues = { ...masterValues, [field]: value };

    if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
      const salePrice = parseFloat(updatedMasterValues.salePrice || updatedMasterValues.price || 0);
      const cost = parseFloat(updatedMasterValues.cost || 0);
      const supply = parseFloat(updatedMasterValues.supply || 0);
      
      // Check if supply is 0 before calculating profit
      if (supply === 0) {
        updatedMasterValues.profit = 0;
      } else {
        updatedMasterValues.profit = (salePrice - cost) * supply;
      }
    }

    setMasterValues(updatedMasterValues);

    // Update each row with the new master value
    setRows((prevRows) =>
      prevRows.map((row) => {
        const updatedRow = { ...row, [field]: value };
        const salePrice = parseFloat(updatedRow.salePrice || updatedRow.price || 0);
        const cost = parseFloat(updatedRow.cost || 0);
        const supply = parseFloat(updatedRow.supply || 0);
        
        // Check if supply is 0 before calculating profit for each row
        if (supply === 0) {
          updatedRow.profit = 0;
        } else {
          updatedRow.profit = (salePrice - cost) * supply;
        }
        
        return updatedRow;
      })
    );

    // Update variantValues as well
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key] = { ...updatedValues[key], [field]: value };
        const salePrice = parseFloat(updatedValues[key].salePrice || updatedValues[key].price || 0);
        const cost = parseFloat(updatedValues[key].cost || 0);
        const supply = parseFloat(updatedValues[key].supply || 0);
        
        // Check if supply is 0 before calculating profit for variant values
        if (supply === 0) {
          updatedValues[key].profit = 0;
        } else {
          updatedValues[key].profit = (salePrice - cost) * supply;
        }
      });
      return updatedValues;
    });
  };

  useEffect(() => {
    const newRows = generateVariants(colors, sizes, masterValues);

    setRows((prevRows) => {
      return newRows.map((newRow) => {
        const existingRow = prevRows.find(
          (prevRow) => prevRow.color === newRow.color && prevRow.size === newRow.size
        );

        // Ensure that if size is removed, the parent color row retains its values
        if (newRow.size === null) {
          return existingRow
            ? {
                ...existingRow,
                size: null, // This is the parent row (no size)
                price: existingRow.price || newRow.price,
                salePrice: existingRow.salePrice || newRow.salePrice,
                supply: existingRow.supply || newRow.supply,
                cost: existingRow.cost || newRow.cost,
                profit: existingRow.profit || newRow.profit,
              }
            : newRow;
        }

        return existingRow ? { ...existingRow, ...newRow } : newRow;
      });
    });

    // Update variant values state
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };

      newRows.forEach((row) => {
        const key = `${row.color}-${row.size || 'null'}`;
        updatedValues[key] = updatedValues[key] || { ...row };
      });

      return updatedValues;
    });

    // Calculate total profit after setting new rows
    const total = newRows.reduce((acc, row) => {
      const profitValue = Number(row.profit) || 0; // Convert profitValue to a number
      console.log(`Calculating profit for ${row.color} ${row.size}: ${profitValue}`);
      return acc + profitValue;
    }, 0);

    setTotalProfit(total);



  }, [colors, sizes, masterValues]);

  
  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleParentChange = (color, field, value) => {
    updateColorRows(color, field, value); // Call your updateColorRows function
    
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      Object.keys(updatedValues).forEach((key) => {
        if (key.startsWith(`${color}-`)) {
          updatedValues[key] = { ...updatedValues[key], [field]: value };
          const salePrice = parseFloat(updatedValues[key].salePrice || updatedValues[key].price || 0);
          if (field === 'salePrice' || field === 'price' || field === 'cost') {
            updatedValues[key].profit = (salePrice - parseFloat(updatedValues[key].cost || 0));
          }
        }
      });
      return updatedValues;
    });
  };
  const handleVariantChange = (key, field, value) => {
    setVariantValues((prev) => {
      const updatedVariant = { ...prev[key], [field]: value };
      
      const salePrice = parseFloat(updatedVariant.salePrice || updatedVariant.price || 0);
      if (field === 'salePrice' || field === 'price' || field === 'cost' || field === 'supply') {
        const supply = parseFloat(updatedVariant.supply || 0);
        updatedVariant.profit = supply > 0 ? (salePrice - parseFloat(updatedVariant.cost || 0)) * supply : 0;
      }
      
      return {
        ...prev,
        [key]: updatedVariant,
      };
    });
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const groupedVariants = groupVariantsByColor(rows);

  // Calculate totals for each column
  const totalValues = {
    price: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.price || 0), 0),
    salePrice: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.salePrice || 0), 0),
    supply: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.supply || 0), 0),
    cost: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.cost || 0), 0),
    profit: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.profit || 0), 0),
  };

  

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">

        {/* TABLE HEAD */}
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" />
            <StyledTableCell sx={{ width: '200px', textAlign: 'left' }}>
              Variant
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Price
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Sale Price
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Supply
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Cost
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '200px' }}>
              Profit
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* Master Row */}
          <StyledTableRow>
            <StyledTableCell />
            <StyledTableCell>Update All Variants</StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.price}
                onChange={(e) => handleMasterChange('price', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.salePrice}
                onChange={(e) => handleMasterChange('salePrice', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymNumberTextField
                value={masterValues.supply}
                onChange={(e) => {
                  const value = Math.max(0, Number(e.target.value)); // Ensure value is not negative
                  handleMasterChange('supply', value);
                }}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.cost}
                onChange={(e) => handleMasterChange('cost', e.target.value)}
              />
            </StyledTableCell>
            <StyledTableCell align="right">
              <SymMoneyTextField
                value={masterValues.profit}
                onChange={(e) => handleMasterChange('profit', e.target.value)}
                readOnly={true}
                allowNegative={true}
                isProfit={true}
              />
            </StyledTableCell>
          </StyledTableRow>
          {Object.keys(groupedVariants).map((color) => (
            <React.Fragment key={color}>
               {/* Parent Row */}
               <StyledTableRow>
                <StyledTableCell>
                  <IconButton onClick={() => handleExpandClick(color)}>
                    {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left' }}>
                  {color}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].price}
                    onChange={(e) => handleParentChange(color, 'price', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].salePrice}
                    onChange={(e) => handleParentChange(color, 'salePrice', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymNumberTextField
                    value={groupedVariants[color][0].supply}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value)); 
                      handleParentChange(color, 'supply', value)
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].cost}
                    onChange={(e) => handleParentChange(color, 'cost', e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <SymMoneyTextField
                    value={groupedVariants[color][0].profit}
                    onChange={(e) => handleParentChange(color, 'profit', e.target.value)}
                    readOnly={true}
                    allowNegative={true}
                    isProfit={true}
                  />
                </StyledTableCell>
              </StyledTableRow>

              {/* Collapsible child rows */}
              <StyledTableRow>
                <StyledTableCell colSpan={7}>
                  <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                    <Table sx={{ minWidth: 700 }}  size="small" aria-label="variants" >
                      <TableBody>
                        {groupedVariants[color].map((row, index) => {
                          const key = `${row.color}-${row.size}`;
                          const isItemSelected = isSelected(row.size);
                          return (
                            <StyledTableRow key={row.size} hover selected={isItemSelected}>

                              <StyledTableCell sx={{ minWidth: '45px' }} />

                              <StyledTableCell sx={{ minWidth: '200px' }}>
                                {row.size || color}
                              </StyledTableCell>

                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.price || ''}
                                  onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.salePrice || ''}
                                  onChange={(e) => handleVariantChange(key, 'salePrice', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymNumberTextField
                                  value={variantValues[key]?.supply || 0}
                                  onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); 
                                    handleVariantChange(key, 'supply', value)
                                  }}
                                />

                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.cost || ''}
                                  onChange={(e) => handleVariantChange(key, 'cost', e.target.value)}
                                />
                              </StyledTableCell>
                              <StyledTableCell align="right" sx={{ minWidth: '185px' }}>
                                <SymMoneyTextField
                                  value={variantValues[key]?.profit || ''}
                                  // onChange={(e) => handleVariantChange(key, 'profit', e.target.value)}
                                  readOnly={true}
                                  allowNegative={true}
                                  isProfit={true}
                                />
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Collapse>
                </StyledTableCell>
              </StyledTableRow>
            </React.Fragment>
          ))}
        </TableBody>

        {/* Add the totals row */}
        <StyledTableRow>
          <StyledTableCell colSpan={2} sx={[tableFooterTextStyles, { textAlign: 'left', fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize:'14px' }]}>
            <strong>Total</strong>
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.price.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.salePrice.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.supply}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.cost.toFixed(2)}
          </StyledTableCell>
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {/* {totalValues.profit.toFixed(2)} */}
            {totalProfit}
          </StyledTableCell>
        </StyledTableRow>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;