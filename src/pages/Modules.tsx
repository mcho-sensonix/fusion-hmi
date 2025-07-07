import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, AppShell, Input, Button, Grid, Text, Group} from "@mantine/core";
import {IconCaretDownFilled, IconCaretUpFilled, IconMenu2} from "@tabler/icons-react";
// import Counter from "../components/counter/Counter.tsx";
import {CompositeGraph} from "../components/graphs/CompositeGraph.tsx";
import {LineGraph} from "../components/graphs/LineGraph.tsx";
import React, {useState} from "react";

export function ModulesPage() {
 const [opened, { toggle }] = useDisclosure();
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
 return (
   <Grid>
    <Grid.Col span={12}>
     <h1>Line 1 Station 1 Part Count</h1>
    </Grid.Col>
    <Grid.Col span={12}>
     <Input
       placeholder="Enter value"
       value={inputValue}
       onChange={handleInputChange}
     />
     <Button onClick={handleSubmit} >Add</Button>
     <LineGraph data={graphData}/>
    </Grid.Col>
    <Grid.Col span={12} h={140}/>
    <Grid.Col span={12}>
     <CompositeGraph/>
    </Grid.Col>
   </Grid>
 );
};
