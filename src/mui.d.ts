import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    amber: Palette["primary"];
  }
  interface PaletteOptions {
    amber?: PaletteOptions["primary"];
  }
}
