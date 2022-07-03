import React from "react";
import { View, Text } from "react-native";
import withIndexView from "@cus/controllers/dist/index";
import styles from "./style";

function IndexView() {
  return (
    <View>
      <Text>123</Text>
    </View>
  );
}

export default withIndexView(IndexView);