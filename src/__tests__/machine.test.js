import React from 'react'
import {render, cleanup} from '@testing-library/react'
import {createModel} from '@xstate/test'
import Main from '../Main/Component'
import standupMachine from '../services/store/chart'

// const Store = React.createContext()
jest.mock('../services/store', () => {
  return {current: {}, send: jest.fn()}
})

describe('standup app', () => {
  const testModel = createModel(standupMachine, {
    events: {
      HAS_ERROR: {
        cases: [{error: 'Network error'}],
      },
      LOAD_SESSION_DATA: {},
      START_SESSION: {
        cases: [{activeSession: [{}], username: 'some name'}],
      },
    },
  })

  const testPlans = testModel.getSimplePathPlans()

  testPlans.forEach(plan => {
    describe(plan.description, () => {
      afterEach(cleanup)

      plan.paths.forEach(path => {
        const current = {
          matches: jest.fn(),
        }

        const send = jest.fn()

        it(path.description, () => {
          const rendered = render(<Main current={current} send={send} />)
          return path.test(rendered)
        })
      })
    })
  })

  it('coverage', () => {
    testModel.testCoverage({
      filter: state => !!state.meta,
    })
  })
})
