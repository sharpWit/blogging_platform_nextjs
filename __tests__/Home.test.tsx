import { render, screen } from "@testing-library/react";
import Home from "@/app/(home)/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Should have learn Text", () => {
    render(<Home />);
    const LearnText = screen.getByText("Home");
    expect(LearnText).toBeInTheDocument();
  });
});
