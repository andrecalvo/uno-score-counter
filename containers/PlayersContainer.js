import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./PlayersContainerStyles.js";
import {
  addPlayer,
  removePlayer,
  addPoints,
  clearAll,
  clearPoints
} from "../actions";
import Input from "../components/Input";
import PropTypes from "prop-types";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Keyboard,
  Animated
} from "react-native";

const mapStateToProps = state => ({
  players: state.players
});

const mapDispatchToProps = dispatch => ({
  addPlayer: name => dispatch(addPlayer(name)),
  removePlayer: index => dispatch(removePlayer(index)),
  addPoints: (index, points) => dispatch(addPoints(index, points)),
  clearAll: () => dispatch(clearAll()),
  clearPoints: () => dispatch(clearPoints())
});

class PlayersContainer extends Component {
  constructor(props) {
    super(props);
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height
      })
    ]).start();
  };

  keyboardWillHide = event => {
    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: event.duration,
        toValue: 0
      })
    ]).start();
  };

  getListItemStyle(index) {
    switch (index % 4) {
      case 0:
        return styles.listItem4;
      case 2:
        return styles.listItem2;
      case 3:
        return styles.listItem1;
      default:
        return styles.listItem3;
    }
  }

  render() {
    const {
      players,
      addPlayer,
      removePlayer,
      addPoints,
      clearAll,
      clearPoints
    } = this.props;
    return (
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: "#f3f3f3",
          paddingBottom: this.keyboardHeight
        }}
      >
        <ScrollView>
          <View style={styles.headerWrapper}>
            <Text style={styles.headerText}>UNO score counter</Text>
          </View>
          <FlatList
            style={{ backgroundColor: "#fff" }}
            data={players}
            keyExtractor={item => item.name}
            renderItem={({ item, index }) => (
              <View style={[styles.listItem, this.getListItemStyle(index)]}>
                <Text style={styles.listItemTextName}>
                  {item.name}
                  <Text
                    onPress={() => {
                      removePlayer(index);
                    }}
                    style={styles.delete}
                  >
                    {" "}
                    (remove)
                  </Text>
                </Text>
                <Text style={styles.listItemTextPoints}>
                  Current Score: {item.points}
                </Text>
                <Input
                  placeholder={"0"}
                  styles={styles.inputNumber}
                  index={index}
                  onSubmit={args => {
                    addPoints(args.index, args.text);
                  }}
                />
              </View>
            )}
          />
          {players.length > 0 && (
            <View style={styles.clearWrapper}>
              <View style={styles.clearContainer}>
                <Text style={styles.clear} onPress={clearPoints}>
                  Clear Points
                </Text>
              </View>
              <View style={styles.clearContainer}>
                <Text style={styles.clear} onPress={clearAll}>
                  Clear All
                </Text>
              </View>
            </View>
          )}
        </ScrollView>
        <Input
          autoCorrect={false}
          placeholder={"Add a player..."}
          styles={styles.inputName}
          onSubmit={args => {
            addPlayer(args.text);
          }}
        />
      </Animated.View>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayersContainer);
