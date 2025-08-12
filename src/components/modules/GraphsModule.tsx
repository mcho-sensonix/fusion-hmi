import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, AppShell, Input, Button, Grid, Text, Group, GridCol, Autocomplete} from "@mantine/core";
// import Counter from "../components/counter/Counter.tsx";
import {CompositeGraph} from "../graphs/CompositeGraph.tsx";
import {LineGraph} from "../graphs/LineGraph.tsx";
import React, {useState} from "react";
import {Client, gql, fetchExchange} from "@urql/core";
import {getFilteredSignalsQuery, getSignalsQuery, insertSampleQuery} from "./modules.graphql.ts";
import {useLazyQuery, useQuery, useMutation} from '@apollo/client'

// import {useQuery} from 'urql'

export function GraphsModule({groupPath}) {
 const [inputValue, setInputValue] = useState('');
 const [graphData, setGraphData] = useState([]);
 const [inputPathValue, setInputPathValue] = useState('');
 const [optionValues, setOptionValues] = useState([{}]);
 const [signalPaths, setSignalPaths] = useState([]);


 const {
  data: signalsListData,
  error: signalsListError,
  loading: signalsListLoading
 } = useQuery(
   getFilteredSignalsQuery,
   {
    variables: {
     parentGroup: `/remote/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/`,
     filter: {key: "__", exists: false}
    }
   }
 );
 const [getSignalsData, {data: signalsData, error: signalsError, loading: signalsLoading}] = useLazyQuery(
   getSignalsQuery,
   {
    variables: {
     signals: signalPaths
    }
   }
 );

 const [insertSample, {data: insertSampleData, error: insertSampleError, loading: insertSampleLoading}] = useMutation(
   insertSampleQuery
 );

 const handleInputChange = (event: any) => {
  setInputValue(event.target.value);
 }

 const handleSubmit = async () => {
  try {
   const parsedValue = parseInt(inputValue)

   if (parsedValue || parsedValue === 0) {
    await insertSample({
     variables: {
      signal: signalsData?.getSignals?.[0]?.fullPath,
      sample: {value: parsedValue.toString(), timestamp: new Date()},
     }
    });
    await getSignalsData();

    await getSignalsData({
     variables: {
      signals: [signalsData?.getSignals?.[0]?.fullPath]
     }, fetchPolicy: 'cache-and-network'
    });
    // console.log('new Dara', signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples)
    // if (!signalsLoading) setGraphData(
    //   signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples
    // );

   }
  } catch (error) {
   console.error(error);
  }
  setInputValue('');
 }

 const handlePollSubmit = async () => {
  try {
   const graphDataValues = signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples?.map(item => {
    const key = signalsData?.getSignals?.[0]?.fullPath
    console.log(item, item?.[key])
    return item?.[key]
   })?.filter(item => item != 'NaN' && !isNaN(item))
   console.log('graphDataValues', graphDataValues, graphData)
   const max = Math.max(...graphDataValues)
   const min = Math.min(...graphDataValues)
   const randomValue = max == min ? Math.floor(Math.random() * (10)) + 1 :
     Math.floor(Math.random() * (max - min)) + min
   console.log(max, min, randomValue)

   await insertSample({
    variables: {
     signal: signalsData?.getSignals?.[0]?.fullPath,
     sample: {value: randomValue.toString(), timestamp: new Date()},
    }
   });
   await getSignalsData({
    variables: {
     signals: [signalsData?.getSignals?.[0]?.fullPath]
    }, fetchPolicy: 'cache-and-network'
   });
   console.log('new Dara', signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples)
   console.log('graphDataValues', signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples)
   setGraphData(
     signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples
   );
  } catch (error) {
   console.error(error);
  }
  setInputValue('');
 }
 const fetchedData = () => {
  return ['/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
   '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZHiA',
   '/a-trak-ou56/c-2000/c-2001/', '$c5eb52ed-cea8-4966-bd32-14b0b7d7ebe3/signal_1', '$asdfasdf/asdf', '/a-asdf-asdf/c-asdf-asdf/c-asfasdf/asdf', '$asdfasdfadf/sdf', '$asdf/asdf']
 }


 // console.log('signal path', signalPaths)

 const handleSignalPathInputChange = (value: any) => {
  setInputPathValue(value);
 }
 const handleSignalPathSubmit = async () => {
  try {
   // setOptionValues(
   //   [...optionValues,
   //    {signal: inputValue}
   //   ]
   // );
   console.log(inputPathValue)
   if (!signalPaths.includes(inputPathValue) && inputPathValue && !inputPathValue.endsWith('/') && typeof inputValue === 'string') {
    // TODO: store all signals
    // setSignalPaths([...signalPaths, inputPathValue.slice(7)]);
    setSignalPaths([inputPathValue.slice(7)]);
   }
   await getSignalsData();

  } catch (error) {
   console.error(error);
  }
  setInputPathValue('');
 }


 // const {data,error, loading } =useQuery(getSignalsQuery, {
 //  variables: {signals: signalPaths}
 // })


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
 console.log('signalsData', signalsData?.getSignals?.[0])
 console.log('graphData', graphData)
 return (
   <Grid>
    <Grid.Col span={12}>
     <h1>{signalsData?.getSignals?.[0]?.fullPath}</h1>
    </Grid.Col>
    <Grid.Col span={6}>
     {<LineGraph
       data={graphData.length > 0 ? graphData : signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples}
       name={signalsData?.getSignals?.[0]?.fullPath ?? 'null'}/>}

    </Grid.Col>
    <Grid.Col span={6}>
     <Autocomplete
       size={"xl"}
       label="Signal Path"
       placeholder="Pick signal or enter anything"
       data={signalsListData?.getFilteredSignals?.map((signal) => signal?.fullPath)}
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
