import { useFragment } from '@apollo/client';

export function useCachedGroup(groupPath: string) {
  const {
    data: group,
    missing,
    complete,
  } = useFragment{
    from: { __typename: 'Group', fullPath: groupPath },
    fragment: 'Group_Fragment',
  });
  const objectType = group?.properties?.['CDS_ObjectType'] as string;

  return {
    group,
    missing,
    complete,
    objectType,
  };
}
