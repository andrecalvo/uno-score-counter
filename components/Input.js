import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { text: props.placeholder };
  }

  render() {
    const { onSubmit, index, placeholder, styles, keyboardType } = this.props;
    const { text } = this.state;
    return (
      <TextInput
        keyboardType={keyboardType || "default"}
        style={styles}
        ref={input => {
          this.textInput = input;
        }}
        onChangeText={text => this.setState({ text })}
        value={text}
        clearTextOnFocus={true}
        onSubmitEditing={() => {
          onSubmit({ index, text });
          this.setState({ text: placeholder });
        }}
      />
    );
  }
}
