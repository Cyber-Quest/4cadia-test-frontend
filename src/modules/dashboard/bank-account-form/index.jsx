import React, { useRef } from "react";
import Button from "../../../core/button/index";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { post } from "../../../core/service/api";
import { openSnackBar } from "../../../redux/snackbar.reducer";

import { styles } from "./styles";
import { FormControl, InputLabel, OutlinedInput, Select } from "@material-ui/core";

const BankAccountForm = () => {
  let refTypeAccount = useRef()
  const classes = styles();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    name: yup.string("Enter the name"),
    balance: yup.number("Enter the balance").required("balance is required"),
  });

  const formik = useFormik({
    initialValues: {
      balance: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      /*   const response = await post("", values);
      if (typeof response === "string") dispatch(openSnackBar(response)); */
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
            ref={ref => {
              refTypeAccount= ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Age
          </InputLabel>
          <Select
            native 
            input={
              <OutlinedInput
                name="age"
                labelWidth={30}
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
            BankAccount
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BankAccountForm;
