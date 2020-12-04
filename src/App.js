import React  from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import login from './login'
import signUp from "./signUp";
import Users from './users';

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={login}/>
              <Route path="/signUp" component={signUp}/>
              <Route path="/users" component={Users}/>
              <Route path="/editUserDetails/:id" component={signUp}/>
          </Switch>
      </BrowserRouter>
  );
}
export default App;
