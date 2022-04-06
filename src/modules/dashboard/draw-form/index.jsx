import React from "react";
import Button from "../../../core/button/index";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { post } from "../../../core/service/api";
import { openSnackBar } from "../../../redux/snackbar.reducer";

import { styles } from "./styles";

const DrawForm = () => {
  const classes = styles();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    amount: yup.number("Enter the amount").required("amount is required"),
    description: yup.string("Enter the description"),
  });

  const formik = useFormik({
    initialValues: {
      amount: "",
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
            id="amount"
            label="Amount"
            name="amount"
            autoComplete="amount"
            autoFocus
            value={formik.values.amount}
            onChange={formik.handleChange}
            error={formik.touched.amount && Boolean(formik.errors.amount)}
            helperText={formik.touched.amount && formik.errors.amount}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            className={classes.textField}
            margin="normal"
            variant="outlined"
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={formik.touched.description && formik.errors.description}
          />
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
            Draw
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DrawForm;
