import {
  wrapper
} from 'uni-helpers/api'

import * as baseApi from './api'

// import * as platformApi from 'uni-platform/view/api'

const c = Object.create(null)

/* eslint-disable no-undef */
c.version = __VERSION__

Object.keys(baseApi).forEach(name => {
  c[name] = wrapper(name, baseApi[name])
})

// Object.keys(platformApi).forEach(name => {
//   uni[name] = wrapper(name, api[name])
// })

export default c
