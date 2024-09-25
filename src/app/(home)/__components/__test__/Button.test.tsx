import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../button";

test("Calls onClick when button is clicked", () => {
  const handleClick = jest.fn();

  render(<Button onClick={handleClick}>Click Me!</Button>);
  const button = screen.getByText("Click Me!");
  fireEvent.click(button);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
