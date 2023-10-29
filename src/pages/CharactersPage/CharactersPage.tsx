import { useEffect, useLayoutEffect, useState } from "react";
import withReducer from "../../store/withReducer";
import reducer from "./store";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { load, selectAll, selectAuxiliaryData } from "./store/charactersSlice";
import CharacterItem from "./CharacterItem";
import iCharacter from "../../interface/iCharacter";
import PageLayout from "../PageLayout";
import { sortBy } from "../../utils";
import { LinearProgress, ListItemButton, ListItemText } from "@mui/material";
import NotFound from "../../components/NotFound";
import SearchInput from "../../components/SearchBar";

const bySearchValue =
  (query?: string) =>
  (item: iCharacter): boolean => {
    if (!query?.trim()) return true;
    return item.name.toLowerCase().includes(query.toString().toLowerCase());
  };

const CharactersPage = () => {
  const dispatch = useAppDispatch();
  const characters = useAppSelector(selectAll);
  const { priscine, next, finished, total } =
    useAppSelector(selectAuxiliaryData);
  const [search, setSearch] = useState<string>();

  useEffect(() => {
    if (priscine || next) dispatch(load());
  }, [priscine, next, dispatch]);

  const filtered = characters.filter(bySearchValue(search?.toString()));

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageLayout
      title={`Characters ${total ? `(${filtered.length}/${total})` : ""}`}
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
            .sort(sortBy<iCharacter>("name"))
            .map((character) => (
              <CharacterItem key={character.name} character={character} />
            ))}
        {finished && !characters.length && <NotFound subject="characters" />}
      </>
    </PageLayout>
  );
};

export default withReducer("characters", reducer)(CharactersPage);
