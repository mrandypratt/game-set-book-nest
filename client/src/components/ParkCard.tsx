import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { ParkDto } from "../api";
import { selectedParkState } from "../recoil";
import { AppRoutes } from "../constants/app-routes";

type ParkCardProps = {
  park: ParkDto;
};

export const ParkCard = ({ park }: ParkCardProps) => {
  const setSelectedPark = useSetRecoilState(selectedParkState);
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "50%",
        minWidth: "250px",
        maxWidth: "400px",
        margin: "10px",
      }}
      onClick={() => {
        setSelectedPark(park);
        navigate(`${AppRoutes.ParkAvailability}`);
      }}
    >
      <CardContent className="park-card-container">
        <Typography gutterBottom variant="h5" component="div">
          {park.name}
        </Typography>
        <div className="park-info-container">
          <Typography variant="body2" color="text.secondary" component="div">
            {park.addressLine +
              ", " +
              park.city +
              ", " +
              park.state +
              " " +
              park.zip}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="div">
            {"Courts: " + park.courts?.length}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};
