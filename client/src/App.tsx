import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Landing from './Views/Landing';

interface Message {
  timestamp: Date;
  user: string;
  message: string;
}

interface AppState {
  messages: [
    {
      timestamp: Date;
      user: string;
      message: string;
    }
  ];
}

var socket = io('http://localhost:5000');

class App extends Component {
  state: AppState = {
    messages: [
      {
        timestamp: new Date(),
        user: 'Test',
        message: 'Test'
      }
    ]
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (data: Message) => {
      let tempArray = this.state.messages.concat();
      tempArray.push(data);

      this.setState({
        messages: tempArray
      });
    });
  }

  render() {
    return (
      <div className="App">
        <Landing />
      </div>
    );
  }
}

export default App;
