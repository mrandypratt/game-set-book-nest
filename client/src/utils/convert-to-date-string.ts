/**
 *
 * @param date
 * @returns Date String (MM-DD-YYYY)
 * @description Accepts a JS Date Object and converts to local
 * user's timezone and returns a string in the format MM/DD/YYYY
 */
export const convertToDateString = (date: Date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};
