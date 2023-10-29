import { isEmpty } from "lodash";
import { ReactElement, useState } from "react";
import Loading from "./Loading";

interface Props<T> {
  delay?: number;
  fallback?: ReactElement | null;
  ready?: T;
  children: (ready: T) => any;
}

export function SuspenseWrapper<T = any>({
  delay = 10,
  ready,
  fallback = null,
  children,
}: Props<T>) {
  const [show, setShow] = useState(false);

  setTimeout(() => {
    setShow(true);
  }, delay);

  if (!!ready && !isEmpty(ready)) return children(ready);
  if (!show) return null;

  return fallback === undefined ? <Loading /> : fallback;
}

export default SuspenseWrapper;
