import { injectReducer } from ".";
import type { Reducer } from "redux";

const withReducer =
  (key: string, reducer: Reducer) => (WrappedComponent: any) => {
    injectReducer(key, reducer);
    return WrappedComponent;
  };

export default withReducer;
