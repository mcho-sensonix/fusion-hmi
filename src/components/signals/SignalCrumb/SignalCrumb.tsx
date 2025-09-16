import React, { useState } from 'react';

import { SignalDetail } from '../SignalDetail';
import type {StatusColor} from "../types.ts";
import {ActionIcon, Breadcrumbs, Pill, Popover} from "@mantine/core";

export type SignalCrumbProps = {
  signal: unknown;
  withBackground?: boolean;
  withDivider?: boolean;
  withIcon?: string;
  withStatus?: StatusColor;
};
export function SignalCrumb({
  signal,
  withIcon,
  withBackground = true,
  withDivider = false,
  withStatus,
}: SignalCrumbProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const displayName = signal?.properties.displayName
    ? signal?.properties?.displayName
    : signal?.name;
  const Wrapper = withBackground ? Pill : <div />;
  return (
    <div style={{ color: 'white' }}>
      <Popover>
          <Popover.Target>
          <Wrapper
            circular
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
              />
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
              as={'span'}
              active
              style={{ color: 'white' }}

              // onMouseEnter={() => setPopupOpen(true)}
            >
              {displayName}
            </Breadcrumbs>
          </Wrapper>
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
