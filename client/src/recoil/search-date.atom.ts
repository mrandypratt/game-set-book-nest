import dayjs, { Dayjs } from "dayjs";
import { atom } from "recoil";

export const searchDateState = atom<Dayjs>({
  key: "searchDate",
  default: dayjs(),
});
