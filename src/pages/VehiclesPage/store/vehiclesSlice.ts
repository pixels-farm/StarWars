import {
  AnyAction,
  createEntityAdapter,
  createSlice,
  ThunkAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import EntityStateWithAuxiliaryData from "../../../type/EntityStateWithAuxiliaryData";
import iVehicle from "../../../interface/iVehicle";
import { external } from "../../../routing";

export type VehiclesState = EntityStateWithAuxiliaryData<iVehicle>;
export type RootStateWithVehicles = RootState & {
  vehicles: VehiclesState;
};

const vehiclesAdapter = createEntityAdapter<iVehicle>({
  selectId: (e) => e.name,
});
const emptyInitialState: VehiclesState = {
  ...vehiclesAdapter.getInitialState(),
  next: null,
  previous: null,
  finished: false,
  total: null,
  loading: false,
  priscine: true,
};

const initialState = vehiclesAdapter.upsertMany(emptyInitialState, []);

export const load =
  (): ThunkAction<void, RootStateWithVehicles, unknown, AnyAction> =>
  async (dispatch, getState) => {
    const { next } = getState().vehicles;
    const vehicles = selectAll(getState());

    dispatch(setLoading(true));

    let url = next || `${external.vehicleBaseUrl}?page=1`;

    fetch(url, { cache: "force-cache" })
      .then((response) => {
        if (response.status !== 200) throw new Error();
        return response.json();
      })
      .then((data) => {
        const newDataSet = [...vehicles, ...data.results];

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
  vehiclesAdapter.getSelectors(
    ({ vehicles }: { vehicles: VehiclesState }) => vehicles
  );

export const selectTotal = ({ vehicles }: { vehicles: VehiclesState }) =>
  vehicles.total;
export const selectLoading = ({ vehicles }: { vehicles: VehiclesState }) =>
  vehicles.loading;
export const selectAuxiliaryData = ({
  vehicles,
}: {
  vehicles: VehiclesState;
}) => ({
  finished: vehicles.finished,
  next: vehicles.next,
  previous: vehicles.previous,
  priscine: vehicles.priscine,
  loading: vehicles.loading,
  total: vehicles.total,
});

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    reset: () => initialState,
    setAll: vehiclesAdapter.setAll,
    addOne: vehiclesAdapter.addOne,
    addMany: vehiclesAdapter.addMany,
    removeOne: vehiclesAdapter.removeOne,
    removeMany: vehiclesAdapter.removeMany,
    updateOne: vehiclesAdapter.updateOne,
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
} = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
