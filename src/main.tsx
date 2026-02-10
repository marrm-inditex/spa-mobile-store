import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/presentation/shared/styles/index.css";
import "@/config/i18n/config";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
