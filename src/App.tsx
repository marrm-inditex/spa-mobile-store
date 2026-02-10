import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { appRoutes } from "@/presentation/routes";

const router = createBrowserRouter(appRoutes);

export default function App() {
  return <RouterProvider router={router} />;
}
