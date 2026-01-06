import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Box,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  InputAdornment,
  Chip,
  Breadcrumbs,
  Divider,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  ChevronRight,
  ArrowBack,
  LocalOffer as TagIcon,
  Close as CloseIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';
import { H1 } from '../Typography';

// Utility: Flatten categories for search
const flattenCategories = (categories, parentPath = '', parentSlug = '') => {
  let flat = [];
  
  categories.forEach(cat => {
    const path = parentPath ? `${parentPath} > ${cat.name}` : cat.name;
    const slugPath = parentSlug ? `${parentSlug}/${cat.slug}` : cat.slug;
    
    flat.push({ 
      ...cat, 
      path, 
      slugPath,
      parentPath 
    });
    
    const nextLevel = cat.subcategories || cat.subcategoryItems || cat.subcategoryItemChildren || [];
    if (nextLevel.length) {
      flat = flat.concat(flattenCategories(nextLevel, path, slugPath));
    }
  });
  
  return flat;
};

// Utility: Find category by ID
const findCategoryById = (categories, id, path = '', slugPath = '') => {
  for (const cat of categories) {
    const currentPath = path ? `${path} > ${cat.name}` : cat.name;
    const currentSlugPath = slugPath ? `${slugPath}/${cat.slug}` : cat.slug;
    
    if (cat.id === id) {
      return { ...cat, path: currentPath, slugPath: currentSlugPath };
    }
    
    const searchIn = cat.subcategories || cat.subcategoryItems || cat.subcategoryItemChildren || [];
    if (searchIn.length) {
      const found = findCategoryById(searchIn, id, currentPath, currentSlugPath);
      if (found) return found;
    }
  }
  return null;
};

const CategorySelector = ({
  title,
  value, 
  onChange, 
  error = false, 
  placeholder = "Select a category",
  categories
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [navigationStack, setNavigationStack] = useState([categories]);
  const [breadcrumbs, setBreadcrumbs] = useState(['All Categories']);
  const [recentSelections, setRecentSelections] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);

    // ✅ UPDATE: Enhanced selectedCategory to handle ID strings
  const selectedCategory = useMemo(() => {
    if (!value) return null;
    
    // If value is already a full object with path, use it
    if (typeof value === 'object' && value.path) {
      return value;
    }
    
    // ✅ If value is just an ID string, find the full category
    if (typeof value === 'string') {
      return findCategoryById(categories, value);
    }
    
    // If value has an ID property, use that to find the category
    if (value.id) {
      return findCategoryById(categories, value.id);
    }
    
    return null;
  }, [value, categories]);
  
  const containerRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Flatten all categories for search
  const flatCategories = useMemo(() => 
    flattenCategories(categories), 
    [categories]
  );
  
  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return null;
    return flatCategories
      .filter(cat => {
        const query = searchQuery.toLowerCase();
        return cat.name.toLowerCase().includes(query) || 
               cat.slug?.toLowerCase().includes(query) ||
               cat.path.toLowerCase().includes(query);
      })
      .slice(0, 50);
  }, [searchQuery, flatCategories]);
  
  const currentCategories = navigationStack[navigationStack.length - 1];
  
  // Load recent selections from memory (not localStorage)
  useEffect(() => {
    // Initialize empty - could be loaded from props if needed
  }, []);
  
  // Get selected category details
  // const selectedCategory = useMemo(() => {
  //   if (!value) return null;
  //   if (typeof value === 'object' && value.path) return value;
  //   return findCategoryById(categories, value);
  // }, [value, categories]);
  
  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 100);
  };
  
  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery('');
    setNavigationStack([categories]);
    setBreadcrumbs(['All Categories']);
  };
  
  const handleCategoryClick = (category) => {
    const nextLevel = category.subcategories || 
                     category.subcategoryItems || 
                     category.subcategoryItemChildren;
    
    if (nextLevel && nextLevel.length > 0) {
      setNavigationStack([...navigationStack, nextLevel]);
      setBreadcrumbs([...breadcrumbs, category.name]);
    } else {
      const path = [...breadcrumbs.slice(1), category.name].join(' > ');
      const selection = { 
        id: category.id,
        name: category.name,
        slug: category.slug,
        path,
        mobileLevel1: category.mobileLevel1,
        mobileLevel2: category.mobileLevel2,
        mobileLevel3: category.mobileLevel3,
        tags_required: category.tags_required,
        tag_defaults: category.tag_defaults
      };
      
      onChange(selection);
      
      // Update recent selections in memory
      const newRecent = [
        selection, 
        ...recentSelections.filter(r => r.id !== selection.id)
      ].slice(0, 5);
      setRecentSelections(newRecent);
      
      handleClose();
    }
  };
  
  const handleBack = () => {
    if (navigationStack.length > 1) {
      setNavigationStack(navigationStack.slice(0, -1));
      setBreadcrumbs(breadcrumbs.slice(0, -1));
    }
  };
  
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
  };
  
  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        handleClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      else if (e.key === 'Backspace' && !searchQuery && navigationStack.length > 1) {
        handleBack();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, searchQuery, navigationStack]);

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%', flex: 1, minWidth: '100px' }}>
        <H1 color="white" mb={0.5}>
            {title}
        </H1>

        {/* Trigger Button */}
        <TextField
            fullWidth
            placeholder={placeholder}
            value={selectedCategory ? selectedCategory.name : ''} // ✅ Changed from .path to .name
            onClick={handleOpen}
            error={false}
            InputProps={{
            readOnly: true,
            startAdornment: (
                <InputAdornment position="start" />
            ),
            endAdornment: (
                <InputAdornment position="end">
                <Stack direction="row" spacing={0.5} alignItems="center">
                    {selectedCategory && (
                    <IconButton
                        size="small"
                        onClick={handleClear}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                    )}
                    <ChevronRight 
                    fontSize="small"
                    sx={{ 
                        color: 'rgba(255, 255, 255, 0.5)',
                        transition: 'transform 250ms ease-in-out',
                        transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
                    }} 
                    />
                </Stack>
                </InputAdornment>
            ),
            sx: { 
                cursor: 'pointer',
                height: '37px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '5px',
                '& input': {
                    color: selectedCategory ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                    padding: '8px 0',
                    cursor: 'pointer',
                    '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1
                    }
                }
            }
            }}
            sx={{
            cursor: 'pointer',
            '& .MuiOutlinedInput-root': {
                cursor: 'pointer',
                borderRadius: '5px',
                '& fieldset': {
                    border: '1px solid',
                    borderColor: error ? '#f44336' : 'rgba(255, 255, 255, 0.23)',
                },
                '&:hover fieldset': {
                    borderColor: error ? '#f44336' : 'rgba(255, 255, 255, 0.4)',
                },
                '&.Mui-focused fieldset': {
                    borderColor: error ? '#f44336' : 'rgba(255, 255, 255, 0.4)',
                }
            }
            }}
        />


        {/* Dropdown Menu */}
        {isOpen && (
            <Paper
            elevation={8}
            sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                mt: 0.5,
                zIndex: 10000,
                maxHeight: 600,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '5px',
                bgcolor: '#1a1a1a',
                border: '1px solid rgba(255, 255, 255, 0.12)'
            }}
            >
            {/* Search Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.12)' }}>
                <TextField
                inputRef={searchInputRef}
                fullWidth
                size="small"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    </InputAdornment>
                    ),
                    endAdornment: searchQuery && (
                    <InputAdornment position="end">
                        <IconButton
                        size="small"
                        onClick={() => setSearchQuery('')}
                        edge="end"
                        sx={{ color: 'rgba(255, 255, 255, 0.5)' }}
                        >
                        <CloseIcon fontSize="small" />
                        </IconButton>
                    </InputAdornment>
                    ),
                    sx: {
                    bgcolor: '#000',
                    color: '#fff',
                    '& input': {
                        color: '#fff',
                        '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.5)',
                        opacity: 1
                        }
                    }
                    }
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                    }
                    }
                }}
                />
            </Box>

            {/* Content Area */}
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {searchQuery ? (
                /* Search Results */
                <List disablePadding>
                    {filteredCategories && filteredCategories.length > 0 ? (
                    filteredCategories.map(cat => {
                        const hasChildren = (cat.subcategories?.length || 
                                            cat.subcategoryItems?.length || 
                                            cat.subcategoryItemChildren?.length) > 0;
                        if (hasChildren) return null;
                        
                        return (
                        <ListItem
                            key={cat.id}
                            disablePadding
                            onMouseEnter={() => setHoveredItem(cat.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                        >
                            <ListItemButton
                            onClick={() => handleCategoryClick(cat)}
                            sx={{
                                bgcolor: hoveredItem === cat.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                py: 1.5,
                                '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.08)'
                                }
                            }}
                            >
                            <ListItemText
                                primary={<Typography sx={{ color: '#fff' }}>{cat.name}</Typography>}
                                secondary={
                                <>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                    {cat.path}
                                    </Typography>
                                    {cat.slug && (
                                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                                        /{cat.slug}
                                    </Typography>
                                    )}
                                </>
                                }
                            />
                            </ListItemButton>
                        </ListItem>
                        );
                    })
                    ) : (
                    <Box sx={{ py: 6, textAlign: 'center' }}>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        No categories found
                        </Typography>
                    </Box>
                    )}
                </List>
                ) : (
                /* Navigation View */
                <>
                    {/* Quick Access Sections */}
                    {navigationStack.length === 1 && (
                    <>
                        {recentSelections.length > 0 && (
                            <Box>
                                <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ClockIcon fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, textTransform: 'uppercase' }}>
                                    Recent
                                </Typography>
                                </Box>
                                <List disablePadding>
                                {recentSelections.map(cat => (
                                    <ListItem
                                    key={cat.id}
                                    disablePadding
                                    onMouseEnter={() => setHoveredItem(cat.id)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    >
                                    <ListItemButton
                                        onClick={() => {
                                        onChange(cat);
                                        handleClose();
                                        }}
                                        sx={{ 
                                        bgcolor: hoveredItem === cat.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                        transition: 'all 300ms ease-in-out',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.08)'
                                        }
                                        }}
                                    >
                                        <ListItemText 
                                        primary={<Typography sx={{ color: '#fff' }}>{cat.name}</Typography>}
                                        secondary={<Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>{cat.path.split(' > ').slice(0, -1).join(' > ')}</Typography>}
                                        primaryTypographyProps={{ variant: 'body2' }}
                                        secondaryTypographyProps={{ variant: 'caption' }}
                                        />
                                    </ListItemButton>
                                    </ListItem>
                                ))}
                                </List>
                                <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
                            </Box>
                        )}

                        <Box sx={{ px: 2, py: 1 }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600, textTransform: 'uppercase' }}>
                                All Categories
                            </Typography>
                        </Box>
                    </>
                    )}

                    {/* Breadcrumb Navigation */}
                    {navigationStack.length > 1 && (
                    <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.12)', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <IconButton size="small" onClick={handleBack} sx={{ color: '#fff' }}>
                        <ArrowBack fontSize="small" />
                        </IconButton>
                        <Breadcrumbs separator={<ChevronRight fontSize="small" sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />} sx={{ flex: 1 }}>
                        {breadcrumbs.slice(1).map((crumb, idx) => (
                            <Typography
                            key={idx}
                            variant="body2"
                            sx={{ 
                                color: idx === breadcrumbs.length - 2 ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                                fontWeight: idx === breadcrumbs.length - 2 ? 600 : 400 
                            }}
                            >
                            {crumb}
                            </Typography>
                        ))}
                        </Breadcrumbs>
                    </Box>
                    )}

                    {/* Category List */}
                    <List disablePadding>
                    {currentCategories.map(category => {
                        const hasChildren = (category.subcategories?.length || 
                                        category.subcategoryItems?.length || 
                                        category.subcategoryItemChildren?.length) > 0;
                        
                        return (
                        <ListItem
                            key={category.id}
                            disablePadding
                            onMouseEnter={() => setHoveredItem(category.id)}
                            onMouseLeave={() => setHoveredItem(null)}
                            secondaryAction={
                                hasChildren && <ChevronRight sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                            }
                        >
                            <ListItemButton
                            onClick={() => handleCategoryClick(category)}
                            sx={{
                                    bgcolor: hoveredItem === category.id ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                                    py: 1.5,
                                    transition: 'all 300ms ease-in-out',
                                    '&:hover': {
                                        bgcolor: 'rgba(255, 255, 255, 0.08)'
                                    }
                            }}
                            >
                            <ListItemText
                                primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#fff' }}>
                                    {category.name}
                                    </Typography>
                                    {category.gender && (
                                    <Chip 
                                        label={Array.isArray(category.gender) ? category.gender.join(', ') : category.gender}
                                        size="small"
                                        sx={{ 
                                        height: 20, 
                                        fontSize: '0.7rem',
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        color: '#fff'
                                        }}
                                    />
                                    )}
                                </Box>
                                }
                                secondary={
                                <>
                                    {category.mobileLevel1 && (
                                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }} display="block">
                                            Mobile: {category.mobileLevel1}
                                            {category.mobileLevel2 && ` > ${category.mobileLevel2}`}
                                            {category.mobileLevel3 && ` > ${category.mobileLevel3}`}
                                        </Typography>
                                    )}
                                </>
                                }
                            />
                            </ListItemButton>
                        </ListItem>
                        );
                    })}
                    </List>
                </>
                )}
            </Box>

            </Paper>
        )}
    </Box>
  );
};

export default CategorySelector;