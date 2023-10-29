import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import EntityStateWithAuxiliaryData from "../../../type/EntityStateWithAuxiliaryData";
import iCharacter from "../../../interface/iCharacter";
import { external } from "../../../routing";

export type CharactersState = EntityStateWithAuxiliaryData<iCharacter>;
export type RootStateWithCharacters = RootState & {
  characters: CharactersState;
};

const charactersAdapter = createEntityAdapter<iCharacter>({
  selectId: (e) => e.name,
});
const emptyInitialState: CharactersState = {
  ...charactersAdapter.getInitialState(),
  next: null,
  previous: null,
  finished: false,
  total: null,
  loading: false,
  priscine: true,
};

const initialState = charactersAdapter.upsertMany(emptyInitialState, []);

export const load =
  (): ThunkAction<void, RootStateWithCharacters, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { next } = getState().characters;
    const characters = selectAll(getState());

    dispatch(setLoading(true));

    let url = next || `${external.peopleBaseUrl}?page=1`;

    fetch(url, { cache: "force-cache" })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then((data) => {
        const newDataSet = [...characters, ...data.results];

        dispatch(setAll(newDataSet));
        dispatch(setTotal(data.count));
        dispatch(setNext(data.next));
        dispatch(setPrevious(data.previous));
        dispatch(setFinished(newDataSet.length === data.count));
      })
      .catch((e) => {
        dispatch(setAll([]));
        console.error(e);
      })
      .finally(() => {
        dispatch(setLoading(false));
        dispatch(setPriscine(false));
      });
  };

export const { selectAll, selectIds, selectById } =
  charactersAdapter.getSelectors(
    ({ characters }: { characters: CharactersState }) => characters
  );

export const selectTotal = ({ characters }: { characters: CharactersState }) =>
  characters.total;
export const selectLoading = ({
  characters,
}: {
  characters: CharactersState;
}) => characters.loading;
export const selectAuxiliaryData = ({
  characters,
}: {
  characters: CharactersState;
}) => ({
  finished: characters.finished,
  next: characters.next,
  previous: characters.previous,
  priscine: characters.priscine,
  loading: characters.loading,
  total: characters.total,
});

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    reset: () => initialState,
    setAll: charactersAdapter.setAll,
    addOne: charactersAdapter.addOne,
    addMany: charactersAdapter.addMany,
    removeOne: charactersAdapter.removeOne,
    removeMany: charactersAdapter.removeMany,
    updateOne: charactersAdapter.updateOne,
    setPriscine: (state, { payload }) => {
      state.priscine = payload;
    },
    setNext: (state, { payload }) => {
      state.next = payload;
    },
    setPrevious: (state, { payload }) => {
      state.previous = payload;
    },
    setFinished: (state, { payload }) => {
      state.finished = payload;
    },
    setTotal: (state, { payload }) => {
      state.total = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const {
  reset,
  setAll,
  addOne,
  addMany,
  removeOne,
  removeMany,
  updateOne,
  setTotal,
  setLoading,
  setPrevious,
  setFinished,
  setPriscine,
  setNext,
} = charactersSlice.actions;

export default charactersSlice.reducer;
