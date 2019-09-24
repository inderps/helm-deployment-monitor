import React, { Component } from 'react';
import io from 'socket.io-client';
import Charts from './components/Charts';

export default class App extends Component {
  state = { charts: [] };

  componentDidMount() {
    const socket = io.connect(window.location.host, { reconnect: true });
    socket.on('getListOfChartsResponse', (charts) => {
      this.setState({ charts });
    });

    socket.on('connect', () => {
      socket.emit('getListOfCharts');
    });
  }

  render() {
    const { charts } = this.state;
    return (<Charts charts={charts} />);
  }
}
