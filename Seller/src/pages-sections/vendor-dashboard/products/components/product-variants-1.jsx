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
  TableFooter 
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Mocks for unused components
import SymMoneyTextField from './SymMoneyTextField'; 
import SymNumberTextField from './SymNumberTextField'; 
import SymTooltip from './SymTooltip'; 

// Ensure these are imported correctly from your file structure
import { StyledTableCell, tableContainerStyles, tableFooterTextStyles, StyledTableRow } from './TableStyles';
// import { SymTextField } from '@/components/custom-inputs';
import SymTextField from './SymTextField';

// --- GLOBAL CONSTANTS (Moved outside to prevent infinite loops) ---
const SAMPLE_PROPS = {
  colors: ['Green', 'Red', 'Blue'],
  sizes: ['L', 'M', 'S'],
  initialVariants: [
    { id: 'g-l', price: '30.00', salePrice: '25.00', stock: 15, cost: '10.00', material: '100% Cotton', color: { name: 'Green' }, size: { size: 'L' } },
    { id: 'g-m', price: '30.00', salePrice: '25.00', stock: 20, cost: '10.00', material: '100% Cotton', color: { name: 'Green' }, size: { size: 'M' } },
    { id: 'g-s', price: '30.00', salePrice: '25.00', stock: 5, cost: '10.00', material: '100% Cotton', color: { name: 'Green' }, size: { size: 'S' } }, 
    
    { id: 'r-l', price: '45.00', salePrice: '40.00', stock: 10, cost: '20.00', material: 'Silk Blend', color: { name: 'Red' }, size: { size: 'L' } },
    { id: 'r-m', price: '45.00', salePrice: '40.00', stock: 12, cost: '20.00', material: 'Silk Blend', color: { name: 'Red' }, size: { size: 'M' } },
    { id: 'r-s', price: '45.00', salePrice: '40.00', stock: 8, cost: '20.00', material: 'Silk Blend', color: { name: 'Red' }, size: { size: 'S' } }, 
    
    { id: 'b-l', price: '50.00', salePrice: '', stock: 5, cost: '25.00', material: 'Polyester', color: { name: 'Blue' }, size: { size: 'L' } },
    { id: 'b-m', price: '50.00', salePrice: '', stock: 2, cost: '25.00', material: 'Polyester', color: { name: 'Blue' }, size: { size: 'M' } },
    { id: 'b-s', price: '50.00', salePrice: '', stock: 1, cost: '25.00', material: 'Polyester', color: { name: 'Blue' }, size: { size: 'S' } }, 
  ],
};

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

  variants.forEach((v) => {
    const colorName = v.color.name;
    const sizeName = v.size ? v.size.size : null;
    const price = v.price || '';
    const salePrice = v.salePrice || '';
    const supply = v.stock || v.supply || 0; 
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

function createData(color, size, price, salePrice, supply, cost, profit, material) {
  return { color, size, price, salePrice, supply, cost, profit, material };
}

function generateVariants(colors, sizes, masterValues, existingVariants) {
  const newVariants = [];

  colors.forEach((color) => {
    const generateSizeVariants = (size) => {
      const existingKey = `${color}-${size || 'null'}`;
      const existing = existingVariants[existingKey];

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

function getInitialState(colors, sizes, initialVariants) {
  if (initialVariants.length > 0) { 
    const { initialRows, initialVariantValues, totalProfit } = transformInitialVariants(initialVariants);

    const firstRow = initialRows[0] || {};
    const masterValues = {
      price: firstRow.price || '',
      salePrice: firstRow.salePrice || '',
      supply: firstRow.supply || 0,
      cost: firstRow.cost || '',
      profit: firstRow.profit || 0,
      material: firstRow.material || ''
    };
    return { initialRows, initialVariantValues, totalProfit, masterValues };
  }

  const masterValues = { price: '', salePrice: '', supply: 0, cost: '', profit: 0, material: '' };
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

function ProductVariantsTable({ colors, sizes, initialVariants }) {
    
  // --- REVISED PROP DEFAULTING LOGIC (With useMemo to fix infinite loops) ---
  
  // useMemo ensures these values are stable references unless dependencies change.
  const { finalColors, finalSizes, finalInitialVariants } = useMemo(() => {
      
      // 1. Check for data existence (Smart Check)
      // Fixes issue where parent passes rows with only color/size but no values
      const incomingHasData = initialVariants && initialVariants.some(v => v.price || v.stock || v.supply);

      // 2. Resolve Props
      const resolvedColors = colors && colors.length > 0 ? colors : SAMPLE_PROPS.colors;
      const resolvedSizes = sizes && sizes.length > 0 ? sizes : SAMPLE_PROPS.sizes;
      
      // 3. Choose Data Source
      const resolvedVariants = (
          initialVariants && initialVariants.length > 0 && incomingHasData
          ? initialVariants 
          : SAMPLE_PROPS.initialVariants
      );

      return { 
          finalColors: resolvedColors, 
          finalSizes: resolvedSizes, 
          finalInitialVariants: resolvedVariants 
      };

  }, [colors, sizes, initialVariants]); // Only recalculate if props change
  
  // --- END REVISED PROP DEFAULTING ---


  // Calculate initial data once
  const { initialRows, initialVariantValues, totalProfit: initialTotalProfit, masterValues: initialMasterValues } = getInitialState(finalColors, finalSizes, finalInitialVariants);

  const [rows, setRows] = useState(initialRows);
  const [variantValues, setVariantValues] = useState(initialVariantValues);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState([]);

  const [masterValues, setMasterValues] = useState(initialMasterValues);

  const [totalProfit, setTotalProfit] = useState(initialTotalProfit);
  
  // Effect Hook re-runs only when the memoized values change
  useEffect(() => {
    const { initialRows, initialVariantValues, totalProfit, masterValues } = getInitialState(finalColors, finalSizes, finalInitialVariants);
    setRows(initialRows);
    setVariantValues(initialVariantValues);
    setTotalProfit(totalProfit);
    setMasterValues(masterValues);
  }, [finalColors, finalSizes, finalInitialVariants]); 

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

  const handleMasterChange = (field, value) => {
    const updatedMasterValues = { ...masterValues, [field]: value };

    if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
      updatedMasterValues.profit = calculateProfit(updatedMasterValues.price, updatedMasterValues.salePrice, updatedMasterValues.cost, updatedMasterValues.supply);
    }

    setMasterValues(updatedMasterValues);
    
    setVariantValues((prevVariantValues) => {
      const updatedValues = { ...prevVariantValues };
      let newTotalProfit = 0;

      Object.keys(updatedValues).forEach((key) => {
        const variant = updatedValues[key];

        const updatedVariant = { ...variant, [field]: value };

        if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
          updatedVariant.profit = calculateProfit(updatedVariant.price, updatedVariant.salePrice, updatedVariant.cost, updatedVariant.supply);
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

  const handleVariantChange = (key, field, value) => {
    let oldProfit = parseFloat(variantValues[key]?.profit || 0);

    setVariantValues((prev) => {
      const updatedVariant = { 
        ...prev[key], 
        [field]: value 
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
                        
            <StyledTableCell align="right" sx={{ width: '120px' }}>
              <SymMoneyTextField
                value={masterValues.price}
                onChange={(e) => handleMasterChange('price', e.target.value)}
              />
            </StyledTableCell>

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
                  // styles the inner input element
                  '& .MuiInputBase-input': {
                    backgroundColor: 'white',
                  },
                  // styles the outer container (border, etc)
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    // Optional: Matches the focus color from your SymMoneyTextField
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
                        // styles the inner input element
                        '& .MuiInputBase-input': {
                          backgroundColor: 'white',
                        },
                        // styles the outer container (border, etc)
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'white',
                          // Optional: Matches the focus color from your SymMoneyTextField
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
                                      // styles the inner input element
                                      '& .MuiInputBase-input': {
                                        backgroundColor: 'white',
                                      },
                                      // styles the outer container (border, etc)
                                      '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'white',
                                        // Optional: Matches the focus color from your SymMoneyTextField
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
              **Total**
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
  );
}

export default ProductVariantsTable;