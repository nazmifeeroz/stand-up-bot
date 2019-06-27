import React from 'react'
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from '@testing-library/react'
import 'jest-dom/extend-expect'
import App from '../App'

afterEach(cleanup)

describe('on page load', () => {
  test('Sharing section is loaded', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    expect(getByTestId('sharing')).toBeVisible()
    expect(getByTestId('sharing')).toHaveTextContent('Sharing')
    expect(getByTestId('sharing')).not.toContainElement(
      queryByTestId('sharing-items')
    )
  })
  test('Help section is loaded', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    expect(getByTestId('need-help')).toBeVisible()
    expect(getByTestId('need-help')).toHaveTextContent('Need Help')
    expect(getByTestId('need-help')).not.toContainElement(
      queryByTestId('help-items')
    )
  })
  test('Pairing section is loaded', () => {
    const { getByTestId, queryByTestId } = render(<App />)
    expect(getByTestId('pairing')).toBeVisible()
    expect(getByTestId('pairing')).toHaveTextContent('Pairing')
    expect(getByTestId('pairing')).not.toContainElement(
      queryByTestId('pairing-items')
    )
  })
})

describe('when new item is added', () => {
  test('new share item', () => {})
})
