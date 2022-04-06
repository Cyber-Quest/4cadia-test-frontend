import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, MenuItem, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";

import LineChart from "../../../core/chart";
import Table from "../../../core/table";
import Button from "../../../core/button/index";
import DrawForm from "../draw-form";

import { styles } from "./styles";
import { openDrawer } from "../../../redux/drawer.reducer";
import DepositForm from "../deposit-form";
import BankAccountForm from "../bank-account-form";
import Extract from "../extract";

const BalancePanel = () => {
  const classes = styles();
  const dispatch = useDispatch();

  return (
    <>
      <Box display="flex" flexDirection="column" style={{ gap: "16px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ gap: "16px" }}
        >
          <Button
            size="large"
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "New draw",
                  body: <DrawForm />,
                  width: 600,
                })
              );
            }}
          >
            Draw
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#ea6145" }}
            className={classes.button}
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "New deposit",
                  body: <DepositForm />,
                  width: 600,
                })
              );
            }}
          >
            Deposit
          </Button>
          <Card className={classes.card}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Bank account
                </Typography>
                <Select style={{ width: "100%" }}>
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </CardContent>
              <Box
                display="flex"
                flexDirection="column"
                style={{ gap: "16px", marginTop: 16 }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    dispatch(
                      openDrawer({
                        title: "New bank account",
                        body: <BankAccountForm />,
                        width: 600,
                      })
                    );
                  }}
                >
                  New account
                </Button>
                <Typography className={classes.title} color="textSecondary">
                  Current balance
                </Typography>
                <Typography className={classes.title} color="textSecondary">
                  R$35,00
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="h4" gutterBottom component="h2">
            Transactions
          </Typography>
          <Button
            size="small" 
            color="primary"
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "Extract account",
                  body: <Extract/>,
                  width: 800,
                })
              );
            }}
          >
            Extract
          </Button>
        </Box>
        <Typography component="div" className={classes.chartContainer}>
          <LineChart />
        </Typography>
      </Box>
    </>
  );
};

export default BalancePanel;
