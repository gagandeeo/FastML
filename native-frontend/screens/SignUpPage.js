import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";

const SignUpPage = ({ navigation }) => {
  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <View style={styles.signup__box}>
        <Input style={styles.signup__Inp} type="text" placeholder="User Name" />
        <Input style={styles.signup__Inp} type="email" placeholder="Email" />
        <Input
          style={styles.signup__Inp}
          type="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.signup__btn}
          type="outline"
          title="Sign Up"
          onPress={() => navigation.navigate("LoginPage")}
        />
      </View>
      <View style={{ height: 20 }} />
    </KeyboardAvoidingView>
  );
};

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    backgroundColor: "#091826",
  },
  signup__box: {
    display: "flex",
    flexDirection: "column",
    top: "12%",
    width: "60%",
    padding: 10,
    backgroundColor: "#50525C",
    alignItems: "center",
  },
  signup__Inp: {
    color: "white",
  },
  signup__btn: {},
});
