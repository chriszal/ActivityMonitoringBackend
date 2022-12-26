import React from "react";
import { makeStyles } from "@mui/material/styles";

import Table from "./Table.js";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    marginTop: 15
  },
}));

const DataTablePage = () => {
  const classes = useStyles();

  const query = {
    "limit": 500,
    "timeDimensions": [
      {
        "dimension": "Orders.createdAt",
        "granularity": "day"
      }
    ],
    "dimensions": [
      "Users.id",
      "Orders.id",
      "Orders.size",
      "Users.fullName",
      "Users.city",
      "Orders.price"
    ]
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Table query={query}/>
      </div>
    </div>
  );
};

export default DataTablePage;