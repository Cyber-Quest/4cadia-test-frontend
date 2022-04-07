import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { dataFormat, numberToCurrency } from "../utils/convert-values";

const styles = {
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
};


const CustomTable = (props) => {
  const { classes } = props;

  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Account Type</TableCell>
            <TableCell align="right">Amount</TableCell> 
            <TableCell align="right">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((n, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {dataFormat(n.created_at)}
              </TableCell>
              <TableCell >{n.description}</TableCell>
              <TableCell align="right">{n.type}</TableCell>
              <TableCell align="right">{numberToCurrency(n.amount)}</TableCell>
              <TableCell align="right">{n.account.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomTable);
