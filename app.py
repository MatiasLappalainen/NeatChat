from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)


@socketio.on('connect')
def handle_connect():
    send({'data': 'Connected'})


@socketio.on('test-event')
def test_event(message):
    send('Got it')
    print(message)


if __name__ == '__main__':
    socketio.run(app)
