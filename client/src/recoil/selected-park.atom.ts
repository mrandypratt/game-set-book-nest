import { atom } from "recoil";
import { ParkDto } from "../api";

export const selectedParkState = atom<ParkDto | undefined>({
  key: "selectedPark",
  default: undefined,
});
