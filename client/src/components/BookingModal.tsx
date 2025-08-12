import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { useRecoilValue } from "recoil";
import {
  selectedCourtState,
  selectedParkState,
  selectedSlotState,
} from "../recoil";
import {
  convertStringToDisplayDate,
  convertStringToDisplayTime,
} from "../utils";
import { Link } from "react-router-dom";
import "../styles/Modal.css";
import TextField from "@mui/material/TextField/TextField";
import { AppRoutes } from "../constants/app-routes";
import { apiClient, RequestBookingDto } from "../api";
import { Timezone } from "@gamesetbook/shared";

enum ModalState {
  Review = "review",
  Loading = "loading",
  Complete = "complete",
  Error = "error",
}

interface BookingModalProps {
  setDisplayConfirmBookingModal: (value: boolean) => void;
}

export const BookingModal = ({
  setDisplayConfirmBookingModal,
}: BookingModalProps): JSX.Element => {
  const selectedPark = useRecoilValue(selectedParkState);
  const selectedCourt = useRecoilValue(selectedCourtState);
  const selectedSlot = useRecoilValue(selectedSlotState);

  const [modalState, setModalState] = useState<ModalState>(ModalState.Review);
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);

  async function handleBookingRequest() {
    setModalState(ModalState.Loading);

    try {
      const bookingRequest: RequestBookingDto = {
        parkId: selectedPark!.id,
        courtId: selectedCourt!.id,
        email: emailAddress,
        start: selectedSlot!.start,
        end: selectedSlot!.end,
        duration: selectedSlot!.duration.minutes,
        timezone: selectedCourt!.timezone,
      };

      const response = await apiClient.booking.bookingControllerRequestBooking(
        bookingRequest
      );

      const { data: bookingConfirmation, status } = response;

      if (status !== 201 || !bookingConfirmation) {
        throw new Error(JSON.stringify(response));
      }
      setModalState(ModalState.Complete);
    } catch (error) {
      console.error("Failed to confirm booking", error);
      setModalState(ModalState.Error);
    }
  }

  function updateEmailAddress(event: React.ChangeEvent<HTMLInputElement>) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setEmailAddress(event.target.value);
    setValidEmail(emailRegex.test(event.target.value));
  }

  if (modalState === ModalState.Review) {
    return (
      <div className="modal-container">
        <div
          className="close-modal-icon-container"
          onClick={() => setDisplayConfirmBookingModal(false)}
        >
          <CloseRoundedIcon className="close-modal-icon" />
        </div>

        <table className="booking-details-table">
          <thead className="booking-details-header">
            <tr>
              <th className="booking-details-table-header" colSpan={2}>
                Booking Details
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Park Name</td>
              <td className="booking-details-table-data-info">
                {selectedPark?.name}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Court #</td>
              <td className="booking-details-table-data-info">
                {selectedCourt?.courtNumber}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Address</td>
              <td className="booking-details-table-data-info">
                {selectedPark?.addressLine}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title"></td>
              <td className="booking-details-table-data-info">
                {selectedPark?.city +
                  ", " +
                  selectedPark?.state +
                  " " +
                  selectedPark?.zip}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Date</td>
              <td className="booking-details-table-data-info">
                {convertStringToDisplayDate(
                  selectedSlot?.start,
                  selectedPark?.timezone as Timezone
                )}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Start Time</td>
              <td className="booking-details-table-data-info">
                {selectedSlot?.start
                  ? convertStringToDisplayTime(
                      selectedSlot.start,
                      selectedPark?.timezone as Timezone
                    )
                  : "Date Error"}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">End Time</td>
              <td className="booking-details-table-data-info">
                {selectedSlot?.end
                  ? convertStringToDisplayTime(
                      selectedSlot.end,
                      selectedPark?.timezone as Timezone
                    )
                  : "Date Error"}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Duration</td>
              <td className="booking-details-table-data-info">
                {selectedSlot?.duration
                  ? selectedSlot.duration.display
                  : "Date Error"}
              </td>
            </tr>
            <tr className="booking-details-table-row">
              <td className="booking-details-table-data-title">Total Due</td>
              <td className="booking-details-table-data-info">
                $0.00 {/** TODO: Add Pricing */}
              </td>
            </tr>
          </tbody>
        </table>

        <TextField
          onChange={updateEmailAddress}
          required
          id="outlined-required"
          label={"Email Address"}
          helperText={
            !validEmail
              ? "Invalid Email, please enter valid email address"
              : "Enter your email address to confirm booking"
          }
          sx={{ minWidth: "250px", maxWidth: "300px", margin: "10px" }}
        />

        <div className="booking-button-container">
          <button
            className="confirm-booking-button"
            onClick={handleBookingRequest}
            disabled={!validEmail}
          >
            Book Now!
          </button>
        </div>

        <p className="booking-helper-text">
          After clicking "Book Now", you will receive an email with a link to
          confirm booking. This link will be valid for 10 minutes.
        </p>
      </div>
    );
  }

  if (modalState === ModalState.Loading) {
    return (
      <div className="modal-container">
        <div
          className="close-modal-icon-container"
          onClick={() => setDisplayConfirmBookingModal(false)}
        >
          <CloseRoundedIcon className="close-modal-icon" />
        </div>

        <div className="feedback-header-bg">
          <h1 className="feedback-header">
            <b>Confirm Booking</b>
          </h1>
        </div>

        <h3 className="feedback-results-text">Submitting Booking Request...</h3>

        <CircularProgress />
      </div>
    );
  }

  if (modalState === ModalState.Complete) {
    return (
      <div className="modal-container">
        <Link to={AppRoutes.SearchParks}>
          <div className="close-modal-icon-container">
            <CloseRoundedIcon className="close-modal-icon" />
          </div>
        </Link>

        <div className="feedback-header-bg">
          <h1 className="feedback-header">
            <b>Verification Email Sent</b>
          </h1>
        </div>

        <p className="feedback-helper-text">
          Please check your email and click confirm to complete your booking.
          Your booking will be held for 10 minutes.
        </p>
      </div>
    );
  }

  if (modalState === ModalState.Error) {
    return (
      <div className="modal-container">
        <Link to={AppRoutes.SearchParks}>
          <div className="close-modal-icon-container">
            <CloseRoundedIcon className="close-modal-icon" />
          </div>
        </Link>

        <div className="feedback-header-bg">
          <h1 className="feedback-header">
            <b>Your booking request failed</b>
          </h1>
        </div>

        <p className="feedback-helper-text">
          The slot you are viewing may have been booked by another user. Please
          try again.
        </p>
      </div>
    );
  }

  return <h1>Error: Incorrect Feedback Data Type</h1>;
};
