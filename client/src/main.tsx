import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppRoutes } from "./constants/app-routes.ts";
import {
  ConfirmBookingView,
  CreateParkView,
  ErrorView,
  ParkAvailabilityView,
  SearchParksView,
} from "./views";
import "./styles/App.css";
import { ConfirmCancellationView } from "./views/ConfirmCancellation.view.tsx";

const router = createBrowserRouter([
  {
    path: AppRoutes.SearchParks,
    element: <SearchParksView />,
    errorElement: <ErrorView />,
  },
  {
    path: AppRoutes.ParkAvailability,
    element: <ParkAvailabilityView />,
    errorElement: <ErrorView />,
  },
  {
    path: AppRoutes.CreatePark,
    element: <CreateParkView />,
    errorElement: <ErrorView />,
  },
  {
    path: AppRoutes.ConfirmBooking,
    element: <ConfirmBookingView />,
    errorElement: <ErrorView />,
  },
  {
    path: AppRoutes.ConfirmCancellation,
    element: <ConfirmCancellationView />,
    errorElement: <ErrorView />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </StrictMode>
);
