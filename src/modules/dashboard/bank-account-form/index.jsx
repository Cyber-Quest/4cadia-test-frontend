import React  from "react";
import Button from "../../../core/button/index";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { post } from "../../../core/service/api";
import { openSnackBar } from "../../../redux/snackbar.reducer";

import { styles } from "./styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import { closeDrawer } from "../../../redux/drawer.reducer";

const BankAccountForm = ({setLoadingPage}) => { 
  const classes = styles();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup.string("Enter the name").required("name is required"),
    balance: yup.number("Enter the balance").required("balance is required"),
    dailyWithdrawalLimit: yup
      .number("Enter the daily with drawal limit")
      .required("Daily with drawal limit is required"),
    accountType: yup.string().required("account type is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      balance: "",
      dailyWithdrawalLimit: "",
      accountType: "corrente",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values.balance = parseFloat(values.balance)
      values.dailyWithdrawalLimit = parseFloat(values.dailyWithdrawalLimit)
      const response = await post("account", values); 
      if (typeof response === "string") dispatch(openSnackBar(response));
      if (typeof response === "object") {
        dispatch(openSnackBar("Account created successfully"))
        dispatch(closeDrawer());
        setLoadingPage(true);
      }
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="balance"
            label="Balance"
            name="balance"
            autoComplete="balance"
            autoFocus
            value={formik.values.balance}
            onChange={formik.handleChange}
            error={formik.touched.balance && Boolean(formik.errors.balance)}
            helperText={formik.touched.balance && formik.errors.balance}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="dailyWithdrawalLimit"
            label="Daily withdrawal limit"
            name="dailyWithdrawalLimit"
            autoComplete="dailyWithdrawalLimit"
            autoFocus
            value={formik.values.dailyWithdrawalLimit}
            onChange={formik.handleChange}
            error={
              formik.touched.dailyWithdrawalLimit &&
              Boolean(formik.errors.dailyWithdrawalLimit)
            }
            helperText={
              formik.touched.dailyWithdrawalLimit &&
              formik.errors.dailyWithdrawalLimit
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel 
              htmlFor="outlined-age-native-simple"
            >
              Account type
            </InputLabel>
            <Select
              native
              input={
                <OutlinedInput
                  name="accountType"
                  labelWidth={100}
                  id="outlined-age-native-simple"
                />
              }
            >
              <option value="corrente">Corrente</option>
              <option value="poupança">Poupança</option>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BankAccountForm;
