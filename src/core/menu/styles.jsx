import { makeStyles } from "@material-ui/core/styles";

export const styles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }, 
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  main:{
    paddingTop: 32,
    padding: 16
  }
}));
