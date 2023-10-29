const routes = {
  characters: {
    page: "/characters",
    view: "/characters/:id",
  },
  vehicles: {
    page: "/vehicles",
    view: "/vehicles/:id",
  },
  planets: {
    page: "/planets",
    view: "/planets/:id",
  },
};

export const author = "/author";

export const external = {
  peopleBaseUrl: "https://swapi.dev/api/people",
  planetBaseUrl: "https://swapi.dev/api/planets",
  vehicleBaseUrl: "https://swapi.dev/api/vehicles",
};

export default routes;
