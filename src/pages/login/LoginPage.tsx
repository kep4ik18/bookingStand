import { Container } from "@mui/material";
import { LoginForm } from "../../features/auth/ui/LoginForm";

type Props = {};

export default function LoginPage({}: Props) {
  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <LoginForm />
    </Container>
  );
}
