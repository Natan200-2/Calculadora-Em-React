import React, { Component } from "react";
import "./calculator.css";

import Button from "../components/button";
import Display from "../components/display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operator: null,
  values: [0, 0],
  current: 0
};

export default class Calculator extends Component {
  state = { ...initialState }; //cria um clone da constante

  constructor(props) {
    super(props);
    this.addDigit = this.addDigit.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.clearMemory = this.clearMemory.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equals = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
      } catch (e) {
        values[0] = this.state.values[0];
      }
      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values
      });
    }
  }

  addDigit(n) {
    if (n === "." && this.state.displayValue.includes(".")) {
      return;
    }

    //se display tiver apenas 0 será limpado para adicionar novo número, ou display será limpado se clearDisplay do state for true

    //todos os this se referem ao componente calculadora pois é aonde foi setado o state
    const clearDisplay =
      this.state.displayValue === "0" || this.state.clearDisplay;

    const currentValue = clearDisplay ? "" : this.state.displayValue;

    const newDisplayValue = currentValue + n;

    this.setState({ displayValue: newDisplayValue, clearDisplay: false });
    //newDisplayValue poderia ter o mesmo nome da vairavel do state, assim o código ficaria apenas: displayValue, clearDisplay: false

    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(newDisplayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
