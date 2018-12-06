import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

interface LandingState {
  room: string;
}

class Landing extends Component {
  state: LandingState = {
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

  handleClick = () => {
    console.log('button clicked!');
  };

  render() {
    return (
      <div>
        <Input
          type="text"
          onChange={e => this.handleChange(e)}
          value={this.state.room}
          name="room"
        />
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
