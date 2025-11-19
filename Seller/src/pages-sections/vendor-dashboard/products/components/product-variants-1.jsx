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
  TextField
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Assuming these are custom components you have defined:
import SymMoneyTextField from './SymMoneyTextField';
import SymNumberTextField from './SymNumberTextField';
import SymTooltip from './SymTooltip';

import { StyledTableCell, tableContainerStyles, tableFooterTextStyles, StyledTableRow } from './TableStyles';

const sampleProps = {
  // 1. Array of top-level color names
  colors: ['Green', 'Red', 'Blue'],

  // 2. Array of size names
  sizes: ['L', 'M', 'S'],

  // 3. Array of initial variant objects (simulating API response)
  initialVariants: [
    // --- Green Variants ---
    {
      id: 'g-l',
      price: '19.99',
      salePrice: '15.00',
      stock: 15,
      cost: '8.00',
      material: '100% Cotton',
      color: { name: 'Green' },
      size: { size: 'L' }
    },
    {
      id: 'g-m',
      price: '19.99',
      salePrice: '15.00',
      stock: 25,
      cost: '8.00',
      material: '100% Cotton',
      color: { name: 'Green' },
      size: { size: 'M' }
    },
    {
      id: 'g-s',
      price: '19.99',
      salePrice: '', // Intentionally blank for testing
      stock: 0, // Out of stock
      cost: '7.50',
      material: '100% Cotton',
      color: { name: 'Green' },
      size: { size: 'S' }
    },
    
    // --- Red Variants ---
    {
      id: 'r-l',
      price: '24.99',
      salePrice: '20.00',
      stock: 10,
      cost: '10.50',
      material: 'Silk Blend',
      color: { name: 'Red' },
      size: { size: 'L' }
    },
    {
      id: 'r-m',
      price: '24.99',
      salePrice: '20.00',
      stock: 12,
      cost: '10.50',
      material: 'Silk Blend',
      color: { name: 'Red' },
      size: { size: 'M' }
    },
    {
      id: 'r-s',
      price: '24.99',
      salePrice: '20.00',
      stock: 8,
      cost: '10.50',
      material: 'Silk Blend',
      color: { name: 'Red' },
      size: { size: 'S' }
    },
    
    // --- Blue Variants ---
    {
      id: 'b-l',
      price: '29.99',
      salePrice: '',
      stock: 5,
      cost: '12.00',
      material: 'Polyester',
      color: { name: 'Blue' },
      size: { size: 'L' }
    },
    {
      id: 'b-m',
      price: '29.99',
      salePrice: '',
      stock: 2,
      cost: '12.00',
      material: 'Polyester',
      color: { name: 'Blue' },
      size: { size: 'M' }
    },
    {
      id: 'b-s',
      price: '29.99',
      salePrice: '',
      stock: 1,
      cost: '12.00',
      material: 'Polyester',
      color: { name: 'Blue' },
      size: { size: 'S' }
    },
  ],
};

// Example usage in a React application:
// <ProductVariantsTable {...sampleProps} />

// Helper function to calculate profit
const calculateProfit = (price, salePrice, cost, supply) => {
  const finalPrice = parseFloat(salePrice || price || 0);
  const finalCost = parseFloat(cost || 0);
  const finalSupply = parseFloat(supply || 0);
  return finalSupply > 0 ? (finalPrice - finalCost) * finalSupply : 0;
}

// Helper: Maps API data to internal state structure
function transformInitialVariants(variants) {
  const initialRows = [];
  const initialVariantValues = {};
  let totalProfit = 0;

  variants.forEach((v) => {
    const colorName = v.color.name;
    const sizeName = v.size ? v.size.size : null;
    const price = v.price || '';
    const salePrice = v.salePrice || '';
    const supply = v.stock || 0;
    const cost = v.cost || '';
    const material = v.material || '';

    const profit = calculateProfit(price, salePrice, cost, supply);

    const rowData = {
      color: colorName,
      size: sizeName,
      price: price,
      salePrice: salePrice,
      supply: supply,
      cost: cost,
      profit: profit,
      material: material,
      id: v.id,
    };
    
    initialRows.push(rowData);
    initialVariantValues[`${colorName}-${sizeName || 'null'}`] = rowData;
    totalProfit += profit;
  });

  return { initialRows, initialVariantValues, totalProfit };
}

// Function to handle grouping of rows by color for the UI
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

// Function to create an empty row structure
function createData(color, size, price, salePrice, supply, cost, profit, material) {
  return { color, size, price, salePrice, supply, cost, profit, material };
}

// Function to generate variants (only used if colors/sizes change *after* load)
function generateVariants(colors, sizes, masterValues, existingVariants) {
  const newVariants = [];

  colors.forEach((color) => {
    const generateSizeVariants = (size) => {
      // Find existing variant for this color/size combination
      const existingKey = `${color}-${size || 'null'}`;
      const existing = existingVariants[existingKey];
      
      // Use existing values if available, otherwise use master values
      const price = existing?.price || masterValues.price;
      const salePrice = existing?.salePrice || masterValues.salePrice;
      const supply = existing?.supply || masterValues.supply;
      const cost = existing?.cost || masterValues.cost;
      const material = existing?.material || masterValues.material;
      
      const profit = calculateProfit(price, salePrice, cost, supply);

      newVariants.push(createData(
        color, 
        size, 
        price, 
        salePrice, 
        supply, 
        cost, 
        profit,
        material
      ));
    };

    if (sizes.length === 0) {
      generateSizeVariants(null);
    } else {
      sizes.forEach(generateSizeVariants);
    }
  });

  return newVariants;
}


function ProductVariantsTable({ colors = sampleProps.colors, sizes = sampleProps.sizes, initialVariants = sampleProps.initialVariants }) {
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
    material: ''
  });
  const [totalProfit, setTotalProfit] = useState(0);

  // EFFECT 1: Initial Data Load (runs once on mount)
  useEffect(() => {
    if (initialVariants.length > 0) {
      const { initialRows, initialVariantValues, totalProfit } = transformInitialVariants(initialVariants);
      setRows(initialRows);
      setVariantValues(initialVariantValues);
      setTotalProfit(totalProfit);
      
      if (initialRows.length > 0) {
          const firstRow = initialRows[0];
          setMasterValues({
              price: firstRow.price,
              salePrice: firstRow.salePrice,
              supply: firstRow.supply,
              cost: firstRow.cost,
              profit: firstRow.profit,
              material: firstRow.material
          });
      }
    } else {
      // If no initial data, generate based on master defaults
      const initialRows = generateVariants(colors, sizes, masterValues, {});
      const initialVariantValues = {};
      let totalProfit = 0;
      
      initialRows.forEach(row => {
          const key = `${row.color}-${row.size || 'null'}`;
          initialVariantValues[key] = row;
          totalProfit += row.profit;
      });
      
      setRows(initialRows);
      setVariantValues(initialVariantValues);
      setTotalProfit(totalProfit);
    }
  }, []); 

  // Function to update color-specific rows and variantValues simultaneously (Parent Change)
  const updateColorRows = (color, field, value) => {
    const updatedValues = { ...variantValues };
    let newTotalProfit = totalProfit;
    
    // 1. Update all child variants (size rows) within that color group
    Object.keys(updatedValues).forEach((key) => {
      if (key.startsWith(`${color}-`)) {
        
        // Subtract old profit
        newTotalProfit -= parseFloat(updatedValues[key].profit || 0);
        
        updatedValues[key] = { ...updatedValues[key], [field]: value };
        
        // Recalculate profit
        const variant = updatedValues[key];
        variant.profit = calculateProfit(variant.price, variant.salePrice, variant.cost, variant.supply);
        
        // Add new profit
        newTotalProfit += variant.profit;
      }
    });
    
    setVariantValues(updatedValues);
    setTotalProfit(newTotalProfit);
    
    // 2. Update the parent row in `rows` state for display
    setRows((prevRows) =>
      prevRows.map((row) => {
        if (row.color === color) {
          return updatedValues[`${color}-${row.size || 'null'}`] || row; 
        }
        return row;
      })
    );
  };
  

  // 🐛 FIX APPLIED HERE: Define updatedValues outside the setVariantValues callback
  const handleMasterChange = (field, value) => {
    const updatedMasterValues = { ...masterValues, [field]: value };

    // Master Profit Calculation 
    if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
      updatedMasterValues.profit = calculateProfit(updatedMasterValues.price, updatedMasterValues.salePrice, updatedMasterValues.cost, updatedMasterValues.supply);
    }

    setMasterValues(updatedMasterValues);
    
    // 1. Define updatedValues in the local scope
    let updatedValues = {}; 
    let newTotalProfit = 0;
    
    // 2. Calculate and set variantValues
    setVariantValues((prevVariantValues) => {
      updatedValues = { ...prevVariantValues }; // Assign to outer scope variable
      
      Object.keys(updatedValues).forEach((key) => {
        updatedValues[key] = { ...updatedValues[key], [field]: value };
        
        const variant = updatedValues[key];
        
        if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
          variant.profit = calculateProfit(variant.price, variant.salePrice, variant.cost, variant.supply);
        }
        
        newTotalProfit += variant.profit;
      });
      setTotalProfit(newTotalProfit);
      return updatedValues; // Return the new state for setVariantValues
    });
    
    // 3. Update rows state synchronously using the derived updatedValues
    setRows((prevRows) => 
        prevRows.map(row => updatedValues[`${row.color}-${row.size || 'null'}`] || row)
    );
  };
  
  // EFFECT 2: Recalculate and re-generate on color/size/master change
  useEffect(() => {
    // This effect handles structural changes (new colors/sizes) or master value changes
    const newRows = generateVariants(colors, sizes, masterValues, variantValues);
    
    let newTotalProfit = 0;
    const updatedVariantValues = {};
    
    newRows.forEach((row) => {
        const key = `${row.color}-${row.size || 'null'}`;
        const existing = variantValues[key];
        
        if (existing) {
            updatedVariantValues[key] = {
                ...existing,
                ...row, 
            };
        } else {
            updatedVariantValues[key] = row;
        }

        const finalVariant = updatedVariantValues[key];
        finalVariant.profit = calculateProfit(finalVariant.price, finalVariant.salePrice, finalVariant.cost, finalVariant.supply);
        newTotalProfit += finalVariant.profit;
    });

    setRows(newRows);
    setVariantValues(updatedVariantValues);
    setTotalProfit(newTotalProfit);
    
  }, [colors, sizes, masterValues.price, masterValues.salePrice, masterValues.cost, masterValues.supply, masterValues.material]);

  
  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleParentChange = (color, field, value) => {
    updateColorRows(color, field, value);
  };
  
  const handleVariantChange = (key, field, value) => {
    let oldProfit = parseFloat(variantValues[key]?.profit || 0);
    let newProfit = 0;
    
    setVariantValues((prev) => {
      const updatedVariant = { ...prev[key], [field]: value };
      
      updatedVariant.profit = calculateProfit(updatedVariant.price, updatedVariant.salePrice, updatedVariant.cost, updatedVariant.supply);
      newProfit = updatedVariant.profit;
      
      return {
        ...prev,
        [key]: updatedVariant,
      };
    });
    
    setTotalProfit(prevTotal => prevTotal - oldProfit + newProfit);
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const groupedVariants = groupVariantsByColor(rows);

  // Calculate totals for each column (using variantValues as the source of truth)
  const totalValues = {
    price: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.price || 0), 0),
    salePrice: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.salePrice || 0), 0),
    supply: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.supply || 0), 0),
    cost: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.cost || 0), 0),
    // Use totalProfit state which is calculated during variant updates
    // profit: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.profit || 0), 0), 
  };

  return (
    <TableContainer component={Paper} sx={tableContainerStyles}>
      <Table sx={{ minWidth: 1200 }} aria-label="customized table">

        {/* TABLE HEAD */}
        <TableHead>
          <TableRow>
            <StyledTableCell padding="checkbox" sx={{ width: '45px' }} /> {/* Fixed width for icon column */}
            <StyledTableCell sx={{ width: '150px', textAlign: 'left' }}>
              Variant
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '120px' }}>
              Price
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '120px' }}>
              Sale Price
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '100px' }}>
              Supply
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '120px' }}>
              Cost
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell align="right" sx={{ width: '120px' }}>
              Profit
              <SymTooltip title="Select the product variant" />
            </StyledTableCell>
            <StyledTableCell sx={{ width: '150px', textAlign: 'left' }}>
              Material
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
                  const value = Math.max(0, Number(e.target.value)); 
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

            {/* Master Material Input */}
            <StyledTableCell align="left">
              <TextField
                InputProps={{
                  style: {
                      backgroundColor: 'white',
                      color: '#000',
                      boxShadow: '0px 0px 4px rgba(48, 132, 255, 0.75)',
                      borderRadius: '8px'
                  }
                }}
                variant="outlined"
                size="small"
                fullWidth
                value={masterValues.material}
                onChange={(e) => handleMasterChange('material', e.target.value)}
                placeholder="e.g. Cotton, Silk"
              />
            
            </StyledTableCell>

          </StyledTableRow>
          {Object.keys(groupedVariants).map((color) => (
            <React.Fragment key={color}>
              {/* Parent Row */}
              <StyledTableRow>
                <StyledTableCell sx={{ width: '45px' }}>
                  <IconButton onClick={() => handleExpandClick(color)}>
                    {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </IconButton>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left', width: '150px' }}>
                  {color}
                </StyledTableCell>
                
                {/* Price */}
                <StyledTableCell align="right" sx={{ width: '120px' }}>
                  <SymMoneyTextField
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.price || ''}
                    onChange={(e) => handleParentChange(color, 'price', e.target.value)}
                  />
                </StyledTableCell>

                {/* Sale Price */}
                <StyledTableCell align="right" sx={{ width: '120px' }}>
                  <SymMoneyTextField
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.salePrice || ''}
                    onChange={(e) => handleParentChange(color, 'salePrice', e.target.value)}
                  />
                </StyledTableCell>

                {/* Supply */}
                <StyledTableCell align="right" sx={{ width: '100px' }}>
                  <SymNumberTextField
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.supply || 0}
                    onChange={(e) => {
                      const value = Math.max(0, Number(e.target.value)); 
                      handleParentChange(color, 'supply', value)
                    }}
                  />
                </StyledTableCell>

                {/* Cost */}
                <StyledTableCell align="right" sx={{ width: '120px' }}>
                  <SymMoneyTextField
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.cost || ''}
                    onChange={(e) => handleParentChange(color, 'cost', e.target.value)}
                  />
                </StyledTableCell>

                {/* Profit */}
                <StyledTableCell align="right" sx={{ width: '120px' }}>
                  <SymMoneyTextField
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.profit || ''}
                    onChange={(e) => handleParentChange(color, 'profit', e.target.value)}
                    readOnly={true}
                    allowNegative={true}
                    isProfit={true}
                  />
                </StyledTableCell>

                {/* Parent Material Input */}
                <StyledTableCell align="left" sx={{ width: '150px' }}>
                  <TextField
                    sx={{
                      '& .MuiInputBase-input': {
                        backgroundColor: 'white',
                        '&::placeholder': {
                          color: 'gray',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'black',
                      },
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        '&.Mui-focused fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                    value={variantValues[`${color}-${sizes.length === 0 ? 'null' : (groupedVariants[color][0]?.size || 'null')}`]?.material || ''}
                    onChange={(e) => handleParentChange(color, 'material', e.target.value)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  />
                </StyledTableCell>

              </StyledTableRow>

              {/* Collapsible child rows */}
              <StyledTableRow>
                <StyledTableCell colSpan={9} style={{ padding: 0 }}> {/* IMPORTANT: Remove padding */}
                  <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                    <Table sx={{ minWidth: 1200 }} size="small" aria-label="variants" >
                      <TableBody>
                        {groupedVariants[color].map((row, index) => {
                          if (row.size === null && sizes.length > 0) return null; 
                          
                          const key = `${row.color}-${row.size || 'null'}`;
                          const variantData = variantValues[key];
                          const isItemSelected = isSelected(row.size);
                          
                          if (!variantData) return null; 
                          
                          return (
                            <StyledTableRow key={key} hover selected={isItemSelected}>

                              {/* ALIGNMENT FIX: Match parent column widths exactly */}
                              
                              {/* 1. Placeholder for Icon column (45px) */}
                              <StyledTableCell sx={{ width: '45px' }} />

                              {/* 2. Variant (Size) (150px) */}
                              <StyledTableCell sx={{ width: '150px' }}>
                                {row.size || color}
                              </StyledTableCell>

                              {/* 3. Price (120px) */}
                              <StyledTableCell align="right" sx={{ width: '120px' }}>
                                <SymMoneyTextField
                                  value={variantData.price || ''}
                                  onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                                />
                              </StyledTableCell>
                              
                              {/* 4. Sale Price (120px) */}
                              <StyledTableCell align="right" sx={{ width: '120px' }}>
                                <SymMoneyTextField
                                  value={variantData.salePrice || ''}
                                  onChange={(e) => handleVariantChange(key, 'salePrice', e.target.value)}
                                />
                              </StyledTableCell>
                              
                              {/* 5. Supply (100px) */}
                              <StyledTableCell align="right" sx={{ width: '100px' }}>
                                <SymNumberTextField
                                  value={variantData.supply || 0}
                                  onChange={(e) => {
                                    const value = Math.max(0, Number(e.target.value)); 
                                    handleVariantChange(key, 'supply', value)
                                  }}
                                />

                              </StyledTableCell>
                              
                              {/* 6. Cost (120px) */}
                              <StyledTableCell align="right" sx={{ width: '120px' }}>
                                <SymMoneyTextField
                                  value={variantData.cost || ''}
                                  onChange={(e) => handleVariantChange(key, 'cost', e.target.value)}
                                />
                              </StyledTableCell>
                              
                              {/* 7. Profit (120px) */}
                              <StyledTableCell align="right" sx={{ width: '120px' }}>
                                <SymMoneyTextField
                                  value={variantData.profit || ''}
                                  readOnly={true}
                                  allowNegative={true}
                                  isProfit={true}
                                />
                              </StyledTableCell>
                              
                              {/* 8. Material (150px) */}
                              <StyledTableCell sx={{ width: '150px' }}>
                                <TextField
                                  sx={{
                                    '& .MuiInputBase-input': {
                                      backgroundColor: 'white',
                                      '&::placeholder': {
                                        color: 'gray',
                                      },
                                    },
                                    '& .MuiInputLabel-root': {
                                      color: 'black',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                      backgroundColor: 'white',
                                      '&.Mui-focused fieldset': {
                                        borderColor: 'black',
                                      },
                                    },
                                  }}
                                  value={variantData.material || ''}
                                  onChange={(e) => handleVariantChange(key, 'material', e.target.value)}
                                  variant="outlined"
                                  size="small"
                                  fullWidth
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

        {/* Totals row */}
        <StyledTableRow>
          <StyledTableCell colSpan={2} sx={[tableFooterTextStyles, { textAlign: 'left', fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize:'14px' }]}>
            **Total**
          </StyledTableCell>
          <StyledTableCell colSpan={2} /> 
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {totalValues.supply}
          </StyledTableCell>
          <StyledTableCell colSpan={1} /> 
          <StyledTableCell align="right" sx={tableFooterTextStyles}>
            {(typeof totalProfit === 'number' ? totalProfit : 0).toFixed(2)}
          </StyledTableCell>
          <StyledTableCell />
        </StyledTableRow>
      </Table>
    </TableContainer>
  );
}

export default ProductVariantsTable;