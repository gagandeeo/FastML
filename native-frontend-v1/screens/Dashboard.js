import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import TrainModel from "./TrainModel";
import ResultModel from "./ResultModel";
import Predict from "./Predict";
import { Button } from "react-native-elements";
import { logout } from "../redux/actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadResult } from "../redux/actions/loadResult";

function HeaderRight(props) {
  const [resultBadge, setResultBadge] = React.useState(false);
  const handleLogOut = () => {
    // alert("Log Out!");
    props.logout();
  };
  return (
    <Button
      buttonStyle={{ backgroundColor: "#CB3F50" }}
      containerStyle={{ marginRight: 5 }}
      title="Log Out"
      onPress={handleLogOut}
    />
  );
}

const Tab = createBottomTabNavigator();

const Dashboard = (props) => {
  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => <HeaderRight logout={props.logout} />,
    });
  }, []);

  const propTypes = {
    loadResult: PropTypes.func.isRequired,
    result: PropTypes.object,
    load: PropTypes.object,
    loaded: PropTypes.bool,
    logout: PropTypes.func.isRequired,
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Train") {
            iconName = focused ? "offline-bolt" : "offline-bolt";
          } else if (route.name === "Report") {
            iconName = focused ? "assessment" : "assessment";
          } else if (route.name === "Predict") {
            iconName = focused ? "play-for-work" : "play-for-work";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        style: styles.tab,
        tabStyle: styles.tab__options,
        activeTintColor: "white",
      }}
    >
      <Tab.Screen name="Train" component={TrainModel} />
      <Tab.Screen
        name="Report"
        options={props.loaded ? { tabBarBadge: 3 } : null}
        component={ResultModel}
      />
      <Tab.Screen name="Predict" component={Predict} />
    </Tab.Navigator>
  );
};
const mapStateToProps = (state) => ({
  result: state.testResult.result,
  load: state.loadResult.load,
  loaded: state.loadResult.loaded,
});
const mapDispatchToProps = {
  loadResult,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  text: {
    alignItems: "center",
    marginTop: "30%",
  },
  tab: {
    position: "absolute",
    display: "flex",
    backgroundColor: "#264920",
    margin: 5,
    marginBottom: 10,
  },
  tab__options: {
    padding: 5,
    alignSelf: "center",
  },
});
