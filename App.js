import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers/index.js";
import PlayersContainer from "./containers/PlayersContainer.js";
const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PlayersContainer />
      </Provider>
    );
  }
}
