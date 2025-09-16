import React from 'react';

import { SignalDetail } from '../SignalDetail';
import type {Signal, StatusColor} from "../types.ts";
import {ActionIcon, Breadcrumbs, Popover} from "@mantine/core";

export type SignalCrumbProps = {
  signal: Signal;
  withBackground?: boolean;
  withDivider?: boolean;
  withIcon?: string;
  withStatus?: StatusColor;
};
export function SignalCrumb({
  signal,
  withIcon,
  withDivider = false,
  withStatus,
}: SignalCrumbProps) {
  const displayName = signal?.properties.displayName
    ? signal?.properties?.displayName
    : signal?.name;
  return (
    <div style={{ color: 'white' }}>
      <Popover>
          <Popover.Target>
          <div

            style={{
              display: 'flex',
              backgroundColor: withStatus
                ? `var(--status-${withStatus})`
                : 'grey',
            }}
            // color={withStatus === 'green' ? '#00ff00' : 'grey'}
          >
            {withDivider && (
              <Breadcrumbs
                style={{
                  marginRight: '.25em',
                  marginLeft: '.5em',
                  color: 'white',
                }}
              >/</Breadcrumbs>
            )}
            {/*{withStatus && (*/}
            {/*  <div*/}
            {/*    style={{*/}
            {/*      backgroundColor: withStatus,*/}
            {/*      width: '.85em',*/}
            {/*      height: '.85em',*/}
            {/*      borderRadius: '1em',*/}
            {/*      marginTop: 'auto',*/}
            {/*      marginBottom: 'auto',*/}
            {/*    }}*/}
            {/*  />*/}
            {/*)}*/}
            {withIcon && <ActionIcon name={withIcon} />}
            <Breadcrumbs
              style={{ color: 'white' }}

              // onMouseEnter={() => setPopupOpen(true)}
            >
              {displayName}
            </Breadcrumbs>
          </div>
          </Popover.Target>
        {/*on={'click'}*/}
        {/*open={popupOpen}*/}
        {/*onClose={() => setPopupOpen(false)}*/}
        {/*onOpen={() => setPopupOpen(true)}*/}
        {/*mouseLeaveDelay={500}*/}
          <Popover.Dropdown>
          <div>
            <SignalDetail signal={signal} />
          </div>
          </Popover.Dropdown>
      </Popover>
    </div>
  );
}
