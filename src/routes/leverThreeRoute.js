import { lazy } from "react";
// import GutterCleaner from "../component/level3/GutterClearner/GutterCleaner";

const AirportServices = lazy(() =>
  import("../component/level3/Airport/AirportServices")
);
const GutterCleaner = lazy(() =>
  import("../component/level3/GutterClearner/GutterCleaner")
);
const TreeSurgeon = lazy(() =>
  import("../component/level3/TreeSurgeon/TreeSurgeon")
);
const levelThreePagesRoutes = [
  { path: "airport-transfers-near-me", Component: AirportServices },
  { path: "gutter-cleaning-near-me", Component: GutterCleaner },
    { path: "tree-surgeon-near-me", Component: TreeSurgeon}

];
export { levelThreePagesRoutes };
