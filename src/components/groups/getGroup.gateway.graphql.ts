import { gql } from '@apollo/client';

export const GET_GROUP_BY_PATH = gql`
  query GET_GROUP_BY_PATH($groupPath: GroupPath!) {
    getGroup(groupPath: $groupPath) {
        __typename
        name
        fullPath
        properties
        signals {
            name
            fullPath
            properties
            MostRecentSample {
                value
                timestamp
            }
        }
    
    }
  }
`;
