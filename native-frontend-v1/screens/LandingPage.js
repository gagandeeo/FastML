import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function HeaderRight({ navigation }) {
  return (
    <View style={styles.header__right}>
      <TouchableOpacity
        style={styles.header__rightBtn}
        onPress={() => navigation.navigate("SignUpPage")}
      >
        <Text>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.header__rightBtn}
        onPress={() => navigation.navigate("LoginPage")}
      >
        <Text>LogIn</Text>
      </TouchableOpacity>
    </View>
  );
}

const LandingPage = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight navigation={navigation} />,
    });
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Header</Text>
      </View>
      <Text>LandingPage</Text>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#0D1321",
  },
  text: {
    color: "white",
  },
  header: {
    backgroundColor: "#E4E4E4",
  },
  header__right: {
    display: "flex",
    flexDirection: "row",
    padding: 20,
  },
  header__rightBtn: {
    margin: 5,
  },
});
