import { useState, useRef, useEffect, useMemo  } from 'react';
import { FlexBox, FlexRowCenter } from '@/components/flex-box';
import { IconButton, Box, useMediaQuery  } from '@mui/material';

import { LazyImage } from '@/components/lazy-image';
import { useFavorites } from "@/contexts/FavoritesContext";
import { SymGLTFViewer } from "@/components/custom-components";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductGallery = ({ 
    product,
    selectedColor
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

    // UseMemo to filter images by selectedColor
    const filteredImages = useMemo(() => {
        return images.filter((img) => img.colorCode === selectedColor);
    }, [images, selectedColor]);

    // State to track currently selected image
    const [selectedImage, setSelectedImage] = useState(0);

    // Access favorite state and dispatcher from context
    const { state: favState, dispatch: favDispatch } = useFavorites();

    // Check if current product is already favorited
    const isFavorited = favState.favorites.some((item) => item.id === product.id);

    // Toggle product in favorites list
    const toggleFavorite = () => {
        favDispatch({
            type: "TOGGLE_FAVORITE",
            payload: {
            price,
            name,
            salePrice,
            imgUrl: images[0].url,
            images: images,
            id,
            slug,
            sizes: sizes.map((size) => ({
                id: size.id,
                label: size.size,
                value: size.id,
            })),
            colors: colors.map((color) => ({
                id: color.id,
                label: color.name,
                value: color.code,
            })),
            },
        });
    };

    // Determine if the screen size is mobile
    const isMobileQuery = useMediaQuery('(max-width:600px)');

    // State to determine how many thumbnails to show
    const [visibleThumbCount, setVisibleThumbCount] = useState(6);

    // Filter threeDModels based on selectedColor
    const filteredThreeDModels = useMemo(() => {
        return threeDModels.filter((m) => m.colorCode === selectedColor);
    }, [threeDModels, selectedColor]);

    // Update visible thumbnail count based on screen size
    useEffect(() => {
        setVisibleThumbCount(isMobileQuery ? 4 : 6);
    }, [isMobileQuery]);

    // Total thumbnails includes the 3D model as the first thumbnail
    const totalThumbnails = filteredImages.length + 1; // +1 for 3D model
    const maxIndex = Math.max(0, totalThumbnails - visibleThumbCount);

    // Index for thumbnail scroll
    const [thumbIndex, setThumbIndex] = useState(0);

    // Compute which thumbnails are visible in the scroll window
    // const visibleThumbnails = useMemo(() => {
    //     const start = thumbIndex;
    //     const end = start + visibleThumbCount;
    //     return [{ type: "model" }, ...images].slice(start, end);
    // }, [thumbIndex, images, visibleThumbCount]); // Add visibleThumbCount here

    // Incorrect: Uses unfiltered 'images'
    // FIX: Use filteredImages in the useMemo hook for visibleThumbnails
    const visibleThumbnails = useMemo(() => {
        const start = thumbIndex;
        const end = start + visibleThumbCount;
        return [{ type: "model" }, ...filteredImages].slice(start, end);
    }, [thumbIndex, filteredImages, visibleThumbCount]);
    
    // Reset selected image when color changes
    useEffect(() => {
        setSelectedImage(0);
        setThumbIndex(0);
    }, [selectedColor]);

    // Ensure selected image stays within the visible thumbnails
    // useEffect(() => {
    //     const totalItems = images.length + 1; // +1 for model
    //     const visibleStart = thumbIndex;
    //     const visibleEnd = thumbIndex + visibleThumbCount;
      
    //     if (selectedImage < visibleStart) {
    //       setThumbIndex(selectedImage);
    //     } else if (selectedImage >= visibleEnd) {
    //       setThumbIndex(Math.min(selectedImage - visibleThumbCount + 1, totalItems - visibleThumbCount));
    //     }
    //   }, [selectedImage, thumbIndex, visibleThumbCount, images.length]);
    // Reset selected image when color changes
    useEffect(() => {
        setSelectedImage(0);
        setThumbIndex(0);
    }, [selectedColor]);

    // FIX: Use filteredImages.length in the useEffect dependency array
    useEffect(() => {
        const totalItems = filteredImages.length + 1; // +1 for model
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
        {/* Main image viewer with next/prev and favorite buttons */}
        <FlexBox justifyContent="center" alignItems="center" position="relative" mb={6}>
            
            {/* Previous image button */}
            <IconButton
                onClick={() =>
                    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images?.length))
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

            {/* Display main image or 3D model viewer */}
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

            {/* Next image button */}
            <IconButton
                onClick={() =>
                    // setSelectedImage((prev) => (prev < images?.length ? prev + 1 : 0))
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

            {/* Heart Icon */}
            <IconButton
                onClick={toggleFavorite}
                style={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                }}
            >
                {isFavorited ? (
                <FavoriteIcon color="error" />
                ) : (
                <FavoriteBorderIcon color="action" />
                )}
            </IconButton>
        </FlexBox>

        {/* Thumbnail selector area */}
        <FlexBox alignItems="center" mt={2}>
            
            {/* Scroll thumbnails left */}
            <IconButton
                onClick={() => setThumbIndex((prev) => Math.max(0, prev - 1))}
                disabled={thumbIndex === 0}
            >
                <ArrowBackIosIcon fontSize="small" />
            </IconButton>

            {/* Visible thumbnails */}
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
                    })
                }
            </FlexRowCenter>

            {/* Scroll thumbnails right */}
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
