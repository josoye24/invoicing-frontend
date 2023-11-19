import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

const EmptyInvoice = () => {
  const router = useRouter();

  return (
    <Box
      component="div"
      mt={5}
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src="/invoice-icon.svg"
            height={144}
            width={144}
            alt="invoice icon"
          />
        </Box>

        <Typography
          component="p"
          fontWeight={500}
          p={3}
          align="center"
          color="primary.dark"
          sx={{ fontSize: "22px" }}
        >
          No invoices created yet!
        </Typography>
        <Typography
          component="p"
          fontWeight={500}
          p={2}
          align="center"
          color="secondary"
          sx={{ fontSize: "15px" }}
        >
          Create your first invoice by clicking the Create Invoice button.
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => router.push("/invoice/create")}
            sx={{ mt: 3, mb: 2, p: 1.5, pl: 3, pr: 3 }}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default EmptyInvoice;
