/**
 * The list of timezones supported by the app.
 */
export enum Timezone {
  NEW_YORK = "America/New_York",
  CHICAGO = "America/Chicago",
  DENVER = "America/Denver",
  PHOENIX = "America/Phoenix",
  LOS_ANGELES = "America/Los_Angeles",
  INDIANAPOLIS = "America/Indiana/Indianapolis",
  KNOX = "America/Indiana/Knox",
  WINAMAC = "America/Indiana/Winamac",
  LOUISVILLE = "America/Kentucky/Louisville",
  MONTICELLO = "America/Kentucky/Monticello",
  DETROIT = "America/Detroit",
  CENTER = "America/North_Dakota/Center",
  NEW_SALEM = "America/North_Dakota/New_Salem",
  BEULAH = "America/North_Dakota/Beulah",
}

/**
 * The list of timezones supported by the app.
 */
export const TIMEZONES = Object.values(Timezone);
