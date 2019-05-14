from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

active_rooms = []


@socketio.on('connect')
def connect():
    print("connected")


@socketio.on('message')
def on_message(message):
    emit('message', message, broadcast=True, room=message["room"])


@socketio.on('connect_room')
def on_room_connect(data):
    print(data)
    active_rooms.append(data['room'])
    join_room(data["room"])
    emit('connect_room', data["room"])


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
