import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Box, CircularProgress, MenuItem, Select } from "@material-ui/core";
import { useDispatch } from "react-redux";

import LineChart from "../../../core/chart";
import Button from "../../../core/button/index";
import DrawForm from "../draw-form";

import { styles } from "./styles";
import { openDrawer } from "../../../redux/drawer.reducer";
import DepositForm from "../deposit-form";
import BankAccountForm from "../bank-account-form";
import Extract from "../extract";
import { get } from "../../../core/service/api";
import { getTime, numberToCurrency } from "../../../core/utils/convert-values";

const BalancePanel = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const [bankAccount, setBankAccount] = useState([]);
  const [bankAccountSelected, setBankAccountSelected] = useState("");
  const [bankAccountSelectedValue, setBankAccountSelectedValue] = useState(0);
  const [loadingPage, setLoadingPage] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await get(`transaction/extract/${bankAccountSelected}`, {
        params: { take: 10, skip: 0 },
      });
      if (Array.isArray(response)) {
        response = response.map((item) => {
          return {
            ...item,
            created_at: getTime(item.created_at),
          };
        });
        setData(response);
      }
    })();
  }, [loadingPage]);

  useEffect(() => {
    (async () => {
      const response = await get("account", { params: { take: 100, skip: 0 } });
      if (Array.isArray(response)) {
        if (response.length > 0) {
          setBankAccount(response);
          setBankAccountSelected(response[0].name);
          setBankAccountSelectedValue(response[0].balance);
        }
      }
      setLoadingPage(false);
    })();
  }, [loadingPage]);

  return loadingPage ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={600}
    >
      <CircularProgress />
    </Box>
  ) : (
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
            disabled={bankAccount.length === 0}
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "New deposit",
                  body: (
                    <DepositForm
                      accountSelected={bankAccountSelected}
                      setLoadingPage={setLoadingPage}
                    />
                  ),
                  width: 600,
                })
              );
            }}
          >
            Deposit
          </Button>
          <Button
            size="large"
            variant="contained"
            color="secondary"
            style={{ backgroundColor: "#ea6145" }}
            className={classes.button}
            disabled={bankAccount.length === 0}
            onClick={() => {
              dispatch(
                openDrawer({
                  title: "New draw",
                  body: (
                    <DrawForm
                      accountSelected={bankAccountSelected}
                      setLoadingPage={setLoadingPage}
                    />
                  ),
                  width: 600,
                })
              );
            }}
          >
            Draw
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
                <Select
                  style={{ width: "100%" }}
                  defaultValue={bankAccountSelected}
                  onChange={(event) => {
                    setBankAccountSelected(event.target.value);
                    const account = bankAccount.find(
                      (item) => item.name === event.target.value
                    );
                    setBankAccountSelectedValue(account.balance);
                  }}
                >
                  {bankAccount.map((item) => {
                    return <MenuItem value={item.name}>{item.name}</MenuItem>;
                  })}
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
                        body: (
                          <BankAccountForm
                            accountSelected={bankAccountSelected}
                            setLoadingPage={setLoadingPage}
                          />
                        ),
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
                  {numberToCurrency(bankAccountSelectedValue || 0)}
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
                  body: <Extract accountSelected={bankAccountSelected} />,
                  width: 800,
                })
              );
            }}
          >
            Extract
          </Button>
        </Box>
        <Typography component="div" className={classes.chartContainer}>
          <LineChart data={data} />
        </Typography>
      </Box>
    </>
  );
};

export default BalancePanel;
