import React  from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import PrivateRoute from './privateRoute'
import Login from './login'
import signUp from "./signUp";
import Users from './users';
import DashBoard from './dashboard';
function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/signUp" component={signUp}/>

              <PrivateRoute path="/users" component={Users}/>
              <PrivateRoute path="/dashboard" component={DashBoard}/>
              <Route path="/editUserDetails/:id" component={signUp}/>
          </Switch>
      </BrowserRouter>
  );
}
export default App;
