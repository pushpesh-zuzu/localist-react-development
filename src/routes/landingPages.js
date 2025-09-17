// src/routes/landingPages.js
import React, { lazy } from "react";
import FullScreenSpinner from "../component/common/fullScreenSpinner/FullScreenSpinner";

const LandingLandscaping = lazy(() =>
  import("../component/LandingPage/LandingLandscaping")
);
const LandinPatioPage = lazy(() =>
  import("../component/LandingPage/LandinPatioPage")
);
const LandingArtificialGrassInstallation = lazy(() =>
  import("../component/LandingPage/LandingArtificialGrassInstallation")
);
const LandingFenceAndGate = lazy(() =>
  import("../component/LandingPage/LandingFenceAndGate")
);
const LandingDriway = lazy(() =>
  import("../component/LandingPage/LandingDriway")
);
const LandingGatePPC = lazy(() =>
  import("../component/LandingPage/LandingGatePPC")
);
const LandingLandscapingAwin = lazy(() =>
  import("../component/LandingPage/LandingLandscapingAwin")
);
const LandingPatioServiceAwin = lazy(() =>
  import("../component/LandingPage/LandingPatioServiceAwin")
);

const LandingArtificialGrassInstallationAwin = lazy(() =>
  import("../component/LandingPage/LandingArtificialGrassInstallationAwin")
);
const LandingFenceAndGateAwin = lazy(() =>
  import("../component/LandingPage/LandingFenceAndGateAwin")
);
const LandingDriwayAwin = lazy(() =>
  import("../component/LandingPage/LandingDriwayAwin")
);
const LandingGateAwing = lazy(() =>
  import("../component/LandingPage/LandingGateAwing")
);

const landingPages = [
  { path: "landscaping_ppc", Component: LandingLandscaping },
  { path: "patio_services_ppc", Component: LandinPatioPage },
  {
    path: "artificial_grass_installation_ppc",
    Component: LandingArtificialGrassInstallation,
  },
  { path: "fencing_ppc", Component: LandingFenceAndGate },
  { path: "driveways_ppc", Component: LandingDriway },
  { path: "gates_ppc", Component: LandingGatePPC },
  { path: "landscaping_awin", Component: LandingLandscapingAwin },
  { path: "patio_services_awin", Component: LandingPatioServiceAwin },
  {
    path: "artificial_grass_installation_awin",
    Component: LandingArtificialGrassInstallationAwin,
  },
  { path: "fencing_awin", Component: LandingFenceAndGateAwin },
  { path: "driveways_awin", Component: LandingDriwayAwin },
  { path: "gates_awin", Component: LandingGateAwing },
];

export { landingPages, FullScreenSpinner };
