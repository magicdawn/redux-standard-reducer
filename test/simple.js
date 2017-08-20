import standardReducer from '../src/index'
import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

describe('Simple', function() {
  it('It works', function() {
    const reducer = reduceReducers(
      standardReducer,
      combineReducers({
        partial1(state = { value: 1, foo: 'bar-1' }, action) {
          return state
        },

        partial2(state = { value: 2, foo: 'bar-2' }, action) {
          return state
        },
      })
    )

    let state = {}

    // init
    state = reducer(state, { type: 'init' })
    state.partial1.value.should.equal(1)
    state.partial2.value.should.equal(2)

    // using type = STANDARD_MERGE_STATE_
    state = reducer(state, {
      type: 'STANDARD_MERGE_STATE_MODIFY_PARTIAL1',
      payload: {
        partial1: {
          value: 'modifyed-1',
        },
      },
    })
    // console.log(state)
    state.partial1.value.should.equal('modifyed-1')
    state.partial1.foo.should.equal('bar-1') // unchanged

    // using action.standard
    state = reducer(state, {
      type: 'MODIFY_PARTIAL_2',
      standard: true,
      payload: {
        partial2: {
          value: 'modifyed-2',
        },
      },
    })
    state.partial2.value.should.equal('modifyed-2')
    state.partial2.foo.should.equal('bar-2') // unchanged
  })
})
