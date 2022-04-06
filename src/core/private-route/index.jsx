import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const PrivateRoute = ({
  isAuth=false,
  path = "/",
  component = <CircularProgress />,
}) => {
  return (
    <Route
      exact
      path={path}
      render={() => (isAuth ? component : <Redirect to="/signin" />)}
    />
  );
};

export default PrivateRoute;
