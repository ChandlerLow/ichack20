#!/usr/bin/env bash
cd service/Crimes/react
sudo yarn install && sudo yarn build
cd ..
sudo python app.py
