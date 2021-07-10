import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import PromptStartSession from '../components/PromptStartSession'
import Loader from '../components/Loader'
import DevMode from '../components/DevMode'
import Footer from '../components/Footer'
import InputSection from '../components/InputSection'
import PublishButtons from '../components/PublishButtons'
import LogoBox from '../components/LogoBox'

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

describe('dev mode component', () => {
  test('should show text when in dev mode', () => {
    render(<DevMode devMode={true} />)

    expect(screen.getByText('Dev Mode')).toBeTruthy()
  })

  test('should show settings icon if false', () => {
    render(<DevMode devMode={false} />)

    expect(screen.getByText('settings')).toBeTruthy()
  })
})

describe('footer component', () => {
  test('should display copyrights', () => {
    render(<Footer />)

    expect(screen.getByText('Silicon Jungles')).toBeTruthy()
  })
})

describe('footer component', () => {
  test('should display copyrights', () => {
    render(<Footer />)

    expect(screen.getByText('Silicon Jungles')).toBeTruthy()
  })
})

describe('input section component when in edit mode', () => {
  const mockedProps = {
    title: 'sharing',
    placeholder: 'some place holder',
    loading: {
      sharing: false,
    },
    data: [{id: 1, contributor: 'me', sharing: 'some share'}],
    editableItem: 1,
    send: jest.fn(),
  }

  test('should display title', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.getByText('sharing')).toBeTruthy()
  })

  test('should display input element with placeholder', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.getByPlaceholderText(mockedProps.placeholder)).toBeTruthy()
  })

  test('input should show when edit is pressed', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.getByText('close')).toBeTruthy()
  })

  test('edit button should not show on edit mode', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.queryByText('edit')).toBeFalsy()
  })

  test('delete button should not show on edit mode', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.queryByText('delete')).toBeFalsy()
  })

  test('when close button is pressed', () => {
    render(<InputSection {...mockedProps} />)

    fireEvent.click(screen.getByText('close'))

    expect(mockedProps.send).toHaveBeenCalledWith('CLOSE_EDIT_ITEM')
  })
})

describe('input section component when NOT in edit mode', () => {
  const mockedProps = {
    title: 'sharing',
    placeholder: 'some place holder',
    loading: {
      sharing: false,
    },
    data: [{id: 1, contributor: 'me', sharing: 'some share'}],
    editableItem: 0,
    send: jest.fn(),
  }

  test('edit button should show on edit mode', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.queryByText('edit')).toBeTruthy()
  })

  test('delete button should show on edit mode', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.queryByText('delete')).toBeTruthy()
  })

  test('close button should not be visible', () => {
    render(<InputSection {...mockedProps} />)

    expect(screen.queryByText('close')).toBeFalsy()
  })

  test('on new input change', () => {
    render(<InputSection {...mockedProps} />)

    fireEvent.change(screen.getByLabelText('sharing-input'), {
      target: {
        value: 'new input',
      },
    })

    expect(mockedProps.send).toHaveBeenCalledWith('ON_INPUT_CHANGE', {
      sharing: 'new input',
    })
  })
})

describe('in body', () => {
  test('lucky draw button should fire the correct event', () => {
    const send = jest.fn()
    render(<PublishButtons send={send} />)

    fireEvent.click(screen.getByText('Lucky Spin'))

    expect(send).toHaveBeenCalledWith('REDIRECT_LUCKY_DRAW')
  })

  test('publish button should fire the correct event', () => {
    const send = jest.fn()
    render(<PublishButtons send={send} />)

    fireEvent.click(screen.getByText('Publish!'))

    expect(send).toHaveBeenCalledWith('PUBLISH_STANDUP_SESSION')
  })
})

describe('Logobox', () => {
  test('should display title', () => {
    render(<LogoBox />)
    expect(screen.getByText('Standup Bot')).toBeTruthy()
  })

  test('should display subtitle', () => {
    render(<LogoBox subtitle="Admin" />)
    expect(screen.getByText('Admin')).toBeTruthy()
  })

  test('should display button', () => {
    const SomeButton = () => <button>Start</button>
    render(
      <LogoBox>
        <SomeButton />
      </LogoBox>,
    )
    expect(screen.getByText('Start')).toBeTruthy()
  })
})
