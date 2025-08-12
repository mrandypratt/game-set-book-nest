import { Timezone } from "@gamesetbook/shared";
import { DateTime } from "luxon";

export const convertStringToDisplayTime = (
  dateString?: string,
  timezone?: Timezone
): string => {
  if (!(dateString && timezone)) {
    console.error({ dateString, timezone });
    throw new Error(
      "convertStringToDisplayTime: Date String and Timezone are required"
    );
  }

  return DateTime.fromISO(dateString, { zone: timezone }).toLocaleString({
    hour: "numeric",
    minute: "numeric",
  });
};
export const convertDateToDisplayTime = (
  date?: Date,
  timezone?: Timezone
): string => {
  if (!(date && timezone)) {
    console.error({ date, timezone });
    throw new Error(
      "convertDateToDisplayTime: Date String and Timezone are required"
    );
  }

  return DateTime.fromJSDate(date, { zone: timezone }).toLocaleString({
    hour: "numeric",
    minute: "numeric",
  });
};

export const convertStringToDisplayDate = (
  dateString?: string,
  timezone?: Timezone
): string => {
  if (!(dateString && timezone)) {
    console.error({ dateString, timezone });
    throw new Error(
      "convertStringToDisplayDate: Date String and Timezone are required"
    );
  }

  return DateTime.fromISO(dateString, { zone: "utc" })
    .setZone(timezone as string)
    .toFormat("MMMM dd, yyyy");
};
