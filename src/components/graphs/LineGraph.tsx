import {LineChart} from '@mantine/charts';

export function LineGraph(props) {
 const {data, name} = props;
 const parseData = data?.map((dataPoint) => (
   typeof dataPoint?.[name] === 'string' ?
     {...dataPoint, [name]: parseInt(dataPoint?.[name])}
     : dataPoint
 ));
 const formattedData = data?.map( (p) => ({timestamp: (new Date(p.timestamp)).getTime(), value: parseInt(p.value.toString())}))

 return (
   <LineChart
     h={300}
     data={formattedData}
     dataKey="timestamp"
     xAxisProps={{type:"number",domain: ['dataMin', 'dataMax'], tickFormatter: (tick) => {
      console.log("tick", tick);
      return new Date(tick).toISOString()
     }
     }}
     yAxisProps={{domain: ['dataMin', 'dataMax'], type:"number"}}
     series={[{name: 'value', color: 'indigo.6'}]}
     curveType="linear"
     connectNulls
   />
 );
}