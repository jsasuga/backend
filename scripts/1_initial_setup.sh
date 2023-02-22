#!/bin/bash

# install nvm on server
sudo apt install curl
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc

# install required npm and node versions
nvm install 18.9.1
npm install --global yarn

# install backend dependencies
cd ~/backend
nvm use 18.9.1
yarn
cd ~
