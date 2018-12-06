import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

interface LandingState {
  [x: string]: string;
}

interface LandingProps {
  sendRoom: (room: string) => void;
}

class Landing extends Component<LandingProps, LandingState> {
  state = {
    room: ''
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

  handleClick = (room: string) => {
    this.props.sendRoom(room);
  };

  render() {
    return (
      <div>
        <h1>Enter chatroom code</h1>
        <h2>(If you don't have a chatroom ready, enter random code)</h2>
        <Input
          type="text"
          onChange={e => this.handleChange(e)}
          value={this.state.room}
          name="room"
        />
        <Button
          onClick={() => this.handleClick(this.state.room)}
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
