import { atom } from "recoil";
import { CreateParkDto } from "../api";

export const createParkState = atom<CreateParkDto>({
  key: "CreatePark",
  default: {
    name: "Sevier Park",
    addressLine: "1000 Clayton Ave",
    city: "Nashville",
    state: "TN",
    zip: "37204",
    timezone: "America/Chicago",
    lighted: false,
    bathrooms: false,
    tennisClub: false,
    ballWall: false,
    tennisStore: false,
    fee: false,
    restricted: false,
    courts: [],
  },
});
