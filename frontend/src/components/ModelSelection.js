import React, { useState } from "react";
import "./css/ModelSelection.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { postTest } from "../redux/actions/test";
import mlApiService from "../services/mlapi.service";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function ModelSelection(props) {
  const regressors = [
    {
      name: "LinearRegression",
    },

    {
      name: "SVR",
    },
    {
      name: "KNeighborsRegressor",
    },
    {
      name: "RandomForestRegressor",
    },
    {
      name: "GradientBoostingRegressor",
    },
  ];

  const classifiers = [
    {
      name: "DecisionTreeClassifier",
    },
    {
      name: "LogisticRegression",
    },
    {
      name: "SVC",
    },

    {
      name: "GaussianNB",
    },
    {
      name: "KNeighborsClassifier",
    },

    {
      name: "RandomForestClassifier",
    },

    {
      name: "GradientBoostingClassifier",
    },
  ];
  const clusters = [
    {
      name: "KMeans",
    },
  ];

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const propTypes = {
    postTest: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
  };

  console.log(props.user_id);

  const selectModel = (e, name, type) => {
    props.func(true);
    props.setType(type);
    props.setName(name);
    console.log(name);
    const data = {
      user_id: props.user_id, //SET OVER HERE
      model_name: name,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    console.log(localStorage.getItem("token"));
    mlApiService
      .selectModel(data, config)
      .then((res) => {
        props.postTest(res.data);
      })
      .catch((err) => {
        console.log(err);
        // alert("Try selecting again!");
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" style={{ backgroundColor: "#212C3D" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Regression" {...a11yProps(0)} />
          <Tab label="Classification" {...a11yProps(1)} />
          <Tab label="Cluster" {...a11yProps(2)} disabled={true} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="model__selection">
          {regressors.map((regr, index) => (
            <div
              onClick={(e) => selectModel(e, regr.name, 0)}
              className="model__list"
              key={index}
            >
              <label>{regr.name}</label>
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="model__selection">
          {classifiers.map((classer, index) => (
            <div
              onClick={(e) => selectModel(e, classer.name, 1)}
              className="model__list"
              key={index}
            >
              <label>{classer.name}</label>
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="model__selection">
          {clusters.map((cluster, index) => (
            <div
              onClick={(e) => selectModel(e, cluster.name, 2)}
              className="model__list"
              key={index}
            >
              <label>{cluster.name}</label>
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  );
}

const mapDispatchToProps = {
  postTest,
};
const mapStateToProps = (state) => ({
  user_id: state.auth.user.user_id,
});

export default connect(mapStateToProps, mapDispatchToProps)(ModelSelection);
