import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import App from './App'

jest.mock('expo-sqlite')

describe('Todo Addition Tests', () => {
  beforeEach(() => {
    //   jest.requireMock('expo-sqlite').resetDatabase()
  })
  it('should add a todo when title is entered and add button is pressed', async () => {
    const { getByTestId, getByText, queryByText, debug } = render(<App />)
    await waitFor(() => expect(queryByText('Loading Todos...')).toBeNull())

    const todoInput = getByTestId('todo-title')
    fireEvent.changeText(todoInput, 'New Todos')

    const addButton = getByTestId('todo-add')
    fireEvent.press(addButton)
    fireEvent.changeText(todoInput, '')

    await waitFor(() => {
      expect(getByText('New Todos')).toBeTruthy()
    })
  })
})
