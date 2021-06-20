import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mlapiService from "../services/mlapi.service";
import PropTypes from "prop-types";
const Predict = (props) => {
  const [token, setToken] = React.useState(null);

  const propTypes = {
    user: PropTypes.object,
  };

  React.useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      setToken(res);
    });
  }, []);

  const pickDocument = async (e) => {
    e.preventDefault();
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type !== "cancel") {
      const fileData = {
        uri: result.uri,
        name: result.name,
        type: "text/csv",
      };

      const formData = new FormData();

      formData.append("user_id", props.user.user_id);
      formData.append("file", fileData);
      console.log(formData);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      };

      if (token) {
        config.headers["Authorization"] = `bearer ${token}`;
      }
      await mlapiService
        .predictData(formData, config)
        .then((res) => {
          alert("Download starting on web");
          Linking.openURL(res.data.url);
        })
        .catch((err) => {
          console.log(err);
          alert("Try Again!!");
        });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.btn}
        title={"Predict Data(Browser-Support)"}
        onPress={pickDocument}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, null)(Predict);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212311",
  },
  btn: {
    margin: 10,
  },
});
