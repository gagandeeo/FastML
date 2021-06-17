import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Input, Button } from "react-native-elements";
import { login, logout } from "../redux/actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import usersApiService from "../services/usersApi.service";
const LoginPage = (props) => {
  const [email, setEmail] = React.useState("test4@test.com");
  const [password, setPassword] = React.useState("test4");
  const propTypes = {
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("grant_type", "password");
    formData.append("username", email);
    formData.append("password", password);
    props.login(formData, props.navigation);
  };

  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <View style={styles.login__box}>
        <Input
          onChangeText={(text) => setEmail(text)}
          type="email"
          placeholder="Email"
          style={styles.login__Inp}
        />
        <Input
          onChangeText={(text) => setPassword(text)}
          style={styles.login__Inp}
          type="password"
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          containerStyle={styles.login__btn}
          type="outline"
          title="Log In"
          onPress={handleSubmit}
        />
      </View>
      <View style={{ height: 20 }} />
    </KeyboardAvoidingView>
  );
};
const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(LoginPage);

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
