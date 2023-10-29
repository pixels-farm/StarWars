import { useEffect, useLayoutEffect, useState } from "react";
import withReducer from "../../store/withReducer";
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { load, selectAll, selectAuxiliaryData } from "./store/planetsSlice";
import PlanetItem from "./PlanetItem";
import iPlanet from "../../interface/iPlanet";
import PageLayout from "../PageLayout";
import { sortBy } from "../../utils";
import { LinearProgress, ListItemButton, ListItemText } from "@mui/material";
import NotFound from "../../components/NotFound";
import SearchInput from "../../components/SearchBar";

const bySearchValue =
  (query?: string) =>
  (item: iPlanet): boolean => {
    if (!query?.trim()) return true;
    return item.name.toLowerCase().includes(query.toString().toLowerCase());
  };

const PlanetsPage = () => {
  const dispatch = useAppDispatch();
  const planets = useAppSelector(selectAll);
  const { priscine, next, finished, total } =
    useAppSelector(selectAuxiliaryData);
  const [search, setSearch] = useState<string>();

  const filtered = planets.filter(bySearchValue(search?.toString()));

  useEffect(() => {
    if (priscine || next) dispatch(load());
  }, [priscine, next, dispatch]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      title={`Planets ${total ? `(${filtered.length}/${total})` : ""}`}
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
            .sort(sortBy<iPlanet>("name"))
            .map((planet) => <PlanetItem key={planet.name} planet={planet} />)}
        {finished && !planets.length && <NotFound subject="planets" />}
      </>
    </PageLayout>
  );
};

export default withReducer("planets", reducer)(PlanetsPage);
