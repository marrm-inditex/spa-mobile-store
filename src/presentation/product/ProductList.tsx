import { useNavigate } from "react-router-dom";
import { ProductRoutes } from "./routes";

export default function ProductList() {
  const navigate = useNavigate();

  return (
    <div>
      <p className="text-blue-500">Product List</p>
      <button onClick={() => navigate(ProductRoutes.detail("1"))}>
        Ir al Producto 1
      </button>
    </div>
  );
}
