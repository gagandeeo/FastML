import React from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import usersApiService from "../services/usersApi.service";
import { Input, Overlay, Button } from "react-native-elements";
import { SkypeIndicator } from "react-native-indicators";

const SignUpPage = ({ navigation }) => {
  const [email, setEmail] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [progress, setProgress] = React.useState(false);

  const handleSubmit = async () => {
    const data = {
      email: email,
      password: password,
      username: username,
    };
    try {
      await usersApiService.signup(data).then((res) => {
        navigation.navigate("LoginPage");
      });
      setProgress(true);
    } catch (err) {
      alert("Try Again");
    }
  };
  return (
    <KeyboardAvoidingView enabled style={styles.container}>
      <Overlay
        overlayStyle={{
          marginBottom: 200,
          height: "100%",
          width: "100%",
          backgroundColor: "transparent",
        }}
        isVisible={progress}
        onBackdropPress={() => setProgress(false)}
      >
        <SkypeIndicator color="white" />
      </Overlay>
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
