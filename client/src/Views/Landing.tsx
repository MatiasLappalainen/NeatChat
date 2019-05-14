import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { userInfo } from 'os';

interface LandingState {
  [x: string]: string | number;
}

interface LandingProps {
  sendRoom: (room: { username: string; room: number }) => void;
  saveUser: (user: string) => void;
}

class Landing extends Component<LandingProps, LandingState> {
  state = {
    room: 0,
    user: ''
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

  handleClick = () => {
    this.props.sendRoom({ username: this.state.user, room: this.state.room });
    this.props.saveUser(this.state.user);
  };

  render() {
    return (
      <div>
        <h1>Enter chatroom code</h1>
        <h2>(If you don't have a chatroom ready, enter random code)</h2>
        <label htmlFor="room">room: </label>
        <Input
          type="number"
          onChange={e => this.handleChange(e)}
          value={this.state.room}
          name="room"
        />
        <br />
        <label htmlFor="user">User: </label>
        <Input
          type="text"
          onChange={e => this.handleChange(e)}
          value={this.state.user}
          name="user"
        />
        <br />
        <Button
          onClick={() => this.handleClick()}
          color="primary"
          disabled={!this.state.room ? true : false}
        >
          Send
        </Button>
      </div>
    );
  }
}

export default Landing;
