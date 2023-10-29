import iVehicle from "../../interface/iVehicle";
import routes from "../../routing";
import { getIdFromRoute } from "../../utils";
import ListItemCustomized, {
  ListItemCustomizedProps,
} from "../../components/ListItemCustomized";
import { faSpaceShuttle } from "@fortawesome/pro-duotone-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Props = {
  vehicle: iVehicle;
  mode?: ListItemCustomizedProps["mode"];
};

const VehicleItem = ({ vehicle, mode }: Props) => (
  <ListItemCustomized
    mode={mode}
    icon={faSpaceShuttle as IconProp}
    location={routes.vehicles.view.replace(
      ":id",
      getIdFromRoute(vehicle.url).toString()
    )}
  >
    {vehicle.name}
  </ListItemCustomized>
);

export default VehicleItem;
