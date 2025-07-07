import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import {ActionIcon, AppShell, MantineProvider, NavLink} from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import {IconMenu2} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";

export default function App() {
 const [opened, { toggle }] = useDisclosure();
 return (
   <MantineProvider theme={theme}>
    <AppShell
      header={{ height: 60 }}
      navbar={{
       width: 300,
       breakpoint: 'sm',
       collapsed: { mobile: !opened },
      }}
      padding="md"
    >
     <AppShell.Header>
      <ActionIcon onClick={toggle} >
       <IconMenu2 stroke={2} />
      </ActionIcon>
      Header
     </AppShell.Header>
     <AppShell.Navbar p="md">

      <NavLink
        href="/"
        label="Overview"
        // leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
      <NavLink
        href="/modules"
        label="Modules"
        // leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
     </AppShell.Navbar>
     <AppShell.Main>
      <Router/>
     </AppShell.Main>
    </AppShell>

   </MantineProvider>
 );
}