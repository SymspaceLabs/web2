
import { useState } from 'react';
import { FlexBox, FlexRowCenter } from '@/components/flex-box';
import { IconButton, Box } from '@mui/material';

import { LazyImage } from '@/components/lazy-image';
import { useFavorites } from "@/contexts/FavoritesContext";
import { SymGLTFViewer } from "@/components/custom-components";

import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ProductGallery = ({product}) => {

    const {
        id,
        price,
        salePrice,
        colors,
        sizes,
        name, 
        images, 
        slug,
        model
      } = product || {};

    const [selectedImage, setSelectedImage] = useState(0);
      

    const { state: favState, dispatch: favDispatch } = useFavorites();
    const isFavorited = favState.favorites.some((item) => item.id === product.id);
    

    const toggleFavorite = () => {
        favDispatch({
          type: "TOGGLE_FAVORITE",
          payload: {
            price,
            name,
            salePrice,
            imgUrl: images[0].url,
            id,
            slug,
            sizes: sizes.map(size => ({
              label: size.size,
              value: size.id
            })),
            colors: colors.map(color => ({
              label: color.name,
              value: color.code
            })),
          },
        });
      };      

    return (
        <>
            <FlexBox justifyContent="center" alignItems="center" position="relative" mb={6}>
                <IconButton
                    onClick={
                        () => setSelectedImage((prev) => prev > 0 ? prev - 1 : images?.length)
                    }
                    style={{ 
                        position: "absolute",
                        left: 0,
                        zIndex: 1,
                        background: "white"
                    }}
                >
                    <ArrowBackIosIcon />
                </IconButton>

                <Box 
                    maxHeight={{ sm: '500px' }} 
                    minHeight="450px" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                >
                    {selectedImage === 0 && model ? (  
                        <SymGLTFViewer modelUrl={`/models/${model}`} />
                    ) : (
                        <LazyImage 
                        alt={name}
                        width={500} 
                        height={500} 
                        loading="eager" 
                        src={product.images[selectedImage - 1]?.url}
                        sx={{ 
                            objectFit: "contain", 
                            maxHeight: '100%', 
                            maxWidth: '100%' 
                        }}
                        />
                    )}
                    </Box>


                <IconButton 
                    onClick={() => setSelectedImage((prev) => 
                        prev < images?.length ? prev + 1 : 0 // If last, wrap to 0
                    )}
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
                        )
                    }
                </IconButton>
            </FlexBox>
            {/* Thumbnails */}
            <FlexRowCenter overflow="auto" gap={1}>
                <>
                    {/* 3D Model Thumbnail */}
                    <FlexRowCenter
                        padding={1}
                        width={64}
                        height={64}
                        minWidth={64}
                        bgcolor="white"
                        border="1px solid"
                        borderRadius="10px"
                        style={{ cursor: "pointer" }}
                        onClick={() => setSelectedImage(0)} // 0 for 3D model
                        borderColor={selectedImage === 0 ? "primary.main" : "grey.400"}
                    >
                    <LazyImage
                        alt="3D Model"
                        width={500}
                        height={500}
                        src="/assets/images/products/3d/3d-thumbnail.png"
                    />
                    </FlexRowCenter>

                    {/* Image Thumbnails */}
                    {images?.length > 0 &&
                    images.map((image, ind) => (
                        <FlexRowCenter
                            key={ind}
                            width={64}
                            height={64}
                            minWidth={64}
                            bgcolor="white"
                            border="1px solid"
                            borderRadius="10px"
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedImage(ind + 1)}
                            borderColor={selectedImage === ind + 1 ? "primary.main" : "grey.400"}
                        >
                        <LazyImage
                            alt="product"
                            width={500}
                            height={500}
                            src={image.url}
                        />
                        </FlexRowCenter>
                    ))}
                </>
            </FlexRowCenter>
        </>
    )
}

export default ProductGallery