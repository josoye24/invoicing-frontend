"use client";

import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { toast } from "react-toastify";
import api from "../../api/api";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const validationSchema = yup.object({
  customerName: yup.string().required("Customer Name is required"),
    customerAddress: yup.string().required("Customer Address is required")
});


type Product = {
  productCode: string;
  productDescription: string;
  productQuantity: number;
  productPricePerUnit: number;
  amount: number;
};

const initialProduct: Product = {
  productCode: "",
  productDescription: "",
  productQuantity: 1,
  productPricePerUnit: 0,
  amount: 0,
};

export default function CreateInvoicePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [invoiceItems, setInvoiceItems] = useState<Product[]>([initialProduct]);

  const handleAddItem = () => {
    setInvoiceItems([...invoiceItems, initialProduct]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = [...invoiceItems];
    updatedItems.splice(index, 1);
    setInvoiceItems(updatedItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    const updatedItems = [...invoiceItems];
    const currentItem = { ...updatedItems[index] };

    if (typeof currentItem[field] === "string" && typeof value === "string") {
      currentItem[field] = value;
    } else if (typeof currentItem[field] === "number" && typeof value === "number") {
      currentItem[field] = value;
      currentItem.amount = currentItem.productQuantity * currentItem.productPricePerUnit;
    }

    updatedItems[index] = currentItem;
    setInvoiceItems(updatedItems);
  };
  
  const calculateSubtotal = (): number => {
    return invoiceItems.reduce((subtotal, item) => subtotal + item.amount, 0);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, args) => {
      try {
        setLoading(true);
        const paylaod = {
            ...values,
            userId: "7d49f065-40f0-4f88-920b-2fed7965be23",
            details: invoiceItems
          }

        const response = await api.createInvoice(paylaod);
        console.log(response);
        const message = response.data.message
        if (response.data.isSuccessful) {
          args.resetForm();
          toast.success(message);
          router.push("/invoice");
        } else toast.error(message);
      } catch (error: any) {
        setLoading(false);
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, please try again");
        }
      }
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          component="h1"
          fontWeight={500}
          mb={4}
          color="secondary"
          sx={{ fontSize: "24px" }}
        >
          Create Invoice
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            width: 700,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            id="customerName"
            name="customerName"
            value={formik.values.customerName}
            label="Customer Name"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Typography color="error.main" sx={{ fontSize: "13px" }}>
            {formik.errors.customerName && formik.touched.customerName ? (
              <span>{formik.errors.customerName}</span>
            ) : null}
          </Typography>
          <TextField
            fullWidth
            id="customerAddress"
            name="customerAddress"
            label="Customer Address"
            variant="outlined"
            sx={{ mt: "35px" }}
            value={formik.values.customerAddress}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Typography color="error.main" sx={{ fontSize: "13px" }}>
            {formik.errors.customerAddress && formik.touched.customerAddress ? (
              <span>{formik.errors.customerAddress}</span>
            ) : null}
          </Typography>

          <Typography
            component="h3"
            fontWeight={500}
            mt={8}
            mb={2}
            color="secondary"
            sx={{ fontSize: "18px" }}
          >
            Invoice Details
          </Typography>

<Box
sx={{
  display: "flex",
  justifyContent: 'flex-end'
}}
>

          <Button variant="outlined" 
          onClick={handleAddItem}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
          >
            <Typography
            component="p"
            fontWeight={500}
            color="primary.main"
            sx={{ fontSize: "12px" }}
          >
            Add Item 
          </Typography>
            <AddIcon fontSize='small' /> 
          </Button>
</Box>


          

          <TableContainer component={Paper}
            sx={{
                  backgroundColor: "transparent",
                  }}
                  elevation={0}
          
          >
            <Table >
              <TableHead>
                <TableRow >
                  <TableCell width="25%">Code</TableCell>
                  <TableCell width="25%">Description</TableCell>
                  <TableCell width="15%">Quantity</TableCell>
                  <TableCell width="20%">Unit Price</TableCell>
                  <TableCell width="10%">Amount</TableCell>
                  <TableCell width="5%"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <TextField
            size="small"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "productCode", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
            size="small"

                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "productDescription", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
            size="small"
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "productQuantity", +e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
            size="small"
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleItemChange(index, "productPricePerUnit", +e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell align="right">{item.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      {invoiceItems.length > 1 ? (<IconButton onClick={() => handleRemoveItem(index)}>
                        <HighlightOffIcon style={{ color: 'red' }} />
                      </IconButton>) : null}
                      
                    </TableCell>
                  </TableRow>
                ))}
                 <TableRow>
                    <TableCell rowSpan={2} />
                    <TableCell colSpan={2} >
                    <Typography 
          fontWeight={500}
                    
                    >
                      Subtotal
                      </Typography>
                      </TableCell>
                    <TableCell colSpan={2} align="right">
                    <Typography 
          fontWeight={500}
                    
                    >
                      $ {calculateSubtotal().toLocaleString()}
                      </Typography>
                      </TableCell>
            </TableRow>
          <TableRow>
            <TableCell colSpan={2}>
              
            <Typography 
          fontWeight={500}
                    
                    >
                      Total
                      </Typography>
            </TableCell>
            <TableCell colSpan={2} align="right">
            <Typography 
          fontWeight={500}
                    
                    >
                     $ {calculateSubtotal().toLocaleString()}
                      </Typography>
              </TableCell>
          </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disableElevation
            sx={{ mt: 3, mb: 2, p: 1.5 }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size={20} />
            ) : (
              <Typography
                color="text.white"
                sx={{
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                SUBMIT
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
