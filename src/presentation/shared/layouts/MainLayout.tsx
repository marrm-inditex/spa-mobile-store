import { Link, Outlet } from "react-router-dom";
import Breadcrumbs from "@/presentation/shared/components/Breadcrumbs";
import Cart from "@/presentation/shared/components/Cart";

export default function MainLayout() {
  return (
    <div className="min-h-screen text-stone-900">
      <header className="border-b border-stone-600 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pt-2 pb-3">
          <div className="flex flex-col gap-2">
            <Link to="/" className="text-xl font-bold">
              Mobile Store
            </Link>
            <Breadcrumbs />
          </div>
          <Cart />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
