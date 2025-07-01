// import './Counter.css';
import {Group, Button, Text, Grid, Center, GridCol, ActionIcon} from '@mantine/core';
import React, { useState } from 'react';
import {IconCaretUpFilled, IconCaretDownFilled} from '@tabler/icons-react';
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);
  const reset = () => setCount(0);

  return (
    <Center>
      <Grid span={12}>
        <Grid.Col span={12}>
          <h1>Line 1 Station 1 Part Count</h1>
        </Grid.Col>
        <Grid.Col span={12}><Text size="xl">Count: {count}</Text></Grid.Col>
        <Grid.Col span={12}>
          <Group>
            <ActionIcon onClick={increment}>
              <IconCaretUpFilled />
            </ActionIcon>
            <ActionIcon onClick={decrement}>
              <IconCaretDownFilled />
            </ActionIcon>
            <Button onClick={reset}>Reset</Button>
          </Group>
        </Grid.Col>
      </Grid>
    </Center>
  );
}
export default Counter;