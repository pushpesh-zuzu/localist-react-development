import React, { lazy } from "react";
import FullScreenSpinner from "../component/common/fullScreenSpinner/FullScreenSpinner";

const ArtificialManchester = lazy(() =>
  import("../component/level4/ArtificialManchester/ArtificialManchester")
);
const levelFourLocationRoutes = [
  { path: "artificial-grass-installers-near-me/manchester", Component: ArtificialManchester },
 
];

export { levelFourLocationRoutes, FullScreenSpinner };
