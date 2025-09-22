import { lazy } from "react";
const AirportServices = lazy(() =>
  import("../component/level3/Airport/AirportServices")
);
const GutterCleaner = lazy(() =>
  import("../component/level3/GutterClearner/GutterCleaner")
);
const TreeSurgeon = lazy(() =>
  import("../component/level3/TreeSurgeon/TreeSurgeon")
);
const Tutor = lazy(() => import("../component/level3/Tutors/Tutor"));
const levelThreePagesRoutes = [
  { path: "airport-transfers-near-me", Component: AirportServices },
  { path: "gutter-cleaning-near-me", Component: GutterCleaner },
  { path: "tree-surgeon-near-me", Component: TreeSurgeon },
  { path: "tutors-near-me", Component: Tutor },
];
export { levelThreePagesRoutes };
