import _mergeWith from 'lodash.mergewith'

// lodash, mergeWith
export const customMerger = (cur, newValue) => {
  if (Array.isArray(newValue)) {
    return newValue
  }
}

export function mergeState(...args) {
  return _mergeWith({}, ...args, customMerger)
}

/**
 * handle
 * {
 *  type: STANDARD_MERGE_STATE_XXX
 *  payload: { to be merged }
 * }
 *
 * or
 * {
 *  type: XXX,
 *  standard: true,
 *  payload: {xxx}
 * }
 */

export default function standardReducer(state, action) {
  if (!action || !action.type || !action.payload) return state

  // STANDARD_MERGE_STATE
  const ok =
    action.type.startsWith('STANDARD_MERGE_STATE') || Boolean(action.standard)
  if (!ok) return state

  return mergeState(state, action.payload)
}
