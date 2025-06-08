import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import { routers } from "./routes/routes.ts";
import ReactQueryProvider from "./context/react-query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={routers} />
    </ReactQueryProvider>
  </StrictMode>
);
