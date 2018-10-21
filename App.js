import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewOperation = this.handleNewOperation.bind(this);
    this.handleCorrectResult = this.handleCorrectResult.bind(this);
    this.handleErrorResult = this.handleErrorResult.bind(this);
    this.handleAnswerButtons = this.handleAnswerButtons.bind(this);
    this.state = {
      numberLeft: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      numberRight: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      operatorsArray: ['+', '-', '*'],
      operator: '',
      correctAnswer: '',
      fakeAnswer1: '',
      fakeAnswer2: '',
      error: null
    };
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        operator: prevState.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
      }
    });
    this.handleAnswerButtons();
  }

  handleNewOperation() {
    this.setState(prevState =>
      {
        return {
          numberLeft: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
          numberRight: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
          operator: prevState.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
        }
      }, () => {
        this.handleAnswerButtons()
      });
  }

  handleAnswerButtons() {
    this.setState(prevState => {
      return {
        correctAnswer: eval(`${prevState.numberLeft} ${prevState.operator} ${prevState.numberRight}`),
        fakeAnswer1: prevState.numberLeft - Math.floor(Math.random() * (10 - 0 + 1)) + 0,
        fakeAnswer2: prevState.numberRight + Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      }
    });
  }

  handleCorrectResult() {
    this.handleNewOperation();
  }

  handleErrorResult() {
    this.setState({error: 'You lose'});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.numberLeft}</Text>
        <Text>{this.state.operator}</Text>
        <Text>{this.state.numberRight}</Text>
        <Button
          onPress={this.handleCorrectResult}
          title={this.state.correctAnswer.toString()}
          color="#841584"
        />
        <Button
          onPress={this.handleErrorResult}
          title={this.state.fakeAnswer1.toString()}
          color="#841584"
        />
        <Button
          onPress={this.handleErrorResult}
          title={this.state.fakeAnswer2.toString()}
          color="#841584"
        />
        <Text>{this.state.error ? this.state.error : null}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
