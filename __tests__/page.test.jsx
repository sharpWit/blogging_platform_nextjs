import "@testing-library/jest-dom";
import HomePage from "../src/app/(home)/page.tsx";
import { act, render, screen } from "@testing-library/react";

it("renders a heading", async () => {
  await act(async () => {
    render(<HomePage />);
  });
  // Ensure the 'Home' heading is present
  const homeHeading = screen.getByText("Home", { selector: "h1" });
  expect(homeHeading).toBeInTheDocument();

  // Ensure the 'TOP CATEGORIES' heading is present
  const categoriesHeading = screen.getByText("TOP CATEGORIES", {
    selector: "h1",
  });
  expect(categoriesHeading).toBeInTheDocument();
});
