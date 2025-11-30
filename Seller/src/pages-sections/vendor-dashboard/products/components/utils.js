// utils.js

// --- GLOBAL HELPER FUNCTIONS ---

/**
 * Calculates the profit for a single variant.
 * @param {number} price - The standard price.
 * @param {number} salePrice - The sale price (if applicable).
 * @param {number} cost - The cost price.
 * @param {number} supply - The stock quantity.
 * @returns {number} Calculated profit.
 */
export const calculateProfit = (price, salePrice, cost, supply) => {
    const finalPrice = parseFloat(salePrice || price || 0) || 0;
    const finalCost = parseFloat(cost || 0) || 0;
    const finalSupply = parseFloat(supply || 0) || 0;
    const result = finalSupply > 0 ? (finalPrice - finalCost) * finalSupply : 0;
    return isNaN(result) ? 0 : result;
}

/**
 * Transforms incoming raw variant data into the local row/variant map state structure.
 * @param {Array<Object>} variants - Raw variant data from API/props.
 * @returns {{ initialRows: Array, initialVariantValues: Object, totalProfit: number }}
 */
export function transformInitialVariants(variants) {
    const initialRows = [];
    const initialVariantValues = {};
    let totalProfit = 0;

    const safeVariants = Array.isArray(variants) ? variants : [];

    safeVariants.forEach((v) => {
        const colorName = v.color?.name || 'Unknown';
        const sizeName = v.size?.size || null;
        
        const price = parseFloat(v.price) || 0;
        const salePrice = parseFloat(v.salePrice) || 0;
        const supply = v.stock || 0; 
        const cost = parseFloat(v.cost || 0) || 0; 
        const material = v.material || '';
        
        const dimensions = v.dimensions || { L: 0, W: 0, H: 0 }; 
        const sizeChartFile = v.sizeChartFile || null; 
        
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
            dimensions: dimensions,
            sizeChartFile: sizeChartFile,
        };

        initialRows.push(rowData);
        initialVariantValues[`${colorName}-${sizeName || 'null'}`] = rowData;
        totalProfit += profit;
    });
    return { initialRows, initialVariantValues, totalProfit };
}

/**
 * Groups variants by color for the parent rows in the table.
 * @param {Array<Object>} variants - The flat list of variant rows.
 * @returns {Object} Grouped variants where key is color, value is array of variants.
 */
export function groupVariantsByColor(variants) {
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

/**
 * Factory function to create a new variant data object.
 */
export function createData(color, size, price, salePrice, supply, cost, profit, material, id = null, dimensions = { L: 0, W: 0, H: 0 }, sizeChartFile = null) {
    return { color, size, price, salePrice, supply, cost, profit, material, id, dimensions, sizeChartFile };
}

/**
 * Generates a full list of variants based on selected colors/sizes and existing data/master values.
 * @param {Array<string>} colors - List of selected colors.
 * @param {Array<string>} sizes - List of selected sizes.
 * @param {Object} masterValues - Current values from the master row.
 * @param {Object} existingVariantsMap - Map of existing variants for preserving data.
 * @returns {Array<Object>} Newly generated variants.
 */
export function generateVariants(colors, sizes, masterValues, existingVariantsMap) {
    const newVariants = [];

    colors.forEach((color) => {
        const generateSizeVariants = (size) => {
            const key = `${color}-${size || 'null'}`;
            const existing = existingVariantsMap[key]; 

            const price = existing?.price ?? masterValues.price;
            const salePrice = existing?.salePrice ?? masterValues.salePrice;
            const supply = existing?.supply ?? masterValues.supply;
            const cost = existing?.cost ?? masterValues.cost;
            const material = existing?.material ?? masterValues.material;
            
            const dimensions = existing?.dimensions ?? { L: 0, W: 0, H: 0 };
            const sizeChartFile = existing?.sizeChartFile ?? null;
            
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
                id,
                dimensions,
                sizeChartFile,
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

/**
 * Calculates the initial state for the component based on props.
 */
export function getInitialState(colors, sizes, initialVariants) {
    const safeInitialVariants = Array.isArray(initialVariants) ? initialVariants : [];
    
    const { initialRows: transformedRows, initialVariantValues: transformedVariantValues, totalProfit: transformedTotalProfit } = transformInitialVariants(safeInitialVariants);

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
        return { initialRows: transformedRows, initialVariantValues: transformedVariantValues, totalProfit: transformedTotalProfit, masterValues };
    }

    const masterValues = { price: 0, salePrice: 0, supply: 0, cost: 0, profit: 0, material: '' };
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