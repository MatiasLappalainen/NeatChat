import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { Socket } from 'net';

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
      socket.emit('my event', { data: 'Connected' });
    });

    socket.on('message', (data: Message) => {
      let tempArray = this.state.messages.concat();
      tempArray.push(data);
      console.log(tempArray);
      this.setState({
        messages: tempArray
      });
    });
  }

  sendMessage = (user: string, message: string) => {
    socket.emit('message', {
      user: user,
      message: message,
      timestamp: new Date()
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={() => this.sendMessage('Matias', 'Hello World')}>
          Send message
        </button>

        {this.state.messages.map(el => {
          return (
            <>
              <p>{el.user}</p>
              <p>{el.message}</p>
            </>
          );
        })}
      </div>
    );
  }
}

export default App;
