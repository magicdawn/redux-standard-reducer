import assert from 'assert'
import _mergeWith from 'lodash.mergewith'
import update from 'immutability-helper'

// export `update`
export { update }

// lodash, mergeWith
export const customMerger = (cur, newValue) => {
  if (Array.isArray(newValue)) {
    return newValue
  }

  // make `state.obj === mergeState(state).obj`
  if (newValue && typeof newValue === 'object' && !cur) {
    return newValue
  }
}

export function mergeState(...args) {
  // mergeState()
  // mergeState(state)
  if (args.length <= 1) {
    return args[0]
  }

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
  if (!action || !action.type) return state

  // STANDARD_MERGE_STATE
  const ok =
    action.type.startsWith('STANDARD_MERGE_STATE') || Boolean(action.standard)
  if (!ok) return state

  // use immutability-helper `update`
  if (action.update) {
    if (typeof action.update !== 'object') {
      throw new Error('expect standard action.update = object')
    }
    state = update(state, action.update)
  }

  // merge
  if (action.payload) {
    state = mergeState(state, action.payload)
  }

  return state
}
