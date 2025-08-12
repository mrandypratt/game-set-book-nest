import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker as DatePickerComponent } from "@mui/x-date-pickers/DatePicker";
import { useRecoilState } from "recoil";
import { searchDateState } from "../recoil";
import dayjs, { Dayjs } from "dayjs";

export const DatePicker = () => {
  const [searchDate, setSearchDate] = useRecoilState(searchDateState);

  const setSelectedDate = (newValue: Dayjs | null) => {
    const searchDate = newValue ?? dayjs();
    setSearchDate(searchDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePickerComponent
        label="Select a Date"
        value={searchDate}
        onChange={(newValue) => setSelectedDate(newValue)}
        sx={{ margin: "10px" }}
      />
    </LocalizationProvider>
  );
};
