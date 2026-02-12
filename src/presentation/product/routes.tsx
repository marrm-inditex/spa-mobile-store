import { lazy } from "react";
import { Route } from "react-router-dom";
import MainLayout from "@/presentation/shared/layouts/MainLayout";

const ProductListPage = lazy(() => import("./list/ProductListPage"));
const ProductDetailPage = lazy(() => import("./detail/ProductDetailPage"));

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
