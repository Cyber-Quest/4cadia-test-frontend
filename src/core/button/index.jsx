import { Button, CircularProgress } from "@material-ui/core";
import React from "react";

function CustomButton({ loading, children, ...props }) {
  return (
    <Button disabled={loading} {...props}>
      {loading ? <CircularProgress  /> : children}
    </Button>
  );
}

export default CustomButton;
