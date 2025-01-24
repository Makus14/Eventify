import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "antd/dist/reset.css";
import Events from "./components/Events/Events.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Events />
  </StrictMode>
);
