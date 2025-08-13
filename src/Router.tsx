import {HomePage} from './pages/HomePage';
import {ModulesPage} from "./pages/Modules.tsx";
import {ConfigurationPage} from "./pages/Configuration.tsx";
import {  Route, Routes, Link } from 'react-router-dom';
import {ModuleDetailsPage} from "./components/modules/[templateId].tsx";

export function Router() {
 return (
   <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/modules" element={<ModulesPage />} />
    <Route path="/modules/:templateId" element={<ModuleDetailsPage />} />
    <Route path="/modules/:templateId/configuration" element={<ConfigurationPage />} />
   </Routes>
 )
}