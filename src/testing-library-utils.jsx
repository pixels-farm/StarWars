import { render } from "@testing-library/react";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./store";

const renderWithContext = (ui, options) => {
  render(ui, {
    wrapper: ({ children }) => (
      <Provider store={store}>
        <SnackbarProvider
          maxSnack={5}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {children}
        </SnackbarProvider>
      </Provider>
    ),
    ...options,
  });
};

export * from "@testing-library/react";
export { renderWithContext as render };
