import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GetGroupListQuery } from './nestedgroup.gateway.graphql';
import { CollapsibleListItem } from './CollapsibleListItem';

export function NestedGroupList({ group, level = 0, descendantLevel = 1 }) {
  const { data, error, loading } = useQuery(GetGroupListQuery, {
    variables: {
      parentGroup: group,
      filter: { key: '__', exists: false},
    },
    fetchPolicy: 'cache-first',
  });

  return (
    <div>
      {data?.getFilteredGroups?.map((item, index) => (
        <CollapsibleListItem key={index} item={item} />
      ))}
    </div>
  );
}
