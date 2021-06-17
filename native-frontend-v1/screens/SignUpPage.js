import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";
import usersApiService from "../services/usersApi.service";

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
      username: username,
    };
    usersApiService
      .signup(data)
      .then((res) => {
        console.log(res);
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginPage" }],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <View style={styles.signup__box}>
        <Input
          onChangeText={(text) => setUsername(text)}
          style={styles.signup__Inp}
          type="text"
          placeholder="User Name"
        />
        <Input
          onChangeText={(text) => setEmail(text)}
          style={styles.signup__Inp}
          type="email"
          placeholder="Email"
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          style={styles.signup__Inp}
          type="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.signup__btn}
          type="outline"
          title="Sign Up"
          onPress={handleSubmit}
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
