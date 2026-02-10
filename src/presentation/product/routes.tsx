import { Route } from "react-router-dom";
import ProductListPage from "./list/ProductListPage";
import ProductDetailPage from "./detail/ProductDetailPage";
import MainLayout from "@/presentation/shared/layouts/MainLayout";

export class ProductRoutes {
  static readonly list = "/products";
  static readonly detail = (id: string) => `/products/${id}`;

  static init = () => {
    return (
      <Route element={<MainLayout />}>
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
      </Route>
    );
  };
}
