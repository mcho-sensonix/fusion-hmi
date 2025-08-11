// import Counter from '../components/counter/Counter';
// import '@mantine/core/styles.css';
// import {Button, Grid, Input, Select, Autocomplete, Table, Checkbox} from "@mantine/core";
// import {LineGraph} from "../components/graphs/LineGraph.tsx";
// import {CompositeGraph} from "../components/graphs/CompositeGraph.tsx";
// import React, {useState} from "react";
//
// export function Configuration() {
//  const [inputValue, setInputValue] = useState('');
//  const [optionValues, setOptionValues] = useState([{}]);
//  const [selectedRows, setSelectedRows] = useState<string[]>([]);
//  const fetchedData = ()=>{return ['$asdfasdf/asdf', '/a-asdf-asdf/c-asdf-asdf/c-asfasdf/asdf', '$asdfasdfadf/sdf', '$asdf/asdf']}
//
//  // const [graphData, setGraphData] = useState([{x: 0, y: 0}]);
//  const handleInputChange = (value:any) => {
//   setInputValue(value);
//  }
//  const handleSubmit = () => {
//   try{
//    setOptionValues(
//      [...optionValues,
//       {signal: inputValue}
//      ]
//    );
//   }catch(error) {
//    console.error(error);
//   }
//   setInputValue('');
//  }
//
//  const rows = optionValues.map((element) => (
//    <Table.Tr
//      key={element.signal}
//      bg={selectedRows.includes(element.signal) ? 'var(--mantine-color-blue-light)' : undefined}
//    >
//     <Table.Td>
//      <Checkbox
//        aria-label="Select row"
//        checked={selectedRows.includes(element.signal)}
//        onChange={(event) =>
//          setSelectedRows(
//            event.currentTarget.checked
//              ? [...selectedRows, element.signal]
//              : selectedRows.filter((signal) => signal !== element.signal)
//          )
//        }
//      />
//     </Table.Td>
//     <Table.Td>{element.signal}</Table.Td>
//    </Table.Tr>
//  ));
//  return (
//    <Grid>
//     <Grid.Col span={12}>
//      <h1>Remote Signals</h1>
//     </Grid.Col>
//     <Grid.Col span={12}>
//      {/* TODO: fetch remote signal paths from signals server and allow new signals to added with the "/remote/"
//      make a api query call with signal path to create signal
//      */}
//      <Autocomplete
//        size="xl"
//        label="Signal Path"
//        placeholder="Pick signal or enter anything"
//        data={fetchedData()}
//        clearable
//        value={inputValue}
//        onChange={handleInputChange}
//      />
//      <Button onClick={handleSubmit} size={"xl"} autoContrast={true}>Add Signal</Button>
//     </Grid.Col>
//     <Table>
//      <Table.Thead>
//       <Table.Tr>
//        <Table.Th />
//        <Table.Th>Signal Path</Table.Th>
//       </Table.Tr>
//      </Table.Thead>
//      <Table.Tbody>{rows}</Table.Tbody>
//     </Table>
//
//    </Grid>
//  );
// };