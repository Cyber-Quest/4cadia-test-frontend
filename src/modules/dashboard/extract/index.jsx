import React, { useEffect, useState } from "react";
import Table from "../../../core/table";
import { styles } from "./styles";
import { get } from "../../../core/service/api";
import { Box, CircularProgress } from "@material-ui/core";

const Extract = ({ accountSelected = "" }) => {
  const classes = styles();
  const [loadingPage, setLoadingPage] = useState(true);
  const [extract, setExtract] = useState([])
 
  useEffect(() => {
    (async () => {
      const response = await get(`transaction/extract/${accountSelected}`, {
        params: { take: 200, skip: 0 },
      });
      if (Array.isArray(response)) {
        setExtract(response)
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
    <div>
      <div className={classes.tableContainer}>
        <Table data={extract} />
      </div>
    </div>
  );
};

export default Extract;
