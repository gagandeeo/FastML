import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import TrainModel from "./TrainModel";
import ResultModel from "./ResultModel";
import Predict from "./Predict";

const Tab = createBottomTabNavigator();

const Dashboard = () => {
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
      <Tab.Screen name="Report" component={ResultModel} />
      <Tab.Screen name="Predict" component={Predict} />
    </Tab.Navigator>
  );
};

export default Dashboard;

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
