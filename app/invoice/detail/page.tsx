"use client";

import { Box, Typography } from "@mui/material";


export default function ViewInvoicePage() {

  return (
    <Box>
      <Typography
        component="h1"
        fontWeight={500}
        mb={4}
        color="secondary"
        sx={{ fontSize: "24px" }}
      >
        View Invoice
      </Typography>

    </Box>
  );
}
