import { BrowserRouter, RouterProvider } from "react-router";
import { routers } from "./routes/routes";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <RouterProvider router={routers} />
    </BrowserRouter>
  );
}

export default App;
