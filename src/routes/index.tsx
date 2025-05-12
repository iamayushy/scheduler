

import { BrowserRouter, Route, Routes } from "react-router-dom";
import allRoutes from "./routeConfig";
import { Fragment, Suspense } from "react";
import Loader from "../components/ui/loader";


interface RouteProps {
  path: string | string[];
  component: React.ComponentType;
  guard?: React.ComponentType;
  children?: RouteProps[];
  isProtected?: boolean;
}


function generateRoutes(routes: RouteProps[]) {
  if (!routes || routes.length === 0) return null;

  return routes.map((route) => {
    const { path, component: Component, children, guard } = route;
    const Guard = guard || Fragment;

    const isPathArray = Array.isArray(path);
    if (isPathArray && path.length > 0) {
      return path.map((p: string) => {
        return (
          <Route
            key={p}
            path={p}
            element={
              <Suspense fallback={<Loader />}>
                <Guard>
                  <Component />
                </Guard>
              </Suspense>
            }
          >
            {children && children.length > 0 && generateRoutes(children)}
          </Route>
        );
      });
    }
    return (
      <Route 
        key={typeof path === 'string' ? path : path.join('-')}
        path={typeof path === 'string' ? path : path[0]}
        element={
          <Suspense fallback={<Loader />}>
          <Guard>
            <Component />
          </Guard>
          </Suspense>
        }
      >
        {children && children.length > 0 && generateRoutes(children)}
      </Route>
    );
  });
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>{generateRoutes(allRoutes as RouteProps[])}</Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
