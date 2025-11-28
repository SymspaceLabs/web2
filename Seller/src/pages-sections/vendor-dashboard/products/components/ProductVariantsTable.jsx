import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  TextField, 
  TableFooter,
  Box,
  Tooltip
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { H1 } from '@/components/Typography';
import { InfoOutlined } from "@mui/icons-material";

// Mocks for unused components (Replace with your actual imports)
import SymNumberTextField from './SymNumberTextField'; 
import SymMoneyTextField from './SymMoneyTextField'; 
import SymTooltip from './SymTooltip'; 

// Ensure these are imported correctly from your file structure
import { StyledTableCell, tableContainerStyles, tableFooterTextStyles, StyledTableRow } from './TableStyles';

// --- GLOBAL HELPER FUNCTIONS ---

const calculateProfit = (price, salePrice, cost, supply) => {
  const finalPrice = parseFloat(salePrice || price || 0) || 0;
  const finalCost = parseFloat(cost || 0) || 0;
  const finalSupply = parseFloat(supply || 0) || 0;
  const result = finalSupply > 0 ? (finalPrice - finalCost) * finalSupply : 0;
  return isNaN(result) ? 0 : result;
}

function transformInitialVariants(variants) {
    const initialRows = [];
    const initialVariantValues = {};
    let totalProfit = 0;

    const safeVariants = Array.isArray(variants) ? variants : [];

    safeVariants.forEach((v) => {
        const colorName = v.color?.name || 'Unknown';
        const sizeName = v.size?.size || null;
        
        const price = parseFloat(v.price) || 0;
        const salePrice = parseFloat(v.salePrice) || 0;
        // Use v.stock as primary supply source
        const supply = v.stock || 0; 
        // NOTE: v.cost is NOT in your JSON, assuming it comes from elsewhere or is 0
        const cost = parseFloat(v.cost || 0) || 0; 
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
            id: v.id, // <-- CRITICAL: Include the original ID
        };

        initialRows.push(rowData);
        initialVariantValues[`${colorName}-${sizeName || 'null'}`] = rowData;
        totalProfit += profit;
    });
    return { initialRows, initialVariantValues, totalProfit };
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

// function createData(color, size, price, salePrice, supply, cost, profit, material) {
//   return { color, size, price, salePrice, supply, cost, profit, material };
// }

// Function: generateVariants (Revised)
function generateVariants(colors, sizes, masterValues, existingVariantsMap) {
  const newVariants = [];

  colors.forEach((color) => {
    const generateSizeVariants = (size) => {
      // 1. Create the unique key for lookup
      const key = `${color}-${size || 'null'}`;
      // 2. Look up existing data for this color/size combination
      const existing = existingVariantsMap[key]; 

      // 3. Determine values: use existing data if present, otherwise use master values
      const price = existing?.price ?? masterValues.price;
      const salePrice = existing?.salePrice ?? masterValues.salePrice;
      const supply = existing?.supply ?? masterValues.supply;
      const cost = existing?.cost ?? masterValues.cost;
      const material = existing?.material ?? masterValues.material;
      // Also grab the original ID if it exists (CRITICAL for updates!)
      const id = existing?.id; 

      const profit = calculateProfit(price, salePrice, cost, supply);

      newVariants.push(createData(
        color,
        size,
        price,
        salePrice,
        supply,
        cost,
        profit,
        material,
        id // Include the ID
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

// Function: createData (Needs 'id' added)
function createData(color, size, price, salePrice, supply, cost, profit, material, id = null) {
  return { color, size, price, salePrice, supply, cost, profit, material, id };
}

// Function: getInitialState (Revised)
function getInitialState(colors, sizes, initialVariants) {
    const safeInitialVariants = Array.isArray(initialVariants) ? initialVariants : [];
    
    // Use transformInitialVariants to convert the raw props into a usable map and rows array
    const { initialRows: transformedRows, initialVariantValues: transformedVariantValues, totalProfit: transformedTotalProfit } = transformInitialVariants(safeInitialVariants);

    // If we have existing data, we use it to set the master and row data
    if (transformedRows.length > 0) { 
        const firstRow = transformedRows[0] || {};
        const masterValues = {
            price: firstRow.price || 0,
            salePrice: firstRow.salePrice || 0,
            supply: firstRow.supply || 0,
            cost: firstRow.cost || 0,
            profit: firstRow.profit || 0,
            material: firstRow.material || ''
        };
        // Use the transformed (original) data as the initial state
        return { initialRows: transformedRows, initialVariantValues: transformedVariantValues, totalProfit: transformedTotalProfit, masterValues };
    }

    // Default state if no variants exist yet (fresh product or no selection)
    const masterValues = { price: 0, salePrice: 0, supply: 0, cost: 0, profit: 0, material: '' };
    // Pass an empty map for existing variants when generating fresh defaults
    const initialRows = generateVariants(colors, sizes, masterValues, {}); 
    const initialVariantValues = {};
    let totalProfit = 0;

    initialRows.forEach(row => {
        const key = `${row.color}-${row.size || 'null'}`;
        initialVariantValues[key] = row;
        totalProfit += row.profit;
    });

    return { initialRows, initialVariantValues, totalProfit, masterValues };
}


// --- MAIN COMPONENT ---

function ProductVariantsTable({ colors, sizes, initialVariants, onVariantsChange }) {
    
  // --- CLEAN PROP HANDLING (No Samples) ---
  const { finalColors, finalSizes, finalInitialVariants } = useMemo(() => {
      return { 
          finalColors: colors || [], 
          finalSizes: sizes || [], 
          finalInitialVariants: initialVariants || [] 
      };
  }, [colors, sizes, initialVariants]);
  
  // --- STATE INITIALIZATION ---
  const { initialRows, initialVariantValues, totalProfit: initialTotalProfit, masterValues: initialMasterValues } = getInitialState(finalColors, finalSizes, finalInitialVariants);

  const [rows, setRows] = useState(() => initialRows);
  const [variantValues, setVariantValues] = useState(() => initialVariantValues);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);

  const [masterValues, setMasterValues] = useState(() => initialMasterValues);
  const [totalProfit, setTotalProfit] = useState(() => initialTotalProfit);
  
  // ProductVariantsTable.jsx: REPLACEMENT FOR STRUCTURAL useEffect

  // Effect: Re-structure state ONLY when Colors or Sizes change.
  // Effect: Re-structure state ONLY when Colors or Sizes change.
// Effect: Re-structure state ONLY when Colors or Sizes change.
  useEffect(() => {
      // We only want to run this block if the structure defined by props changes.
      // If the props (colors/sizes) haven't changed, the existing variantValues are structurally correct.
      
      // Use the current variant values as the 'existing variants' map
      const existingVariantMap = variantValues; 

      // Generate the new variant structure by merging in existing data where keys match
      const newRows = generateVariants(finalColors, finalSizes, masterValues, existingVariantMap);
      
      const newVariantValues = {};
      let newTotalProfit = 0;

      newRows.forEach(row => {
          const key = `${row.color}-${row.size || 'null'}`;
          newVariantValues[key] = row;
          newTotalProfit += row.profit;
      });

      // Determine if the structure has actually changed (e.g., a color was added/removed)
      const newKeys = Object.keys(newVariantValues);
      const currentKeys = Object.keys(existingVariantMap);

      const structureChanged = (
        newKeys.length !== currentKeys.length ||
        !newKeys.every(key => currentKeys.includes(key))
      );

      if (structureChanged) {
          setRows(newRows);
          setVariantValues(newVariantValues);
          setTotalProfit(newTotalProfit);
          // Do not update masterValues here unless it's explicitly required
          
          // This log helps debug: console.log("Structure update triggered!");
      }
      // If structure hasn't changed, do nothing. User edits are handled by the handlers.

  }, [finalColors, finalSizes]); // 🔑 Crucial Change: variantValues removed from dependencies!

  // Effect: Sync local state changes back to Parent Component
  useEffect(() => {
    if (onVariantsChange) {
      // NOTE: Ensure variantValues is always an object/map when passed to parent
      onVariantsChange(variantValues); 
    }
  }, [variantValues, onVariantsChange]);


  // --- HANDLERS ---

  const updateColorRows = (color, field, value) => {
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      let newTotalProfit = 0; 

      const updatedKeys = Object.keys(updatedValues).filter(key => key.startsWith(`${color}-`));

      updatedKeys.forEach((key) => {
        const variant = updatedValues[key];
        const updatedVariant = { ...variant, [field]: value };

        if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
          updatedVariant.profit = calculateProfit(updatedVariant.price, updatedVariant.salePrice, updatedVariant.cost, updatedVariant.supply);
        }
        
        updatedValues[key] = updatedVariant;
      });

      Object.values(updatedValues).forEach(variant => {
        newTotalProfit += variant.profit;
      });
      
      setTotalProfit(newTotalProfit);

      setRows((prevRows) => 
        prevRows.map((row) => updatedValues[`${row.color}-${row.size || 'null'}`] || row)
      );

      return updatedValues; 
    });
  };

  const handleMasterChange = (field, rawValue) => {
    
    let value = rawValue;
    
    if (['price', 'salePrice', 'cost'].includes(field)) {
        // Clean the string before conversion
        const cleanedString = String(rawValue).replace(/[^0-9.]/g, ''); 
        value = parseFloat(cleanedString) || 0; 
    }

    const updatedMasterValues = { ...masterValues, [field]: value };

    if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
        updatedMasterValues.profit = calculateProfit(
            updatedMasterValues.price, 
            updatedMasterValues.salePrice, 
            updatedMasterValues.cost, 
            updatedMasterValues.supply
        );
    }

    setMasterValues(updatedMasterValues);
    
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      let newTotalProfit = 0;

      Object.keys(updatedValues).forEach((key) => {
        const variant = updatedValues[key];

        const updatedVariant = { ...variant, [field]: value };

        if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
          updatedVariant.profit = calculateProfit(
            updatedVariant.price, 
            updatedVariant.salePrice, 
            updatedVariant.cost, 
            updatedVariant.supply
          );
        }

        updatedValues[key] = updatedVariant;
        newTotalProfit += updatedVariant.profit;
      });

      setTotalProfit(newTotalProfit);

      setRows((prevRows) => 
          prevRows.map(row => updatedValues[`${row.color}-${row.size || 'null'}`] || row)
      );

      return updatedValues; 
    });
  };

  const handleExpandClick = (color) => {
    setExpanded((prev) => ({
      ...prev,
      [color]: !prev[color],
    }));
  };

  const handleParentChange = (color, field, value) => {
    updateColorRows(color, field, value);
  };

  const handleVariantChange = (key, field, rawValue) => {
    
    let finalValue = rawValue;
    
    if (['price', 'salePrice', 'cost'].includes(field)) {
        const cleanedString = String(rawValue).replace(/[^0-9.]/g, ''); 
        finalValue = parseFloat(cleanedString) || 0; 
    }

    const oldProfit = parseFloat(variantValues[key]?.profit || 0);

    setVariantValues((prev) => {
      const updatedVariant = { 
        ...prev[key], 
        [field]: finalValue 
      };

      if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
        updatedVariant.profit = calculateProfit(updatedVariant.price, updatedVariant.salePrice, updatedVariant.cost, updatedVariant.supply);
      }

      const newProfit = updatedVariant.profit;

      setTotalProfit(prevTotal => {
        const newTotal = prevTotal - oldProfit + newProfit;
        return newTotal;
      });

      setRows(prevRows => prevRows.map(row => 
        (row.color === updatedVariant.color && row.size === updatedVariant.size) ? updatedVariant : row
      ));

      return {
        ...prev,
        [key]: updatedVariant,
      };
    });
  };

  const isSelected = (variant) => selected.indexOf(variant) !== -1;

  const groupedVariants = groupVariantsByColor(rows);

  const totalValues = {
    supply: Object.values(variantValues).reduce((acc, row) => acc + parseFloat(row.supply || 0), 0), 
  };
  
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <H1 color='#FFF' mr={1}>
            Product Variants
        </H1>
        <Tooltip title="Manage variations like Color, Size, and corresponding SKUs/Prices">
            <IconButton>
                <InfoOutlined sx={{ color: '#fff', fontSize: 10 }} />
            </IconButton>
        </Tooltip>
      </Box>
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table sx={{ minWidth: 1200 }} aria-label="customized table">

          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" sx={{ width: '45px' }} /> 
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
              <StyledTableCell sx={{ width: '45px' }} />
              <StyledTableCell sx={{ width: '150px', fontWeight: 'bold' }}>Update All Variants</StyledTableCell>
                          
              {/* Master Price */}
              <StyledTableCell align="right" sx={{ width: '120px' }}>
                <SymMoneyTextField
                  value={masterValues.price}
                  onChange={(e) => handleMasterChange('price', e.target.value)}
                />
              </StyledTableCell>

              {/* Master Sale Price */}
              <StyledTableCell align="right" sx={{ width: '120px' }}>
                <SymMoneyTextField
                  value={masterValues.salePrice}
                  onChange={(e) => handleMasterChange('salePrice', e.target.value)}
                />
              </StyledTableCell>

              {/* Supply */}
              <StyledTableCell align="right" sx={{ width: '100px' }}>
                <SymNumberTextField
                  value={masterValues.supply}
                  onChange={(e) => {
                    const value = Math.max(0, Number(e.target.value)); 
                    handleMasterChange('supply', value);
                  }}
                />
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ width: '120px' }}>
                <SymMoneyTextField
                  value={masterValues.cost}
                  onChange={(e) => handleMasterChange('cost', e.target.value)}
                />
              </StyledTableCell>

              <StyledTableCell align="right" sx={{ width: '120px' }}>
                <SymMoneyTextField
                  value={parseFloat(masterValues.profit || 0).toFixed(2)}
                  InputProps={{ readOnly: true }}
                />
              </StyledTableCell>

              {/* Material */}
              <StyledTableCell align="left" sx={{ width: '150px' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={masterValues.material}
                  onChange={(e) => handleMasterChange('material', e.target.value)}
                  placeholder="e.g. Cotton, Silk"
                  sx={{
                    '& .MuiInputBase-input': { backgroundColor: 'white' },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                      '&.Mui-focused fieldset': { borderColor: 'black' }, 
                    },
                  }}
                />
              </StyledTableCell>

            </StyledTableRow>
            {Object.keys(groupedVariants).map((color) => {
              
              const representativeRow = groupedVariants[color].find(row => row.size === 'L' || row.size === null) || groupedVariants[color][0];
              const representativeKey = `${color}-${representativeRow?.size || 'null'}`;
              const variantData = variantValues[representativeKey]; 
              
              return (
                <React.Fragment key={color}>
                  {/* Parent Row */}
                  <StyledTableRow>
                    <StyledTableCell sx={{ width: '45px' }}>
                      <IconButton onClick={() => handleExpandClick(color)}>
                        {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton>
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left', width: '150px', fontWeight: 'bold' }}>
                      {color}
                    </StyledTableCell>
                    
                    {/* Price */}
                    <StyledTableCell align="right" sx={{ width: '120px' }}>
                      <SymMoneyTextField
                        value={variantData?.price || ''}
                        onChange={(e) => handleParentChange(color, 'price', e.target.value)}
                      />
                    </StyledTableCell>

                    {/* Sale Price */}
                    <StyledTableCell align="right" sx={{ width: '120px' }}>
                      <SymMoneyTextField
                        value={variantData?.salePrice || ''}
                        onChange={(e) => handleParentChange(color, 'salePrice', e.target.value)}
                      />
                    </StyledTableCell>

                    {/* Supply */}
                    <StyledTableCell align="right" sx={{ width: '100px' }}>
                      <SymNumberTextField
                        value={variantData?.supply || 0}
                        onChange={(e) => {
                          const value = Math.max(0, Number(e.target.value)); 
                          handleParentChange(color, 'supply', value)
                        }}
                      />
                    </StyledTableCell>

                    {/* Cost */}
                    <StyledTableCell align="right" sx={{ width: '120px' }}>
                      <SymMoneyTextField
                        value={variantData?.cost || ''}
                        onChange={(e) => handleParentChange(color, 'cost', e.target.value)}
                      />
                    </StyledTableCell>

                    {/* Profit */}
                    <StyledTableCell align="right" sx={{ width: '120px' }}>
                      <SymMoneyTextField
                        value={groupedVariants[color].reduce((sum, v) => {
                            const key = `${v.color}-${v.size || 'null'}`;
                            return sum + parseFloat(variantValues[key]?.profit || 0);
                        }, 0).toFixed(2)}
                        InputProps={{ readOnly: true }}
                      />
                    </StyledTableCell>

                    {/* Parent Material Input */}
                    <StyledTableCell align="left" sx={{ width: '150px' }}>
                      <TextField
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={variantData?.material || ''}
                        onChange={(e) => handleParentChange(color, 'material', e.target.value)}
                        placeholder="e.g. Cotton, Silk"
                        sx={{
                          '& .MuiInputBase-input': { backgroundColor: 'white' },
                          '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            '&.Mui-focused fieldset': { borderColor: 'black' }, 
                          },
                        }}
                      />
                    </StyledTableCell>

                  </StyledTableRow>

                  {/* Collapsible child rows */}
                  <StyledTableRow>
                    <StyledTableCell colSpan={9} style={{ padding: 0 }}> 
                      <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                        <Table sx={{ minWidth: 1200 }} size="small" aria-label="variants" >
                          <TableBody>
                            {groupedVariants[color].filter(row => finalSizes.length > 0 ? row.size !== null : true).map((row, index) => {
                              
                              const key = `${row.color}-${row.size || 'null'}`;
                              const variantData = variantValues[key]; 
                              const isItemSelected = isSelected(row.size); 
                              
                              if (!variantData) return null; 
                              
                              return (
                                <StyledTableRow key={key} hover selected={isItemSelected}>

                                  {/* 1. Placeholder for Icon column (45px) */}
                                  <StyledTableCell sx={{ width: '45px' }} />

                                  {/* 2. Variant (Size) (150px) */}
                                  <StyledTableCell sx={{ width: '150px', paddingLeft: '24px' }}> 
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
                                  
                                  {/* Supply */}
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
                                      value={parseFloat(variantData.profit || 0).toFixed(2)}
                                      InputProps={{ readOnly: true }}
                                    />
                                  </StyledTableCell>
                                  
                                  {/* 8. Material (150px) */}
                                  <StyledTableCell sx={{ width: '150px' }}>
                                    <TextField
                                      variant="outlined"
                                      size="small"
                                      fullWidth
                                      value={variantData.material || ''}
                                      onChange={(e) => handleVariantChange(key, 'material', e.target.value)}
                                      placeholder="e.g. Cotton, Silk"
                                      sx={{
                                        '& .MuiInputBase-input': { backgroundColor: 'white' },
                                        '& .MuiOutlinedInput-root': {
                                          backgroundColor: 'white',
                                          '&.Mui-focused fieldset': { borderColor: 'black' }, 
                                        },
                                      }}
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
              );
            })}
          </TableBody>

          {/* Totals row */}
          <TableFooter> 
            <StyledTableRow>
              <StyledTableCell colSpan={2} sx={[tableFooterTextStyles, { textAlign: 'left', fontFamily: 'Elemental End', textTransform: 'lowercase', fontSize:'14px' }]}>
                Total
              </StyledTableCell>
              <StyledTableCell colSpan={2} /> 
              <StyledTableCell align="right" sx={tableFooterTextStyles}>
                {/* Total Supply */}
                {totalValues.supply}
              </StyledTableCell>
              <StyledTableCell colSpan={1} /> 
              <StyledTableCell align="right" sx={tableFooterTextStyles}>
                {/* Total Profit */}
                {(typeof totalProfit === 'number' ? totalProfit : 0).toFixed(2)}
              </StyledTableCell>
              <StyledTableCell />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductVariantsTable;