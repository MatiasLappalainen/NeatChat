import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import Landing from './Views/Landing';
import Chat from './Views/Chat';

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
  room: string;
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
    ],
    room: ''
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

    socket.on('room_created', (room: string) => {
      this.setState({
        room: room
      });
    });
  }

  sendRoom = (room: string) => {
    socket.emit('create_room', room);
  };

  handleMessage = (user: string, message: string) => {};

  render() {
    return (
      <div className="App">
        <Landing sendRoom={room => this.sendRoom(room)} />
        {this.state.room && (
          <Chat
            sendMessage={(user, message) => this.handleMessage(user, message)}
            messages={this.state.messages}
            room={this.state.room}
          />
        )}
      </div>
    );
  }
}

export default App;
