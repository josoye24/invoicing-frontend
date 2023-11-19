"use client";
import { useEffect, useState } from "react";
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
  TablePagination,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { format } from "date-fns";
import api from "../api/api";
import Loading from "@/app/components/Loading";
import EmptyInvoice from "@/app/components/EmptyInvoice";

type Column = {
  id: string;
  label: string;
};

const columns: readonly Column[] = [
  {
    id: "invoiceNumber",
    label: "INVOICE NUMBER",
  },
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
];

type Data = {
  invoiceNumber: number;
  customerName: string;
  createdAt: string;
  invoiceTotal: number;
};

function createData(
  invoiceNumber: number,
  customerName: string,
  createdAt: string,
  invoiceTotal: number
): Data {
  return {
    invoiceNumber,
    customerName,
    createdAt,
    invoiceTotal,
  };
}

const formatDate = (date: any) => {
  return format(new Date(date), "MMM dd, yyyy h:mm aa");
};

const InvoicePage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = data.map((item: any) =>
    createData(
      item.invoiceNumber,
      item.customerName,
      item.createdAt,
      item.invoiceTotal
    )
  );

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleViewInvoice = (index: number) => {
    localStorage.setItem("invoiceData", JSON.stringify(data[index]));
    router.push("/invoice/detail");
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        let userId: any;
        const user = localStorage.getItem("user");
        if (user) {
          const userObj = JSON.parse(user);
          userId = userObj.id;
        }
        const response = await api.getUerInvoice(userId);
        if (response.data.isSuccessful) {
          const data = response.data.data;
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
    };
    getData();
  }, []);

  return (
    <Box>
      <Typography
        component="h1"
        fontWeight={500}
        mb={4}
        color="secondary"
        sx={{ fontSize: "24px" }}
      >
        Invoice List
      </Typography>
      {loading ? (
        <Loading />
      ) : data.length === 0 ? (
        <EmptyInvoice />
      ) : (
        <>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          p: 2,
                          borderBottom: "none",
                          backgroundColor: "primary.light",
                        }}
                      >
                        <Typography
                          color="secondary"
                          fontWeight={600}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          {column.label}
                        </Typography>
                      </TableCell>
                    ))}
                    <TableCell
                      sx={{
                        p: 2,
                        borderBottom: "none",
                        backgroundColor: "primary.light",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index: number) => (
                      <TableRow hover key={index}>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography fontWeight={400} sx={{}}>
                            INV{row.invoiceNumber}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography fontWeight={400} sx={{}}>
                            {row.customerName}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography fontWeight={400} sx={{}}>
                            {formatDate(row.createdAt)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ p: "12px" }}>
                          <Typography fontWeight={400} sx={{}}>
                            $ {Number(row.invoiceTotal).toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleViewInvoice(index)}
                          >
                            <Typography
                              component="p"
                              fontWeight={400}
                              color="primary.main"
                              sx={{ fontSize: "10px" }}
                            >
                              VIEW
                            </Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </>
      )}
    </Box>
  );
};
export default InvoicePage;
