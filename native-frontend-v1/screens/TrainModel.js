import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { Input, Button, ListItem, CheckBox } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";

const regressors = [
  {
    name: "LinearRegression",
  },

  {
    name: "SVR",
  },
  {
    name: "KNeighborsRegressor",
  },
  {
    name: "RandomForestRegressor",
  },
  {
    name: "GradientBoostingRegressor",
  },
  {
    name: "RandomForestRegressor",
  },
  {
    name: "GradientBoostingRegressor",
  },
];
const classifiers = [
  {
    name: "DecisionTreeClassifier",
  },
  {
    name: "LogisticRegression",
  },
  {
    name: "SVC",
  },

  {
    name: "GaussianNB",
  },
  {
    name: "KNeighborsClassifier",
  },

  {
    name: "RandomForestClassifier",
  },

  {
    name: "GradientBoostingClassifier",
  },
];
const clusters = [
  {
    name: "KMeans",
  },
];
function Taber() {
  const [type, setType] = React.useState(0);
  return (
    <View style={{}}>
      <View style={styles.taber}>
        <TouchableOpacity onPress={() => setType(0)}>
          <Text>Regression</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(1)}>
          <Text>Classification</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setType(2)}>
          <Text>Cluster</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list__view}>
        <SafeAreaView>
          <ScrollView>
            {type === 0
              ? regressors.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => alert(regr.name)}
                    style={styles.options}
                    key={index}
                  >
                    <Text>{regr.name}</Text>
                  </TouchableOpacity>
                ))
              : type === 1
              ? classifiers.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => alert(regr.name)}
                    style={styles.options}
                    key={index}
                  >
                    <Text>{regr.name}</Text>
                  </TouchableOpacity>
                ))
              : clusters.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => alert(regr.name)}
                    style={styles.options}
                    key={index}
                  >
                    <Text>{regr.name}</Text>
                  </TouchableOpacity>
                ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const TrainModel = () => {
  const [document, setDocument] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={15}
      style={styles.container}
    >
      <Button
        containerStyle={styles.btn}
        title={"Load Data"}
        onPress={pickDocument}
      />
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Select Model</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded);
        }}
      >
        <ListItem>
          <ListItem.Content>
            <Taber />
          </ListItem.Content>
        </ListItem>
      </ListItem.Accordion>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title>Train Model</ListItem.Title>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded1}
        onPress={() => {
          setExpanded1(!expanded1);
        }}
      >
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Prepare Training Data</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded2}
          onPress={() => {
            setExpanded2(!expanded2);
          }}
        >
          <ListItem>
            <ListItem.Content style={{ height: "83%" }}>
              <SafeAreaView style={{ width: "100%" }}>
                <ScrollView>
                  <CheckBox
                    center
                    title="DropNa"
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                  />
                  <Input placeholder="Imputer Name" />
                  <Input placeholder="Encoder Name" />
                  <Input placeholder="Scaler Name" />
                  <Input
                    inputContainerStyle={{ borderBottomColor: "red" }}
                    placeholder="Target Class Name*"
                  />
                  <Input placeholder="Cols to use (col1_Name, col2_Name,..)" />
                  <Input placeholder="Index-col = None" />
                  <Input placeholder="Test_size = 0.25" />
                </ScrollView>
              </SafeAreaView>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
        <ListItem.Accordion
          content={
            <>
              <ListItem.Content>
                <ListItem.Title>Set HyperParams</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded3}
          onPress={() => {
            setExpanded3(!expanded3);
          }}
        >
          <ListItem>
            <ListItem.Content style={{ height: "80%" }}>
              <SafeAreaView style={{ width: "100%" }}>
                <ScrollView
                  contentContainerStyle={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
                  }}
                >
                  <Text>HyperParam1</Text>
                  <Text>HyperParam2</Text>
                  <Text>HyperParam3</Text>
                  <Text>HyperParam4</Text>
                  <Text>HyperParam5</Text>
                </ScrollView>
              </SafeAreaView>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
        <Button
          title="TRAIN"
          type="solid"
          buttonStyle={{ backgroundColor: "#CB3F61" }}
          onPress={() => alert("Train Model")}
        />
      </ListItem.Accordion>
    </KeyboardAvoidingView>
  );
};

export default TrainModel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "#03091E",
    padding: 10,
  },
  btn: {
    marginBottom: 10,
  },
  disabled: {
    backgroundColor: "darkgrey",
  },

  taber: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
    backgroundColor: "lightblue",
  },
  list__view: {
    display: "flex",
    height: "80%",
  },
  options: {
    backgroundColor: "grey",
    padding: 10,
    margin: 10,
    marginLeft: 50,
    marginRight: 50,
    alignItems: "center",
    borderRadius: 10,
  },
});
