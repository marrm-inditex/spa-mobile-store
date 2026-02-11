import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { AppWrapper } from "@/config/test/utils";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("NotFound", () => {
  it("renders 404 error code", () => {
    render(
      <AppWrapper>
        <NotFound />
      </AppWrapper>,
    );
    expect(screen.getByTestId("not-found-message")).toBeInTheDocument();
  });

  it("renders back to products link", () => {
    render(
      <AppWrapper>
        <NotFound />
      </AppWrapper>,
    );
    const backLink = screen.getByTestId("back-link");
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute("href", "/products");
  });
});
