"use client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";

const ViewInvoicePage = () => {
  const router = useRouter();
  const rawData = localStorage.getItem("invoiceData");
  let data: any;

  try {
    data = rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    data = null;
  }

  const formatDate = (date: any) => {
    return format(new Date(date), "MMM dd, yyyy");
  };

  const goBack = () => {
    router.back();
  };

  useEffect(() => {
    if (!data) {
      router.push("/invoice");
    }
  }, [data]);

  return (
    <Box
      mb={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <Typography
          component="h1"
          fontWeight={500}
          color="secondary"
          sx={{ fontSize: "24px" }}
        >
          View Invoice
        </Typography>
        {data && data.user && (
          <>
            <Box
              mb={4}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="outlined" onClick={goBack}>
                Go Back
              </Button>
            </Box>

            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              {data.user.name}
            </Typography>

            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              {data.user.email}
            </Typography>

            <Box
              component="div"
              p={1}
              mt={3}
              mb={1}
              sx={{
                backgroundColor: "primary.light",
              }}
              borderRadius={2}
            >
              <Typography
                component="h3"
                fontWeight={500}
                color="secondary"
                sx={{ fontSize: "15px" }}
              >
                Bill to:
              </Typography>
            </Box>
            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              {data.customerName}
            </Typography>
            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "16px" }}
            >
              {data.customerAddress}
            </Typography>

            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "14px" }}
            >
              <strong>Invoice Number:</strong> INV{data.invoiceNumber}
            </Typography>
            <Typography
              component="p"
              fontWeight={400}
              ml={1}
              color="secondary"
              sx={{ fontSize: "14px" }}
            >
              <strong>Invoice Date:</strong> {formatDate(data.createdAt)}
            </Typography>

            <Box
              component="div"
              p={1}
              mt={4}
              mb={1}
              sx={{
                backgroundColor: "primary.light",
              }}
              borderRadius={2}
            >
              <Typography
                component="h3"
                fontWeight={500}
                color="secondary"
                sx={{ fontSize: "15px" }}
              >
                Invoice Items:
              </Typography>
            </Box>

            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "transparent",
              }}
              elevation={0}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="20%">
                      <strong>Code</strong>
                    </TableCell>
                    <TableCell width="25%">
                      <strong>Description</strong>
                    </TableCell>
                    <TableCell width="15%">
                      <strong>Quantity</strong>
                    </TableCell>
                    <TableCell width="20%">
                      <strong>Unit Price</strong>
                    </TableCell>
                    <TableCell align="right" width="20%">
                      <strong>Amount</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.details.map((item: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Typography
                          component="p"
                          fontWeight={400}
                          color="secondary"
                          sx={{ fontSize: "14px" }}
                        >
                          {item.productCode}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          component="p"
                          fontWeight={400}
                          color="secondary"
                          sx={{ fontSize: "14px" }}
                        >
                          {item.productDescription}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          component="p"
                          fontWeight={400}
                          color="secondary"
                          sx={{ fontSize: "14px" }}
                        >
                          {item.productQuantity}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          component="p"
                          fontWeight={400}
                          color="secondary"
                          sx={{ fontSize: "14px" }}
                        >
                          {Number(item.productPricePerUnit).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          component="p"
                          fontWeight={400}
                          color="secondary"
                          sx={{ fontSize: "14px" }}
                        >
                          $ {Number(item.lineTotal).toLocaleString()}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={2}>
                      <Typography fontWeight={500}>Subtotal</Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <Typography fontWeight={500}>
                        $ {Number(data.productSubtotal).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography fontWeight={500}>Total</Typography>
                    </TableCell>
                    <TableCell colSpan={2} align="right">
                      <Typography fontWeight={500}>
                        $ {Number(data.invoiceTotal).toLocaleString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};
export default ViewInvoicePage;
