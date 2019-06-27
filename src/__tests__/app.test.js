import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import App from '../App'

afterEach(cleanup)

let utils

beforeEach(() => {
  utils = render(<App />)
})

describe('on page load', () => {
  test('Sharing section is loaded', () => {
    expect(utils.getByTestId('sharing')).toBeVisible()
    expect(utils.getByTestId('sharing')).toHaveTextContent('Sharing')
    expect(utils.getByTestId('sharing')).not.toContainElement(
      utils.queryByTestId('sharing-items')
    )
  })
  test('Help section is loaded', () => {
    expect(utils.getByTestId('need-help')).toBeVisible()
    expect(utils.getByTestId('need-help')).toHaveTextContent('Need Help')
    expect(utils.getByTestId('need-help')).not.toContainElement(
      utils.queryByTestId('help-items')
    )
  })
  test('Pairing section is loaded', () => {
    expect(utils.getByTestId('pairing')).toBeVisible()
    expect(utils.getByTestId('pairing')).toHaveTextContent('Pairing')
    expect(utils.getByTestId('pairing')).not.toContainElement(
      utils.queryByTestId('pairing-items')
    )
  })
})

describe('when new item is added', () => {
  test('should display new share item', () => {
    fireEvent.change(utils.getByLabelText('sharing-input'), {
      target: { value: 'share 1' },
    })
    expect(utils.getByLabelText('sharing-input').value).toBe('share 1')

    fireEvent.click(utils.getByTestId('share-submit'))
    expect(utils.getByTestId('sharing')).toContainElement(
      utils.queryByTestId('sharing-items')
    )
  })

  test('should display new help item', () => {
    const helpInput = utils.getByLabelText('help-input')
    fireEvent.change(helpInput, {
      target: { value: 'help 1' },
    })
    expect(helpInput.value).toBe('help 1')

    fireEvent.click(utils.getByTestId('help-submit'))
    expect(utils.getByTestId('need-help')).toContainElement(
      utils.queryByTestId('help-items')
    )
  })

  test('should display new pair item', () => {
    const pairInput = utils.getByLabelText('pair-input')
    fireEvent.change(pairInput, {
      target: { value: 'pair 1' },
    })
    expect(pairInput.value).toBe('pair 1')

    fireEvent.click(utils.getByTestId('pair-submit'))
    expect(utils.getByTestId('pairing')).toContainElement(
      utils.queryByTestId('pair-items')
    )
  })
})

describe('when there is a list of shares', () => {
  beforeEach(() => {
    fireEvent.change(utils.getByLabelText('sharing-input'), {
      target: { value: 'share 1' },
    })
    fireEvent.click(utils.getByTestId('share-submit'))
    fireEvent.change(utils.getByLabelText('sharing-input'), {
      target: { value: 'share 2' },
    })
    fireEvent.click(utils.getByTestId('share-submit'))
    fireEvent.change(utils.getByLabelText('sharing-input'), {
      target: { value: 'share 3' },
    })
    fireEvent.click(utils.getByTestId('share-submit'))
  })
  test('should have a list of share items', () => {
    expect(utils.getByTestId('sharing-items')).toHaveTextContent('share 1')
    expect(utils.getByTestId('sharing-items')).toHaveTextContent('share 2')
    expect(utils.getByTestId('sharing-items')).toHaveTextContent('share 3')
  })
  test('should remove a share item accordingly', () => {
    fireEvent.click(utils.getByTestId('remove-share0'))
    expect(utils.getByTestId('sharing-items')).not.toHaveTextContent('share 1')
  })
})

describe('when there is a list of helps', () => {
  beforeEach(() => {
    fireEvent.change(utils.getByLabelText('help-input'), {
      target: { value: 'help 1' },
    })
    fireEvent.click(utils.getByTestId('help-submit'))
    fireEvent.change(utils.getByLabelText('help-input'), {
      target: { value: 'help 2' },
    })
    fireEvent.click(utils.getByTestId('help-submit'))
    fireEvent.change(utils.getByLabelText('help-input'), {
      target: { value: 'help 3' },
    })
    fireEvent.click(utils.getByTestId('help-submit'))
  })
  test('should have a list of help items', () => {
    expect(utils.getByTestId('help-items')).toHaveTextContent('help 1')
    expect(utils.getByTestId('help-items')).toHaveTextContent('help 2')
    expect(utils.getByTestId('help-items')).toHaveTextContent('help 3')
  })
  test('should remove a help item accordingly', () => {
    fireEvent.click(utils.getByTestId('remove-help1'))
    expect(utils.getByTestId('help-items')).not.toHaveTextContent('help 2')
  })
})

describe('when there is a list of pairs', () => {
  beforeEach(() => {
    fireEvent.change(utils.getByLabelText('pair-input'), {
      target: { value: 'pair 1' },
    })
    fireEvent.click(utils.getByTestId('pair-submit'))
    fireEvent.change(utils.getByLabelText('pair-input'), {
      target: { value: 'pair 2' },
    })
    fireEvent.click(utils.getByTestId('pair-submit'))
    fireEvent.change(utils.getByLabelText('pair-input'), {
      target: { value: 'pair 3' },
    })
    fireEvent.click(utils.getByTestId('pair-submit'))
  })
  test('should have a list of pair items', () => {
    expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 1')
    expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 2')
    expect(utils.getByTestId('pair-items')).toHaveTextContent('pair 3')
  })
  test('should remove a pair item accordingly', () => {
    fireEvent.click(utils.getByTestId('remove-pair2'))
    expect(utils.getByTestId('pair-items')).not.toHaveTextContent('pair 3')
  })
})
