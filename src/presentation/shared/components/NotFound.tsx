import { ProductRoutes } from "@/presentation/product/routes";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex-col gap-8">
      <Link
        to={ProductRoutes.list}
        className="text-stone-600 hover:underline"
        data-testid="back-link"
      >
        ← {t("common.backToProducts")}
      </Link>
      <div
        className="mt-72 flex flex-col items-center justify-center gap-4"
        data-testid="not-found-message"
      >
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-stone-600">{t("common.pageNotFound")}</p>
      </div>
    </div>
  );
}
