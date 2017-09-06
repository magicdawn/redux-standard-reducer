# redux-standard-reducer
> A redux reducer for standard action that merge data to state

[![Build Status](https://img.shields.io/travis/magicdawn/redux-standard-reducer.svg?style=flat-square)](https://travis-ci.org/magicdawn/redux-standard-reducer)
[![Coverage Status](https://img.shields.io/codecov/c/github/magicdawn/redux-standard-reducer.svg?style=flat-square)](https://codecov.io/gh/magicdawn/redux-standard-reducer)
[![npm version](https://img.shields.io/npm/v/redux-standard-reducer.svg?style=flat-square)](https://www.npmjs.com/package/redux-standard-reducer)
[![npm downloads](https://img.shields.io/npm/dm/redux-standard-reducer.svg?style=flat-square)](https://www.npmjs.com/package/redux-standard-reducer)
[![npm license](https://img.shields.io/npm/l/redux-standard-reducer.svg?style=flat-square)](http://magicdawn.mit-license.org)

## Install
```sh
$ npm i redux-standard-reducer --save
```

## Usage

```js
// suppose all business reducer exits in app/reducers/
import reducer from './app/reducers'

import standardReducer from 'redux-standard-reducer'
import reduceReducers from 'reduce-reducers'

// reducer for createStore
const finalReducer = reduceReducers(
  standardReducer,
  reducer
)

const store = createStore(initialState, finalReducer, enhancers)
```

### enable this reducer

use any one of these:

- make `action.type` starts with `STANDARD_MERGE_STATE`, this reducer will handle the action
- make `action.standard = true`, this reducer will handle the action


### Action with `payload`

```js
action = {
  type,
  standard,
  payload: {...},
}
```

|key        |type       |remark|
|-----------|-----------|------|
| `payload` | `Object`  | the data need to be merged to the `store.state` |

- more see the [test/simple.js](test/simple.js)

### Action with `update`

```js
action = {
  type,
  standard,
  update: {...},
}
```

|key        |type       |remark|
|-----------|-----------|------|
| `update`  | `Object`  | the `update` operation, will pass to [immutability-helper](https://github.com/kolodny/immutability-helper#update), equal to `immutabilityHelper(store.state, action.update)` |

- more see the [test/simple.js](test/update.js)
- see `update` in [immutability-helper](https://github.com/kolodny/immutability-helper#update) homepage


## Changelog
[CHANGELOG.md](CHANGELOG.md)

## License
the MIT License http://magicdawn.mit-license.org