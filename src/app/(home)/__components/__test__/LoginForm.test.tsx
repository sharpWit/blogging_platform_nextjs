import { fireEvent, render, screen } from "@testing-library/react";
import LoginForm from "../login-form";

test("Submits the form with email and password", () => {
  const handleSubmit = jest.fn();
  render(<LoginForm onHandleSubmit={handleSubmit} />);

  // Debugging to check the rendered DOM
  // screen.debug();

  // Simulate typing the email
  fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
    target: { value: "khosravi.webmaster@gmail.com" },
  });

  // Simulate typing the password
  fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
    target: { value: "password123" },
  });

  // Alternative method to find the button (if getByRole fails)
  const submitButton = screen.getByText(/login/i); // Case-insensitive match for "Login"

  // Log the button to check if it's found
  // console.log(submitButton);

  // Simulate clicking the submit button
  fireEvent.submit(submitButton);

  // Expect the form submission to have been called with the correct values
  expect(handleSubmit).toHaveBeenCalledWith(
    expect.anything(), // The event object
    {
      email: "khosravi.webmaster@gmail.com",
      password: "password123",
    }
  );
});
