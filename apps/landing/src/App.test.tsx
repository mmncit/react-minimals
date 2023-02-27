import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

function mountComponent() {
  return render(<App />);
}

test("renders div", () => {
  mountComponent();
  expect(
    screen.queryByText("the snozzberries taste like snozzberries")
  ).toBeTruthy();
});
