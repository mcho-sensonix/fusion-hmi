import Counter from '../components/counter/Counter';
import '@mantine/core/styles.css';
import {
 Button,
 Grid,
 Input,
 Select,
 Autocomplete,
 Table,
 Checkbox,
 AppShell,
 ActionIcon,
 NavLink,
 Text,
} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {IconMenu2} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {useQuery, useMutation} from "@apollo/client";
import {
 getFilteredSignalsQuery,
 replicateRemoteSignalQuery
} from "../components/modules/modules.graphql.ts";

export function ConfigurationPage() {
 const {templateId} = useParams();

 const [opened, {toggle}] = useDisclosure();
 const [inputValue, setInputValue] = useState('');
 const [optionValues, setOptionValues] = useState<{ signal?: string, cpuSignal?: string }[]>();
 const [selectedRows, setSelectedRows] = useState<string[]>([]);


 const [replicateRemoteSignal, {
  data: replicateSignalData,
  error: replicateSignalError,
  loading: replicateSignalLoading
 }] = useMutation(
   replicateRemoteSignalQuery,
 );

 const {data: signalsListData, error: signalsListError, loading: signalsListLoading} = useQuery(
   getFilteredSignalsQuery,
   {
    variables: {
     parentGroup: `/a-trak-ou56/c-2000/c-2001/`, filter: {
      key: "__", exists: false
     }
    }
   }
 );

 const {
  data: remoteSignalsListData,
  error: remoteSignalsListError,
  loading: remoteSignalsListLoading,
  refetch: remoteSignalsListRefetch,
 } = useQuery(
   getFilteredSignalsQuery,
   {
    variables: {
     parentGroup: `/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/`,
     filter: {key: "__", exists: false}
    },
    fetchPolicy: 'cache-and-network',
   }
 );
 // const [graphData, setGraphData] = useState([{x: 0, y: 0}]);
 const handleInputChange = (value: any) => {
  setInputValue(value);
 }
 const handleSubmit = async () => {
  try {
   const existingSignals = new Set(optionValues?.map(option => option?.signal));
   if (!existingSignals.has(inputValue)) {

    await replicateRemoteSignal({
     variables: {
      signal: inputValue,
     }
    })
    setOptionValues(
      [...(optionValues ?? []),
       {cpuSignal: inputValue}
      ]
    );
   }
  } catch (error) {
   console.error(error);
  }
  setInputValue('');
 }

 useEffect(() => {
  remoteSignalsListRefetch();
  setOptionValues(
    [...(optionValues ?? []),
     ...remoteSignalsListData?.getFilteredSignals?.map((remoteSignal) => ({signal: remoteSignal?.fullPath})) ?? []
    ]
  );
 }, []);

 const rows = optionValues?.map((element) => {
  if (element?.signal) {
   return <Table.Tr
     key={element?.signal}
     bg={selectedRows.includes(element?.signal) ? 'var(--mantine-color-blue-light)' : undefined}
   >
    <Table.Td>
     <Checkbox
       aria-label="Select row"
       checked={selectedRows.includes(element?.signal)}
       onChange={(event) => {
        if (element?.signal) {
         setSelectedRows(
           event.currentTarget.checked
             ? [...selectedRows, element?.signal]
             : selectedRows.filter((signal) => signal !== element?.signal)
         )
        }
       }
       }
     />
    </Table.Td>
    <Table.Td>{element?.signal}</Table.Td>
   </Table.Tr>
  }
 });
 return (
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
      <Button
        component={Link} // Renders the Button as an <a> tag
        style={{color: "#000000", position: "absolute", right: 0}}
        to={`/modules/${templateId}`} // The URL for your settings page
      >
       Back To Dashboard
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
      <NavLink
        component={Link}
        to="/data"
        label="Data"
        onClick={toggle}
        // leftSection={<IconHome2 size={16} stroke={1.5} />}
      />
     </AppShell.Navbar>
     <AppShell.Main>

      <Grid>
       <Grid.Col span={12}>
        <h1>Remote Signals</h1>
       </Grid.Col>
       <Grid.Col span={12}>
        {/* TODO: fetch remote signal paths from signals server and allow new signals to added with the "/remote/"
     make a api query call with signal path to create signal
     */}
        <Autocomplete
          size="xl"
          label="Signal Path"
          placeholder="Pick signal or enter anything"
          data={signalsListData?.getFilteredSignals?.map((signal) => ({
           ...signal,
           value: signal?.fullPath ?? signal?.properties?.displayName ?? signal?.name
          }))}
          clearable
          value={inputValue}
          onChange={handleInputChange}
          // itemComponent={AutoCompleteItem}
        />
        <Button onClick={handleSubmit} size={"xl"} autoContrast={true}>Add Signal</Button>
       </Grid.Col>
       <Table>
        <Table.Thead>
         <Table.Tr>
          <Table.Th/>
          <Table.Th>Signal Path</Table.Th>
         </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
       </Table>

      </Grid>
     </AppShell.Main>
    </AppShell>
   </>

 );
};


function AutoCompleteItem({fullPath, properties, name}) {
 return (
   <>
    <Text>{properties?.displayName ?? name}</Text>
   </>
 );
}