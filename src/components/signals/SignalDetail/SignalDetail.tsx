import styles from './signalDetail.module.css';
import React, {type MouseEventHandler, useState } from 'react';
import { DateTime } from 'luxon';
import {Popover, Table, Text} from "@mantine/core";
import {getDisplayableProperties} from "../helpers.ts";
import {IconCopy} from "@tabler/icons-react";
import type {Signal} from "../types.ts";
export type SignalDetailProps = {
  signal: Signal;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
};
export function SignalDetail({
  signal,
}: SignalDetailProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const displayName = signal?.properties.displayName
      ? signal?.properties.displayName
      : signal?.name,
    properties = getDisplayableProperties(signal?.properties);

  const copy = () => {
    navigator.clipboard
      .writeText(signal?.fullPath ?? '')
      .then(() => setCopied(() => true));
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyItems: 'flex-end' }} onClick={copy}>


        <b> {displayName} </b>

        <Popover>
          <Popover.Target>
            <IconCopy
              name={copied ? 'check' : 'copy'}
              className={'blue'}
              style={{
                marginLeft: 'auto',
                paddingLeft: '.5em',
                width: '1.25em',
              }}
            />
          </Popover.Target>
          <Popover.Dropdown>
            copied ? (
              <span>
                <b>Copied path: </b>
                {signal?.fullPath}
              </span>
            ) : (
              <span>
                <b>Click to copy this signal's full path: </b>
                {signal?.fullPath}
              </span>
            )
          </Popover.Dropdown>
        </Popover>
      </div>
      {properties.description && <Text>{properties.description}</Text>}

      <div className={styles.valueSectionWrapper}>
        {/*<p>Last Value</p>*/}
        <div className={styles.valueSection}>{signal?.MostRecentSample?.value}
        </div>

        <div className={styles.lastValueTime}>
          <span>
            {DateTime.fromISO(signal?.MostRecentSample?.timestamp).toFormat(
              'hh:mm:ss'
            )}
          </span>
          <span>
            {DateTime.fromISO(signal?.MostRecentSample?.timestamp).toFormat(
              'yy-MM-dd '
            )}
          </span>
        </div>
      </div>
      {Object.entries(properties).length > 0 && (
        <div
          style={{ fontSize: '.75em', lineHeight: '.75em', marginTop: '1em' }}
        >
          <Table >
            <Table.Thead>
              <Table.Th>Property</Table.Th>
              <Table.Th>Value</Table.Th>
            </Table.Thead>
            <Table.Tbody>
              {Object.entries(properties).map(([property, value]) => (
                <Table.Tr>
                  <Table.Td>
                    <b>{property}</b>
                  </Table.Td>
                    <Table.Td><Text lineClamp={1}>{JSON.stringify(value)}</Text></Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
