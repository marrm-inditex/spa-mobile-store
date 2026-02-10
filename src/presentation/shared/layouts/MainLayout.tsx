import { Link, Outlet } from "react-router-dom";
import Breadcrumbs from "@/presentation/shared/components/Breadcrumbs";

export default function MainLayout() {
  return (
    <div className="min-h-screen text-stone-900">
      <header className="border-b border-stone-600 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-6 px-8 py-4">
          <Link to="/" className="text-xl font-bold">
            Mobile Store
          </Link>
          <Breadcrumbs />
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl p-8">
        <Outlet />
      </main>
    </div>
  );
}
