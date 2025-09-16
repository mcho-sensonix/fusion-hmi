import { gql } from '@apollo/client';

export const Signal_Fragment = gql`
  fragment Signal_Fragment on Signal {
    id
    name
    fullPath
    properties
    MostRecentSample {
      signal_id
      timestamp
      arrival_timestamp
      value
    }
  }
`;
