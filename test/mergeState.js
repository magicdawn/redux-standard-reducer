import assert from 'assert'
import { mergeState } from '../src/index'

describe('mergeState', function() {
  it('nothing to merge', function() {
    const state = { sub: { list: [], obj: {} } }
    const $new = mergeState(state)
    assert($new === state)
  })

  it('should not change', function() {
    const state = { sub: { list: [], obj: {} } }
    const $new = mergeState(state, { sub: { list: [1] } })

    // obj should not change
    assert($new.sub.obj === state.sub.obj)
  })

  it('should merge rigth', function() {
    const state = { sub: { list: [], obj: {} } }
    const $new = mergeState(state, { sub: { obj: null } })

    // obj should not change
    assert(!$new.sub.obj)
  })
})
