import * as _ from 'lodash';
const EXCLUDED_PROPERTIES = ['displayName', 'signalIndex'];

/**
 * Gets properties of a signal or group that should be displayed to the user.
 * For example, properties prefixed with CDS__ should be considered application data, not user-facing data.
 *
 * @param properties - A properties object, such as signal.properties
 */
export function getDisplayableProperties(properties: Record<string, string>) {
  return _.omitBy(
    properties ?? {},
    (v: string, k: string) =>
      k.startsWith('CDS__') || _.includes(EXCLUDED_PROPERTIES, k)
  );
}
