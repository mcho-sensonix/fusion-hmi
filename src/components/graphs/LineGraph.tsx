import { LineChart } from '@mantine/charts';

export function LineGraph(props) {
 const {data} = props;
 console.log('sup', data);
 return (
   <LineChart
     h={300}
     data={data}
     dataKey="t"
     series={[{ name: "/a-trak-ou56/c-2000/c-2001/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV", color: 'indigo.6' }]}
     curveType="linear"
     connectNulls
   />
 );
}