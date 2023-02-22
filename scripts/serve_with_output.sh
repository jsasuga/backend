#!/bin/bash

cd ~/backend/
yarn run start:prodbg &> serve_prod.output
sleep 5
sudo netstat -nlp | grep :1938
