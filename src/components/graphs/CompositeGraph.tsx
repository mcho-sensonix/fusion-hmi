import { CompositeChart } from '@mantine/charts';
import { data } from './compositegraph_data';

export function CompositeGraph() {
 return (
   <CompositeChart
     h={300}
     data={data}
     dataKey="date"
     yAxisProps={{ domain: [0, 100] }}
     referenceLines={[
      { y: 1200, label: 'Average sales', color: 'red.6' },
      { x: 'Mar 25', label: 'Report out', color: 'blue.7' },
     ]}
     maxBarWidth={30}
     series={[
      { name: 'Tomatoes', color: 'rgba(18, 120, 255, 0.2)', type: 'bar' },
      { name: 'Apples', color: 'red.8', type: 'line' },
     ]}
   />
 );
}