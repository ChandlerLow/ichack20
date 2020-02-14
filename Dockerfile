FROM node:10

RUN apt-get update -y && \
    apt-get install -y python-pip python-dev

COPY . /app

WORKDIR /app

RUN pip install -r requirements.txt

WORKDIR /app/service/Crimes/react

RUN yarn install && \
    yarn build

WORKDIR /app/service/Crimes

ENV PORT 80

ENTRYPOINT ["python"]

CMD ["app.py"]