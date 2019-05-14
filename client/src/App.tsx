import React, { Component, Fragment } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';
import Landing from './Views/Landing';
import Chat from './Views/Chat';

interface Message {
  timestamp: Date;
  user: string;
  message: string;
  room: string;
}

interface AppState {
  messages: [Message];
  room: string;
  user: string;
  active_message: string;
}

interface IRoom {
  username: string;
  room: number;
}

var socket = io('http://localhost:5000/');

class App extends Component {
  state: AppState = {
    messages: [
      {
        timestamp: new Date(),
        user: 'Test',
        message: 'Test',
        room: ''
      }
    ],
    room: '',
    user: '',
    active_message: ''
  };

  componentDidMount() {
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (data: Message) => {
      let tempArray = this.state.messages.concat();
      tempArray.push(data);
      console.log(data);

      this.setState({
        messages: tempArray
      });
    });

    socket.on('connect_room', (room: string) => {
      this.setState({
        room: room
      });
    });
  }

  sendRoom = (room: IRoom) => {
    console.log(room);
    socket.emit('connect_room', room);
  };

  handleMessage = () => {
    const user: string = this.state.user;
    const message: string = this.state.active_message;
    socket.emit('message', {
      user,
      message,
      timestamp: Date.now(),
      room: this.state.room
    });
  };

  handleChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="App">
        <Grid container justify="center">
          <Grid item xs={12}>
            <Landing
              sendRoom={(room: IRoom) => this.sendRoom(room)}
              saveUser={user => this.setState({ user: user })}
            />
          </Grid>
          <Grid item xs={8}>
            {this.state.room && (
              <Chat
                sendMessage={() => this.handleMessage()}
                handleChange={e => this.handleChange(e)}
                messages={this.state.messages}
                room={this.state.room}
                message={this.state.active_message}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
