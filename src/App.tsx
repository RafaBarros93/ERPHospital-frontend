import React from "react";
import Routes from "./routes";
import Menu from "@/pages/Menu";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div style={{ display: "grid", padding: "5rem" }}>
        <Menu />
        <Routes />
      </div>
    </ThemeProvider>
  );
};

export default App;
