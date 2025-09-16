import { gql } from '@apollo/client';

export const SignalWithParent_Fragment = gql`
  fragment SignalWithParent_Fragment on Signal {
    id
    name
    fullPath
    properties
    MostRecentSample {
      timestamp
      arrival_timestamp
      value
      #        __typename
    }
    group {
      id
      name
      properties
    }
  }
`;
