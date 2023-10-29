import { EqualityFn, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useDepartmrntDispatch = () => useDispatch<AppDispatch>();

// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppSelector = <TState = RootState, Selected = unknown>(
  selector: (state: TState) => Selected,
  equalityFn?: EqualityFn<Selected> | undefined
) => useSelector(selector, equalityFn);
