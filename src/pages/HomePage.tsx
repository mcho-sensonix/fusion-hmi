import Counter from '../components/counter/Counter';
import '@mantine/core/styles.css';
import {StatsGrid} from "../components/stats/StatsGrid.tsx";
import {StatsSegments} from "../components/stats/StatsSegments.tsx";
import {ActionIcon, AppShell, NavLink} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useDisclosure} from "@mantine/hooks";
import {Router} from "../Router.tsx";

export function HomePage() {
 const [opened, { toggle }] = useDisclosure();
 return (
   <>
    <AppShell
      header={{ height: 60 }}
      navbar={{
       width: 300,
       breakpoint: 1300,
       collapsed: { mobile: !opened },
      }}
      padding="md"
    >
     <AppShell.Header>
     <ActionIcon onClick={toggle} size={"xl"}>
      <IconMenu2 stroke={2} />
     </ActionIcon>
    </AppShell.Header>
     <AppShell.Navbar p="md">
      <NavLink
        component={Link}
        to="/"
        label="Overview"
        onClick={toggle}
        // leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
      <NavLink
        component={Link}
        to="/modules"
        label="Modules"
        onClick={toggle}
        // leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
     </AppShell.Navbar>
     <AppShell.Main>
      <StatsGrid />
      <StatsSegments/>
     </AppShell.Main>
    </AppShell>
   </>
 );
};