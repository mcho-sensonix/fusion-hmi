import React from 'react';
import {
  CommonProperties,
  GatewayCrumb,
  SensorCrumb,
} from '../../groups';
import {ActionIcon, Breadcrumbs, Button, Pill} from "@mantine/core";
import {IconSitemapFilled} from "@tabler/icons-react";
export type GroupStubProps = {
  group?: unknown | null;
  withParent?: boolean;
};
export function GroupCrumb({ group, withParent = false }: GroupStubProps) {
  if (!group) return null;
  const groupObjectType =
    group?.properties?.[CommonProperties.CDS__ObjectType] ?? null;
  return groupObjectType === 'gateway' ? (
    <GatewayCrumb group={group} />
  ) : groupObjectType === 'sensor' ? (
    <SensorCrumb group={group} withGateway={withParent} />
  ) : (
    <Breadcrumbs>
      <Button size={'small'} color={'orange'} leftSection={
        <IconSitemapFilled name='sitemap' /> }>{group?.name}
      </Button>
    </Breadcrumbs>
  );
}
