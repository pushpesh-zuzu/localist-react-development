import { lazy } from "react";

const AirportServices = lazy(() =>
  import("../component/level3/Airport/AirportServices")
);
const levelThreePagesRoutes = [
  { path: "airport-transfers-near-me", Component: AirportServices },
];
export { levelThreePagesRoutes };
