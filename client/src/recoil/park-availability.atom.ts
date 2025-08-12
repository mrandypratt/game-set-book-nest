import { atom } from "recoil";
import { ParkAvailabilityDto } from "../api";

export const parkAvailabilityState = atom<ParkAvailabilityDto | undefined>({
  key: "parkAvailability",
  default: undefined,
});
