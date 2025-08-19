// import './Counter.css';
import {Group, Button, Text, Grid, Center, GridCol, ActionIcon} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {IconCaretUpFilled, IconCaretDownFilled} from '@tabler/icons-react';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {getFilteredSignalsQuery, getSignalsQuery, insertSampleQuery} from "../modules/modules.graphql.ts";

function Counter() {
 const [count, setCount] = useState(0);
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
     signals: `/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV`
    }
   }
 );

 const [insertSample, {data: insertSampleData, error: insertSampleError, loading: insertSampleLoading}] = useMutation(
   insertSampleQuery
 );


 const increment = async () => {

  const newCount = count + 1
  setCount(newCount);
  await insertSample({
   variables: {
    signal: '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
    sample: {value: (newCount).toString(), timestamp: new Date()},
   }
  });
 }
 const decrement = async () => {
  const newCount = count - 1
  setCount(newCount);
  await insertSample({
   variables: {
    signal: '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
    sample: {value: newCount.toString(), timestamp: new Date()},
   }
  });
 }
 const reset = async () => {
  setCount(0)
  await insertSample({
   variables: {
    signal: '/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',
    sample: {value: "0", timestamp: new Date()},
   }
  });
 }

 useEffect(() => {
  getSignalsData({
   variables: {
    signals: ['/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV',]
   }, fetchPolicy: 'cache-and-network'
  });
 }, [count]);

 return (

   <Grid>
    <Grid.Col span={12}>
     <h1>Line 1 Station 1 Part Count</h1>
    </Grid.Col>
    <Grid.Col span={6}><Text
      size={"3em"}>Count: {signalsData?.getSignals?.[0]?.MostRecentSample?.value}</Text></Grid.Col>
    <Grid.Col span={6}>
     <Grid.Col span={6}>
      <ActionIcon size="xl" style={{color: "#000000"}} onClick={increment}>
       <IconCaretUpFilled/>
      </ActionIcon>
     </Grid.Col>
     <Grid.Col span={6}>
      <ActionIcon size="xl" style={{color: "#000000"}} onClick={decrement}>
       <IconCaretDownFilled/>
      </ActionIcon>
     </Grid.Col>


     <Button size="xl" onClick={reset} style={{color: "#000000"}}>Reset</Button>

    </Grid.Col>

   </Grid>
 );
}

export default Counter;