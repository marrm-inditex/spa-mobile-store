import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "common.detail": "Detail",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Breadcrumbs", () => {
  it("renders breadcrumbs for products list", () => {
    render(
      <MemoryRouter initialEntries={["/products"]}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("renders Detail for ID segments", () => {
    render(
      <MemoryRouter initialEntries={["/products/123"]}>
        <Breadcrumbs />
      </MemoryRouter>,
    );

    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Detail")).toBeInTheDocument();
  });
});
