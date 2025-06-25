import Counter from './webclient/Counter';
import { MantineProvider,Center, AppShell,Burger, Button, ActionIcon } from '@mantine/core';
import '@mantine/core/styles.css';
import {useDisclosure} from "@mantine/hooks";
import { IconMenu2, IconArrowLeft } from '@tabler/icons-react';

const App = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
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
      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>
      <AppShell.Main>
        {/*<ActionIcon onClick={toggleDesktop} >*/}
        {/*  <IconMenu2 stroke={2} />*/}
        {/*</ActionIcon>*/}
        {/*<ActionIcon onClick={toggleMobile} hiddenFrom="sm">*/}
        {/*  <IconMenu2 stroke={2} />*/}
        {/*</ActionIcon>*/}
        <Counter/>
      </AppShell.Main>
    </AppShell>
  );
};

export default App;