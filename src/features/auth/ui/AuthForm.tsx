import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../model/authSlice';

import { Button, TextField, Box, Typography, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../../app/store/hooks';

export const AuthForm = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Временный clientSecret (замени на настоящий, когда получишь)
    const clientSecret = import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET; // TODO: Замени на реальный client_secret
    dispatch(login({ username, password, clientSecret }));
  };

  if (isAuthenticated) {
    return <Typography>Вы успешно авторизованы!</Typography>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Вход
      </Typography>
      <TextField
        label="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
      />
      <TextField
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Войти'}
      </Button>
    </Box>
  );
};