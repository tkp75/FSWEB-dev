const initialState = {
  init:  false,
  blogs: false,
  users: false,
  login: false,
}

export const initApp = (data) => {
  return {
    type: 'INIT_APP',
    data: data,
  }
}

export const uninitApp = (data) => {
  return {
    type: 'UNINIT_APP',
    data: data,
  }
}

const initReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'INIT_APP':
    return { ...state, [action.data]: true, }
  case 'UNINIT_APP':
    return { ...state, [action.data]: false, }
  default:
    return state
  }
}
export default initReducer