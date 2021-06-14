import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
import DocumentPicker from "react-native-document-picker";

const TrainModel = () => {
  const [singleFile, setSingleFile] = useState(null);
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert("Canceled");
      } else {
        // For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };

  return (
    <View style={styles.container}>
      {singleFile != null ? (
        <Text style={styles.textStyle}>
          File Name: {singleFile.name ? singleFile.name : ""}
          {"\n"}
          Type: {singleFile.type ? singleFile.type : ""}
          {"\n"}
          File Size: {singleFile.size ? singleFile.size : ""}
          {"\n"}
          URI: {singleFile.uri ? singleFile.uri : ""}
          {"\n"}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}
      >
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrainModel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#03091E",
  },
});
