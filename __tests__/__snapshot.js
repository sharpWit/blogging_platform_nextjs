import { render } from "@testing-library/react";
import HomePage from "../src/app/(home)/page.tsx";

it("renders homepage unchanged", () => {
  const { container } = render(<HomePage />);
  expect(container).toMatchSnapshot();
});
