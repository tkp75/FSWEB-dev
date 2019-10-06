import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  likes: 1
}

const mockHandler = jest.fn()

afterEach(cleanup)

test('renders title', () => {
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  expect(component.container).toHaveTextContent('Blog Title')
})

test('renders author', () => {
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  const element = component.getByText(/.*Blog Author/)
  expect(element).toBeDefined()
})

test('renders likes', () => {
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  const div = component.container.querySelector('.simpleblog')
  expect(div).toHaveTextContent(/blog has [0-9]+ likes/)
})

test('like button is clicked twice', () => {
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})
