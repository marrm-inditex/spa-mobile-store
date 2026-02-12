import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageLoader from "./ImageLoader";

describe("ImageLoader", () => {
  it("shows skeleton while image is loading", () => {
    const { container } = render(
      <ImageLoader src="https://example.com/image.jpg" alt="Test image" />,
    );

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(<ImageLoader src="https://example.com/image.jpg" alt="Test image" />);

    const img = screen.getByAltText("Test image");
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });

  it("hides skeleton when image loads", () => {
    const { container } = render(
      <ImageLoader src="https://example.com/image.jpg" alt="Test image" />,
    );

    const img = screen.getByAltText("Test image") as HTMLImageElement;
    expect(img).toHaveClass("opacity-0");

    fireEvent.load(img);

    expect(img).toHaveClass("opacity-100");
    expect(img).not.toHaveClass("opacity-0");

    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).not.toBeInTheDocument();
  });

  it("handles image error gracefully", () => {
    const { container } = render(
      <ImageLoader src="https://example.com/broken.jpg" alt="Broken image" />,
    );

    const img = screen.getByAltText("Broken image") as HTMLImageElement;
    expect(img).toHaveClass("opacity-0");

    fireEvent.error(img);

    expect(img).toHaveClass("opacity-100");
    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).not.toBeInTheDocument();
  });

  it("applies custom containerClassName and className to image", () => {
    const { container } = render(
      <ImageLoader
        src="https://example.com/image.jpg"
        alt="Test image"
        containerClassName="custom-container-class"
        className="custom-img-class"
      />,
    );

    const containerDiv = container.firstChild as HTMLElement;
    expect(containerDiv).toHaveClass("custom-container-class");
    const img = screen.getByAltText("Test image");
    expect(img).toHaveClass("custom-img-class");
  });
});
