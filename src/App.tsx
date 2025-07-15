import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import {ActionIcon, AppShell, MantineProvider, NavLink} from '@mantine/core';
import { Router } from './Router';
import { BrowserRouter, Link} from 'react-router-dom';
import { theme } from './theme';
import {IconMenu2} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";

export default function App() {
 const [opened, { toggle }] = useDisclosure();
 return (
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
      Header
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
      <Router/>
     </AppShell.Main>
    </AppShell>
 );
}
