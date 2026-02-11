import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center" data-testid="loading">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-500"></div>
        <p className="font-medium text-stone-600">{t("common.loading")}</p>
      </div>
    </div>
  );
}
