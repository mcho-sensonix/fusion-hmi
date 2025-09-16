import Counter from '../components/counter/Counter';
import '@mantine/core/styles.css';
import {StatsGrid} from "../components/stats/StatsGrid.tsx";
import {StatsSegments} from "../components/stats/StatsSegments.tsx";
import {ActionIcon, AppShell, NavLink} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {Router} from "../Router.tsx";
import {NavBar} from "../components/NavBar/NavBar.tsx";

export function HomePage() {
 const [opened, { toggle }] = useDisclosure();
 return (
   <>
    <NavBar>
      <StatsGrid />
      <StatsSegments/>
    </NavBar>
   </>
 );
};