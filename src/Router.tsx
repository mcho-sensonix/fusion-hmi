import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { HomePage } from './pages/HomePage';
import {HomePage} from './pages/HomePage';
import {ModulesPage} from "./pages/Modules.tsx";

const router = createBrowserRouter([
 {
  path: '/',
  element: <HomePage />,
 },
 {path:'/modules', element: <ModulesPage/>}
]);

export function Router() {
 return <RouterProvider router={router} />;
}