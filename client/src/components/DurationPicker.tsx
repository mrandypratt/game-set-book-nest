import { useState } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useRecoilState } from "recoil";
import { bookingDurationState } from "../recoil";
import { BOOKING_DURATIONS_DISPLAY } from "@gamesetbook/shared";

export const DurationPicker = () => {
  const [bookingDuration, setBookingDuration] =
    useRecoilState(bookingDurationState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setBookingDuration(BOOKING_DURATIONS_DISPLAY[index]);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="duration-picker">
      <List
        component="nav"
        aria-label="Device settings"
        sx={{
          bgcolor: "background.paper",
          border: "1px solid #000000",
          width: "175px",
          borderRadius: "5px",
          color: "black",
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={bookingDuration?.display} />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {BOOKING_DURATIONS_DISPLAY.map((duration, index) => (
          <MenuItem
            key={duration.display}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {duration.display}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
