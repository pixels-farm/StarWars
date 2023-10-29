import { matchRoutes, useLocation } from "react-router-dom";
import routes from "../routing";

const useCurrentRoute = () => {
  const collection = Object.keys(routes)
    .map((key) => [
      {
        path: routes[key as keyof typeof routes].page,
      },
      {
        path: routes[key as keyof typeof routes].view,
      },
    ])
    .flat();

  const location = useLocation();
  const matchings = matchRoutes(collection, location);

  return matchings?.length ? matchings[0] : null;
};

export default useCurrentRoute;
