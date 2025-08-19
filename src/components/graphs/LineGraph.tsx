import {LineChart} from '@mantine/charts';

export function LineGraph(props) {
 const {data, name} = props;
 const parseData = data?.map((dataPoint) => (
   typeof dataPoint?.[name] === 'string' ?
     {...dataPoint, [name]: parseInt(dataPoint?.[name])}
     : dataPoint
 ));

 return (
   <LineChart
     h={300}
     data={parseData}
     dataKey="t"
     yAxisProps={{domain: ['dataMin', 'dataMax']}}
     series={[{name: name, color: 'indigo.6'}]}
     curveType="linear"
     connectNulls
   />
 );
}