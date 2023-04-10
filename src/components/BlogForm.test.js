import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm /> event handler receives correct params', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('add the title here')
  const authorInput = screen.getByPlaceholderText('add the author here')
  const urlInput = screen.getByPlaceholderText('add the url here')
  const submitButton = screen.getByText('Add Blog')

  await userEvent.type(titleInput, 'test title')
  await userEvent.type(authorInput, 'test author')
  await userEvent.type(urlInput, 'www.test.com')
  await userEvent.click(submitButton)

  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')

})
