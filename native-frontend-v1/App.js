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
import { store, persistor } from "./redux/configureStore";
import { Provider } from "react-redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = React.useState(null);

  AsyncStorage.getItem("token").then((res) => {
    setToken(res);
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* {token ? ( */}
          {/* ) : ( */}
          {/* <> */}
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

          {/* </> */}
          {/* )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="LandingPage"
//             component={LandingPage}
//             options={({ navigation, route }) => ({
//               headerTitle: "FastML",
//             })}
//           />
//           <Stack.Screen name="SignUpPage" component={SignUpPage} />
//           <Stack.Screen name="LoginPage" component={LoginPage} />
//           <Stack.Screen name="Dashboard" component={Dashboard} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
