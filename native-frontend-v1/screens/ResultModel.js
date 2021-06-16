import React from "react";
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Plotly from "react-native-plotly";
import { LineChart, ContributionGraph } from "react-native-chart-kit";

const ResultModel = () => {
  const data = [1, 2, 3, 4];
  const layout = { title: "My cool chart!" };
  const commitsData = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container__box}>
        <View>
          <View style={styles.metrics}>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
            <Text>Hello</Text>
          </View>
        </View>
        <View>
          <LineChart
            data={{
              labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
              datasets: [
                {
                  data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                },
              ],
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            // bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
          <ContributionGraph
            values={commitsData}
            endDate={new Date("2017-04-01")}
            numDays={105}
            width={Dimensions.get("window").width}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
          />
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultModel;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#51543F",
    flex: 1,
  },
  container__box: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 5,
    overflow: "scroll",
  },
  metrics: {
    backgroundColor: "#C4C4C4",
    margin: 10,
  },
  result: {
    height: "90%",
    backgroundColor: "#C4C4C4",
    marginTop: 10,
    //  height: "100%",
  },
});
