import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { TogglableBlogList, ConnectedSingleBlog as SingleBlog, ConnectedPlainBlogList as PlainBlogList } from './components/Blog'
import { ConnectedHeader as Header, Loading, ConnectedUninit as Uninit, ConnectedProtectedRoute as ProtectedRoute } from './components/Helper'
import { ConnectedLoginForm as LoginForm } from './components/Login'
import { ConnectedUserList as UserList, ConnectedUser as User } from './components/Users'

const mapStateToProps = (state) => {
  return {
    init: state.init,
  }
}

const App = (props) => {
  return (
    <Container className='app'>
      <Router>
        <Header/>
        {
          // eslint-disable-next-line eqeqeq
          (props.init == null || props.init.blogs != true || props.init.users != true || props.init.login != true)
            ?
            <Switch>
              <Route exact path="/login"> <LoginForm /> </Route>
              <Route exact path="/logout"> <Uninit /> </Route>
              <Route path="/" > <Loading /> </Route>
            </Switch>
            :
            <div>
              <Route exact path="/login"> <LoginForm /> </Route>
              <Route exact path="/logout"> <Uninit /> </Route>
              <ProtectedRoute exact path="/"> <TogglableBlogList /> </ProtectedRoute>
              <ProtectedRoute exact path="/users"> <UserList /> </ProtectedRoute>
              <ProtectedRoute exact path="/users/:id"> <User /> </ProtectedRoute>
              <ProtectedRoute exact path="/blogs"> <PlainBlogList /> </ProtectedRoute>
              <ProtectedRoute exact path="/blogs/:id"> <SingleBlog /> </ProtectedRoute>
            </div>
        }
      </Router>
    </Container>
  )
}
const ConnectedApp = connect(mapStateToProps)(App)
export default ConnectedApp