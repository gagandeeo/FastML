import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
const Predict = () => {
  const [document, setDocument] = React.useState(null);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
  };
  return (
    <View style={styles.container}>
      <Button
        containerStyle={styles.btn}
        title={"Predict Data"}
        onPress={pickDocument}
      />
    </View>
  );
};

export default Predict;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212311",
  },
  btn: {
    margin: 10,
  },
});
