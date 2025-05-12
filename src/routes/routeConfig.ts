import React from "react";
import { authRoutes } from "./auth";
import { dashboardRoutes } from "./dashboard";

const allRoutes = [
    ...authRoutes,
    ...dashboardRoutes,
    {
        path: "*",
        component: React.lazy(() => import("../components/error")),
    }
]

export default allRoutes;