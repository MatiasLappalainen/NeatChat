import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';

const styles = {
  user: {
    textAlign: 'left',
    backgroundColor: 'light'
  },
  others: {
    textAlign: 'right'
  }
};

const Chat = (props: {
  sendMessage: (event: React.ButtonHTMLAttributes<HTMLElement>) => void;
  handleChange: (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  messages: Array<{ message: string; user: string; timestamp: Date }>;
  room: string;
  message: string;
}) => {
  return (
    <Paper elevation={1}>
      <h1>Room {props.room}</h1>
      <ul style={{ listStyle: 'none' }}>
        {props.messages.map(el => {
          return (
            <li>
              <span>{el.user} sent: </span>
              {el.message}
            </li>
          );
        })}
      </ul>

      <Input
        onChange={e => props.handleChange(e)}
        value={props.message}
        name="active_message"
      />
      <Button onClick={e => props.sendMessage(e)}>Send Message</Button>
    </Paper>
  );
};

export default Chat;
