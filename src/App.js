import login from './login'
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import React  from "react";
import signUp from "./signUp";

function App() {
  return (
      <BrowserRouter>
          <Switch>
              <Route exact path="/" component={login}></Route>
              <Route path="/signUp" component={signUp}></Route>
          </Switch>
      </BrowserRouter>
  );
}
export default App;
