import {HomePage} from './pages/HomePage';
import {ModulesPage} from "./pages/Modules.tsx";
import {  Route, Routes, Link } from 'react-router-dom';

export function Router() {
 return (
   <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/modules" element={<ModulesPage />} />
   </Routes>
 )
}