import { lazy } from "react";
const LessonAndTraining = lazy(() =>
  import("../component/Level1/LessonAndTraining/LessonAndTraining")
);
const HealthAndWellness = lazy(() =>
  import("../component/Level1/HealthAndWellness/HealthAndWellness")
);
const Business = lazy(() => import("../component/Level1/Business/Business"));
const Transport = lazy(() => import("../component/Level1/Transport/Transport"));

const levelOnePagesRoutes = [
  { path: "transportation-services", Component: Transport },
  { path: "lessons-training", Component: LessonAndTraining },
  { path: "health", Component: HealthAndWellness },
  { path: "business", Component: Business },
];
export { levelOnePagesRoutes };
