import React, { Component } from 'react';

export default class App extends Component {
  state = { controllers: [] };

  componentDidMount() {
    // fetch('/api/get_controllers')
    //   .then(res => res.json())
    //   .then(controllers => this.setState({ controllers }));
  }

  render() {
    return (<div/>)
  }
}
