import React from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from "react-native-elements";
import Plotly from "react-native-plotly";
import { loadResult } from "../redux/actions/loadResult";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";

const ResultModel = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [visibleH, setVisibleH] = React.useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlayH = () => {
    setVisibleH(!visibleH);
  };

  var dataset = [];
  const layout = { title: "My cool chart!" };
  const propTypes = {
    loadResult: PropTypes.func.isRequired,
    result: PropTypes.object,
    load: PropTypes.object,
    logout: PropTypes.func.isRequired,
  };

  React.useEffect(() => {
    console.log(props.result);
  }, []);

  if (props.result) {
    if (props.result.type === 1) {
      for (
        let index = 0;
        index < props.result.misc.roc_curve.fpr.length;
        index++
      ) {
        dataset.push({
          x: props.result.misc.roc_curve.fpr[index],
          y: props.result.misc.roc_curve.tpr[index],
          name: `Class${index} vs Rest`,
        });
      }
    }
  }

  const commitsData = [
    { date: "0", count: 1 },
    // { date: "1", count: 2 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      {props.result ? (
        <ScrollView contentContainerStyle={styles.container__box}>
          <View>
            <View style={styles.metrics}>
              {Object.keys(props.result.report).map((key, index) => (
                <Text key={index}>
                  {key}: {parseFloat(props.result.report[key]).toFixed(5)}
                </Text>
              ))}
            </View>
          </View>
          {props.result.type === 1 ? (
            <>
              <View>
                <Button
                  containerStyle={{ margin: 10 }}
                  title="ROC_CURVE"
                  onPress={toggleOverlay}
                />

                <Overlay
                  overlayStyle={{ height: "75%", width: "95%" }}
                  isVisible={visible}
                  onBackdropPress={toggleOverlay}
                >
                  <Plotly
                    enableFullPlotly={true}
                    data={dataset}
                    layout={{
                      title: "Roc_curve",
                      xaxis: {
                        title: {
                          text: "FPR",
                        },
                      },
                      yaxis: {
                        title: {
                          text: "TPR(Recall)",
                        },
                      },
                    }}
                  />
                </Overlay>
              </View>
              <View>
                <Button
                  // disabled={true}
                  containerStyle={{ margin: 10 }}
                  title="HEAT_MAP"
                  onPress={toggleOverlayH}
                />

                <Overlay
                  overlayStyle={{ height: "75%", width: "95%" }}
                  isVisible={visibleH}
                  onBackdropPress={toggleOverlayH}
                >
                  <Plotly
                    enableFullPlotly={true}
                    data={[
                      {
                        z: props.result.misc.conf_matrix,
                        type: "heatmap",
                      },
                    ]}
                    layout={{
                      title: "HeatMap",
                      xaxis: {
                        title: {
                          text: "Predicted",
                        },
                      },
                      yaxis: {
                        title: {
                          text: "Actual",
                        },
                      },
                    }}
                  />
                </Overlay>
              </View>
            </>
          ) : props.result.type === 0 ? (
            <View>
              <Button
                containerStyle={{ margin: 10 }}
                title="Learning_curve"
                onPress={toggleOverlay}
              />

              <Overlay
                overlayStyle={{ height: "75%", width: "95%" }}
                isVisible={visible}
                onBackdropPress={toggleOverlay}
              >
                <Plotly
                  enableFullPlotly={true}
                  data={[
                    {
                      y: props.result.misc.learning_curve.train_err,
                      color: "smoker",
                      name: "train_err",
                      line: {
                        width: 2.5,
                      },
                    },
                    {
                      y: props.result.misc.learning_curve.val_err,
                      color: "smoker",
                      name: "val_err",
                      line: {
                        width: 2.5,
                      },
                    },
                  ]}
                  layout={{
                    title: "Learning_curve",
                    xaxis: {
                      title: {
                        text: "Train Data Size",
                      },
                    },
                    yaxis: {
                      title: {
                        text: "RMSE",
                      },
                    },
                  }}
                />
              </Overlay>
            </View>
          ) : null}
        </ScrollView>
      ) : (
        <Text>Train To get Result</Text>
      )}
    </SafeAreaView>
  );
};
const mapStateToProps = (state) => ({
  result: state.testResult.result,
  load: state.loadResult.load,
});
const mapDispatchToProps = {
  loadResult,
  logout,
};
export default connect(mapStateToProps, mapDispatchToProps)(ResultModel);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#51543F",
    flex: 1,
  },
  container__box: {
    justifyContent: "space-between",
    overflow: "scroll",
  },
  metrics: {
    backgroundColor: "#C4C4C4",
    margin: 10,
    alignItems: "center",
    padding: 10,
  },
  result: {
    height: "100%",
    backgroundColor: "#C4C4C4",
    marginTop: 10,
    //  height: "100%",
  },
});
