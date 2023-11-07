import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import service from "../app/service";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const loginSchema = Yup.object().shape({
  username: Yup.string().required("Tên đăng nhập không được để trống"),
  password: Yup.string().required("Mật khẩu không được để trống"),
});
const defaultValues = {
  username: "",
  password: "",
};
function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = async (data) => {
    auth.login(data).then(() => navigate("/", { replace: true }));
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(loginSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <FTextField name="username" label="Tên đăng nhập" />
          <FTextField
            name="password"
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            variant="contained"
            type="submit"
            size="large"
            loading={isSubmitting}
          >
            Đăng nhập
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
