import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import SignUpPage from "./screens/SignUpPage";
import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={({ navigation, route }) => ({
            headerTitle: "FastML",
          })}
        />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
