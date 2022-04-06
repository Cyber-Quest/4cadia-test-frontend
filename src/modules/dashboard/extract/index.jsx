import React from "react";
import Table from "../../../core/table";
import { styles } from "./styles";

const Extract = () => {
  const classes = styles();

  return (
    <div>
      <div className={classes.tableContainer}>
        <Table />
      </div>
    </div>
  );
};

export default Extract;
