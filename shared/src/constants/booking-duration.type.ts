/**
 * BookingDurations is a list of available booking durations in minutes.
 */
export type BookingDurationMinutes = 30 | 60 | 90 | 120;

/**
 * BookingDurations is a list of available booking durations in minutes.
 */
export const BookingDurations: BookingDurationMinutes[] = [30, 60, 90, 120];

/**
 * BookingDurationDisplay defines a booking duration in minutes with a display
 * string.
 */
export interface BookingDurationDisplay {
  minutes: BookingDurationMinutes;
  display: string;
}

/**
 * BOOKING_DURATIONS_DISPLAY is a list of available booking durations in minutes
 * with a display string.
 */
export const BOOKING_DURATIONS_DISPLAY: BookingDurationDisplay[] = [
  // { minutes: 15, display: '15 minutes' },
  { minutes: 30, display: "30 minutes" },
  // { minutes: 45, display: '45 minutes' },
  { minutes: 60, display: "1 hour" },
  // { minutes: 75, display: '1 hour 15 minutes' },
  { minutes: 90, display: "1 hour 30 minutes" },
  // { minutes: 105, display: '1 hour 45 minutes' },
  { minutes: 120, display: "2 hours" },
];
