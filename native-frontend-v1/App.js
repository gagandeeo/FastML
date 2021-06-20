import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./screens/LandingPage";
import SignUpPage from "./screens/SignUpPage";
import LoginPage from "./screens/LoginPage";
import Dashboard from "./screens/Dashboard";
import { store } from "./redux/configureStore";
import { Provider } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationControl from "./NavigationControl";
const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = React.useState(null);
  React.useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      setToken(res);
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <NavigationContainer>
        <Stack.Navigator>
          {token ? (
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
      </NavigationContainer> */}
      <NavigationControl />
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
