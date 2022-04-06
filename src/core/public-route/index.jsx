import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const PublicRoute = ({
  isAuth=false,
  path = "/",
  component = <CircularProgress />,
}) => {
  return (
    <Route
      exact
      path={path}
      render={() => (isAuth ? <Redirect to="/auth/dashboard" />  : component )}
    />
  );
};

export default PublicRoute;
