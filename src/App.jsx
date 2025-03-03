import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookModal from "./components/BasicModal/AddBookModal";
import SearchAppBar from "./components/SearchAppBar";
import AddBookPage from "./pages/AddBookPage";
import Home from "./pages/HomePage";
import SignPage from "./pages/SignPage";

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
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
