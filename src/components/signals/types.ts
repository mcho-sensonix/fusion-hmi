export type StatusColor =
  | 'red'
  | 'red2'
  | 'yellow'
  | 'yellow2'
  | 'orange'
  | 'orange2'
  | 'blue'
  | 'green'
  | 'green2'
  | 'grey';

export type MostRecentSample = {
    value: number | string;
    timestamp: Date
    arrival_timestamp: Date
}
export type Signal = {
    id?: number;
    name: string;
    fullPath: string;
    properties: Record<string, any>;
    datatype: string;
    MostRecentSample?: MostRecentSample
}