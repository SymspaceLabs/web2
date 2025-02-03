"use client";

import { Box, Container, Divider, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For extended Markdown support (e.g., bullet points, tables)

export default function Section2({ job }) {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 9,
        gap: 10,
      }}
    >
      <ContentBox title="Job Summary" content={job.summary} />
      <ContentBox title="What You Will Do" content={job.scope} />
      <ContentBox title="Preferred Qualifications" content={job.qualifications} />
      <ContentBox title="Perks" content={job.benefits} />
    </Container>
  );
}

const ContentBox = ({ title, content }) => {
  // Replace escaped `\n` with actual line breaks
  const formattedContent = content.replace(/\\n/g, "\n");

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          fontFamily: "Elemental End",
          textTransform: "lowercase",
          fontSize: { xs: 25, sm: 35 },
          color: "#fff",
        }}
      >
        {title}
      </Typography>
      <Divider />
      <Box
        sx={{
          mt: 3,
          color: "#fff",
          fontSize: { xs: 14, sm: 22 },
          fontFamily: "Helvetica",
          "& ul": {
            marginLeft: "1.5rem", // Indent bullet points
          },
          "& li": {
            listStyleType: "disc", // Ensure bullet points are visible
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{formattedContent}</ReactMarkdown>
      </Box>
    </Box>
  );
};
