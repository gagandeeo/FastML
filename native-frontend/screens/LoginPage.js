import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";

const LoginPage = ({ navigation }) => {
  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <View style={styles.login__box}>
        <Input style={styles.login__Inp} type="email" placeholder="Email" />
        <Input
          style={styles.login__Inp}
          type="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.login__btn}
          type="outline"
          title="Log In"
          onPress={() => navigation.navigate("Dashboard")}
        />
      </View>
      <View style={{ height: 20 }} />
    </KeyboardAvoidingView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#091826",
  },
  login__box: {
    display: "flex",
    flexDirection: "column",
    top: "12%",
    width: "60%",
    padding: 10,
    backgroundColor: "#50525C",
    alignItems: "center",
  },
  login__Inp: {
    color: "white",
  },
  login__btn: {},
});
