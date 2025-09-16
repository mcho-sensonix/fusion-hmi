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
import Counter from "../counter/Counter.tsx";
import {NavBar} from "../NavBar/NavBar.tsx";

const modulesData = [
 {id: 'graph', title: "Graph", desription: "", type: "graph"},
 {id: 'gauge', title: "Gauge", desription: "", type: "gauge"},
 {id: 'part-counting', title: "Production Part Counting", desription: "", type: "part-counting"},
]

export function ModuleDetailsPage() {
 const {templateId} = useParams();
 const [opened, {toggle}] = useDisclosure();
 // const cardsData = [{title: "Module 1", desription: ""}, {title: "Module 2", description:""}, {title: "Module 3", description:""}, {title: "Module 4", desription: ""}, {title: "Module 1", desription: ""}, {title: "Module 1", desription: ""}];
 const moduleData = templateId ? modulesData.find((module) => module.id == templateId) : null;

 return (
   <NavBar>
      {moduleData?.type == "graph" && <GraphsModule/>}
      {moduleData?.type == "gauge" && <GaugesModule/>}
      {moduleData?.type == "part-counting" && <Counter />}
   </NavBar>


 );
}
