import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent } from "react";

interface SearchBarProps {
  setSearchValue: (value: string) => void;
}

export const SearchBar = ({ setSearchValue }: SearchBarProps) => {
  const updateSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "50%",
        minWidth: "250px",
        maxWidth: "400px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Parks"
        inputProps={{ "aria-label": "search parks" }}
        onChange={updateSearchValue}
      />
    </Paper>
  );
};
