import {
 IconArrowDownRight,
 IconArrowUpRight,
 IconCoin,
 IconDiscount2,
 IconReceipt2,
 IconUserPlus,
    IconTag,
    IconNetwork
} from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import classes from './StatsGrid.module.css';
import {useSignal} from "../../hooks/useSignal.ts";

const icons = {
 user: IconUserPlus,
 discount: IconDiscount2,
 receipt: IconReceipt2,
 coin: IconCoin,
};


export function StatsGrid() {

    const {signal: platformSignal, lastValue: platformLastValue} = useSignal({signalPath: '$solid/hardwareMetrics/platform', pollInterval: 600000})
    console.log("platformSignal", platformSignal)
    const {hostname, platform, os, ip_address} = platformSignal?.properties ?? {}
    const data = [
        { title: 'Hostname', icon: IconTag, value: hostname },
        { title: 'OS', icon: IconUserPlus, value: os },
        { title: 'IP Address', icon: IconNetwork, value: ip_address },
        { title: 'Platform', icon: IconArrowUpRight, value: platform },
    ]
    const stats = data.map((stat) => {
      const Icon = stat.icon;
      // const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

      return (
        <Paper withBorder p="md" radius="md" key={stat.title}>
         <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
           {stat.title}
          </Text>
          <Icon className={classes.icon} size={22} stroke={1.5} />
         </Group>

         <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>

         </Group>

        </Paper>
      );
     });
     return (
       <div className={classes.root}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
       </div>
     );
}