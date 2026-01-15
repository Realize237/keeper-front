import { Route } from 'react-router-dom';
import { Suspense } from 'react';
import { AppRoute } from './routes.config';
import { ProtectedRoute } from '../components/common/ProtectedRoute';
import { RouteLoader } from '../components/common/RouteLoader';

export function renderRoutes(routes: AppRoute[]) {
  return routes.map((route, i) => {
    const content = route.protected ? (
      <ProtectedRoute>{route.layout || route.element}</ProtectedRoute>
    ) : (
      route.layout || route.element
    );

    const element = <Suspense fallback={<RouteLoader />}>{content}</Suspense>;

    if (route.index) {
      return <Route key={i} index element={element} />;
    }

    return (
      <Route key={i} path={route.path} element={element}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });
}
