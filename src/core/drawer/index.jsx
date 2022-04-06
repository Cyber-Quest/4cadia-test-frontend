import { Divider, Drawer } from "@material-ui/core";
import React from "react";

const CustomDrawer = ({ title, children, width = 400, ...props }) => {
  return (
    <Drawer {...props}>
      <div style={{ paddingLeft: 16 }}>
        <h3>{title}</h3>
      </div>
      <Divider />
      <div style={{ padding: 16, width: width }}>{children}</div>
    </Drawer>
  );
};

export default CustomDrawer;
