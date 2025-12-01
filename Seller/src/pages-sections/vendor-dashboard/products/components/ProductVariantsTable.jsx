// =============================================================
// Product Variants Table 
// =============================================================

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    Table, TableBody, TableContainer, TableHead, TableRow, Paper,
    IconButton, Collapse, TextField, TableFooter, Box, Tooltip
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';

import { H1 } from '@/components/Typography';
import { InfoOutlined } from "@mui/icons-material";

// Mocks for unused components (Replace with your actual imports)
import SymNumberTextField from './SymNumberTextField'; 
import SymMoneyTextField from './SymMoneyTextField'; 
import SymTooltip from './SymTooltip'; 

// Ensure these are imported correctly from your file structure
import { StyledTableCell, tableContainerStyles, tableFooterTextStyles, StyledTableRow } from './TableStyles';

// --- IMPORTED UTILS ---
import { 
    calculateProfit, 
    groupVariantsByColor, 
    generateVariants, 
    getInitialState 
} from './utils';

import EditDimensionsModal from './EditDimentionsModal';

// =============================================================

// --- MAIN COMPONENT ---

// Define the column widths for consistency
const COL_WIDTHS = {
    EXPANDER: '45px',
    VARIANT: '150px',
    DIMENSIONS: '140px', 
    PRICE: '120px',
    SALE_PRICE: '120px',
    SUPPLY: '100px',
    COST: '120px',
    PROFIT: '120px',
    MATERIAL: '150px',
};

function ProductVariantsTable({ colors, sizes, initialVariants, onVariantsChange }) {
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

    // --- MODAL STATE ---
    const [modalOpen, setModalOpen] = useState(false);
    const [editingVariantKey, setEditingVariantKey] = useState(null);
    const editingVariant = editingVariantKey ? variantValues[editingVariantKey] : null; 
    
    // Effect: Re-structure state ONLY when Colors or Sizes change.
    useEffect(() => {
        const existingVariantMap = variantValues; 
        // NOTE: generateVariants is imported from utils
        const newRows = generateVariants(finalColors, finalSizes, masterValues, existingVariantMap);
        
        const newVariantValues = {};
        let newTotalProfit = 0;

        newRows.forEach(row => {
            const key = `${row.color}-${row.size || 'null'}`;
            newVariantValues[key] = row;
            newTotalProfit += row.profit;
        });

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
        }
    }, [finalColors, finalSizes, masterValues]); 

    // Effect: Sync local state changes back to Parent Component
    useEffect(() => {
        if (onVariantsChange) {
            onVariantsChange(variantValues); 
        }
    }, [variantValues, onVariantsChange]);


    // --- HANDLERS (Must remain inside component to access state setters) ---

    const handleMasterChange = useCallback((field, rawValue) => {
        let value = rawValue;

        if (['price', 'salePrice', 'cost'].includes(field)) {
            const cleanedString = String(rawValue).replace(/[^0-9.]/g, '');
            value = parseFloat(cleanedString) || 0;
        }

        setMasterValues((prevMasterValues) => {
            const updatedMasterValues = { ...prevMasterValues, [field]: value };

            if (['salePrice', 'price', 'cost', 'supply'].includes(field)) {
                updatedMasterValues.profit = calculateProfit(
                    updatedMasterValues.price,
                    updatedMasterValues.salePrice,
                    updatedMasterValues.cost,
                    updatedMasterValues.supply
                );
            }
            return updatedMasterValues;
        });
        
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
            
            // setRows(prevRows => prevRows.map(row => 
            //     (row.color === updatedVariant.color && row.size === updatedVariant.size) ? updatedVariant : row
            // ));

            setRows(prevRows => prevRows.map(row => {
                const key = `${row.color}-${row.size || 'null'}`;
                // Use the new value if it exists, otherwise keep the old row.
                return updatedValues[key] || row; 
            }));
            
            return updatedValues; 
        });
    }, [setVariantValues, setRows, setTotalProfit]);


    const handleVariantChange = useCallback((key, field, rawValue) => {
        let value = rawValue;

        if (['price', 'salePrice', 'cost'].includes(field)) {
            const cleanedString = String(rawValue).replace(/[^0-9.]/g, '');
            value = parseFloat(cleanedString) || 0;
        }

        setVariantValues((prevVariantValues) => {
            const updatedValues = { ...prevVariantValues };
            const variant = updatedValues[key];
            
            if (!variant) return prevVariantValues;

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
            
            let newTotalProfit = 0;
            Object.values(updatedValues).forEach(v => {
                newTotalProfit += v.profit;
            });
            setTotalProfit(newTotalProfit);

            setRows(prevRows => prevRows.map(row => 
                (row.color === updatedVariant.color && row.size === updatedVariant.size) ? updatedVariant : row
            ));
            
            return updatedValues;
        });
    }, [setVariantValues, setRows, setTotalProfit]);


    const handleParentChange = useCallback((color, field, rawValue) => {
        let value = rawValue;

        if (['price', 'salePrice', 'cost'].includes(field)) {
            const cleanedString = String(rawValue).replace(/[^0-9.]/g, '');
            value = parseFloat(cleanedString) || 0;
        }

        setVariantValues((prevVariantValues) => {
            const updatedValues = { ...prevVariantValues };
            let newTotalProfit = 0;
            
            Object.keys(updatedValues).forEach((key) => {
                const variant = updatedValues[key];
                
                if (variant.color === color) {
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
                    
                    // setRows(prevRows => prevRows.map(row => 
                    //     (row.color === updatedVariant.color && row.size === updatedVariant.size) ? updatedVariant : row
                    // ));
                }
                newTotalProfit += updatedValues[key].profit;
            });
            
            setTotalProfit(newTotalProfit);

            setRows(prevRows => prevRows.map(row => {
                const key = `${row.color}-${row.size || 'null'}`;
                return updatedValues[key] || row; 
            }));

            return updatedValues;
        });
    }, [setVariantValues, setRows, setTotalProfit]);


    const handleExpandClick = (color) => {
      setExpanded((prev) => ({
        ...prev,
        [color]: !prev[color],
      }));
    };
    
    const handleDimensionChange = useCallback((key, dimensions, sizeChartFile) => {
        setVariantValues((prev) => {
            const updatedVariant = { 
                ...prev[key], 
                dimensions: dimensions,
                sizeChartFile: sizeChartFile,
            };

            setRows(prevRows => prevRows.map(row => 
                (row.color === updatedVariant.color && row.size === updatedVariant.size) ? updatedVariant : row
            ));

            return {
                ...prev,
                [key]: updatedVariant,
            };
        });
        setModalOpen(false);
        setEditingVariantKey(null);
    }, [setVariantValues, setRows]);

    const handleEditDimensions = (key) => {
        setEditingVariantKey(key);
        setModalOpen(true);
    };

    const isSelected = (variant) => selected.indexOf(variant) !== -1;

    // NOTE: groupVariantsByColor is imported from utils
    const groupedVariants = groupVariantsByColor(rows); 

    const totalValues = {
        // ... (Total values calculation logic)
    };
    
    // --- CORRECTED JSX ---
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
                            {/* 1. Checkbox/Expander */}
                            <StyledTableCell padding="checkbox" sx={{ width: COL_WIDTHS.EXPANDER }} /> 
                            {/* 2. Variant */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.VARIANT, textAlign: 'left' }}> 
                                Variant
                                <SymTooltip title="Select the product variant" />
                            </StyledTableCell>
                            {/* 3. Dimensions (Header) */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.DIMENSIONS, textAlign: 'center' }}> 
                                Dimensions
                            </StyledTableCell>
                            {/* 4. Price */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PRICE }}> 
                                Price
                            </StyledTableCell>
                            {/* 5. Sale Price */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SALE_PRICE }}> 
                                Sale Price
                            </StyledTableCell>
                            {/* 6. Supply */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SUPPLY }}> 
                                Supply
                            </StyledTableCell>
                            {/* 7. Cost */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.COST }}> 
                                Cost
                            </StyledTableCell>
                            {/* 8. Profit */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PROFIT }}> 
                                Profit
                            </StyledTableCell>
                            {/* 9. Material */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.MATERIAL, textAlign: 'left' }}> 
                                Material
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {/* Master Row JSX (Update All Variants) */}
                        <StyledTableRow>
                            {/* 1. Checkbox/Expander */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.EXPANDER }} />
                            {/* 2. Variant */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.VARIANT, fontWeight: 'bold' }}>Update All Variants</StyledTableCell>
                            {/* 3. Dimensions (Empty cell for master row) */}
                            <StyledTableCell sx={{ width: COL_WIDTHS.DIMENSIONS, textAlign: 'center', color: '#888' }} />
                            {/* 4. Price */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PRICE }}>
                                <SymMoneyTextField
                                    value={masterValues.price}
                                    onChange={(e) => handleMasterChange('price', e.target.value)}
                                />
                            </StyledTableCell>
                            {/* 5. Sale Price */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SALE_PRICE }}>
                                <SymMoneyTextField
                                    value={masterValues.salePrice}
                                    onChange={(e) => handleMasterChange('salePrice', e.target.value)}
                                />
                            </StyledTableCell>
                            {/* 6. Supply */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SUPPLY }}>
                                <SymNumberTextField
                                    value={masterValues.supply}
                                    onChange={(e) => {
                                        const value = Math.max(0, Number(e.target.value)); 
                                        handleMasterChange('supply', value);
                                    }}
                                />
                            </StyledTableCell>
                            {/* 7. Cost */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.COST }}>
                                <SymMoneyTextField
                                    value={masterValues.cost}
                                    onChange={(e) => handleMasterChange('cost', e.target.value)}
                                />
                            </StyledTableCell>
                            {/* 8. Profit */}
                            <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PROFIT }}>
                                <SymMoneyTextField
                                    value={parseFloat(masterValues.profit || 0).toFixed(2)}
                                    InputProps={{ readOnly: true }}
                                />
                            </StyledTableCell>
                            {/* 9. Material */}
                            <StyledTableCell align="left" sx={{ width: COL_WIDTHS.MATERIAL }}>
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
                        
                        {/* Parent and Child Rows JSX */}
                        {Object.keys(groupedVariants).map((color) => {
                            // ... (Logic to get representativeRow/Key)
                            const representativeRow = groupedVariants[color].find(row => row.size === 'L' || row.size === null) || groupedVariants[color][0];
                            const representativeKey = `${color}-${representativeRow?.size || 'null'}`;
                            const variantData = variantValues[representativeKey]; 
                            
                            return (
                                <React.Fragment key={color}>
                                    {/* Parent Row */}
                                    <StyledTableRow>
                                        {/* 1. Expander */}
                                        <StyledTableCell sx={{ width: COL_WIDTHS.EXPANDER }}>
                                            <IconButton onClick={() => handleExpandClick(color)}>
                                                {expanded[color] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </StyledTableCell>
                                        {/* 2. Variant */}
                                        <StyledTableCell component="th" scope="row" sx={{ textAlign: 'left', width: COL_WIDTHS.VARIANT, fontWeight: 'bold' }}>
                                            {color}
                                        </StyledTableCell>
                                        {/* 3. Dimensions (Empty cell for parent row) */}
                                        <StyledTableCell sx={{ width: COL_WIDTHS.DIMENSIONS, textAlign: 'center', color: '#888' }} />
                                        {/* 4. Price */}
                                        <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PRICE }}>
                                            <SymMoneyTextField
                                                value={variantData?.price || ''}
                                                onChange={(e) => handleParentChange(color, 'price', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        {/* 5. Sale Price */}
                                        <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SALE_PRICE }}>
                                            <SymMoneyTextField
                                                value={variantData?.salePrice || ''}
                                                onChange={(e) => handleParentChange(color, 'salePrice', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        {/* 6. Supply */}
                                        <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SUPPLY }}>
                                            <SymNumberTextField
                                                value={variantData?.supply || 0}
                                                onChange={(e) => {
                                                    const value = Math.max(0, Number(e.target.value)); 
                                                    handleParentChange(color, 'supply', value)
                                                }}
                                            />
                                        </StyledTableCell>
                                        {/* 7. Cost */}
                                        <StyledTableCell align="right" sx={{ width: COL_WIDTHS.COST }}>
                                            <SymMoneyTextField
                                                value={variantData?.cost || ''}
                                                onChange={(e) => handleParentChange(color, 'cost', e.target.value)}
                                            />
                                        </StyledTableCell>
                                        {/* 8. Profit */}
                                        <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PROFIT }}>
                                            <SymMoneyTextField
                                                value={groupedVariants[color].reduce((sum, v) => {
                                                    const key = `${v.color}-${v.size || 'null'}`;
                                                    return sum + parseFloat(variantValues[key]?.profit || 0);
                                                }, 0).toFixed(2)}
                                                InputProps={{ readOnly: true }}
                                            />
                                        </StyledTableCell>
                                        {/* 9. Material */}
                                        <StyledTableCell align="left" sx={{ width: COL_WIDTHS.MATERIAL }}>
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
                                        {/* colSpan must be 9 to match the 9 columns in the header */}
                                        <StyledTableCell colSpan={9} style={{ padding: 0 }}> 
                                            <Collapse in={expanded[color]} timeout="auto" unmountOnExit>
                                                {/* 
                                                    The inner table must have the same column widths as the outer table.
                                                    We use the same minWidth and explicitly set the width of each cell.
                                                    tableLayout: 'fixed' is crucial for alignment.
                                                */}
                                                <Table sx={{ minWidth: 1200, tableLayout: 'fixed' }} size="small" aria-label="variants" >
                                                    <TableBody>
                                                        {groupedVariants[color].filter(row => finalSizes.length > 0 ? row.size !== null : true).map((row, index) => {
                                                            const key = `${row.color}-${row.size || 'null'}`;
                                                            const variantData = variantValues[key]; 
                                                            const isItemSelected = isSelected(row.size); 
                                                            
                                                            if (!variantData) return null; 
                                                            
                                                            return (
                                                                <StyledTableRow key={key} hover selected={isItemSelected}>
                                                                    {/* 1. Indentation Cell (Replaces Expander) */}
                                                                    <StyledTableCell sx={{ width: COL_WIDTHS.EXPANDER }} />
                                                                    
                                                                    {/* 2. Variant */}
                                                                    <StyledTableCell 
                                                                        component="th" 
                                                                        scope="row" 
                                                                        sx={{ 
                                                                            textAlign: 'left', 
                                                                            width: COL_WIDTHS.VARIANT,
                                                                        }}
                                                                    >
                                                                        {row.color}{row.size ? ` - ${row.size}` : ''}
                                                                    </StyledTableCell>
                                                                    
                                                                    {/* 3. Dimensions (Edit Button) */}
                                                                    <StyledTableCell sx={{ width: COL_WIDTHS.DIMENSIONS, textAlign: 'center' }}> 
                                                                        <IconButton size="small" onClick={() => handleEditDimensions(key)}>
                                                                            <EditIcon fontSize="small" />
                                                                        </IconButton>
                                                                    </StyledTableCell>
                                                                    {/* 4. Price */}
                                                                    <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PRICE }}>
                                                                        <SymMoneyTextField
                                                                            value={variantData.price}
                                                                            onChange={(e) => handleVariantChange(key, 'price', e.target.value)}
                                                                        />
                                                                    </StyledTableCell>
                                                                    {/* 5. Sale Price */}
                                                                    <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SALE_PRICE }}>
                                                                        <SymMoneyTextField
                                                                            value={variantData.salePrice}
                                                                            onChange={(e) => handleVariantChange(key, 'salePrice', e.target.value)}
                                                                        />
                                                                    </StyledTableCell>
                                                                    {/* 6. Supply */}
                                                                    <StyledTableCell align="right" sx={{ width: COL_WIDTHS.SUPPLY }}>
                                                                        <SymNumberTextField
                                                                            value={variantData.supply}
                                                                            onChange={(e) => {
                                                                                const value = Math.max(0, Number(e.target.value)); 
                                                                                handleVariantChange(key, 'supply', value)
                                                                            }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    {/* 7. Cost */}
                                                                    <StyledTableCell align="right" sx={{ width: COL_WIDTHS.COST }}>
                                                                        <SymMoneyTextField
                                                                            value={variantData.cost}
                                                                            onChange={(e) => handleVariantChange(key, 'cost', e.target.value)}
                                                                        />
                                                                    </StyledTableCell>
                                                                    {/* 8. Profit */}
                                                                    <StyledTableCell align="right" sx={{ width: COL_WIDTHS.PROFIT }}>
                                                                        <SymMoneyTextField
                                                                            value={parseFloat(variantData.profit || 0).toFixed(2)}
                                                                            InputProps={{ readOnly: true }}
                                                                        />
                                                                    </StyledTableCell>
                                                                    {/* 9. Material */}
                                                                    <StyledTableCell align="left" sx={{ width: COL_WIDTHS.MATERIAL }}>
                                                                        <TextField
                                                                            variant="outlined"
                                                                            size="small"
                                                                            fullWidth
                                                                            value={variantData.material}
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
                    
                    {/* TableFooter */}
                    <TableFooter>
                        <TableRow>
                            <StyledTableCell colSpan={5} sx={{ textAlign: 'left' }}>
                                <Box sx={tableFooterTextStyles}>
                                    Total Variants: {rows.length}
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell align="right" sx={{ width: '100px' }}>
                                <Box sx={tableFooterTextStyles}>
                                    Total Supply: {totalValues.supply}
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell colSpan={1} />
                            <StyledTableCell align="right" sx={{ width: '120px' }}>
                                <Box sx={tableFooterTextStyles}>
                                    Total Profit: ${parseFloat(totalProfit).toFixed(2)}
                                </Box>
                            </StyledTableCell>
                            <StyledTableCell colSpan={1} />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <EditDimensionsModal
                variant={editingVariant}
                open={modalOpen}
                handleClose={() => setModalOpen(false)}
                handleSave={(dimensions, sizeChartFile) => handleDimensionChange(editingVariantKey, dimensions, sizeChartFile)}
            />
        </Box>
    );
}

export default ProductVariantsTable;
