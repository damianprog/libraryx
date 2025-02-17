import { createTheme, ThemeProvider } from "@mui/material";
import AddBookModal from "./components/BasicModal/AddBookModal";
import SearchAppBar from "./components/SearchAppBar";

function App() {
  const theme = createTheme({
    palette: {
      blue: {
        main: "#1c76d2",
      },
      amber: {
        main: "#F57F17",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <SearchAppBar />
        <AddBookModal />
      </ThemeProvider>
    </>
  );
}

export default App;
