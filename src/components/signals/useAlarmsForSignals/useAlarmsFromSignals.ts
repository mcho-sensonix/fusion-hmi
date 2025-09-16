import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import {
  Get_Alarms_For_Graphed_SignalsQuery,
  Get_Alarms_For_Graphed_SignalsQueryVariables,
} from 'src/api/types/graphql';
import { GET_ALARMS_FOR_GRAPHED_SIGNALS } from 'src/uikit/MultiGraph/multiGraph.graphql';

export function useAlarmsFromSignals(
  signalFullPaths: (string | null | undefined)[] | undefined
) {
  const normalizedSignalPaths =
    signalFullPaths?.filter((s) => s !== null && s !== undefined) ?? [];

  const { data, loading, error } = useQuery<
    Get_Alarms_For_Graphed_SignalsQuery,
    Get_Alarms_For_Graphed_SignalsQueryVariables
  >(GET_ALARMS_FOR_GRAPHED_SIGNALS, {
    variables: { signalFullPaths: normalizedSignalPaths },
    skip: normalizedSignalPaths.length === 0,
  });

  const signalAlarmMap: Map<string, any> = useMemo(() => {
    const _signalAlarmMap = new Map<string, any>();

    for (const signalPath of normalizedSignalPaths) {
      (data?.allRegisternamemaps ?? []).forEach((regNameMap) => {
        if (
          regNameMap?.signalname === signalPath &&
          regNameMap?.alarmdefinitions.length > 0
        ) {
          _signalAlarmMap.set(signalPath, regNameMap?.alarmdefinitions);
        }
      });
    }
    return _signalAlarmMap;
  }, [data?.allRegisternamemaps, normalizedSignalPaths]);

  return {
    registersWithAlarms: signalAlarmMap,
    loading,
    error,
  };
}
