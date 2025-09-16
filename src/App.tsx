import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import {ActionIcon, AppShell, MantineProvider, NavLink} from '@mantine/core';
import { Router } from './Router';
import { BrowserRouter, Link} from 'react-router-dom';
import { theme } from './theme';
import {IconMenu2} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {NavBar} from "./components/NavBar/NavBar.tsx";

export default function App() {

 return (
    <Router/>
 );
}
