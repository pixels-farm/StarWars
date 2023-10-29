import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faChild, faFemale, faRobot } from "@fortawesome/pro-duotone-svg-icons";

export const getIdFromRoute = (url: string): number => {
  const matched = url.match(/([0-9]+)\/$/);
  return matched ? +matched[1] : 0;
};

export const getCharacterIcon = (gender: "male" | "femail" | string) =>
  (gender === "male"
    ? faChild
    : gender === "female"
    ? faFemale
    : faRobot) as IconProp;

export const sortBy =
  <T>(field: keyof T, direction: "ASC" | "DESC" = "ASC") =>
  (a: T, b: T) => {
    return direction === "ASC"
      ? a[field] > b[field]
        ? 1
        : -1
      : a[field] < b[field]
      ? 1
      : -1;
  };
