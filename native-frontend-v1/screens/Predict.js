import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Overlay } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mlapiService from "../services/mlapi.service";
import PropTypes from "prop-types";
import { SkypeIndicator } from "react-native-indicators";

const Predict = (props) => {
  const [token, setToken] = React.useState(null);
  const [progress, setProgress] = React.useState(false);
  const [document, setDocument] = React.useState(null);

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
    setDocument(null);
    try {
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
        const config = {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        };
        if (token) {
          config.headers["Authorization"] = `bearer ${token}`;
        }
        mlapiService
          .predictData(formData, config)
          .then((res) => {
            alert("Download starting in browser");
            setDocument({ name: result.name, size: result.size });
            Linking.openURL(res.data.url);
          })
          .catch((err) => {
            setDocument(false);
            setProgress(false);
            alert("Try Again!!");
          });
      }
      setProgress(true);
    } catch (error) {
      setDocument(false);
      setProgress(false);
      alert("Try Again!!");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.btn}
        title={
          progress ? (
            document ? (
              document.name + "  " + (document.size / 1000).toFixed(2) + " KB"
            ) : (
              <SkypeIndicator color="white" />
            )
          ) : (
            "Predict Data(Browser-Support)"
          )
        }
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
