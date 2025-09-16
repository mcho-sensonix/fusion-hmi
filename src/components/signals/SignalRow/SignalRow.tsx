import React from 'react';
import { DateTime } from 'luxon';

import { SignalCrumb } from '../SignalCrumb';
import { Table } from "@mantine/core";

interface SignalRowProps {
  register?: object; // signal
  gateway?: object;
  refetch?: any;
  regRefetch?: any;
  summary?: boolean;
  // signalPath: string;
  signal: any;
  registernamemap?: any;
}


export function SignalRow(props: SignalRowProps) {
  const {
    // register = {}, // signal
    summary = false,
    signal = {},
  } = props;


  const lastReportDate = DateTime.fromISO(signal?.MostRecentSample?.timestamp);

  return (
    <Table.Tr key={signal.id} data-testid='signal-row'>
      { !summary ? (
        <>
          <Table.Td title={'Update the cloud settings for this register.'}>
              #{signal?.properties?.registerNumber}

          </Table.Td>
        </>
      ) : null}
      <Table.Td data-testid={'register-row-name-cell'}>
        <SignalCrumb signal={signal} withDivider/>
      </Table.Td>
      <Table.Td
        title={`Raw Value: ${signal?.MostRecentSample?.value} ${signal?.properties?.units}`}
      >
        <span style={{ fontWeight: 'bold' }}>
         {signal?.MostRecentSample?.value}
        </span>
        <span style={{ fontVariantPosition: 'sub' }}>
          {signal?.properties?.units}
        </span>
      </Table.Td>
      <Table.Td>
        <p
          title={lastReportDate?.toLocaleString(
            DateTime.DATETIME_FULL_WITH_SECONDS
          )}
        >
          {lastReportDate?.toRelative?.()}
        </p>
      </Table.Td>
    </Table.Tr>
  );
}
