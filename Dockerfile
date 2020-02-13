FROM node:10

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

WORKDIR /app/service/Crimes/react

RUN yarn install && \
    yarn build

WORKDIR /app/service/Crimes

ENV PORT 5000

ENTRYPOINT [ "python" ]

CMD [ "app.py" ]