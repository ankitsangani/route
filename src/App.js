import login from './login'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import React,{useState}  from "react";
import signUp from "./signUp";
import users from './users';
function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={login}></Route>
              <Route path="/signUp" component={signUp}></Route>
              <Route path="/users" component={users}></Route>
          </Switch>
      </BrowserRouter>
  );
}
export default App;
