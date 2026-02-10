import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

describe("Loading", () => {
  it("renders loading text", () => {
    render(<Loading />);

    expect(screen.getByText("common.loading")).toBeInTheDocument();
  });

  it("renders spinner element", () => {
    const { container } = render(<Loading />);

    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });
});
