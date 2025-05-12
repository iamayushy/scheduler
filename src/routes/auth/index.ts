import React from "react";

export const authRoutes = [
    {
        path: ["/", "/login"],
        component: React.lazy(() =>  import("../../components/auth/login")),
    }
]