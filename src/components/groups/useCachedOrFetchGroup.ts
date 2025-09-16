import {  useQuery } from '@apollo/client';
import {GET_GROUP_BY_PATH} from "./getGroup.gateway.graphql.ts";

export function useCachedOrFetchGroup(
  groupPath: string | undefined | null,
  options
) {
  const { data, loading } = useQuery(GET_GROUP_BY_PATH, {
    variables: { groupPath: groupPath },
    context: { clientName: 'signals-client' },
    fetchPolicy: 'cache-first',
    ...options,
  });
  const group = data?.getGroup ?? null;
  const objectType = group?.properties?.['CDS_ObjectType'] as string;

  return {
    group,
    loading,
    objectType,
  };
}
