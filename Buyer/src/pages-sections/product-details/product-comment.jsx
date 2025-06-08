"use client";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating"; // GLOBAL CUSTOM COMPONENTS

import { FlexBox } from "../../components/flex-box";
import { H5, H6, Paragraph, Span } from "../../components/Typography"; // CUSTOM UTILS LIBRARY FUNCTION

import { getDateDifference } from "../../lib"; // ===========================================================
import { getTimeAgo } from "@/services/getTimeAgo";

// ===========================================================
export default function ProductComment({
  item
}) {
  
  const {
    user,
    content,
    rating,
    createdAt
  } = item || {};

  return (
    <Box sx={{background:'#fff', p:3, borderRadius:3 }}>
      <FlexBox alignItems="center" mb={2} gap={2}>
        <Avatar
          alt={`${user?.firstName}`}
          src={user?.avatar} 
          sx={{
            width: 48,
            height: 48
          }}
        />

        <div>
          <H5 mb={1}>{`${user?.firstName}`} {`${user?.lastName}`}</H5>
          <FlexBox alignItems="center" gap={1.25}>
            <Rating size="small" value={rating} color="warn" readOnly />
            <Span>{getTimeAgo(createdAt)}</Span>
          </FlexBox>
        </div>
      </FlexBox>

      <Paragraph color="grey.700">{content}</Paragraph>
    </Box>
  );
}