import React from 'react';
import { Breadcrumb, BreadcrumbDivider } from 'semantic-ui-react';
import { Maybe, Signal } from 'src/api/types/api-gateway/graphql';
import { GroupCrumb } from 'src/components/groups';
import { SignalCrumb } from 'src/components/signals';

export type SignalPathProps = {
  signal: Maybe<Pick<Signal, 'fullPath' | 'name' | 'group'>>;
};
export function SignalPath({ signal }: SignalPathProps) {
  return (
    <Breadcrumb size={'big'}>
      <Breadcrumb.Section>
        <GroupCrumb group={signal?.group} />
      </Breadcrumb.Section>
      <BreadcrumbDivider />
      <Breadcrumb.Section>
        <SignalCrumb signal={signal} />
      </Breadcrumb.Section>
    </Breadcrumb>
  );
}
