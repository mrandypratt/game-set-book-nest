import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRecoilState } from "recoil";
import { createParkState } from "../recoil";
import { ChangeEvent, FormEvent } from "react";
import { apiClient, CreateCourtDto } from "../api";
import {
  CourtConfiguration,
  CourtType,
  Timezone,
  TIMEZONES,
  US_STATES,
} from "@gamesetbook/shared";
import { Navbar } from "../components";

const theme = createTheme();

export const CreateParkView = () => {
  const [parkData, setParkData] = useRecoilState(createParkState);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setParkData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleStateSelection = (e: SelectChangeEvent) => {
    setParkData((prev) => ({
      ...prev,
      state: e.target.value,
    }));
  };

  const handleTimezoneSelection = (e: SelectChangeEvent) => {
    setParkData((prev) => ({
      ...prev,
      timezone: e.target.value as Timezone,
    }));
  };

  const handleAddCourt = () => {
    setParkData((prev) => {
      const newCourt: CreateCourtDto = {
        courtNumber: prev.courts?.length ? prev.courts.length + 1 : 1,
        type: CourtType.Tennis,
        configuration: CourtConfiguration.TennisOnly,
        timezone: "America/Chicago",
      };

      return {
        ...prev,
        courts: prev.courts ? [...prev.courts, newCourt] : [newCourt],
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await apiClient.park.parkControllerCreatePark(parkData);
      const { data: createdPark, status } = response;
      if (status !== 201 || !createdPark) {
        throw new Error(
          `Failed to create park. Response: ${JSON.stringify(response)}`
        );
      }
      <Alert severity="success">Park created successfully.</Alert>;
    } catch (error) {
      console.error("Error creating park:", error);
      <Alert severity="error">Error creating park.</Alert>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Card sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
        <CardHeader title="Park Courts Information" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid>
                <Typography variant="h5" gutterBottom={true}>
                  Park Information
                </Typography>
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Park Name"
                  name="name"
                  value={parkData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid>
                <TextField
                  fullWidth
                  label="Address Line"
                  name="addressLine"
                  value={parkData.addressLine}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={parkData.city}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    name="state"
                    value={parkData.state}
                    onChange={handleStateSelection}
                    required
                  >
                    {Object.values(US_STATES).map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="ZIP Code"
                  name="zip"
                  value={parkData.zip}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid>
                <FormControl fullWidth>
                  <Select
                    fullWidth
                    name="timezone"
                    value={parkData.timezone}
                    onChange={handleTimezoneSelection}
                    required
                  >
                    {Object.values(TIMEZONES).map((timezone) => (
                      <MenuItem key={timezone} value={timezone}>
                        {timezone}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid>
                <Typography variant="h5" gutterBottom={true}>
                  Amenities
                </Typography>
              </Grid>
              <Grid container spacing={3}>
                <FormGroup>
                  <FormControlLabel
                    key="lighted"
                    control={
                      <Checkbox
                        checked={parkData.lighted}
                        onChange={handleInputChange}
                        name="lighted"
                      />
                    }
                    label="Lighted"
                  />
                  <FormControlLabel
                    key="bathrooms"
                    control={
                      <Checkbox
                        checked={parkData.bathrooms}
                        onChange={handleInputChange}
                        name="bathrooms"
                      />
                    }
                    label="Bathrooms"
                  />
                  <FormControlLabel
                    key="tennisClub"
                    control={
                      <Checkbox
                        checked={parkData.tennisClub}
                        onChange={handleInputChange}
                        name="tennisClub"
                      />
                    }
                    label="Tennis Club"
                  />
                  <FormControlLabel
                    key="ballWall"
                    control={
                      <Checkbox
                        checked={parkData.ballWall}
                        onChange={handleInputChange}
                        name="ballWall"
                      />
                    }
                    label="Ball Wall"
                  />
                  <FormControlLabel
                    key="tennisStore"
                    control={
                      <Checkbox
                        checked={parkData.tennisStore}
                        onChange={handleInputChange}
                        name="tennisStore"
                      />
                    }
                    label="Tennis Store"
                  />
                  <FormControlLabel
                    key="fee"
                    control={
                      <Checkbox
                        checked={parkData.fee}
                        onChange={handleInputChange}
                        name="fee"
                      />
                    }
                    label="Fee"
                  />
                  <FormControlLabel
                    key="restricted"
                    control={
                      <Checkbox
                        checked={parkData.restricted}
                        onChange={handleInputChange}
                        name="restricted"
                      />
                    }
                    label="Restricted"
                  />
                </FormGroup>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Grid>
                <Typography variant="h5" gutterBottom={true}>
                  Court Information
                </Typography>
              </Grid>
              {parkData.courts?.map((court) => (
                <Grid container key={court.courtNumber}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">
                        Court {court.courtNumber}
                      </Typography>
                      {/* <RadioGroup
                        row
                        aria-label="court-type"
                        name="court-type"
                        onChange={handleCourtTypeChange}
                      >
                        <FormControlLabel control={<Radio />} label="Tennis" />
                        <FormControlLabel
                          control={<Radio />}
                          label="Pickleball"
                        />
                        <FormControlLabel
                          control={<Radio />}
                          label="Tennis & Pickleball"
                        />
                      </RadioGroup> */}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleAddCourt}
                >
                  Add Court
                </Button>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={3}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "100%" }}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
