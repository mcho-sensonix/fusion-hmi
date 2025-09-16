import React, { useState } from 'react';
import {  useQuery } from '@apollo/client';
import { GetGroupListQuery } from './nestedgroup.gateway.graphql';
import { IconChevronDown, IconChevronUp, IconRecharging } from '@tabler/icons-react';
import { GroupCrumb } from '../../GroupBreadCrumb';
import {ActionIcon, Paper, Table} from "@mantine/core";
import {SignalRow} from "../../../signals/SignalRow";

export function CollapsibleListItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: additionalGroupData,
    error,
    loading,
  } = useQuery(GetGroupListQuery, {
    variables: {
      parentGroup: item?.fullPath.endsWith('/')
        ? item?.fullPath
        : `${item?.fullPath}/`,
      filter: { key: '__', exists: false},
    },
    context: { clientName: 'signals-client' },
    fetchPolicy: 'cache-and-network',
    skip: !isOpen,
      pollInterval: 10000,
  });

  const toggleOpen = async () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div
        onClick={toggleOpen}
        style={{
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '.5em',
          marginBottom: '.5em',
          display: 'flex',
        }}
      >
        <GroupCrumb group={item} />
        {(additionalGroupData?.getFilteredGroups?.length || item?.signals) &&
        isOpen ? (
          <IconChevronDown />
        ) : (
          <IconChevronUp />
        )}
      </div>

      <div
        style={{
          borderLeft: '1px dotted #ccc',
        }}
      >
        {isOpen && (
          <div
            style={{
              marginLeft: '20px',
              // borderLeft: '1px dotted #ccc',
              paddingLeft: '1em',
            }}
          >
            <div id={'group-details'}>
              <Paper>
                <Table>
                  <Table.Thead>
                    <Table.Th>Property</Table.Th>
                    <Table.Th>Value</Table.Th>
                  </Table.Thead>
                  <Table.Tbody>
                    {Object.entries(item?.properties ?? {}).map(
                      ([key, value]) => (
                        <Table.Tr>
                          <Table.Td>{key}</Table.Td>
                          <Table.Td>{value?.toString?.() ?? ''}</Table.Td>
                        </Table.Tr>
                      )
                    )}
                  </Table.Tbody>
                </Table>
              </Paper>
            </div>
            {item?.signals?.length > 0 && (
              <>
                <h2>Signals</h2>
                <Table>
                  {item?.signals?.map(
                    (signal) => signal && <SignalRow signal={signal} />
                  )}
                </Table>
              </>
            )}
          </div>
        )}
        {additionalGroupData?.getFilteredGroups?.length > 0 && isOpen && (
          <div style={{ marginLeft: '20px' }}>
            {additionalGroupData?.getFilteredGroups?.map((child, index) => (
              <CollapsibleListItem key={child?.fullPath || index} item={child} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
