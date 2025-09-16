import { useFragment, useApolloClient } from '@apollo/client';
import { Signal_FragmentFragment } from 'src/api/types/api-gateway/graphql';
import { Signal_Fragment } from 'src/components/signals/signal-fragment.gateway.graphql';
import { useMemo } from 'react';

export function useCachedSignal(signalPath?: string | null) {
  const {
    data: signal,
    missing,
    complete,
  } = useFragment<Signal_FragmentFragment>({
    from: { __typename: 'Signal', fullPath: signalPath },
    fragment: Signal_Fragment,
  });
  const units = signal?.properties?.['unit'] ?? signal?.properties?.['units'];

  return {
    signal,
    missing,
    complete,
    units,
  };
}
export function useCachedSignals(signalPaths?: string[], indices?: number[]) {
  const client = useApolloClient();

  const cachedSignals = useMemo(
    () =>
      signalPaths?.map((signalPath) =>
        client.readFragment<Signal_FragmentFragment>({
          id: `Signal:{"fullPath":"${signalPath}"}`,
          fragment: Signal_Fragment,
        })
      ),
    [signalPaths]
  );

  return signalPaths?.map((signalPath, i) => ({
    fullPath: signalPath,
    missing: cachedSignals?.[i] === null,
    signal: cachedSignals?.[i],
    index: indices?.[i],
    units:
      cachedSignals?.[i]?.properties?.['unit'] ??
      cachedSignals?.[i]?.properties?.['units'],
  }));
}
