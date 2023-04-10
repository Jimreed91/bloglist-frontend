import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  beforeEach(() => {
    const blog = {
      title: 'A blog about testing',
      author: 'A Capybara',
      url: 'www.jest.com',
      likes: 7,
      user: { name: 'Blix' }
    }
    render(<Blog blog={blog}/>)
  })

  test('details hidden initially', () => {
    const title = screen.getByText(/A blog about testing/)
    const author = screen.getByText(/A Capybara/)
    const details = document.querySelector('.blogdetails')

    expect(title).toBeDefined
    expect(author).toBeDefined
    expect(details).toHaveStyle('display: none')

  })

  test('details revealed by clicking the button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText(/View/)
    const details = document.querySelector('.blogdetails')

    await user.click(button)

    expect(details).not.toHaveStyle('display: none')
  })

})

test('clicking like button twice calls event handler twice', async () => {
  const blog = {
    title: 'A blog about testing',
    author: 'A Capybara',
    url: 'www.jest.com',
    likes: 7,
    user: { name: 'Blix' }
  }
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText(/Like/)

  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)

})
