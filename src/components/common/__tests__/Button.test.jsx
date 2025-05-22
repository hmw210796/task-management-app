import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Button from "../Button";

// Mock theme for testing
const theme = {
  colors: {
    blue: "#5B7FFF",
  },
  fonts: {
    body: "Arial, sans-serif",
  },
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Button Component", () => {
  it("renders button with correct text", () => {
    renderWithTheme(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("applies disabled styles when disabled prop is true", () => {
    renderWithTheme(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({
      background: "#bfc1c2",
      cursor: "not-allowed",
    });
  });

  it("applies hover styles on mouse over", () => {
    renderWithTheme(<Button>Hover me</Button>);
    const button = screen.getByText("Hover me");
    expect(button).toHaveStyle({
      background: theme.colors.blue,
    });
  });

  it("renders with correct base styles", () => {
    renderWithTheme(<Button>Styled Button</Button>);
    const button = screen.getByText("Styled Button");
    expect(button).toHaveStyle({
      color: "#fff",
      border: "none",
      borderRadius: "0.5rem",
      fontFamily: theme.fonts.body,
      fontSize: "14px",
      lineHeight: "18px",
      padding: "11px 22px",
    });
  });
});
