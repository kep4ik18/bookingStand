import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import { MainPage } from "./pages/main";

const theme = createTheme({});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout Component={MainPage} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
