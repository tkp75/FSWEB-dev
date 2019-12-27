import blogService from '../services/blogs'

const initialState = []

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    newBlog.user = user
    newBlog.full = false
    dispatch ({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch ({
      type: 'REMOVE',
      data: id,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    blog.likes++
    await blogService.update({
      id: blog.id,
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    dispatch({
      type: 'UPDATE',
      data: blog,
    })
  }
}

export const toggleBlog = (blog) => {
  if (blog.full === true) blog.full = false
  else blog.full = true
  return  {
    type: 'UPDATE',
    data: blog,
  }
}

const blogReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'CREATE':
    return state.concat(action.data)
  case 'REMOVE':
    return state.filter(blog => blog.id !== action.data)
  case 'UPDATE':
    return state.map(blog => { return blog.id === action.data.id ? action.data : blog })
  default:
    return state
  }
}
export default blogReducer