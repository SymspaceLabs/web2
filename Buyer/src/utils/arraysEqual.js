// src/utils/arraysEqual.js

/**
 * Helper function for shallow array comparison to avoid unnecessary re-renders.
 * Sorts arrays before comparison to handle different orderings.
 * @param {Array} a - First array to compare.
 * @param {Array} b - Second array to compare.
 * @returns {boolean} True if arrays are equal, false otherwise.
 */
export function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) return false;
  }
  return true;
}
