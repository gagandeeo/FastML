import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import SignUpPage from "./screens/SignUpPage";
import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";
import { connect } from "react-redux";
const Stack = createStackNavigator();

const NavigationControl = (props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {props.isAuthenticated ? (
          <Stack.Screen name="Dashboard" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={({ navigation, route }) => ({
                headerTitle: "FastML",
              })}
            />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(NavigationControl);

const styles = StyleSheet.create({});
