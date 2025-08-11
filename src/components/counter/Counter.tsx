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

      <Grid>
        <Grid.Col span={12}>
          <h1>Line 1 Station 1 Part Count</h1>
        </Grid.Col>
        <Grid.Col span={6}><Text size="xl">Count: {count}</Text></Grid.Col>
        <Grid.Col span={12}>
          <Group>
            <ActionIcon size="xl" onClick={increment}>
              <IconCaretUpFilled />
            </ActionIcon>
            <ActionIcon size="xl" onClick={decrement}>
              <IconCaretDownFilled />
            </ActionIcon>
            <Button size="xl" onClick={reset}>Reset</Button>
          </Group>
        </Grid.Col>
      </Grid>
  );
}
export default Counter;