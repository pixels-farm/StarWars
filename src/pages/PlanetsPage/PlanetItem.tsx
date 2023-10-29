import iPlanet from "../../interface/iPlanet";
import routes from "../../routing";
import { getIdFromRoute } from "../../utils";
import ListItemCustomized, {
  ListItemCustomizedProps,
} from "../../components/ListItemCustomized";
import { faPlanetRinged } from "@fortawesome/pro-duotone-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  planet: iPlanet;
  mode?: ListItemCustomizedProps["mode"];
};

const PlanetItem = ({ planet, mode = "list-item" }: Props) => (
  <ListItemCustomized
    mode={mode}
    icon={faPlanetRinged as IconProp}
    location={routes.planets.view.replace(
      ":id",
      getIdFromRoute(planet.url).toString()
    )}
  >
    {planet.name}
  </ListItemCustomized>
);

export default PlanetItem;
