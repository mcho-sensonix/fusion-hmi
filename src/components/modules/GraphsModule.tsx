import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, AppShell, Input, Button, Grid, Text, Group, GridCol, Autocomplete} from "@mantine/core";
// import Counter from "../components/counter/Counter.tsx";
import {CompositeGraph} from "../graphs/CompositeGraph.tsx";
import {LineGraph} from "../graphs/LineGraph.tsx";
import React, {useState} from "react";
import {Client, gql, fetchExchange} from "@urql/core";
import {getFilteredSignalsQuery, getSignalsQuery} from "./modules.graphql.ts";
import {useLazyQuery, useQuery} from '@apollo/client'
// import {useQuery} from 'urql'

export function GraphsModule({groupPath}) {
 const [inputValue, setInputValue] = useState('');
 const [graphData, setGraphData] = useState([{x: 0, y: 0}]);
 const handleInputChange = (event:any) => {
  setInputValue(event.target.value);
 }

 const handleSubmit = () => {
  try{
   const parsedValue = parseInt(inputValue)

   if (parsedValue || parsedValue === 0 ){
    setGraphData(
      [...graphData,
       {
        x:graphData?.[graphData?.length-1]?.x +1,
        y:parsedValue
       }
      ]
    );
   }
  }catch(error) {
   console.error(error);
  }
  setInputValue('');
 }

 const handlePollSubmit = () => {
  try{
   const graphDataValues = graphData?.map(item => item?.y)
   const max = Math.max(...graphDataValues)
   const min  = Math.min(...graphDataValues)
   const randomValue  = max==min? Math.floor(Math.random() * (10)) + 1:
     Math.floor(Math.random() * (max - min)) + min
   console.log(max, min, randomValue)
   setGraphData(
     [...graphData,
      {
       x:graphData?.[graphData?.length-1]?.x +1,
       y:randomValue
      }
     ]
   );
  }catch(error) {
   console.error(error);
  }
  setInputValue('');
 }
 const fetchedData = ()=>{return ['/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
  '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZHiA',
  '/a-trak-ou56/c-2000/c-2001/','$c5eb52ed-cea8-4966-bd32-14b0b7d7ebe3/signal_1','$asdfasdf/asdf', '/a-asdf-asdf/c-asdf-asdf/c-asfasdf/asdf', '$asdfasdfadf/sdf', '$asdf/asdf']}

 const [inputPathValue, setInputPathValue] = useState('');
 const [optionValues, setOptionValues] = useState([{}]);
 const [signalPaths, setSignalPaths]= useState([])
 console.log('signal path', signalPaths)

 const handleSignalPathInputChange = (value:any) => {
  setInputPathValue(value);
 }
 const handleSignalPathSubmit = async () => {
  try{
   // setOptionValues(
   //   [...optionValues,
   //    {signal: inputValue}
   //   ]
   // );
   console.log(inputPathValue)
   if (!signalPaths.includes(inputPathValue) && inputPathValue && !inputPathValue.endsWith('/')){
    setSignalPaths([...signalPaths, inputPathValue]);
   }
   await getSignalsData();

  }catch(error) {
   console.error(error);
  }
  setInputPathValue('');
 }


 // const {data,error, loading } =useQuery(getSignalsQuery, {
 //  variables: {signals: signalPaths}
 // })

 const [getSignalsData, { data, error, loading }] = useLazyQuery(
   getSignalsQuery,
   {variables: {signals: signalPaths}}
 );
 console.log('here0', data, error);


 // const result = await client.mutation(getSignalQuery, {
 //  signal: signalPath,
 // });

 // const result = client.mutation(getFilteredSignalsQuery, {
 //  parentGroup: groupPath,
 //   filter: {
 //    "key": "__",
 //    "exists": false
 //   }
 //
 // }).toPromise();





 // const lineData = result?.data?.getSignals?.sample_results_for_graph
 // console.log(lineData, result
 // )
 const testPathString = `$c5eb52ed-cea8-4966-bd32-14b0b7d7ebe3/signal_1`

 // this.client
 // .query(
 //   graphql(`
 //       query GET_SAMPLES($getSamplesRequestInput: GetSamplesRequestInput!) {
 //           getSamples(GetSamplesRequestInput: $getSamplesRequestInput) {
 //               success
 //               sample_results {
 //                   start_time
 //                   t
 //                   v
 //               }
 //           }
 //       }
 //   `),
 //   { getSamplesRequestInput },
 // )
 // .toPromise();
 return (
   <Grid>
    <Grid.Col span={12}>
     <h1>Line 1 Station 1 Part Count</h1>
    </Grid.Col>
    <Grid.Col span={6}>
     <LineGraph data={data?.getSignals?.[0]?.sample_results_for_graph?.samples}/>
    </Grid.Col>
    <Grid.Col span={6}>
     <Autocomplete
       size={"xl"}
       label="Signal Path"
       placeholder="Pick signal or enter anything"
       data={fetchedData()}
       clearable
       value={inputPathValue}
       onChange={handleSignalPathInputChange}
     />
     <Button onClick={handleSignalPathSubmit} size={"xl"} autoContrast={true}>Add Signal</Button>
     <Grid.Col span={12}>
      <Input
        placeholder="Enter value"
        value={inputValue}
        onChange={handleInputChange}
        size="xl"
      />
     </Grid.Col>
      <Grid.Col span={12}>
       <Group>
        <Button onClick={handleSubmit} size={"xl"} autoContrast={true}>Add</Button>
        <Button onClick={handlePollSubmit} size={"xl"} autoContrast={true}>Poll</Button>
       </Group>

      </Grid.Col>

    </Grid.Col>
    <Grid.Col span={12} h={140}/>

   </Grid>
 );
};
