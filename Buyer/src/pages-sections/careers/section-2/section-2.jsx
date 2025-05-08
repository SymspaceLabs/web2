"use client";

// ==============================================================
// Section 2 || Careers Page
// ==============================================================

import { Box, Container, Divider, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styles } from "../page-view/styles";
import { H1 } from "@/components/Typography";

export default function Section2() {

  const rows = [
    { 
      title: "innovation",
      description: "The future of shopping is immersive. We push the boundaries of AI-driven 3D modeling and AR to create smarter, more intuitive experiences for consumers and brands."
    },
    { 
      title: "inclusion", 
      description: "Technology works best when it works for everyone. We prioritize accessibility-first design, ensuring individuals of all abilities, backgrounds, and circumstances can fully engage with AR commerce."
    },
    { 
      title: "sustainability",
      description: "Reducing waste starts with better technology. Our virtual try-ons, digital staging, and AI-powered modeling help brands cut down on returns, overproduction, and environmental impact."
    },
    { 
      title: "empowerment",
      description: "Convenience should never be a barrier. Whether it’s homebound shoppers, expectant mothers, or veterans, we develop tools that enhance independence and confidence in every purchase."
    },
    { 
      title: "impact", 
      description: "We don’t just build AR experiences—we create solutions that bridge gaps, remove limitations, and set new standards for inclusive digital commerce." 
    },
  ];

  return (
    <Container sx={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', py:4 }}>
      <Box sx={{ width:'100%' }}>
        <H1 sx={{ py:5, fontSize: { xs: 25, sm: 40 }, color: '#fff' }}>
          Our Core Values
        </H1>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TableContainer>
              <Divider />
              <Table>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ p:{xs:1, sm:4}, ...styles.elementalEndFont, fontSize: { xs: 15, sm: 30 }, color: '#fff' }}>
                        {row.title}
                      </TableCell>
                      <TableCell sx={{ p:{xs:1, sm:4}, fontFamily: 'Helvetica', color: '#fff', fontWeight:300, fontSize: { xs: 8, sm: 20 }, textAlign:'justify' }}>
                        {row.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}