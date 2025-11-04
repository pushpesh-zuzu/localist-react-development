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
const PhysicsAndMathsTutor = lazy(() =>
  import("../component/level3/PhysicsAndMathsTutor/PhysicsAndMathsTutor")
);
const HouseExtensionBuilders = lazy(() =>
  import("../component/level3/HouseExtensionBuilders/HouseExtensionBuilders")
);
const BookKeepingService = lazy(() =>
  import("../component/level3/BookKeepingService/BookKeepingService")
);
const Accounting = lazy(() =>
  import("../component/level3/Accounting/Accounting")
);


const levelThreePagesRoutes = [
  { path: "airport-transfers-near-me", Component: AirportServices },
  { path: "gutter-cleaning-near-me", Component: GutterCleaner },
  { path: "tree-surgeon-near-me", Component: TreeSurgeon },


  { path: "tutors-near-me", Component: Tutor },
  { path: "physics-maths-tutors-near-me", Component: PhysicsAndMathsTutor },
  { path: "property-extensions-near-me", Component: HouseExtensionBuilders },
  { path: "bookkeepers-near-me", Component: BookKeepingService },
  { path: "accountants-near-me", Component: Accounting },

];
export { levelThreePagesRoutes };
