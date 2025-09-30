import { lazy } from "react";
const LessonAndTraining = lazy(() =>
  import("../component/Level1/LessonAndTraining/LessonAndTraining")
);
const HealthAndWellness = lazy(() =>
  import("../component/Level1/HealthAndWellness/HealthAndWellness")
);
const Business = lazy(() => import("../component/Level1/Business/Business"));

const levelOnePagesRoutes = [
  { path: "lessons-training", Component: LessonAndTraining },
  { path: "health", Component: HealthAndWellness },
  { path: "business", Component: Business },
];
export { levelOnePagesRoutes };
