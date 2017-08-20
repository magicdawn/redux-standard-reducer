import standardReducer from '../src/index'
import { combineReducers } from 'redux'
import reduceReducers from 'reduce-reducers'

describe('Simple', function() {
  let reducer
  let state

  beforeEach(() => {
    reducer = reduceReducers(
      standardReducer,
      (state = { arr: [] }, action) => state,
      combineReducers({
        partial1(state = { value: 1, foo: 'bar-1' }, action) {
          return state
        },

        partial2(state = { value: 2, foo: 'bar-2' }, action) {
          return state
        },
      })
    )

    // init
    state = {}
    state = reducer(state, { type: 'init' })
    state.partial1.value.should.equal(1)
    state.partial2.value.should.equal(2)
  })

  it('It works', function() {
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

  it('skip when not ok', function() {
    console.log(1111111111111111)
    // no action
    reducer(state, { foo: 'bar' }).partial2.value.should.equal(2)

    // no payload
    reducer(state, {
      type: 'STANDARD_MERGE_STATE',
    }).partial2.value.should.equal(2)

    // no payload
    reducer(state, {
      type: 'ABCD',
      standard: true,
    }).partial2.value.should.equal(2)

    // x - standard
    // x - type
    reducer(state, {
      type: 'ABCD',
      standard: false,
      payload: {
        partial1: {
          value: 10,
        },
      },
    }).partial2.value.should.equal(2)
  })

  it('with array', function() {
    state = reducer(state, {
      type: 'FETCH_SOME_LIST',
      standard: true,
      payload: {
        arr: [4, 5, 6],
      },
    })

    state.arr.should.match([4, 5, 6])
  })
})
