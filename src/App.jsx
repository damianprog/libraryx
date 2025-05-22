import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage";
import Home from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
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
      grey: {
        main: "#d7d7d7",
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
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/user-book" element={<UserBookPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
