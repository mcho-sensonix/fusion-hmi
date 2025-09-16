import { gql } from '@apollo/client';

export const GetGroupListQuery = gql`
  query getGroupList($parentGroup: GroupPath!, $filter: PropertiesFilterInput) {
    getFilteredGroups(parentGroup: $parentGroup, input: $filter) {
      id
      name
      fullPath
      properties
      signals {
        id
        name
        fullPath
        properties
        __typename
          MostRecentSample {
              value
              __typename    
              timestamp
              arrival_timestamp
          }
      }
      child_groups {
        id
        name
        properties
        fullPath
        __typename
      }
      __typename
    }
  }
`;
