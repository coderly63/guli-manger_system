import React, { Component } from "react";
import PropTypes from "prop-types";
export default class Counter extends Component {
  static propoTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
  };
  numRef = React.createRef();
  increment = () => {
    const value = this.numRef.current.value * 1;
    this.props.increment(value);
  };
  decrement = () => {
    const value = this.numRef.current.value * 1;
    this.props.decrement(value);
  };
  incrementIfOdd = () => {
    const value = this.numRef.current.value * 1;
    if (this.props.count % 2 !== 0) this.props.increment(value);
  };
  incrementAsync = () => {
    const value = this.numRef.current.value * 1;
    this.props.incrementAsync(value);
  };
  render() {
    const count = this.props.count;
    console.log(count);
    return (
      <div>
        <p>点击了{count}次</p>
        <select name="count" ref={this.numRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.increment}>+</button>&nbsp;&nbsp;&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;&nbsp;&nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={this.incrementAsync}>increment async </button>
        &nbsp;&nbsp;&nbsp;
      </div>
    );
  }
}
