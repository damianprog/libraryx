import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage";
import Home from "./pages/HomePage";
import SignPage from "./pages/SignPage";
import UserBookPage from "./pages/UserBookPage";

function App() {
  const theme = createTheme({
    palette: {
      blue: {
        main: "#1c76d2",
      },
      amber: {
        main: "#F57F17",
      },
      white: {
        main: "#FFFFFF",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="/sign" element={<SignPage />} />
            <Route path="/user-book" element={<UserBookPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
