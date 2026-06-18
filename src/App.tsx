import type { JSX } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddBookPage from "./pages/AddBookPage";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserBookPage from "./pages/UserBookPage";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicOnlyRoute from "./auth/PublicOnlyRoute";

function App(): JSX.Element {
  const theme = createTheme({
    palette: {
      amber: {
        main: "#F57F17",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-book"
                element={
                  <ProtectedRoute>
                    <AddBookPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user-book"
                element={
                  <ProtectedRoute>
                    <UserBookPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sign-in"
                element={
                  <PublicOnlyRoute>
                    <SignInPage />
                  </PublicOnlyRoute>
                }
              />
              <Route
                path="/sign-up"
                element={
                  <PublicOnlyRoute>
                    <SignUpPage />
                  </PublicOnlyRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
