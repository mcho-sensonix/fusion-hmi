
const SITE_ID_REGEX =
  /[\/$]([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})/i;

export function getSiteIdFromPath(path: string): string | null {
  const match = SITE_ID_REGEX.exec(path);

  return match ? match[1] : null;
}

export function getParentGroupPathFromGroupPath(
  path: string | undefined
): string | null {
  return path?.split('/').toSpliced(-2, 1).join('/') ?? null;
}
