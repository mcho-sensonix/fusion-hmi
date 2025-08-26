// import './Counter.css';
import {Group, Button, Text, Grid, Center, GridCol, ActionIcon, LoadingOverlay} from '@mantine/core';
import React, {useEffect, useState} from 'react';
import {IconCaretUpFilled, IconCaretDownFilled} from '@tabler/icons-react';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client";
import {getFilteredSignalsQuery, getSignalsQuery, insertSampleQuery} from "../modules/modules.graphql.ts";

function Counter() {
 const [count, setCount] = useState(0);

 const {data: signalsData, error: signalsError, loading: signalsLoading} = useQuery(
   getSignalsQuery,
   {
    variables: {
     signals: `$asset_twin/modules/part-counting/part-count`
    },
    // pollInterval: 5000
   }
 );

 const [insertSample, {data: insertSampleData, error: insertSampleError, loading: insertSampleLoading}] = useMutation(
   insertSampleQuery,
     {
      refetchQueries: [getSignalsQuery]
     }
 );


 const increment = async () => {

  const newCount = count + 1
  setCount(() => newCount);
  await insertSample({
   variables: {
    signal: '$asset_twin/modules/part-counting/part-count',
    sample: {value: (newCount).toString(), timestamp: new Date()},
   }
  });
 }
 const decrement = async () => {
  const newCount = count - 1
  setCount(() => newCount);
  await insertSample({
   variables: {
    signal: '$asset_twin/modules/part-counting/part-count',
    sample: {value: newCount.toString(), timestamp: new Date()},
    __typename:	"SignalMostRecentSample"

   }
  });
 }
 const reset = async () => {
  setCount(0)
  await insertSample({
   variables: {
    signal: '$asset_twin/modules/part-counting/part-count',
    sample: {value: "0", timestamp: new Date()},
   }
  });
 }

 useEffect(() => {
  // getSignalsData({
  //  variables: {
  //   signals: ['$asset_twin/modules/part-counting/part-count',]
  //  }, fetchPolicy: 'cache-and-network'
  // });
 }, [count]);

 return (

   <Grid>
    <Grid.Col span={12}>
     <h1>Line 1 Station 1 Part Count</h1>
    </Grid.Col>
    <Grid.Col span={6}>
        <LoadingOverlay visible={signalsLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Text size={"3em"}>Count: {signalsData?.getSignals?.[0]?.MostRecentSample?.value ?? count}</Text>
    </Grid.Col>
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
    </Grid.Col>


     <Button size="xl" onClick={reset} style={{color: "#000000"}}>Reset</Button>


   </Grid>
 );
}

export default Counter;