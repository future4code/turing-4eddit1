import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './components/LoginPage/index'
import PostDetailsPage from './components/PostDetailsPage/index'
import Posts from './components/Posts/index'
import SignUpPage from './components/SignUpPage';


function App() {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/signuppage">
            <SignUpPage />
          </Route>
          <Route exact path="/posts">
            <Posts />
          </Route>
          <Route exact path="/posts/:postId">
            <PostDetailsPage />
          </Route>
          <Route path="/">
            <div>Opa! 404!</div>
          </Route>
        </Switch>
      </BrowserRouter>
 );
}

export default App;
