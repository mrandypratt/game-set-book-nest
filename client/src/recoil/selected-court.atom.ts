import { atom } from "recoil";
import { CourtDto } from "../api";

export const selectedCourtState = atom<CourtDto | undefined>({
  key: "selectedCourt",
  default: undefined,
});
