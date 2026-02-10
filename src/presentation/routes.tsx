import { Navigate, Route, createRoutesFromElements } from "react-router-dom";
import { ProductRoutes } from "./product/routes";

export const appRoutes = createRoutesFromElements(
  <Route>
    <Route index element={<Navigate to={ProductRoutes.list} replace />} />
    {ProductRoutes.init()}
  </Route>,
);
