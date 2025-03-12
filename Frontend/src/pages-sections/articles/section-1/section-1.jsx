"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  InputAdornment,
  Typography,
  Divider,
  TextField,
  useMediaQuery,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { FlexBox, FlexRowCenter } from "@/components/flex-box";
import { useRouter } from "next/navigation";
import { LazyImage } from "@/components/lazy-image";
import styled from "@mui/material/styles/styled";
import SearchIcon from "@mui/icons-material/Search";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";


export default function Section1() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6; // Number of blogs per page

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs?search=${encodeURIComponent(searchQuery)}`
        );
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [searchQuery]);

  // Calculate total pages
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  // Get current page blogs
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle pagination
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Box sx={{ py: { xs: 2, sm: 5 } }}>
      <Container sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <FlexBox flexDirection={isMobile ? "column" : "row"} justifyContent="space-between" width="100%" sx={{ py: 5 }} gap={2} alignItems="center">
          <Typography sx={{ fontFamily: "Elemental End", textTransform:'lowercase', fontSize: { xs: 25, sm: 50 }, color: "#fff" }}>
            Press Releases
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Job title, skill, keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ paddingLeft: 1 }}>
                  <SearchIcon style={{ color: "#000", fontSize: 22 }} />
                </InputAdornment>
              ),
              style: {
                color: "#000",
                background: "#fff",
                borderRadius: "25px",
                padding: 5,
              },
            }}
          />
        </FlexBox>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 200 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {currentBlogs.map((blog, index) => (
                <Grid item key={index} xs={12} sm={4}>
                  <BlogCard blog={blog} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <FlexRowCenter alignItems="center" sx={{ py: 10 }}>
                <IconButton 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <RiArrowLeftSLine color="white" />
                </IconButton>
                <Typography sx={{ mx: 2, color: "#fff", fontSize: 18 }}>
                  Page {currentPage} of {totalPages}
                </Typography>
                <IconButton 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <RiArrowRightSLine color="white" />
                </IconButton>
              </FlexRowCenter>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

const CardWrapper = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.35)",
  boxShadow: `inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4),
              inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5),
              inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24),
              inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)`,
  backdropFilter: "blur(10.0285px)",
  borderRadius: "40px",
  padding: "25px",
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: "column",
  gap: 3,
}));

const btnStyle = {
  fontFamily: "Elemental End",
  textTransform: "lowercase",
  fontSize: 10,
  px: 3,
  background: "#000",
  border: "2px solid white",
  borderRadius: "50px",
  color: "#fff",
  fontWeight: 400,
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};

const BlogCard = ({ blog }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/press-releases/${blog.slug}`);
  };

  return (
    <CardWrapper>
      <Box sx={{ maxHeight: "200px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px" }}>
        <LazyImage src={blog.image} width={500} height={500} alt="blog-image" sx={{ height: "200px", width: "100%", objectFit: "cover" }} />
      </Box>
      <Typography fontWeight={600} color="#fff" fontFamily="Helvetica" fontSize={20} sx={{ py: 1 }}>
        {blog.handle_url_title}
      </Typography>
      <Divider />
      <Typography color="#fff" fontFamily="Helvetica" fontSize={18} sx={{ py: 1, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {blog.title}
      </Typography>
      <Typography color="#fff" fontFamily="Helvetica" fontSize={18} fontStyle="italic" sx={{ fontWeight: 300, overflow: "hidden", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 3 }}>
        {blog.content}
      </Typography>
      <FlexBox justifyContent="flex-end" sx={{ pt: 5 }}>
        <Button onClick={handleCardClick} sx={btnStyle}>
          Read More
        </Button>
      </FlexBox>
    </CardWrapper>
  );
};
