import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Input from "../Input";

// Mock theme for testing
const theme = {
  fonts: {
    body: "Arial, sans-serif",
  },
};

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("Input Component", () => {
  it("renders input with correct placeholder", () => {
    renderWithTheme(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("renders with correct base styles", () => {
    renderWithTheme(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveStyle({
      width: "100%",
      padding: "11px 16px",
      border: "none",
      borderRadius: "6px",
      fontFamily: theme.fonts.body,
      fontSize: "14px",
      background: "#d9dfeb 0% 0% no-repeat padding-box",
      color: "#7a7d7e",
      fontWeight: "normal",
    });
  });

  it("handles value changes", () => {
    renderWithTheme(<Input value="test value" onChange={() => {}} />);
    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("test value");
  });

  it("applies focus styles when focused", () => {
    renderWithTheme(<Input />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    expect(input).toHaveStyle({
      outline: "none",
      borderColor: "#5b7be2",
    });
  });
});
