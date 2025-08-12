import { atom } from "recoil";
import {
  BOOKING_DURATIONS_DISPLAY,
  BookingDurationDisplay,
} from "@gamesetbook/shared";

export const bookingDurationState = atom<BookingDurationDisplay>({
  key: "bookingDuration",
  default: BOOKING_DURATIONS_DISPLAY[1],
});
