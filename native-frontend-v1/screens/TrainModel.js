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

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Input, Button, ListItem, CheckBox } from "react-native-elements";
import * as DocumentPicker from "expo-document-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import mlapiService from "../services/mlapi.service";
import { postTest } from "../redux/actions/test";
import { testResult } from "../redux/actions/testResult";
import { loadResult } from "../redux/actions/loadResult";

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
function Taber(props) {
  return (
    <View style={{}}>
      <View style={styles.taber}>
        <TouchableOpacity onPress={() => props.setModelType(0)}>
          <Text>Regression</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setModelType(1)}>
          <Text>Classification</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true} onPress={() => props.setModelType(2)}>
          <Text>Cluster</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.list__view}>
        <SafeAreaView>
          <ScrollView>
            {props.modelType === 0
              ? regressors.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => props.handleSelectModel(regr.name)}
                    style={styles.options}
                    key={index}
                  >
                    <Text>{regr.name}</Text>
                  </TouchableOpacity>
                ))
              : props.modelType === 1
              ? classifiers.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => props.handleSelectModel(regr.name)}
                    style={styles.options}
                    key={index}
                  >
                    <Text>{regr.name}</Text>
                  </TouchableOpacity>
                ))
              : clusters.map((regr, index) => (
                  <TouchableOpacity
                    onPress={() => props.handleSelectModel(regr.name)}
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

const TrainModel = (props) => {
  const [model, setModel] = React.useState(null);

  const [document, setDocument] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [expanded1, setExpanded1] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [encoder, setEncoder] = useState("");
  const [imputer, setImputer] = useState("");
  const [scaler, setScaler] = useState("");
  const [modelType, setModelType] = useState(0);
  const [targets, setTargets] = useState("");
  const [testSize, setTestSize] = useState(0.25);
  const [usecols, setUsecols] = useState(null);
  const [indexCol, setIndexCol] = useState(10000);

  React.useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      setToken(res);
    });
  }, []);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    const fileData = {
      uri: result.uri,
      name: result.name,
      type: "text/csv",
    };

    const formData = new FormData();

    formData.append("user_id", props.user_id);
    formData.append("file", fileData);
    console.log(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    mlapiService
      .uploadData(formData, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // setDocument(result);
  };
  const propTypes = {
    postTest: PropTypes.func.isRequired,
    user_id: PropTypes.number.isRequired,
    data: PropTypes.object,
    loadResult: PropTypes.func.isRequired,
    testResult: PropTypes.func.isRequired,
  };

  const handleTrainSub = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }

    const data = {
      user_id: props.user_id,
      model_type: modelType,
      hyper_params: props.data.hyper_params,
      usecols: usecols,
      index_col: indexCol,
      targets: targets,
      test_size: testSize,
      dropna: checked,
      impute: imputer,
      encoding: encoder,
      scaling: scaler,
    };
    if (targets) {
      props.loadResult({ isLoading: true });

      mlapiService
        .trainModel(data, config)
        .then((res) => {
          props.testResult(res.data);
          props.loadResult({ isLoading: false });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          const status = err.response.status;
          if (status === 500) {
            props.loadResult({
              isLoading: false,
              error: status,
              msg: err.response.data.detail,
            });
            alert(err.response.data.detail);
          } else if (status === 422) {
            props.loadResult({
              isLoading: false,
              error: status,
              msg: "verify inputs",
            });
            alert("verify inputs");
          }
        });
    } else {
      alert("Please fill mandatory inputs");
    }
  };
  const handleHyperChange = (e, key) => {
    if (typeof props.data.hyper_params[`${key}`] == "number") {
      props.data.hyper_params[`${key}`] = Number(e.target.value);
    } else if (typeof props.data.hyper_params[`${key}`] == "boolean") {
      if (e.target.value.toLowerCase() === "true") {
        props.data.hyper_params[`${key}`] = true;
      } else {
        props.data.hyper_params[`${key}`] = false;
      }
    } else {
      if (Number(e.target.value) != "NaN") {
        props.data.hyper_params[`${key}`] = Number(e.target.value);
      } else if (e.target.value.toLowerCase() === "true") {
        props.data.hyper_params[`${key}`] = true;
      } else if (e.target.value.toLowerCase() === "false") {
        props.data.hyper_params[`${key}`] = true;
      } else {
        props.data.hyper_params[`${key}`] = e.target.value;
      }
    }
  };
  const handleSelectModel = (model_name) => {
    const data = {
      user_id: props.user_id, //SET OVER HERE
      model_name: model_name,
    };
    console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (token) {
      config.headers["Authorization"] = `bearer ${token}`;
    }
    mlapiService
      .selectModel(data, config)
      .then((res) => {
        props.postTest(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <Taber
              modelType={modelType}
              setModelType={setModelType}
              handleSelectModel={handleSelectModel}
            />
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
                  <Input
                    onChangeText={(text) => setImputer(text)}
                    placeholder="Imputer Name"
                  />
                  <Input
                    onChangeText={(text) => setEncoder(text)}
                    placeholder="Encoder Name"
                  />
                  <Input
                    onChangeText={(text) => setScaler(text)}
                    placeholder="Scaler Name"
                  />
                  <Input
                    onChangeText={(text) => setTargets(text)}
                    inputContainerStyle={{ borderBottomColor: "red" }}
                    placeholder="Target Class Name*"
                  />
                  <Input
                    onChangeText={(text) => setUsecols(text)}
                    placeholder="Cols to use (col1_Name, col2_Name,..)"
                  />
                  <Input
                    onChangeText={(text) => setIndexCol(parseInt(text))}
                    placeholder="Index-col = None"
                  />
                  <Input
                    onChangeText={(text) => setTestSize(text)}
                    placeholder="Test_size = 0.25"
                  />
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
                  {props.data ? (
                    <>
                      <Text>PPP</Text>
                      {/* {Object.keys(props.data.hyper_params).map(
                        (key, index) => {
                          return (
                            <View key={index}>
                              <Text>{key}</Text>
                              <Input
                                onChangeText={(e) => handleHyperChange(e, key)}
                                placeholder={
                                  props.data.hyper_params[key]
                                    ? typeof props.data.hyper_params[key] !==
                                      "boolean"
                                      ? props.data.hyper_params[key]
                                      : props.data.hyper_params[key].toString()
                                    : "null"
                                }
                                type="text"
                              />
                            </View>
                          );
                        }
                      )} */}
                    </>
                  ) : null}
                </ScrollView>
              </SafeAreaView>
            </ListItem.Content>
          </ListItem>
        </ListItem.Accordion>
        <Button
          title="TRAIN"
          type="solid"
          buttonStyle={{ backgroundColor: "#CB3F61" }}
          onPress={handleTrainSub}
        />
      </ListItem.Accordion>
    </KeyboardAvoidingView>
  );
};
const mapDispatchToProps = {
  postTest,
  testResult,
  loadResult,
};
const mapStateToProps = (state) => ({
  user_id: state.auth.user.user_id,
  data: state.test.test,
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainModel);

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
