import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
// import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ParkAvailabilitySlot } from "../api";
import {
  parkAvailabilityState,
  selectedCourtState,
  selectedSlotState,
} from "../recoil";
import { convertStringToDisplayTime } from "../utils";
import { BOOKING_DURATIONS_DISPLAY, Timezone } from "@gamesetbook/shared";

type SlotCardProps = {
  slot: ParkAvailabilitySlot;
  setDisplayConfirmBookingModal: (value: boolean) => void;
};

export const SlotCard = ({
  slot,
  setDisplayConfirmBookingModal,
}: SlotCardProps) => {
  const parkAvailability = useRecoilValue(parkAvailabilityState);
  const setSelectedSlot = useSetRecoilState(selectedSlotState);
  const setSelectedCourt = useSetRecoilState(selectedCourtState);

  return (
    <Card
      sx={{
        width: "50%",
        minWidth: "250px",
        maxWidth: "400px",
        margin: "10px",
      }}
      onClick={() => {
        setSelectedSlot(slot);
        setSelectedCourt(slot.courts[0]);
        setDisplayConfirmBookingModal(true);
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {`${convertStringToDisplayTime(
            slot.start,
            parkAvailability?.timezone as Timezone
          )} - ${convertStringToDisplayTime(
            slot.end,
            parkAvailability?.timezone as Timezone
          )}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {
            BOOKING_DURATIONS_DISPLAY.find(
              (d) => d.minutes === slot.duration.minutes
            )?.display
          }
        </Typography>
        <Typography variant="body2" color="text.secondary" component="div">
          {"Available Courts: " + slot.courts.length}
        </Typography>
      </CardContent>
    </Card>
  );
};
