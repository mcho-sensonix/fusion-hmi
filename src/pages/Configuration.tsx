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
 Paper
} from "@mantine/core";
import {LineGraph} from "../components/graphs/LineGraph.tsx";
import {CompositeGraph} from "../components/graphs/CompositeGraph.tsx";
import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import {IconMenu2} from "@tabler/icons-react";
import {useDisclosure} from "@mantine/hooks";
import {Router} from "../Router.tsx";
import {useLazyQuery, useQuery, useMutation} from "@apollo/client";
import {
 getFilteredSignalsQuery,
 getSignalsQuery,
 replicateRemoteSignalQuery
} from "../components/modules/modules.graphql.ts";

export function ConfigurationPage() {
 const {templateId} = useParams();

 const [opened, {toggle}] = useDisclosure();
 const [inputValue, setInputValue] = useState('');
 const [optionValues, setOptionValues] = useState([{}]);
 const [selectedRows, setSelectedRows] = useState<string[]>([]);
 const fetchedData = () => {
  return ['$asdfasdf/asdf', '/a-asdf-asdf/c-asdf-asdf/c-asfasdf/asdf', '$asdfasdfadf/sdf', '$asdf/asdf']
 }

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
 // const [graphData, setGraphData] = useState([{x: 0, y: 0}]);
 const handleInputChange = (value: any) => {
  setInputValue(value);
 }
 const handleSubmit = async () => {
  try {
   const existingSignals = new Set(optionValues.map(option => option.signal));
   if (!existingSignals.has(inputValue)) {
    setOptionValues(
      [...optionValues,
       {signal: inputValue}
      ]
    );
    await replicateRemoteSignal({
     variables: {
      signal: inputValue,
     }
    })
   }
  } catch (error) {
   console.error(error);
  }
  setInputValue('');
 }


 const rows = optionValues.map((element) => (
   <Table.Tr
     key={element.signal}
     bg={selectedRows.includes(element.signal) ? 'var(--mantine-color-blue-light)' : undefined}
   >
    <Table.Td>
     <Checkbox
       aria-label="Select row"
       checked={selectedRows.includes(element.signal)}
       onChange={(event) =>
         setSelectedRows(
           event.currentTarget.checked
             ? [...selectedRows, element.signal]
             : selectedRows.filter((signal) => signal !== element.signal)
         )
       }
     />
    </Table.Td>
    <Table.Td>{element.signal}</Table.Td>
   </Table.Tr>
 ));
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