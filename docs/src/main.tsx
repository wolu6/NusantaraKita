import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { routers } from "./routes/routes.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
