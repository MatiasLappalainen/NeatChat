FROM python:3.7
ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

ADD requirements.txt /code/
RUN pip install -r /code/requirements.txt --no-cache-dir

COPY . /code/

ENV FLASK_APP /code/app.py
CMD flask run
