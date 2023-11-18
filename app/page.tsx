"use client";

import { useState } from "react";
import {
  Typography,
  TextField,
  Box,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'
import * as yup from "yup";
import api from "./api/api";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Must be a valid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
});

export default function Home() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, args) => {
      try {
        setLoading(true);
        const response = await api.signIn(values);
        console.log(response);
        if (response.data.isSuccessful) {
          const userData = response.data.data.user;
          const token = response.data.data.token;
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);
          args.resetForm();
          toast.success("Login Successfully");
          router.push('/invoice')
        } else toast.error("Incorrect Credentials");
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
      component="div"
      sx={{
        backgroundColor: "primary.light",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "40px",
          borderRadius: "20px",
          width: "400px",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "primary.dark", fontWeight: "700" }}
        >
          Welcome!
        </Typography>
        <Typography
          align="center"
          sx={{ color: "text.secondary", fontSize: "14px", mt: 2, mb: 5 }}
        >
          Enter details to login.
        </Typography>

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            label="Email"
            size="small"
            variant="outlined"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Typography color="error.main" sx={{ fontSize: "13px" }}>
            {formik.errors.email && formik.touched.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </Typography>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            size="small"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            sx={{ mt: "25px" }}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography
                    variant="overline"
                    color="primary"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ cursor: "pointer", display: "flex" }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <RemoveRedEyeIcon />
                    )}
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
           <Typography color="error.main" sx={{ fontSize: "13px" }}>
            {formik.errors.password && formik.touched.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
          </Typography>

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
                LOG IN
              </Typography>
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
