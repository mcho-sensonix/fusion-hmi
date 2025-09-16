import React from 'react';
import { useFragment } from '@apollo/client';
import {ActionIcon, Pill, Button} from "@mantine/core";
import {IconRouter} from "@tabler/icons-react";
export type GatewayStubProps = {
  group?: unknown | null;
};
export function GatewayCrumb({ group }: GatewayStubProps) {
  const gatewayUid = group?.name;


  const gatewayName = group?.properties?.['displayName'] ?? group?.name ?? null;


  return (

      <Button variant="filled" radius="xl" color="blue" leftSection={
      <IconRouter
        name={!gatewayName ? 'exclamation triangle' : 'microchip'}
        color={!gatewayName ? 'yellow' : 'blue'}
      />}>
      {gatewayName}
    </Button>
  );
}
