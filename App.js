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
    this.startTimer = this.startTimer.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.countDown = this.countDown.bind(this);
    this.restart = this.restart.bind(this);
    this.handleEndingTime = this.handleEndingTime.bind(this);
    this.state = {
      numberLeft: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      numberRight: Math.floor(Math.random() * (10 - 0 + 1)) + 0,
      numberToSelectCorrectAnswerButton: Math.floor(Math.random() * (2 - 0 + 1)) + 0,
      operatorsArray: ['+', '-', '*'],
      maxTime: 5,
      timeRemaining: 5,
      maxValue: 10,
      difficulty: 5,
      puntuation: 0,
      operator: '',
      correctAnswer: '',
      fakeAnswer1: '',
      fakeAnswer2: '',
      fakeAnswer3: '',
      lives: 3,
      error: null
    };
    this.timer = 0;
  }

  componentDidMount() {
    this.setState(prevState => {
      return {
        operator: prevState.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0]
      }
    });
    this.handleAnswerButtons();
    this.startTimer();
  }

  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  startTimer() {
    if (this.timer == 0 && this.state.timeRemaining > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
   // Remove one second, set state so a re-render happens.
   let seconds = this.state.timeRemaining - 1;
   this.setState({
     maxTime: this.secondsToTime(seconds),
     timeRemaining: seconds,
   }, () => {
     if (seconds === 0) {
       this.handleEndingTime();
     }
   });

   // Check if we're at zero.
   if (seconds === 0) {
     clearInterval(this.timer);
   }
 }

  handleNewOperation() {
    this.setState(prevState =>
      {
        return {
          numberLeft: Math.floor(Math.random() * (prevState.maxValue - 0 + 1)) + 0,
          numberRight: Math.floor(Math.random() * (prevState.maxValue - 0 + 1)) + 0,
          operator: prevState.operatorsArray[Math.floor(Math.random() * (2 - 0 + 1)) + 0],
          puntuation: prevState.puntuation + 1,
          maxTime: 5,
          timeRemaining: 5,
          maxValue: (prevState.puntuation % 10 == 0 && prevState.puntuation != 0) ? prevState.maxValue + prevState.difficulty : prevState.maxValue
        }
      }, () => {
        this.handleAnswerButtons();
      });
      this.startTimer();
  }

  handleAnswerButtons() {
    this.setState(prevState => {
      return {
        correctAnswer: eval(`${prevState.numberLeft} ${prevState.operator} ${prevState.numberRight}`),
        numberToSelectCorrectAnswerButton: Math.floor(Math.random() * (2 - 0 + 1)) + 0
      }
    }, () => {
      this.setState(() => {
        return {
          fakeAnswer1: this.generateFakeAnswer(),
          fakeAnswer2: this.generateFakeAnswer(),
          fakeAnswer3: this.generateFakeAnswer()
        }
      })
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

  handleEndingTime() {
    this.setState(() => {
      return {
        error: 'You lose',
        lives: 0
      };
    });
  }

  restart() {
    this.setState(() => {
      return {
        error: null,
        puntuation: 0,
        lives: 3,
        maxValue: 10,
        maxTime: 5,
        timeRemaining: 5
      }
    }, () => {
      this.timer = 0;
      this.startTimer();
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <Text style={styles.scoreboard}>Time: {this.state.timeRemaining} Lives: {this.state.lives} Score: {this.state.puntuation}</Text>
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
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton === 0 ? this.state.correctAnswer.toString() : this.state.fakeAnswer1}</Text>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this.state.numberToSelectCorrectAnswerButton == 1 ? this.handleCorrectResult : this.handleErrorResult}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton == 1 ? this.state.correctAnswer.toString() : this.state.fakeAnswer2}</Text>
              </TouchableHighlight>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableHighlight
                onPress={this.state.numberToSelectCorrectAnswerButton == 2 ? this.handleCorrectResult : this.handleErrorResult}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{this.state.numberToSelectCorrectAnswerButton == 2 ? this.state.correctAnswer.toString() : this.state.fakeAnswer3}</Text>
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
    color: '#EFEFEF'
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
