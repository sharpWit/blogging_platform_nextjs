import "@testing-library/jest-dom";
import HomePage from "../src/app/(home)/page.tsx";
import { act, render, screen } from "@testing-library/react";

it("renders a heading", async () => {
  await act(async () => {
    render(<HomePage />);
  });
  const heading = screen.getByRole("heading", { level: 1 });
  expect(heading).toBeInTheDocument();
});
