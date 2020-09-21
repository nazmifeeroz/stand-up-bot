import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import PromptStartSession from '../components/PromptStartSession'
import Loader from '../components/Loader'

describe('in prompt start session', () => {
  const send = jest.fn()

  test('shows start session button', () => {
    render(<PromptStartSession />)

    expect(screen.queryByText('Start Standup Session')).toBeTruthy()
  })

  test('when button is pressed', () => {
    render(<PromptStartSession send={send} />)

    fireEvent.click(screen.getByText('Start Standup Session'))

    expect(send).toHaveBeenCalledWith('START_SESSION')
  })
})

describe('Loader component', () => {
  const current = {
    matches: jest.fn().mockReturnValue(true),
    context: {
      loadingMsg: 'some loading message',
    },
  }

  test('should show loading message', () => {
    render(<Loader current={current} />)

    expect(screen.getByText(current.context.loadingMsg)).toBeTruthy()
  })

  test('should not show spinner on error message', () => {
    render(<Loader current={current} />)

    expect(screen.getByTestId('circle-loader').children.length).toBe(1)
  })
})

// import React from 'react'
// import { render, fireEvent, cleanup } from '@testing-library/react'
// import 'jest-dom/extend-expect'
// import App from '../App'
// import Provider from '../utils/context'

// afterEach(cleanup)

// let utils

// beforeEach(() => {
//   utils = render(
//     <Provider>
//       <App />
//     </Provider>
//   )
// })

// describe('on page load', () => {
//   test('Sharing section is loaded', () => {
//     expect(utils.getByTestId('sharing')).toBeVisible()
//     expect(utils.getByTestId('sharing')).toHaveTextContent('Sharing')
//     expect(utils.getByTestId('sharing')).not.toContainElement(
//       utils.queryByTestId('sharing-items')
//     )
//   })
//   test('Help section is loaded', () => {
//     expect(utils.getByTestId('help')).toBeVisible()
//     expect(utils.getByTestId('help')).toHaveTextContent('Need Help')
//     expect(utils.getByTestId('help')).not.toContainElement(
//       utils.queryByTestId('help-items')
//     )
//   })
//   test('Pairing section is loaded', () => {
//     expect(utils.getByTestId('pairing')).toBeVisible()
//     expect(utils.getByTestId('pairing')).toHaveTextContent('Pairing')
//     expect(utils.getByTestId('pairing')).not.toContainElement(
//       utils.queryByTestId('pairing-items')
//     )
//   })
// })

// describe('when new item is added', () => {
//   test('should display new sharing item', () => {
//     fireEvent.change(utils.getByLabelText('sharing-input'), {
//       target: { value: 'sharing 1' },
//     })
//     expect(utils.getByLabelText('sharing-input').value).toBe('sharing 1')

//     fireEvent.click(utils.getByTestId('sharing-submit'))
//     expect(utils.getByTestId('sharing')).toContainElement(
//       utils.queryByTestId('sharing-items')
//     )
//   })

//   test('should display new help item', () => {
//     const helpInput = utils.getByLabelText('help-input')
//     fireEvent.change(helpInput, {
//       target: { value: 'help 1' },
//     })
//     expect(helpInput.value).toBe('help 1')

//     fireEvent.click(utils.getByTestId('help-submit'))
//     expect(utils.getByTestId('help')).toContainElement(
//       utils.queryByTestId('help-items')
//     )
//   })

//   test('should display new pair item', () => {
//     const pairInput = utils.getByLabelText('pair-input')
//     fireEvent.change(pairInput, {
//       target: { value: 'pair 1' },
//     })
//     expect(pairInput.value).toBe('pair 1')

//     fireEvent.click(utils.getByTestId('pair-submit'))
//     expect(utils.getByTestId('pairing')).toContainElement(
//       utils.queryByTestId('pair-items')
//     )
//   })
// })

// describe('when there is a list of sharings', () => {
//   beforeEach(() => {
//     fireEvent.change(utils.getByLabelText('sharing-input'), {
//       target: { value: 'sharing 1' },
//     })
//     fireEvent.click(utils.getByTestId('sharing-submit'))
//     fireEvent.change(utils.getByLabelText('sharing-input'), {
//       target: { value: 'sharing 2' },
//     })
//     fireEvent.click(utils.getByTestId('sharing-submit'))
//     fireEvent.change(utils.getByLabelText('sharing-input'), {
//       target: { value: 'sharing 3' },
//     })
//     fireEvent.click(utils.getByTestId('sharing-submit'))
//   })
//   test('should have a list of sharing items', () => {
//     expect(utils.getByTestId('sharing-items')).toHaveTextContent('sharing 1')
//     expect(utils.getByTestId('sharing-items')).toHaveTextContent('sharing 2')
//     expect(utils.getByTestId('sharing-items')).toHaveTextContent('sharing 3')
//   })
//   test('should remove a sharing item accordingly', () => {
//     fireEvent.click(utils.getByTestId('remove-sharing0'))
//     expect(utils.getByTestId('sharing-items')).not.toHaveTextContent(
//       'sharing 1'
//     )
//   })
// })

// describe('when there is a list of helps', () => {
//   beforeEach(() => {
//     fireEvent.change(utils.getByLabelText('help-input'), {
//       target: { value: 'help 1' },
//     })
//     fireEvent.click(utils.getByTestId('help-submit'))
//     fireEvent.change(utils.getByLabelText('help-input'), {
//       target: { value: 'help 2' },
//     })
//     fireEvent.click(utils.getByTestId('help-submit'))
//     fireEvent.change(utils.getByLabelText('help-input'), {
//       target: { value: 'help 3' },
//     })
//     fireEvent.click(utils.getByTestId('help-submit'))
//   })
//   test('should have a list of help items', () => {
//     expect(utils.getByTestId('help-items')).toHaveTextContent('help 1')
//     expect(utils.getByTestId('help-items')).toHaveTextContent('help 2')
//     expect(utils.getByTestId('help-items')).toHaveTextContent('help 3')
//   })
//   test('should remove a help item accordingly', () => {
//     fireEvent.click(utils.getByTestId('remove-help1'))
//     expect(utils.getByTestId('help-items')).not.toHaveTextContent('help 2')
//   })
// })

// describe('when there is a list of pairs', () => {
//   beforeEach(() => {
//     fireEvent.change(utils.getByLabelText('pair-input'), {
//       target: { value: 'pair 1' },
//     })
//     fireEvent.click(utils.getByTestId('pair-submit'))
//     fireEvent.change(utils.getByLabelText('pair-input'), {
//       target: { value: 'pair 2' },
//     })
//     fireEvent.click(utils.getByTestId('pair-submit'))
//     fireEvent.change(utils.getByLabelText('pair-input'), {
//       target: { value: 'pair 3' },
//     })
//     fireEvent.click(utils.getByTestId('pair-submit'))
//   })
//   test('should have a list of pair items', () => {
//     expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 1')
//     expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 2')
//     expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 3')
//   })
//   test('should remove a pair item accordingly', () => {
//     fireEvent.click(utils.getByTestId('remove-pair2'))
//     expect(utils.getByTestId('pair-items')).not.toHaveTextContent('pair 3')
//   })
// })
