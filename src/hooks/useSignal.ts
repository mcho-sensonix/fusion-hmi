import {useQuery} from "@apollo/client";
import {getSignalQuery} from "./useSignal.graphql.ts";

export type UseSignalProps = {
    signalPath: string;
    pollInterval: number;
    range_selection?: {start_time: Date; end_time: Date}
};

export function useSignal({signalPath, pollInterval, range_selection}: UseSignalProps) {
  const {data: signalData, loading: signalLoading, error: signalError} = useQuery(
      getSignalQuery,
      {
          variables: {signal: signalPath},
          pollInterval,
      }
  );

  return {
      signal: signalData?.getSignal ?? null,
      lastValue: signalData?.getSignal?.MostRecentSample?.value ?? null,
      lastTimestamp: signalData?.getSignal?.MostRecentSample?.timestamp ?? null,
      loading: signalLoading,
      error: signalError
  };
}