import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";

import SignIn from "./modules/auth/signin";
import SignUp from "./modules/auth/signup";
import Menu from "../src/core/menu/index";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Routes = () => {
  return (
    <Suspense fallback={<CircularProgress />}>
    <BrowserRouter>
      <Switch>
        <Menu>
          <Route path="/" exact>
            <SignIn />
          </Route>
          <Route path="/signin" exact>
            <SignIn />
          </Route>
          <Route path="/signup" exact>
            <SignUp />
          </Route>
        </Menu>
      </Switch>
    </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
