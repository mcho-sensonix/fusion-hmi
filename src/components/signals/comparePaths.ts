const AliasRegex = /\$([a-zA-Z0-9\-_]+)\//;

/**
 * Compares two signal or group paths to determine if they would resolve to the same path.
 * Consider the examples,
 * ------------------ Example 1
 * /a-2/c-1/c-999/c-1000/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 * $fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 * ------------------ Example 2
 * $fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 * /a-2/c-1/c-999/c-1000/fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 * ------------------ Example 3
 * $fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 * $fa51abf1-c0d2-4eb6-bc14-a0945581fa61/Sensor1/ZV
 *
 * should resolve to the same path.
 *
 * @param signalPath1
 * @param signalPath2
 */
export function pathsAreEqual(
  signalPath1: string,
  signalPath2: string
): boolean {
  if (signalPath1 === signalPath2) return true; // trivial case where the signals are string-equal

  const alias1 = AliasRegex.exec(signalPath1)?.[1], // will be the alias name or undefined
    alias2 = AliasRegex.exec(signalPath2)?.[1];

  if (alias1) {
    const [, s1] = signalPath1.split(alias1);
    const [, s2] = signalPath2.split(alias1);

    return s1 === s2;
  }
  if (alias2) {
    const [, s1] = signalPath1.split(alias2);
    const [, s2] = signalPath2.split(alias2);

    return s1 === s2;
  }

  return false;
}
