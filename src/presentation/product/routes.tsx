import { Route } from "react-router-dom";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import MainLayout from "@/presentation/shared/layouts/MainLayout";

export class ProductRoutes {
  static readonly list = "/products";
  static readonly detail = (id: string) => `/products/${id}`;

  static init = () => {
    return (
      <Route element={<MainLayout />}>
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Route>
    );
  };
}
