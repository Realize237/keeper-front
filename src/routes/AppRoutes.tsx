import { Routes } from 'react-router-dom';
import { routes } from './routes.config';
import { renderRoutes } from './renderRoutes';

export function AppRoutes() {
  return <Routes>{renderRoutes(routes)}</Routes>;
}
