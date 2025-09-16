import React from "react";
import {useDisclosure} from "@mantine/hooks";
import {
    ActionIcon,
    AppShell,
    Grid,
    Text,
    Image,
    NavLink,
    Avatar,
    Card, Group
} from "@mantine/core";
import PartCountingAvatarImg from '../assets/part-counting-avatar.png'
import {IconMenu2} from "@tabler/icons-react";
import {Link} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {getFilteredGroupsQuery} from "../components/modules/modules.graphql.ts";
import {NavBar} from "../components/NavBar/NavBar.tsx";

export function ModulesPage() {
 const [opened, {toggle}] = useDisclosure();

 const {data, error, loading} = useQuery(getFilteredGroupsQuery, {
  variables: {
   parentGroup: '$asset_twin/modules/',
   filter: {key: "__", exists: false}
  }
 })

 const cardsData = data?.getFilteredGroups?.map(module => ({
     id: module.name,
     title: module.properties?.['displayName'] || module.name,
     description: module.properties?.['description'] ?? ''
 })) ?? [];
 return (
   // <Counter/>
   <>
    <NavBar>

      <Grid>
       {cardsData.map((card, index) => (
         <Grid.Col key={index} span={{base: 12, sm: 6, md: 4, lg: 3}}>
          <Card component={Link} to={`/modules/${card.id}`} shadow="sm" radius="md" withBorder>
              <Card.Section>
                  <Image
                      src={PartCountingAvatarImg}
                      height={160}
                      alt="Part Counting"
                  />
              </Card.Section>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500} >{card.title}</Text>
              </Group>
              <Text size="sm" c="dimmed">{card.description}</Text>
          </Card>
         </Grid.Col>
       ))}
      </Grid>
    </NavBar>
   </>
 );
}
