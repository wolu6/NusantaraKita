import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { ResponseTypeProvider } from "./components/ui/response-type.tsx";
import ReactQueryProvider from "./context/react-query-provider.tsx";
import "./index.css";
import { routers } from "./routes/routes.ts";
import { OverviewProvider } from "./context/overview-provider.tsx";
import { FixLeafletIcons } from "./components/ui/fix-leaflet-icon.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <ResponseTypeProvider>
        <OverviewProvider>
          <FixLeafletIcons />
          <RouterProvider router={routers} />
        </OverviewProvider>
      </ResponseTypeProvider>
    </ReactQueryProvider>
  </StrictMode>
);
