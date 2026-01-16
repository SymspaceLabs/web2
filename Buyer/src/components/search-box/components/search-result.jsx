// ./components/search-result.js
import { Paper, List, Typography, ListItem, ListItemButton, Box } from '@mui/material';

export default function SearchResult({ results }) {
    // NOTE: Based on your previous data structure, the results prop should be the 'searchResults' array, 
    // or you must adapt this component to handle the full { shops, searchResults } object.
    
    if (!results || results.length === 0) {
        return null;
    }

    // 1. Helper function to determine the correct link based on item type
    const getLink = (item) => {
        // If type is 'product', route to product details page
        if (item.type === 'product' && item.slug) {
            return `/products/${item.slug}`;
        }

        // If type is NOT 'product' (e.g., 'subcategory-child', 'category', etc.), 
        // route to the search results page using the slug as a filter.
        if (item.slug) {
            // Using 'subcategoryItem' as the query parameter as requested
            return `/products?subcategoryItem=${item.slug}`;
        }

        // Fallback
        return item.link || '#'; 
    };

    return (
        <Paper elevation={2}>
            <List disablePadding>
                {results.map(item => {
                    const link = getLink(item);
                    // Determine if the link is an internal product details page
                    const isProductDetails = item.type === 'product';

                    return (
                        <ListItem 
                            key={item.id} 
                            disablePadding
                        >
                            <ListItemButton
                                component="a" 
                                // 💡 Conditional Href
                                href={link}
                                
                                // 💡 Conditional Target: Open internal links in the same tab
                                target={isProductDetails ? '_self' : '_blank'}
                                
                                // 💡 Conditional Rel: Only needed for target="_blank"
                                rel={isProductDetails ? undefined : 'noopener noreferrer'}
                                
                                sx={{ 
                                    paddingY: 1.5, // Changed to 1.5 for better spacing
                                    paddingX: 2, 
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    display: 'block',
                                }}
                            >
                                <Box sx={{ overflow: 'hidden' }}>
                                    <Typography variant="body1" noWrap>
                                        {item.title}
                                    </Typography>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Paper>
    );
}