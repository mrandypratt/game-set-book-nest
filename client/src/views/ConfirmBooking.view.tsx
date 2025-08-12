import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useSearchParams } from "react-router-dom";
import { apiClient, BookingConfirmationDto } from "../api";
import { DateTime } from "luxon";
import { BookingStatus } from "@gamesetbook/shared";

export const ConfirmBookingView = () => {
  const [searchParams] = useSearchParams();

  const [bookingConfirmation, setBookingConfirmation] =
    useState<BookingConfirmationDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmBooking = async () => {
      try {
        const bookingId = searchParams.get("bookingId");
        const email = searchParams.get("email");

        if (!bookingId || !email) {
          console.error(`Missing booking ID: ${bookingId} or email: ${email}`);
          throw new Error("Missing booking ID or email");
        }

        const response =
          await apiClient.booking.bookingControllerConfirmBooking({
            bookingId,
            email,
          });

        const { data: booking, status } = response;

        if (status !== 201 || !booking) {
          console.error(response);
          throw new Error("Failed to confirm booking");
        }

        setBookingConfirmation(booking);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    confirmBooking();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error || !bookingConfirmation) return <p>Error: {error}</p>;

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content-container">
        <h1>Booking Confirmed</h1>
        <table className="booking-details-table">
          <thead className="booking-details-header">
            <th className="booking-details-table-header" colSpan={2}>
              Details
            </th>
          </thead>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Confirmation #</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.id}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Status</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.status === BookingStatus.Confirmed
                ? "Confirmed"
                : "Pending"}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Email</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.userEmail}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Park</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.parkName} - Court{" "}
              {bookingConfirmation.courtNumber}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Park Address</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.fullParkAddress}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Date/Time</td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.start
                ? DateTime.fromISO(bookingConfirmation.start)
                    .setZone(bookingConfirmation.timezone)
                    .toFormat("MMM d, yyyy h:mma")
                : "Date Error"}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">
              Duration in Minutes
            </td>
            <td className="booking-details-table-data-info">
              {bookingConfirmation.duration
                ? bookingConfirmation.duration
                : "Date Error"}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
