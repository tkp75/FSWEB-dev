import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Blog Title',
  author: 'Blog Author',
  likes: 1
}

afterEach(cleanup)

test('renders title', () => {
  const mockHandler = jest.fn()
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  expect(component.container).toHaveTextContent('Blog Title')
})

test('renders author', () => {
  const mockHandler = jest.fn()
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)
  const element = component.getByText(/.*Blog Author/)
  expect(element).toBeDefined()
})

test('renders likes', () => {
  const mockHandler = jest.fn()
  const component = render(<SimpleBlog blog={blog} onClick={mockHandler}/>)

  const div = component.container.querySelector('.simpleblog')
  expect(div).toHaveTextContent(/blog has [0-9]+ likes/)
})
