import React from 'react';
import {useCachedOrFetchGroup} from "../useCachedOrFetchGroup.ts";
import {getParentGroupPathFromGroupPath} from "../helpers.ts";
import {ActionIcon, Breadcrumbs, Button, Pill} from "@mantine/core";
import { IconRecharging } from "@tabler/icons-react";
import {IconCast} from "@tabler/icons-react";

export type SensorStubProps = {
  group?: unknown | null;
  withGateway: boolean;
};
export function SensorCrumb({ group, withGateway = false }: SensorStubProps) {
  const { group: parentGroup, loading } = useCachedOrFetchGroup(
    getParentGroupPathFromGroupPath(group?.fullPath),
    { skip: !withGateway }
  );
  return (
    <>
      {withGateway && (
        <>
          <Breadcrumbs>
            <Button basic size={'small'} leftSection={
              <IconCast name={'microchip'} color={'blue'} />}>
              {parentGroup?.properties?.['displayName'] ?? parentGroup?.name}
            </Button>
          </Breadcrumbs>
          <Breadcrumbs />
        </>
      )}
      <Breadcrumbs>
        <Button variant="filled" radius="xl" color="green" leftSection={
            <IconRecharging name='power cord' />}>
          {group?.name}
        </Button>
      </Breadcrumbs>
    </>
  );
}
