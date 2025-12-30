// ==============================================================
// PART 1: Updated ProductGallery - Save Variant with Favorite
// ==============================================================

import { useState, useRef, useEffect, useMemo } from 'react';
import { FlexBox, FlexRowCenter } from '@/components/flex-box';
import { IconButton, Box, useMediaQuery } from '@mui/material';
import { LazyImage } from '@/components/lazy-image';
import { useFavorites } from "@/contexts/FavoritesContext";
import { SymGLTFViewer } from "@/components/custom-components";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductGallery = ({ 
    product,
    selectedColor,
    selectedSize // ✅ NEW: Accept selectedSize prop
}) => {

    const {
        id,
        price,
        salePrice,
        colors,
        sizes,
        name,
        images,
        slug,
        threeDModels = []
    } = product || {};

    const filteredImages = useMemo(() => {
        return images.filter((img) => img.colorCode === selectedColor);
    }, [images, selectedColor]);

    const [selectedImage, setSelectedImage] = useState(0);

    const { isFavorited, dispatch: favDispatch } = useFavorites();
    
    // ✅ UPDATED: Check if this specific variant is favorited
    const isProductFavorited = isFavorited(product.id, selectedColor, selectedSize);

    // ✅ UPDATED: Toggle favorite with variant information
    const toggleFavorite = () => {
        // Find the selected color and size objects
        const colorObj = colors.find(c => c.code === selectedColor);
        const sizeObj = sizes.find(s => s.id === selectedSize);

        favDispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
                id,
                selectedColor: colorObj ? {
                    id: colorObj.id,
                    label: colorObj.name,
                    value: colorObj.code
                } : null,
                selectedSize: sizeObj ? sizeObj.id : null,
                // Store minimal snapshot for localStorage
                snapshot: {
                    id,
                    name,
                    slug,
                    price,
                    salePrice,
                    imgUrl: images[0]?.url,
                    images: images,
                    colors: colors.map(c => ({
                        id: c.id,
                        label: c.name,
                        value: c.code
                    })),
                    sizes: sizes.map(s => ({
                        id: s.id,
                        label: s.size,
                        value: s.id
                    })),
                    // ✅ NEW: Store selected variant info in snapshot
                    selectedVariant: {
                        color: colorObj ? {
                            id: colorObj.id,
                            label: colorObj.name,
                            value: colorObj.code
                        } : null,
                        size: sizeObj ? {
                            id: sizeObj.id,
                            label: sizeObj.size,
                            value: sizeObj.id
                        } : null
                    }
                }
            },
        });
    };

    const isMobileQuery = useMediaQuery('(max-width:600px)');
    const [visibleThumbCount, setVisibleThumbCount] = useState(6);

    const filteredThreeDModels = useMemo(() => {
        return threeDModels.filter((m) => m.colorCode === selectedColor);
    }, [threeDModels, selectedColor]);

    useEffect(() => {
        setVisibleThumbCount(isMobileQuery ? 4 : 6);
    }, [isMobileQuery]);

    const totalThumbnails = filteredImages.length + 1;
    const maxIndex = Math.max(0, totalThumbnails - visibleThumbCount);

    const [thumbIndex, setThumbIndex] = useState(0);

    const visibleThumbnails = useMemo(() => {
        const start = thumbIndex;
        const end = start + visibleThumbCount;
        return [{ type: "model" }, ...filteredImages].slice(start, end);
    }, [thumbIndex, filteredImages, visibleThumbCount]);
    
    useEffect(() => {
        setSelectedImage(0);
        setThumbIndex(0);
    }, [selectedColor]);

    useEffect(() => {
        const totalItems = filteredImages.length + 1;
        const visibleStart = thumbIndex;
        const visibleEnd = thumbIndex + visibleThumbCount;
      
        if (selectedImage < visibleStart) {
          setThumbIndex(selectedImage);
        } else if (selectedImage >= visibleEnd) {
          setThumbIndex(Math.min(selectedImage - visibleThumbCount + 1, totalItems - visibleThumbCount));
        }
    }, [selectedImage, thumbIndex, visibleThumbCount, filteredImages.length]);

    return (
        <>
            <FlexBox justifyContent="center" alignItems="center" position="relative" mb={6}>
                
                <IconButton
                    onClick={() =>
                        setSelectedImage((prev) => (prev > 0 ? prev - 1 : filteredImages.length))
                    }
                    style={{
                        position: "absolute",
                        left: 0,
                        zIndex: 1,
                        background: "white",
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <Box
                    width={{ xs: '100%', sm: '500px' }}
                    height={{ xs: '350px', sm: '500px' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                    position="relative"
                    borderRadius="20px"
                >
                    {selectedImage === 0 ? (
                        filteredThreeDModels.length > 0 ? (
                            <SymGLTFViewer modelUrl={`${filteredThreeDModels[0].url}`} />
                        ) : (
                            <Box>No 3D model for this color</Box>
                        )
                    ) : (
                        <LazyImage
                            alt={name}
                            src={filteredImages[selectedImage - 1]?.url}
                            width={500}
                            height={500}
                            loading="eager"
                            sx={{
                                objectFit: "contain",
                                maxHeight: "100%",
                                maxWidth: "100%",
                            }}
                        />
                    )}
                </Box>

                <IconButton
                    onClick={() =>
                        setSelectedImage((prev) => (prev < filteredImages.length ? prev + 1 : 0))
                    }
                    style={{
                        position: "absolute",
                        right: 0,
                        zIndex: 1,
                        background: "white",
                    }}
                >
                    <ArrowForwardIosIcon />
                </IconButton>

                <IconButton
                    onClick={toggleFavorite}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 2,
                    }}
                    aria-label={isProductFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                    {isProductFavorited ? (
                        <FavoriteIcon color="error" />
                    ) : (
                        <FavoriteBorderIcon color="action" />
                    )}
                </IconButton>
            </FlexBox>

            <FlexBox alignItems="center" mt={2}>
                
                <IconButton
                    onClick={() => setThumbIndex((prev) => Math.max(0, prev - 1))}
                    disabled={thumbIndex === 0}
                >
                    <ArrowBackIosIcon fontSize="small" />
                </IconButton>

                <FlexRowCenter
                    sx={{
                        overflow: 'hidden',
                        gap: 1,
                        flexWrap: 'nowrap',
                        justifyContent: 'center',
                        width: '100%',
                        zIndex: 2
                    }}
                >
                    {visibleThumbnails.map((item, index) => {
                        const isModel = item.type === "model";
                        const imageIndex = isModel ? 0 : filteredImages.indexOf(item) + 1;

                        return (
                            <FlexRowCenter
                                key={index}
                                width={64}
                                height={64}
                                minWidth={64}
                                bgcolor="white"
                                border="1px solid"
                                borderRadius="10px"
                                style={{ cursor: "pointer" }}
                                onClick={() => setSelectedImage(imageIndex)}
                                borderColor={selectedImage === imageIndex ? "primary.main" : "grey.400"}
                            >
                                <LazyImage
                                    alt="thumbnail"
                                    width={500}
                                    height={500}
                                    src={isModel ? "/assets/images/products/3d/3d-thumbnail.png" : item.url}
                                />
                            </FlexRowCenter>
                        );
                    })}
                </FlexRowCenter>

                <IconButton
                    onClick={() => setThumbIndex((prev) => Math.min(maxIndex, prev + 1))}
                    disabled={thumbIndex >= maxIndex}
                >
                    <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
            </FlexBox>
        </>
    );
};

export default ProductGallery;
