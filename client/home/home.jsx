import React from "react";
var io = require ('socket.io-client');
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 0,
      endpoint: "http://127.0.0.1:3000/"
    };
  }
  componentDidMount() {
    const { endpoint } = this.state;
    const socket = io(endpoint);
    const coin = this.props.match.params.name;
    socket.emit('request', {coin: coin})
    socket.on('response', data => this.setState({ response: data }));
  }
  render() {
    console.log(this.state.response);
    return (
      <div>{this.state.response}</div>
    );
  }
}