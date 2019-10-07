import React from 'react'
import { render,  waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement( () => component.getByText('login') ) 
    // expectations here
    const login = component.getByText('login')
    expect(login).toBeDefined()
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
      () => component.container.querySelector('.blogDetails')
    )

    const blogs = component.container.querySelectorAll('.blogDetails')
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
