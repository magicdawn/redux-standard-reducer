import { mergeState } from '../src/index'
import assert from 'assert'

describe('mergeState', function() {
  it('nothing to merge', function() {
    const state = { sub: { list: [], obj: {} } }
    const $new = mergeState(state)
    assert($new === state)
  })

  it('should not change', function() {
    const state = { sub: { list: [], obj: {} } }
    const $new = mergeState(state, { list: [1] })

    // obj should not change
    assert($new.sub.obj === state.sub.obj)
  })
})
