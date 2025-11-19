function normalizeRateChange(change: string): number {
  if (!change) return 0;

  // Extract percentage inside parentheses
  const match = change.match(/\(([-+]?[0-9.]+)%\)/);

  if (!match) return 0;

  return parseFloat(match[1]);
}
