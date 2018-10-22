import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Button } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleNewOperation = this.handleNewOperation.bind(this);
    this.handleCorrectResult = this.handleCorrectResult.bind(this);
    this.handleErrorResult = this.handleErrorResult.bind(this);
    this.handleAnswerButtons = this.handleAnswerButtons.bind(this);
    this.generateFakeAnswer = this.generateFakeAnswer.bind(this);
    this.restart = this.restart.bind(this);
    this.state = {
      numberLeft: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      numberRight: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      numberToSelectCorrectAnswerButton: Math.floor(Math.random() * (2 - 0 + 1)) + 0,
      operatorsArray: ['+', '-', '*'],
      operator: '',
      correctAnswer: '',
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
        numberToSelectCorrectAnswerButton: Math.floor(Math.random() * (2 - 0 + 1)) + 0
      }
    });
  }

  generateFakeAnswer() {
    const randNumber = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
    const randOperator = this.state.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0];
    const numberToSelectNumberToOperate = Math.floor(Math.random() * (2 - 1 + 1)) + 1;

    let fakeAnswer = eval(`${numberToSelectNumberToOperate === 1 ? this.state.numberLeft : this.state.numberRight} ${randOperator} ${randNumber}`);

    if (fakeAnswer != this.state.correctAnswer) {
      return fakeAnswer.toString();
    } else {
      return eval(`${fakeAnswer} ${this.state.operatorsArray[Math.floor(Math.random() * (1 - 0 + 1)) + 0]} 1`).toString();
    }
  }

  handleCorrectResult() {
    this.handleNewOperation();
  }

  handleErrorResult() {
    this.setState({error: 'You lose'});
  }

  restart() {
    this.setState({error: null});
  }

  render() {
    return (
      <View style={styles.container}>
      {this.state.error === null ? (
        <View>
          <Text style={styles.operation}>{this.state.numberLeft} {this.state.operator} {this.state.numberRight}</Text>
          <TouchableHighlight
            onPress={this.state.numberToSelectCorrectAnswerButton == 0 ? this.handleCorrectResult : this.handleErrorResult}
            style={styles.button}
          >
            <Text>{this.state.numberToSelectCorrectAnswerButton == 0 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.state.numberToSelectCorrectAnswerButton == 1 ? this.handleCorrectResult : this.handleErrorResult}
            style={styles.button}
          >
            <Text>{this.state.numberToSelectCorrectAnswerButton == 1 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.state.numberToSelectCorrectAnswerButton == 2 ? this.handleCorrectResult : this.handleErrorResult}
            style={styles.button}
          >
            <Text>{this.state.numberToSelectCorrectAnswerButton == 2 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
          </TouchableHighlight>
        </View>) : null}
        {this.state.error != null ? (
        <View>
          <Text style={styles.errorText}>{this.state.error ? this.state.error : null}</Text>
          <Button
            onPress={this.restart}
            title="Play Again"
            color="#EFEFEF"
          />
        </View>) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F5765',
    alignItems: 'center',
    justifyContent: 'center',
  },
  operation: {
    fontSize: 45,
    color: '#EFEFEF',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2B3A42',
    padding: 10
  },
  errorText: {
    fontSize: 80,
    color: '#FF530D',
  }
});
