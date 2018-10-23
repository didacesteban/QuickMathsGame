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
      time: 30,
      maxValue: 10,
      difficulty: 5,
      puntuation: 0,
      operator: '',
      correctAnswer: '',
      lives: 3,
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
          numberLeft: Math.floor(Math.random() * (prevState.maxValue - 0 + 1)) + 0,
          numberRight: Math.floor(Math.random() * (prevState.maxValue - 0 + 1)) + 0,
          operator: prevState.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0],
          puntuation: prevState.puntuation + 1,
          maxValue: (prevState.puntuation % 10 == 0 && prevState.puntuation != 0) ? prevState.maxValue + prevState.difficulty : prevState.maxValue
        }
      }, () => {
        this.handleAnswerButtons();
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
    const randNumber = Math.floor(Math.random() * (this.state.maxValue - 0 + 1)) + 0;
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
    this.setState(prevState => {
      return {
        error: prevState.lives != 1 ? null : 'You lose',
        lives: prevState.lives != 1 ? prevState.lives - 1 : 0
      };
    });
  }

  restart() {
    this.setState(() => {
      return {
        error: null,
        puntuation: 0,
        lives: 3,
        maxValue: 10
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.scoreboard}>Time: {this.state.time} Lives: {this.state.lives} Score: {this.state.puntuation}</Text>
      {this.state.error === null ? (
        <View>
          <Text style={styles.operation}> &nbsp; </Text>
          <Text style={styles.operation}>{this.state.numberLeft} {this.state.operator} {this.state.numberRight}</Text>
          <Text style={styles.operation}> &nbsp; </Text>
          <View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this.state.numberToSelectCorrectAnswerButton === 0 ? this.handleCorrectResult : this.handleErrorResult}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton === 0 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this.state.numberToSelectCorrectAnswerButton == 1 ? this.handleCorrectResult : this.handleErrorResult}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton == 1 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this.state.numberToSelectCorrectAnswerButton == 2 ? this.handleCorrectResult : this.handleErrorResult}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton == 2 ? this.state.correctAnswer.toString() : this.generateFakeAnswer()}</Text>
              </TouchableHighlight>
            </View>
          </View>
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
  buttonText: {
    fontSize: 45,
    color: '#EFEFEF'
  },
  errorText: {
    fontSize: 80,
    color: '#FF530D'
  },
  scoreboard: {
    fontSize: 15,
    color: '#EFEFEF'
  }
});
