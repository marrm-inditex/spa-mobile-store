import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import { AppWrapper } from "@/config/test/utils";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("MainLayout", () => {
  it("renders the header with store name", () => {
    render(
      <AppWrapper>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Content</div>} />
          </Route>
        </Routes>
      </AppWrapper>,
    );

    expect(screen.getByText("Mobile Store")).toBeInTheDocument();
  });

  it("renders breadcrumbs component", () => {
    render(
      <AppWrapper>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Content</div>} />
          </Route>
        </Routes>
      </AppWrapper>,
    );

    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("renders outlet content", () => {
    render(
      <AppWrapper>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Test Content</div>} />
          </Route>
        </Routes>
      </AppWrapper>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });
});
