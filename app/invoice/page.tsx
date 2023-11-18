"use client";
import { useEffect, useState } from 'react';
import { Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow } from '@mui/material';
  import { toast } from "react-toastify";
  import { format } from "date-fns";
import api from "../api/api";


type Column = {
  id: string
  label: string;
};

const columns: readonly Column[] = [
  {
    id: "customerName",
    label: "CUSTOMER NAME",
  },
  {
    id: "createdAt",
    label: "DATE",
  },
  {
    id: "invoiceTotal",
    label: "INVOICE TOTAL",
  },
  {
    id: "productSubtotal",
    label: "PRODUCT SUBTOTAL",
  },
];


type Data = {
  customerName: string;
  createdAt: string;
  invoiceTotal: number;
  productSubtotal: number;
};

function createData(
  customerName: string,
  createdAt: string,
  invoiceTotal: number,
  productSubtotal: number,
) : Data {
  return {
    customerName,
    createdAt,
    invoiceTotal,
    productSubtotal,
  };
}

const formatDate = (date: any) => {
  return format(new Date(date), "MMM dd, yyyy h:mm aa");
};


export default function InvoicePage() {

  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  const rows = data.map((item: any) =>
  createData(
    item.customerName,
    item.createdAt,
    item.invoiceTotal,
    item.productSubtotal,
  )
);


  useEffect(() => {
    const getData = async () => {
    try {
      setLoading(true);
      const response = await api.getUerInvoice();
      if (response.data.isSuccessful) {
        const data = response.data.data;
        console.log(data);
        setData(data);
        setLoading(false);
      } else toast.error("Error in Getting Data");
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong, please try again");
      }
    }
    }
    getData();
  }, []);
  
  return (
    <Box>
          <Typography
        component="h1"
        fontWeight={500}
        color="secondary"
        sx={{ fontSize: "24px" }}
      >
        Invoice List
      </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {columns.map((column) => 
            <TableCell  key={column.id} sx={{
              p: 2,
              borderBottom: "none",
              backgroundColor: "primary.light"
            }}>
              <Typography
                      color="secondary"
                      fontWeight={600}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      {column.label}
                    </Typography>

            </TableCell>
          
          )}
          </TableRow>
        </TableHead>
        <TableBody>
                      {/* check if table has data */}
                      {data.length === 0 ? (
                        <TableRow>
                        <TableCell colSpan={6}>No Records Found</TableCell>
                      </TableRow> ) : rows.map((row, index: number) => (
            <TableRow
            hover key={index}>
             <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{  }}>
                        {row.customerName}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{  }}>
                        {formatDate(row.createdAt)}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{  }}>
                      ₦ {Number(row.invoiceTotal).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: "12px" }}>
                      <Typography fontWeight={400} sx={{  }}>
                      ₦ { Number(row.productSubtotal).toLocaleString() }
                      </Typography>
                    </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>

  );
}
