import { useEffect, useLayoutEffect, useState } from "react";
import withReducer from "../../store/withReducer";
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { load, selectAll, selectAuxiliaryData } from "./store/vehiclesSlice";
import VehicleItem from "./VehicleItem";
import iVehicle from "../../interface/iVehicle";
import PageLayout from "../PageLayout";
import { sortBy } from "../../utils";
import { LinearProgress, ListItemButton, ListItemText } from "@mui/material";
import NotFound from "../../components/NotFound";
import SearchInput from "../../components/SearchBar";

const bySearchValue =
  (query?: string) =>
  (item: iVehicle): boolean => {
    if (!query?.trim()) return true;
    return item.name.toLowerCase().includes(query.toString().toLowerCase());
  };

const VehiclesPage = () => {
  const dispatch = useAppDispatch();
  const vehicles = useAppSelector(selectAll);
  const { priscine, next, finished, total } =
    useAppSelector(selectAuxiliaryData);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (priscine || next) dispatch(load());
  }, [priscine, next, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = vehicles.filter(bySearchValue(search?.toString()));

  return (
    <PageLayout
      title={`Vehicles ${total ? `(${filtered.length}/${total})` : ""}`}
      appBar={
        <SearchInput
          style={{ height: 40 }}
          onChange={(val) => setSearch(val ? val.toString() : undefined)}
        />
      }
    >
      <>
        {!finished && (
          <ListItemButton>
            <ListItemText
              primary={`Loading ... ${
                total
                  ? +Math.round((filtered.length / total) * 100).toFixed(0)
                  : 0
              }%`}
              secondary={
                total && (
                  <LinearProgress
                    variant="determinate"
                    value={
                      +Math.round((filtered.length / total) * 100).toFixed(0)
                    }
                  />
                )
              }
            />
          </ListItemButton>
        )}
        {finished &&
          filtered
            .sort(sortBy<iVehicle>("name"))
            .map((vehicle) => (
              <VehicleItem key={vehicle.name} vehicle={vehicle} />
            ))}
        {finished && !vehicles.length && <NotFound subject="vehicles" />}
      </>
    </PageLayout>
  );
};

export default withReducer("vehicles", reducer)(VehiclesPage);
