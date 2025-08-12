import { atom } from "recoil";
import { ParkAvailabilitySlot } from "../api";

export const selectedSlotState = atom<ParkAvailabilitySlot | undefined>({
  key: "selectedSlot",
  default: undefined,
});
