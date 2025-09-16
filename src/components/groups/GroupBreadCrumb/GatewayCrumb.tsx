import React from 'react';
import { useFragment } from '@apollo/client';
import {ActionIcon, Pill, Button} from "@mantine/core";
import {IconRouter} from "@tabler/icons-react";
import type {Group} from "../types.ts";
export type GatewayStubProps = {
  group?: Group | null;
};
export function GatewayCrumb({ group }: GatewayStubProps) {


  const gatewayName = group?.properties?.['displayName'] as string ?? group?.name ?? null;


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
