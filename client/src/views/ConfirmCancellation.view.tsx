import { useEffect, useState } from "react";
import { Navbar } from "../components";
import { useSearchParams } from "react-router-dom";
import { apiClient, BookingConfirmationDto } from "../api";
import { DateTime } from "luxon";
import { BookingStatus } from "@gamesetbook/shared";

export const ConfirmCancellationView = () => {
  const [searchParams] = useSearchParams();

  const [cancellationConfirmation, setCancellationConfirmation] =
    useState<BookingConfirmationDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmCancellation = async () => {
      try {
        const bookingId = searchParams.get("bookingId");
        const email = searchParams.get("email");

        if (!bookingId || !email) {
          console.error(`Missing booking ID: ${bookingId} or email: ${email}`);
          throw new Error("Missing booking ID or email");
        }

        const response =
          await apiClient.booking.bookingControllerConfirmCancellation({
            bookingId,
            email,
          });

        const { data: booking, status } = response;

        if (status !== 201 || !booking) {
          console.error(response);
          throw new Error("Failed to cancel booking");
        }

        setCancellationConfirmation(booking);
        setLoading(false);
      } catch (err: unknown) {
        setLoading(false);
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    confirmCancellation();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error || !cancellationConfirmation) return <p>Error: {error}</p>;

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content-container">
        <h1>Booking Cancelled</h1>
        <table className="booking-details-table">
          <thead className="booking-details-header">
            <th className="booking-details-table-header" colSpan={2}>
              Details
            </th>
          </thead>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Confirmation #</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.id}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Status</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.status === BookingStatus.Cancelled
                ? "Cancelled"
                : "Pending"}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Email</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.userEmail}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Park</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.parkName} - Court{" "}
              {cancellationConfirmation.courtNumber}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Park Address</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.fullParkAddress}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">Date/Time</td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.start
                ? DateTime.fromISO(cancellationConfirmation.start)
                    .setZone(cancellationConfirmation.timezone)
                    .toFormat("MMM d, yyyy h:mma")
                : "Date Error"}
            </td>
          </tr>
          <tr className="booking-details-table-row">
            <td className="booking-details-table-data-title">
              Duration in Minutes
            </td>
            <td className="booking-details-table-data-info">
              {cancellationConfirmation.duration
                ? cancellationConfirmation.duration
                : "Date Error"}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};
