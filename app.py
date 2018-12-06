from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('create_room')
def create_room(room, methods=['POST']):
    print(room)
    emit("room_created", room)


@socketio.on('message')
def messageReceived(json, methods=['GET', 'POST']):
    emit('message', json)


if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0")
