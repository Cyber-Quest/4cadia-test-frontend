import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import SignIn from "./modules/auth/signin";
import SignUp from "./modules/auth/signup";
import Menu from "../src/core/menu/index";
import BalancePanel from "./modules/dashboard/balance-panel/";

import PrivateRoute from "./core/private-route";
import PublicRoute from "./core/public-route";

const Routes = () => {
  const session = useSelector((state) => state.session);

  return (
    <Suspense fallback={<CircularProgress />}>
      <BrowserRouter>
        <Switch>
          <Menu>
            <PublicRoute
              path="/"
              isAuth={session.isAuth}
              component={<SignIn />}
            />
            <PublicRoute
              path="/signin"
              isAuth={session.isAuth}
              component={<SignIn />}
            />
            <PublicRoute
              path="/signup"
              isAuth={session.isAuth}
              component={<SignUp />}
            /> 
            <PrivateRoute
              path="/auth/dashboard"
              isAuth={session.isAuth}
              component={<BalancePanel />}
            ></PrivateRoute>
          </Menu>
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
