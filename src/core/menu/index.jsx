import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Snackbar } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { closeSnackBar } from "../../redux/snackbar.reducer";
import { logout } from "../../redux/session.reducer";

import { styles } from "./styles"; 

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Menu = ({ children }) => {
  const classes = styles();
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const session = useSelector((state) => state.session);

  const close = () => {
    dispatch(closeSnackBar());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={close}
      >
        <Close fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbar.visible || false}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        autoHideDuration={4000}
        onClose={close}
        message={snackbar.message}
        action={action}
      />
      {session.isAuth ? (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              4CADIA
            </Typography>

            <Button
              color="inherit"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      ) : null}

      <Container component="main" maxWidth="xs">
        {children}
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
};

export default Menu;
