import { LineChart } from '@mantine/charts';

export function LineGraph(props) {
 const {data} = props;
 return (
   <LineChart
     h={300}
     data={data}
     dataKey="x"
     series={[{ name: 'y', color: 'indigo.6' }]}
     curveType="linear"
     connectNulls
   />
 );
}