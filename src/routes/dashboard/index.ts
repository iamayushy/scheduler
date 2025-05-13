import React from "react";
import AuthGuard from "../../guard";

export const dashboardRoutes = [
    {
        path: "/",
        component: React.lazy(() => import("../../layout/dashboard")),
        guard: AuthGuard,
        children: [
            {
                path: "/dashboard",
                component: React.lazy(() => import("../../components/calendar")),
            }
        ]
    },
]