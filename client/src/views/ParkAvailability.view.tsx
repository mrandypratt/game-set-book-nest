import { useEffect, useState } from "react";
import {
  SlotCard,
  BookingModal,
  DatePicker,
  DurationPicker,
  Navbar,
} from "../components";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  bookingDurationState,
  parkAvailabilityState,
  searchDateState,
  selectedParkState,
} from "../recoil";
import "../styles/ParkAvailability.css";
import { apiClient } from "../api";

export const ParkAvailabilityView = () => {
  const searchDate = useRecoilValue(searchDateState);
  const [parkAvailability, setParkAvailability] = useRecoilState(
    parkAvailabilityState
  );
  const bookingDuration = useRecoilValue(bookingDurationState);

  const selectedPark = useRecoilValue(selectedParkState);
  const [displayConfirmBookingModal, setDisplayConfirmBookingModal] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParkAvailability = async () => {
      try {
        if (!selectedPark) return;
        const response =
          await apiClient.booking.bookingControllerGetParkAvailabilityByDate(
            selectedPark.id,
            searchDate.format("YYYY-MM-DD") ?? "",
            bookingDuration.minutes
          );

        const { data: fetchedParkAvailability, status } = response;
        if (status !== 200) {
          throw new Error("Failed to fetch park availability");
        }

        setParkAvailability(fetchedParkAvailability);
        setLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        setLoading(false);
      }
    };

    fetchParkAvailability();
  }, [selectedPark, searchDate, bookingDuration]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-content-container">
        <div className="availability-search-container">
          <DatePicker />
          <DurationPicker />
        </div>
        {parkAvailability &&
        parkAvailability.slots &&
        parkAvailability.slots.length ? (
          parkAvailability?.slots.map((slot, index) => (
            <SlotCard
              key={index}
              slot={slot}
              setDisplayConfirmBookingModal={setDisplayConfirmBookingModal}
            />
          ))
        ) : (
          <div>
            <hr></hr>
            <h2>No slots available</h2>
          </div>
        )}
      </div>
      {displayConfirmBookingModal && (
        <BookingModal
          setDisplayConfirmBookingModal={setDisplayConfirmBookingModal}
        />
      )}
      {displayConfirmBookingModal && <div className="blur-bg"></div>}
    </div>
  );
};
