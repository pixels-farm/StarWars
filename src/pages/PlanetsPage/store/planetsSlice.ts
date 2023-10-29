import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import EntityStateWithAuxiliaryData from "../../../type/EntityStateWithAuxiliaryData";
import iPlanet from "../../../interface/iPlanet";
import { external } from "../../../routing";

export type PlanetsState = EntityStateWithAuxiliaryData<iPlanet>;
export type RootStateWithPlanets = RootState & {
  planets: PlanetsState;
};

const planetsAdapter = createEntityAdapter<iPlanet>({
  selectId: (e) => e.name,
});
const emptyInitialState: PlanetsState = {
  ...planetsAdapter.getInitialState(),
  next: null,
  previous: null,
  finished: false,
  total: null,
  loading: false,
  priscine: true,
};

const initialState = planetsAdapter.upsertMany(emptyInitialState, []);

export const load =
  (): ThunkAction<void, RootStateWithPlanets, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { next } = getState().planets;
    const planets = selectAll(getState());

    dispatch(setLoading(true));

    let url = next || `${external.planetBaseUrl}?page=1`;

    fetch(url, { cache: "force-cache" })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then((data) => {
        const newDataSet = [...planets, ...data.results];

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

export const { selectAll, selectIds, selectById } = planetsAdapter.getSelectors(
  ({ planets }: { planets: PlanetsState }) => planets
);

export const selectTotal = ({ planets }: { planets: PlanetsState }) =>
  planets.total;
export const selectLoading = ({ planets }: { planets: PlanetsState }) =>
  planets.loading;
export const selectAuxiliaryData = ({
  planets,
}: {
  planets: PlanetsState;
}) => ({
  finished: planets.finished,
  next: planets.next,
  previous: planets.previous,
  priscine: planets.priscine,
  loading: planets.loading,
  total: planets.total,
});

const planetsSlice = createSlice({
  name: "planets",
  initialState,
  reducers: {
    reset: () => initialState,
    setAll: planetsAdapter.setAll,
    addOne: planetsAdapter.addOne,
    addMany: planetsAdapter.addMany,
    removeOne: planetsAdapter.removeOne,
    removeMany: planetsAdapter.removeMany,
    updateOne: planetsAdapter.updateOne,
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
} = planetsSlice.actions;

export default planetsSlice.reducer;
