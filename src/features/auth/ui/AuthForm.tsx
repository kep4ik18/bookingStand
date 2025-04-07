import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useDispatch } from "react-redux";
import { loginSuccess, setError } from "../model/authSlice";
import {
  TextField,
  Button,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";

const AuthForm: React.FC = () => {
  const { keycloak, initialized } = useKeycloak();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      await keycloak.login({
        username,
        password,
        grantType: "password",
        clientSecret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET, // client_secret
      });
      if (keycloak.token) {
        dispatch(loginSuccess(keycloak.token)); // Сохраняем токен в Redux
      }
    } catch (err) {
      const errorMessage = "Ошибка авторизации. Проверь логин и пароль.";
      setError(errorMessage);
      dispatch(setError(errorMessage));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) {
    return <CircularProgress />;
  }

  if (keycloak.authenticated) {
    return <Typography>Вы авторизованы!</Typography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      maxWidth={300}
      mx="auto"
      mt={5}
    >
      <TextField
        label="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : "Войти"}
      </Button>
    </Box>
  );
};

export default AuthForm;
