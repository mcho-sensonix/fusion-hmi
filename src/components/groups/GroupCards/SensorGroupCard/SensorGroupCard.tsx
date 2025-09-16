import styles from './SensorCard.module.css';
import { DateTime } from 'luxon';
import React, { useState } from 'react';
import {Paper, Skeleton, Table, Text} from "@mantine/core";
import {SignalRow} from "../../../signals/SignalRow";
import {useCachedOrFetchGroup} from "../../useCachedOrFetchGroup.ts";

export type SensorGroupCardProps = {
  groupPath: string;
  gateway: any;
  alarms: any;
  refetch: any;
};
export function SensorGroupCard({
  groupPath,
  gateway,
  alarms,
  refetch,
}: SensorGroupCardProps) {

  const [showOtherRegisters, setShowOtherRegisters] = useState(false);


  const {
    group,
      loading,
  } = useCachedOrFetchGroup(groupPath, {})
  const lastReportDate = group?.signals?.reduce((latest, current) => {
    const currentDate = DateTime.fromJSDate(
      current?.MostRecentSample?.timestamp
    );
    return currentDate > latest ? currentDate : latest;
  }, DateTime.fromMillis(-Infinity));
  const statusSignal = group?.signals?.find(
    (signal) => signal?.name === 'status'
  );
  return (
    <Paper
      // @ts-expect-error duration not defined on SegmentGroupProps
      duration={100}
      animation='slide down'
      stacked={!showOtherRegisters}
      className={styles.sensorObjectContainer}
    >
      {/*@ts-expect-error style not defined on SegmentProps*/}
      <Paper compact style={{ backgroundColor: 'white' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          data-testid='sensor-header'
        >
          <Text
            title={`Last checked: ${lastReportDate?.toLocaleString(
              DateTime.DATETIME_FULL_WITH_SECONDS
            )}`}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '95%',
              alignItems: 'center',
              margin: 'auto',
            }}
          >
            <div
              className={
                styles.sensorMetaTitle
              }
            >
              {!loading ? (
                  <Text>{group?.properties?.displayName ?? group?.name}</Text>

              ) : (
                <Skeleton>
                  <Skeleton height={8} radius="xl"/>
                </Skeleton>
              )}
            </div>
            <Text>
              {statusSignal == null ? (
                <p className='grey'></p>
              ) : statusSignal?.MostRecentSample?.value === 0 ? (
                <p className='green'>Connected</p>
              ) : (
                <p className='red'>Disconnected</p>
              )}
            </Text>
          </Text>

        </div>
        <Table >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Options</Table.Th>
              <Table.Th>Signal Name</Table.Th>
              <Table.Th>Value</Table.Th>
              <Table.Th>Last Report</Table.Th>
              <Table.Th>Alarm</Table.Th>
            </Table.Tr>
          </Table.Thead>
          {group?.signals
            ?.filter(
              (signal) =>
                signal?.properties?.signalIndex &&
                signal.properties.signalIndex != 1 &&
                signal.properties.signalIndex < 100
            )
            .sort(
              (signal1, signal2) =>
                signal1?.properties?.signalIndex -
                signal2?.properties?.signalIndex
            )
            .map((signal) => {
              return (
                <SignalRow
                  signal={signal}
                  gateway={gateway}
                  key={signal?.name}
                  summary={false}
                  refetch={refetch}
                />
              );
            })}
        </Table>
      </Paper>
    </Paper>
  );
}
