import assert from 'assert'
import reduceReducers from 'reduce-reducers'
import { combineReducers } from 'redux'
import standardReducer from '../src/index'

/* eslint no-extra-semi: off */

describe('immutability-helper', function() {
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

  it('it works', function() {
    state = reducer(state, {
      type: 'UPDATE_PARTIAL_1',
      standard: true,
      update: {
        partial1: {
          foo: { $set: 'updated-foo-1' },
        },
      },
    })
    state.partial1.foo.should.equal('updated-foo-1')

    // init `partial1.sub` to object
    state = reducer(state, {
      type: 'UPDATE_PARTIAL_1',
      standard: true,
      update: {
        partial1: {
          sub: {
            $apply: sub => sub || {},
          },
        },
      },
    })
    assert(state.partial1.sub)
  })

  it('throws when `action.update` not object', function() {
    ;(() => {
      state = reducer(state, {
        type: 'SOME_ACTION_TYPE',
        standard: true,
        update: 1,
      })
    }).should.throw(/expect standard action.update = object/)
  })
})
