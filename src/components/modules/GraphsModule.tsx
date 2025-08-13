import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, AppShell, Input, Button, Grid, Text, Group, GridCol, Autocomplete, Affix} from "@mantine/core";
// import Counter from "../components/counter/Counter.tsx";
import {CompositeGraph} from "../graphs/CompositeGraph.tsx";
import {LineGraph} from "../graphs/LineGraph.tsx";
import React, {useState, useRef, useEffect} from "react";
import {Client, gql, fetchExchange} from "@urql/core";
import {getFilteredSignalsQuery, getSignalsQuery, insertSampleQuery} from "./modules.graphql.ts";
import {useLazyQuery, useQuery, useMutation} from '@apollo/client'
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';


// import {useQuery} from 'urql'

export function GraphsModule({groupPath}) {
 const [inputValue, setInputValue] = useState('');
 const [graphData, setGraphData] = useState([]);
 const [inputPathValue, setInputPathValue] = useState<string>('');
 const [optionValues, setOptionValues] = useState([{}]);
 const [signalPaths, setSignalPaths] = useState<string[]>([]);

 const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
 const [layout, setLayout] = useState("default");

 const keyboardRef = useRef(null);
 const keyboardContainerRef = useRef(null);

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

    return item?.[key]
   })?.filter(item => item != 'NaN' && !isNaN(item))
   const max = Math.max(...graphDataValues)
   const min = Math.min(...graphDataValues)
   const randomValue = max == min ? Math.floor(Math.random() * (10)) + 1 :
     Math.floor(Math.random() * (max - min)) + min

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
  setGraphData(
     signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples
   );
  } catch (error) {
   console.error(error);
  }
  setInputValue('');
 }
//  const fetchedData = () => {
//   return ['/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
//    '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZHiA',
//    '/a-trak-ou56/c-2000/c-2001/', '$c5eb52ed-cea8-4966-bd32-14b0b7d7ebe3/signal_1', '$asdfasdf/asdf', '/a-asdf-asdf/c-asdf-asdf/c-asfasdf/asdf', '$asdfasdfadf/sdf', '$asdf/asdf']
//  }

  const handleClear = () => {
  setInputValue('');
 }

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

  const handleKeyboardInputChange = (value) => {
  setInputValue(value);
 }
 const onKeyPress = (button) => {
  if (button === '{shift}' || button === '{lock}') {
   const newLayoutName = layout === "default" ? "shift" : "default";
   setLayout(newLayoutName);
  }
  else if (button === '{enter}') {
   handleSubmit();
   setIsKeyboardOpen(false);
  }
 };


 useEffect(() => {
  const handleClickOutside = (event) => {
   // @ts-ignore
   if (keyboardContainerRef?.current && !keyboardContainerRef?.current?.contains(event.target)) {
    setIsKeyboardOpen(false);
   }
  };

  document.addEventListener('mousedown', handleClickOutside);

  return () => {
   document.removeEventListener('mousedown', handleClickOutside);
  };
 }, []);


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
 return (
   <Grid>
    <Grid.Col span={12}>
     <h1>{signalsData?.getSignals?.[0]?.name}</h1>
    </Grid.Col>
    <Grid.Col span={6}>
     {
      <LineGraph
       data={graphData.length > 0 ? graphData : signalsData?.getSignals?.[0]?.sample_results_for_graph?.samples}
       name={signalsData?.getSignals?.[0]?.fullPath ?? 'null'}/>
    }
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
        onFocus={() => setIsKeyboardOpen(true)}
      />
      {isKeyboardOpen && (
       <Affix position={{bottom:0}} style={{width:'100%'}} ref={keyboardContainerRef}>
        <Keyboard
          keyboardRef={(r) => (keyboardRef.current = r)}
          onChange={handleKeyboardInputChange}
          onKeyPress={onKeyPress}
          useTouchEvents={true}
          useMouseEvents={true}
          layoutName={layout}
        />
       </Affix>)}
     </Grid.Col>
     <Grid.Col span={12}>
      <Group>
       <Button onClick={handleSubmit} size={"xl"} autoContrast={true}>Add</Button>
       <Button onClick={handleClear} size={"xl"} autoContrast={true}>Clear</Button>
       <Button onClick={handlePollSubmit} size={"xl"} autoContrast={true}>Poll</Button>
      </Group>

     </Grid.Col>

    </Grid.Col>
    <Grid.Col span={12} h={140}/>

   </Grid>
 );
};
