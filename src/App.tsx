import React from "react";
import Routes from "./routes";
import Menu from "./components/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Menu />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
