import { EntityState } from "@reduxjs/toolkit";
import { AuxiliaryData } from "./AuxiliaryData";

export type EntityStateWithAuxiliaryData<T> = EntityState<T> & AuxiliaryData;
export default EntityStateWithAuxiliaryData;
