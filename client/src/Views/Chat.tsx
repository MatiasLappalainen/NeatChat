import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

const Chat = (props: {
  sendMessage: (user: string, message: string) => void;
  messages: Array<{ message: string; user: string; timestamp: Date }>;
  room: string;
}) => {
  return (
    <div>
      <h1>Room {props.room}</h1>
      {props.messages.map(el => {
        return el.message;
      })}

      <Input />
      <Button>Send Message</Button>
    </div>
  );
};

export default Chat;
