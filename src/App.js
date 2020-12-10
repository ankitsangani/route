import React  from "react";
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import PrivateRoute from './privateRoute'
import Login from './login'
import signUp from "./signUp";
import Users from './users';
import DashBoard from './dashboard';
import ApiForm from "./ApiForm";
import Axios from "axios";
function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route path="/ApiForm" component={ApiForm}/>
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
