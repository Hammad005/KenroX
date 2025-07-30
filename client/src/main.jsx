import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./components/ui/theme-provider";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="KenroX-theme">
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
