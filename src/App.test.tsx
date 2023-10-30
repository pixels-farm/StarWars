import App from "./App";
import { render, screen } from "./testing-library-utils";

describe("Checking if app renders", () => {
  test("rendering main app", async () => {
    render(<App />);
    const authorLink = await screen.findByRole("link", { name: "Author" });
    expect(authorLink).toBeInTheDocument();
  });
});
