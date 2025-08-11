// import {useDisclosure} from "@mantine/hooks";
// import {ActionIcon, AppShell, Input, Button, Grid, Text, Group, GridCol, Paper} from "@mantine/core";
import React from "react";
import {GaugesModule} from "./GaugesModule.tsx";
import {GraphsModule} from "./GraphsModule.tsx";
import {Link, useParams} from "react-router-dom";
import {ActionIcon, AppShell, Button, NavLink} from "@mantine/core";
import {IconMenu2} from "@tabler/icons-react";
import {StatsGrid} from "../stats/StatsGrid.tsx";
import {StatsSegments} from "../stats/StatsSegments.tsx";
import {useDisclosure} from "@mantine/hooks";
const modulesData = [
  {id:1, title: "Module 1", desription: "", type: "graph"},
  {id:2, title: "Module 1", desription: "", type: "gauge"},
]


export function ModuleDetailsPage() {
 const { templateId } = useParams();
 console.log('temp', templateId);
 const [opened, { toggle }] = useDisclosure();
 // const cardsData = [{title: "Module 1", desription: ""}, {title: "Module 2", description:""}, {title: "Module 3", description:""}, {title: "Module 4", desription: ""}, {title: "Module 1", desription: ""}, {title: "Module 1", desription: ""}];
 const moduleData = templateId?modulesData.find((module) => module.id == parseInt(templateId)):null;
 console.log('moduleData', moduleData);

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
       <Button
         component="a" // Renders the Button as an <a> tag
         href={`/modules/${moduleData?.id}/configuration`} // The URL for your settings page
       >
        Settings
       </Button>
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

       {moduleData?.type == "graph" && <GraphsModule/>}
       {moduleData?.type == "gauge" && <GaugesModule/>}
      </AppShell.Main>
     </AppShell>
    </>


 );
}
