import React, {useState, useRef, useEffect} from "react";
import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, AppShell, Input, Button, Grid, Text, Group, GridCol, Paper, NavLink} from "@mantine/core";
// import Counter from "../components/counter/Counter.tsx";
import {CompositeGraph} from "../components/graphs/CompositeGraph.tsx";
import {LineGraph} from "../components/graphs/LineGraph.tsx";
import {IconMenu2} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {StatsGrid} from "../components/stats/StatsGrid.tsx";
import {StatsSegments} from "../components/stats/StatsSegments.tsx";
import {Router} from "../Router.tsx";
import {gql} from "@urql/core";
import {useLazyQuery, useQuery} from "@apollo/client";
import {getFilteredGroupsQuery, getSignalsQuery} from "../components/modules/modules.graphql.ts";

export function ModulesPage() {
 const [opened, {toggle}] = useDisclosure();

 const {data, error, loading} = useQuery(getFilteredGroupsQuery, {
  variables: {
   parentGroup: '/remote/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/',
   filter: {key: "__", exists: false}
  }
 })

 const cardsData = [
  {id: 1, title: "Module 1", desription: ""},
  {id: 2, title: "Module 2", description: ""},
  {id: 3, title: "Module 3", description: ""},
  {id: 4, title: "Module 4", desription: ""},
  {id: 5, title: "Module 1", desription: ""},
  {id: 6, title: "Module 1", desription: ""}];
 return (
   // <Counter/>
   <>
    <AppShell
      header={{height: 60}}
      navbar={{
       width: 300,
       breakpoint: 1300,
       collapsed: {mobile: !opened},
      }}
      padding="md"
    >

     <AppShell.Header>
      <ActionIcon onClick={toggle} size={"xl"}>
       <IconMenu2 stroke={2}/>
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

      <Grid>
       {cardsData.map((card, index) => (
         <Grid.Col key={index} span={{base: 12, sm: 6, md: 4, lg: 3}}>
          <Paper component={Link} to={`/modules/${card.id}`} shadow="sm" radius="md" withBorder>
           {/* Card content goes here */}
           <h3>{card.title}</h3>
           <p>{card.description}</p>
          </Paper>
         </Grid.Col>
       ))}
      </Grid>
     </AppShell.Main>
    </AppShell>
   </>
 );
}
