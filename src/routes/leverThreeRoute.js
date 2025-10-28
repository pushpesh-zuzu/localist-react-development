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
const TreeSurgeonImage1 = lazy(() =>
  import("../component/level3/TreeSurgeon/TreeSurgeon")
);
const TreeSurgeonImage2 = lazy(() =>
  import("../component/level3/TreeSurgeon/TreeSurgeonImage2")
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
    { path: "tree-surgeon-near-me-banner1", Component: TreeSurgeonImage1 },
  { path: "tree-surgeon-near-me-banner2", Component: TreeSurgeonImage2 },

  { path: "tutors-near-me", Component: Tutor },
  { path: "physics-maths-tutors-near-me", Component: PhysicsAndMathsTutor },
  { path: "property-extensions-near-me", Component: HouseExtensionBuilders },
  { path: "bookkeepers-near-me", Component: BookKeepingService },
  { path: "accountants-near-me", Component: Accounting },

];
export { levelThreePagesRoutes };
