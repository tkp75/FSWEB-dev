import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
import App from './App'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if only login form shown at first', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement( () => component.container.querySelector('.app') )
    // expectations here
    const login = component.container.querySelector('.login-form')
    expect(login).toBeDefined()
    const blogs = component.container.querySelector('.blog-list')
    expect(blogs).toBeNull()
    const create = component.container.querySelector('.blog-create')
    expect(create).toBeNull()
  })
})

/*
describe('<App />', () => {
  test('renders all blogs it gets from backend', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(
      () => component.container.querySelector('.blog-details')
    )

    const blogs = component.container.querySelectorAll('.blog-details')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'Is Testing Fun'
    )
    expect(component.container).toHaveTextContent(
      'Testing Is Fun'
    )
    expect(component.container).toHaveTextContent(
      'Fun Is Testing'
    )
  })
})
*/
