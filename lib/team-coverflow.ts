/**
 * Position a distinct team member relative to the current selection.
 *
 * With two people there is only one neighbour. Keep that neighbour on the
 * right consistently rather than alternating sides on a wrap.
 */
export function teamCoverflowOffset(index: number, active: number, total: number): number {
  if (total <= 1 || index === active) return 0;
  if (total === 2) return 1;

  let distance = index - active;
  if (distance > total / 2) distance -= total;
  if (distance < -total / 2) distance += total;
  return distance;
}

export function teamAutoplayEnabled(total: number, reducedMotion: boolean): boolean {
  return total >= 3 && !reducedMotion;
}
